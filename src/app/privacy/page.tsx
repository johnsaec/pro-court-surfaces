import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Privacy & Email Policy | Pro Court Surfaces",
  description:
    "What information Pro Court Surfaces collects, what emails we send, and how to unsubscribe.",
  alternates: { canonical: "https://www.procourtsurfaces.com/privacy" },
};

const sections = [
  {
    id: "emails",
    title: "Emails we send",
    content:
      "When you agree on one of our forms, we may email you about your project, plus occasional court care tips and project news. Every marketing email includes an unsubscribe link. Unsubscribing stops marketing emails, but we can still send messages about your quote, payments or project.",
  },
  {
    id: "collect",
    title: "What we collect",
    content:
      "We collect what you give us, such as your name, email, phone, city and project details. We also record how you found our site, including the page you arrived on and any ad or campaign you clicked.",
  },
  {
    id: "use",
    title: "How we use it",
    content:
      "We use your information to respond to you, prepare quotes, deliver your project, send the emails described above and measure which marketing works.",
  },
  {
    id: "providers",
    title: "Services that handle it for us",
    content:
      "We use outside services to run our business: Supabase and Vercel for our website and records, Stripe for payments, Resend and MailerLite for email, Clarify for customer records, and Google and Meta for analytics and advertising. We do not sell your personal information.",
  },
  {
    id: "contact",
    title: "Questions or requests",
    content:
      "To unsubscribe, or to ask us to review or delete your information, email patrick@procourtsurfaces.com or call (512) 893-0466.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-brand-bg-alt pt-24">
        <header className="border-b bg-white">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <h1 className="text-lg font-semibold text-brand-blue">Privacy &amp; Email Policy</h1>
            <p className="text-sm text-brand-text-muted">Last updated November 1, 2026</p>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {sections.map((section) => (
            <section key={section.id}>
              <h2 className="font-semibold mb-1">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
            </section>
          ))}
        </main>
      </div>
      <Footer />
    </>
  );
}
