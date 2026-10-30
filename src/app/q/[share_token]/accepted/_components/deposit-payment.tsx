"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe, type PaymentIntent } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CheckCircle2, Clock, Loader2 } from "lucide-react";
import { fmtMoney } from "@/lib/quotes/quote-format";

interface DepositPaymentProps {
  publishableKey: string;
  clientSecret: string; // the deposit invoice's own PaymentIntent secret
  amount: number;
  returnUrl: string;
  hostedInvoiceUrl: string | null;
  billingName: string;
  billingEmail: string;
}

type PayState = "loading" | "ready" | PaymentIntent.Status;

// Pays the deposit *invoice* (not a separate checkout), so paying here and paying
// from Stripe's emailed invoice settle the same bill — it can't be paid twice.
export function DepositPayment(props: DepositPaymentProps) {
  const stripePromise = useMemo(() => loadStripe(props.publishableKey), [props.publishableKey]);
  const [state, setState] = useState<PayState>("loading");

  // Current status first: a customer coming back after paying (or mid-ACH) must not
  // see a payment form again.
  useEffect(() => {
    let cancelled = false;
    // If the status check fails, fall back to the form: paying an already-paid
    // invoice is refused by Stripe anyway, so showing it is safe.
    stripePromise
      .then(async (stripe) => {
        if (!stripe) throw new Error("Stripe.js failed to load");
        const { paymentIntent } = await stripe.retrievePaymentIntent(props.clientSecret);
        const s = paymentIntent?.status;
        if (!cancelled) setState(s === "succeeded" || s === "processing" ? s : "ready");
      })
      .catch(() => {
        if (!cancelled) setState("ready");
      });
    return () => {
      cancelled = true;
    };
  }, [stripePromise, props.clientSecret]);

  if (state === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 py-8 text-sm text-stone-500">
        <Loader2 className="size-4 animate-spin" /> Loading secure payment…
      </div>
    );
  }
  if (state === "succeeded") return <PaidNotice amount={props.amount} />;
  if (state === "processing") return <ProcessingNotice amount={props.amount} />;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: props.clientSecret,
        appearance: {
          theme: "stripe",
          variables: { colorPrimary: "#1a5632", borderRadius: "8px", fontFamily: "system-ui, sans-serif" },
        },
      }}
    >
      <PayForm {...props} onResult={setState} />
    </Elements>
  );
}

function PayForm({
  amount,
  returnUrl,
  hostedInvoiceUrl,
  billingName,
  billingEmail,
  onResult,
}: DepositPaymentProps & { onResult: (s: PayState) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Card fields failed to load (bad key, blocked script): offer Stripe's hosted
  // invoice instead of a pay button that can never complete.
  const [loadFailed, setLoadFailed] = useState(false);

  if (loadFailed) {
    return hostedInvoiceUrl ? (
      <a
        href={hostedInvoiceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-lg bg-[#1a5632] px-6 py-4 text-center text-base font-semibold text-white shadow-sm transition-all hover:bg-[#143f26]"
      >
        Pay Deposit — {fmtMoney(amount)}
      </a>
    ) : (
      <p className="text-sm text-stone-600 text-center">
        We couldn&apos;t load the payment form. Your deposit invoice has been emailed to you.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || submitting) return; // one confirm per click
    setSubmitting(true);
    setError(null);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed. Please try again.");
      setSubmitting(false);
      return;
    }
    if (paymentIntent) {
      onResult(paymentIntent.status);
      // The webhook flips the quote to deposit_paid; refresh to pick it up.
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        onLoadError={() => setLoadFailed(true)}
        options={{
          layout: "tabs",
          paymentMethodOrder: ["us_bank_account", "card"],
          // Already captured in the accept popup — don't ask twice.
          defaultValues: { billingDetails: { name: billingName, email: billingEmail } },
        }}
      />
      <p className="text-xs text-stone-500">
        Bank transfer (ACH) has the lowest fees. Card payments are also accepted.
      </p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full rounded-lg bg-[#1a5632] px-6 py-4 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#143f26] active:scale-[0.99] disabled:bg-stone-200 disabled:text-stone-400"
      >
        {submitting ? "Processing…" : `Pay Deposit — ${fmtMoney(amount)}`}
      </button>
      {hostedInvoiceUrl && (
        <p className="text-center text-xs text-stone-500">
          We also emailed you this invoice if you&apos;d rather pay later.
        </p>
      )}
    </form>
  );
}

function PaidNotice({ amount }: { amount: number }) {
  return (
    <div className="rounded-lg bg-[#1a5632]/[0.06] px-5 py-6 text-center">
      <CheckCircle2 className="mx-auto size-10 text-[#1a5632]" />
      <p className="mt-2 text-lg font-bold text-stone-800">Deposit received — {fmtMoney(amount)}</p>
      <p className="mt-1 text-sm text-stone-600">
        Thank you! We&apos;ll be in touch to schedule your project.
      </p>
    </div>
  );
}

function ProcessingNotice({ amount }: { amount: number }) {
  return (
    <div className="rounded-lg bg-amber-50 px-5 py-6 text-center">
      <Clock className="mx-auto size-10 text-amber-600" />
      <p className="mt-2 text-lg font-bold text-stone-800">Payment processing — {fmtMoney(amount)}</p>
      <p className="mt-1 text-sm text-stone-600">
        Bank transfers take 3–5 business days to clear. We&apos;ll email you when it&apos;s
        received — there&apos;s nothing else you need to do.
      </p>
    </div>
  );
}
