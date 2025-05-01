// RUTA: src/components/hotel-detail/HotelFaqs.tsx

import React from "react";

interface HotelFaqsProps {
  faqs: { question: string; answer: string }[];
}

export const HotelFaqs: React.FC<HotelFaqsProps> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
      <ul className="space-y-2">
        {faqs.map((faq, index) => (
          <li key={index} className="border-b pb-2">
            <p className="font-medium">Q: {faq.question}</p>
            <p className="text-gray-700">A: {faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
