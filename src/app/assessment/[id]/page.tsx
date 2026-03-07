import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { AssessmentForm } from "./assessment-form";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: lead } = await supabase
    .from("leads")
    .select("id, first_name, display_name, second_step_complete")
    .eq("id", id)
    .maybeSingle();

  if (!lead) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-brand-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto/v1767487552/pro_court_logo_white_no_bg_2_ludutv.png"
              alt="Pro Court Surfaces"
              width={160}
              height={40}
              className="h-8 sm:h-10 w-auto"
            />
          </Link>
          <a
            href="tel:+15128930466"
            className="text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            (512) 893-0466
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {lead.second_step_complete ? (
          <div className="bg-white rounded-2xl shadow-sm border p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Assessment already submitted
            </h1>
            <p className="mt-2 text-gray-500">
              Thanks, {lead.first_name || lead.display_name}! We have your court
              details and will be in touch soon.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Court Assessment
              </h1>
              <p className="mt-2 text-gray-500">
                Hey {lead.first_name || lead.display_name} — help us understand
                your court so we can prepare an accurate estimate. Everything
                here is optional — fill in what you know.
              </p>
            </div>

            <AssessmentForm leadId={lead.id} />
          </>
        )}
      </main>
    </div>
  );
}
