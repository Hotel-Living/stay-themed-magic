
import React from "react";
interface Highlight {
  question: string;
  answer: string;
}
interface HotelHighlightsProps {
  highlights: Highlight[];
}
export function HotelHighlights({
  highlights
}: HotelHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }
  return <div className="my-5 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white text-left">HIGHLIGHTS</h2>
      <div className="space-y-2">
        {highlights.map((highlight, index) => <p key={index} className="font-medium">
            <span className="font-medium">{highlight.question} </span>
            <span className="font-medium">{highlight.answer}</span>
          </p>)}
      </div>
    </div>;
}
