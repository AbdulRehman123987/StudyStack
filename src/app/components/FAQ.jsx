import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FAQs } from "@/lib/faq";

export default function FAQ() {
  return (
    <div className="w-[80%] mx-auto my-16 flex flex-col gap-6 items-center">
      <h1 className="text-3xl font-semibold text-center">
        Frequently Asked Questions
      </h1>

      <Accordion type="single" collapsible className="w-full">
        {FAQs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-gray-200 rounded-xl shadow-md mb-4 overflow-hidden"
          >
            <AccordionTrigger className="bg-gradient-to-r from-blue-100 via-blue-50 to-white text-[18px] px-6 py-4 hover:bg-blue-200 transition-colors font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="bg-gray-50 px-6 py-4 text-[15px] text-gray-700 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
