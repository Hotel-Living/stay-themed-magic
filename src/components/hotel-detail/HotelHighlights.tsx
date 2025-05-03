
import React from "react";

interface HighlightItem {
  question: string;
  answer: string | null | undefined;
}

interface HotelHighlightsProps {
  highlights: HighlightItem[];
}

export function HotelHighlights({ highlights }: HotelHighlightsProps) {
  return (
    <div className="mt-4 space-y-2">
      {highlights.map((item, index) => (
        item.answer ? (
          <p key={index} className="text-sm font-semibold text-white">
            {item.question} {item.answer}
          </p>
        ) : null
      ))}
    </div>
  );
}
