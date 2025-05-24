
import React from "react";
import { Card } from "@/components/ui/card";

interface FaqSectionProps {
  hotel: any;
}

export function FaqSection({ hotel }: FaqSectionProps) {
  const faqs = hotel.faqs || [];
  
  return (
    <Card className="p-6 bg-[#5A0080]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">FAQ</h3>
      
      {faqs && faqs.length > 0 ? (
        <div className="space-y-4">
          {faqs.map((faq: any, index: number) => (
            <div key={index} className="p-4 border border-purple-700/30 rounded-lg bg-purple-900/20">
              <h4 className="font-medium text-purple-300 mb-2">{faq.question}</h4>
              <p className="text-white">{faq.answer}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No FAQ items specified for this hotel.</p>
      )}
    </Card>
  );
}
