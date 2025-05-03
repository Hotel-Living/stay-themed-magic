
import React from "react";

interface Highlight {
  question: string;
  answer: string;
}

interface HotelHighlightsProps {
  highlights: Highlight[];
}

export function HotelHighlights({ highlights }: HotelHighlightsProps) {
  return (
    <div className="my-5 p-4 bg-fuchsia-900/20 rounded-lg">
      <div className="space-y-2">
        {highlights.map((highlight, index) => (
          <p key={index} className="font-medium">
            {highlight.question} {highlight.answer}
          </p>
        ))}
      </div>
    </div>
  );
}
