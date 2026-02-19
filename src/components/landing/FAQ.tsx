"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "cost",
    question: "How much does it cost to resurface a pickleball court in Austin?",
    answer:
      "Pickleball court resurfacing in Austin typically ranges from $3,000 to $8,000 depending on the court's condition, size, and number of colors. Pro Court Surfaces provides free on-site estimates with detailed, transparent pricing and no hidden fees.",
  },
  {
    id: "duration",
    question: "How long does court resurfacing take?",
    answer:
      "Most court resurfacing projects take 3 to 5 working days from start to finish, depending on weather conditions and the scope of work. This includes surface preparation, crack repair, base layer application, color coats, and line striping.",
  },
  {
    id: "areas",
    question: "What areas does Pro Court Surfaces serve?",
    answer:
      "Pro Court Surfaces serves the Greater Austin and Central Texas area including Austin, Round Rock, Cedar Park, Georgetown, Wimberley, San Marcos, Dripping Springs, Kyle, Buda, Pflugerville, Lakeway, Bee Cave, and the surrounding Hill Country region.",
  },
  {
    id: "conversion",
    question: "Can you resurface a tennis court into pickleball courts?",
    answer:
      "Yes. Converting a tennis court to pickleball is one of our most popular services. A standard tennis court can accommodate up to four pickleball courts. We handle the full conversion including surface prep, new color application, and pickleball line striping.",
  },
  {
    id: "materials",
    question: "What type of surface coating do you use?",
    answer:
      "We use professional-grade acrylic sport surface coatings — the same systems used on tournament-level facilities. These coatings are specifically engineered for outdoor sport courts and are designed to withstand Texas heat, UV exposure, and heavy play.",
  },
];

export function FAQ() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="py-24 sm:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] text-center">
          Frequently Asked Questions
        </h2>

        <div className="mt-12">
          <Accordion type="multiple" defaultValue={["cost"]}>
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  <h3 className="font-medium">{faq.question}</h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-[#1A1A1A]/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
