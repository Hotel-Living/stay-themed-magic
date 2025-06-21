
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function RetiredContentEN() {
  const questionGroups = [
    [
      "How can hotel-living benefit retirees on fixed incomes?",
      "What are the social advantages for retired hotel-living?",
      "How do I maintain healthcare coverage while hotel-living?",
      "Can I get senior discounts for extended hotel stays?"
    ],
    [
      "What about Medicare and insurance considerations?",
      "How do I handle prescription medications while traveling?",
      "Can I maintain relationships with my current doctors?",
      "What emergency medical services are available?"
    ],
    [
      "How do I stay connected with family and grandchildren?",
      "What social activities are available for seniors?",
      "Can I find age-appropriate communities in hotels?",
      "How do I combat loneliness and isolation?"
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
