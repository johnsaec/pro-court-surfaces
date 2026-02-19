import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sections = [
  {
    id: "scope",
    title: "Scope of Work",
    content:
      "The scope of work for each project is defined in the associated quote document. Pro Court Surfaces will perform the services described in the accepted quote package (Good, Better, or Best) selected by the customer. Any work beyond the defined scope will require a separate written agreement and may incur additional charges. Pro Court Surfaces reserves the right to subcontract portions of the work as necessary to complete the project.",
  },
  {
    id: "payment",
    title: "Payment Terms",
    content:
      "A 50% deposit of the total project cost is required to schedule work. The remaining 50% balance is due upon project completion. Deposits are collected via Stripe invoice and are due within the number of days specified on your quote. Failure to pay the remaining balance within 30 days of project completion may result in collection action and the customer will be responsible for all associated fees. All prices are quoted in US dollars.",
  },
  {
    id: "scheduling",
    title: "Scheduling & Access",
    content:
      "Project scheduling begins once the deposit has been received. Pro Court Surfaces will coordinate a mutually agreeable start date with the customer. The customer is responsible for providing clear and unobstructed access to the court surface(s) for the duration of the project. Delays caused by lack of access, weather, or other conditions beyond our control may extend the project timeline. We will communicate any schedule changes as promptly as possible.",
  },
  {
    id: "surface-prep",
    title: "Surface Preparation",
    content:
      "Proper surface preparation is essential to a quality finish. Pro Court Surfaces will assess the existing court condition and perform necessary preparation as outlined in the accepted quote. This may include pressure washing, crack repair, low-spot leveling, and other remediation. If additional surface issues are discovered during preparation that were not visible during the initial assessment, we will notify the customer and provide a revised estimate before proceeding with additional work.",
  },
  {
    id: "warranty",
    title: "Warranty",
    content:
      "Pro Court Surfaces warrants all workmanship for a period of one (1) year from the date of project completion. This warranty covers defects in application and material failure under normal use and conditions. The warranty does not cover damage resulting from improper use, neglect, acts of nature (including but not limited to flooding, hail, or fallen trees), or unauthorized modifications to the court surface. Warranty claims must be submitted in writing within the warranty period.",
  },
  {
    id: "cancellation",
    title: "Cancellation & Refunds",
    content:
      "Cancellations made more than 14 days before the scheduled start date will receive a full refund of the deposit. Cancellations made within 14 days of the scheduled start date are subject to a cancellation fee of 25% of the deposit to cover materials and scheduling costs. Once work has commenced, the deposit is non-refundable. Refunds, when applicable, will be processed within 10 business days.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content:
      "Pro Court Surfaces' total liability for any claim arising out of or related to the project shall not exceed the total amount paid by the customer for the project. Pro Court Surfaces shall not be liable for any indirect, incidental, special, or consequential damages. The customer is responsible for ensuring that the court area is safe and free of hazards prior to and during the project. Pro Court Surfaces carries general liability insurance and workers' compensation coverage for all crew members.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <p className="text-lg font-semibold">Pro Court Surfaces</p>
          <p className="text-sm text-muted-foreground">Terms & Conditions</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Accordion
          type="multiple"
          defaultValue={sections.map((s) => s.id)}
        >
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
}
