import Stripe from "stripe";

let client: Stripe | null = null;

/** Lazily construct the Stripe client so a missing STRIPE_SECRET_KEY never
 *  crashes a route/page at import time (or during Next.js static collection). */
export function getStripe(): Stripe {
  if (!client) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) throw new Error("STRIPE_SECRET_KEY is not set");
    client = new Stripe(apiKey);
  }
  return client;
}
