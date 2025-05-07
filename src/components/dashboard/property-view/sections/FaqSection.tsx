
import React from 'react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";

interface FaqSectionProps {
  hotel: Hotel;
}

export const FaqSection = ({ hotel }: FaqSectionProps) => {
  return (
    <>
      <Card className="p-6 bg-[#5d0083]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">FAQs</h3>
        {hotel.faqs && hotel.faqs.length > 0 ? (
          <div className="space-y-4">
            {hotel.faqs.map((faq, index) => (
              <div key={index} className="border-b border-purple-800/30 pb-3">
                <h4 className="font-medium text-fuchsia-300">{faq.question}</h4>
                <p className="mt-1 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No FAQs specified</p>
        )}
      </Card>

      <Card className="p-6 bg-[#5d0083]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Terms & Conditions</h3>
        <p className="whitespace-pre-wrap">{hotel.terms || "No terms specified"}</p>
      </Card>
    </>
  );
};
