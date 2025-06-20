
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function FreeSoulContentEN() {
  const questionGroups = [
    [
      "How does hotel-living support a nomadic lifestyle?",
      "What locations are available worldwide?",
      "Can I book spontaneous trips and extended stays?",
      "How do I manage my belongings while traveling?"
    ],
    [
      "What are the visa and legal considerations?",
      "How do I handle banking and finances internationally?",
      "Can I maintain my professional career while nomadic?",
      "What about healthcare coverage abroad?"
    ],
    [
      "How do I build community as a digital nomad?",
      "What networking opportunities are available?",
      "Can I connect with other hotel-living nomads?",
      "How do I combat isolation and loneliness?"
    ],
    [
      "What technology requirements do I need?",
      "How reliable is internet connectivity?",
      "Can I set up a productive workspace?",
      "What about time zone management for work?"
    ],
    [
      "How do I handle seasonal pricing variations?",
      "What loyalty rewards can I earn?",
      "Are there group discounts for nomad communities?",
      "How do I budget for long-term hotel-living?"
    ],
    [
      "What about language barriers in different countries?",
      "How do I adapt to different cultural norms?",
      "Can I get local recommendations and guidance?",
      "What safety considerations should I keep in mind?"
    ],
    [
      "How do I maintain personal relationships?",
      "What about dating and romantic connections?",
      "Can I bring guests or travel companions?",
      "How do I handle family visits and obligations?"
    ],
    [
      "What are the environmental impacts of hotel-living?",
      "How can I travel more sustainably?",
      "Are there eco-friendly hotel options?",
      "What carbon offset programs are available?"
    ]
  ];

  return (
    <div className="space-y-8 text-white">
      {questionGroups.map((questions, index) => (
        <QuestionGroup key={index} questions={questions} />
      ))}
    </div>
  );
}
