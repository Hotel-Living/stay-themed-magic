
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function StillRentingContentEN() {
  const questionGroups = [
    [
      "How much can I save by switching from renting to hotel-living?",
      "What are the hidden costs of traditional renting?",
      "How do hotel rates compare to monthly rent payments?",
      "Can I break my lease to start hotel-living?"
    ],
    [
      "What about utilities and internet costs?",
      "How do I handle my security deposit and lease obligations?",
      "What happens to my furniture and belongings?",
      "Can I try hotel-living for a month before committing?"
    ],
    [
      "How do I explain hotel-living to friends and family?",
      "What about mail delivery and permanent address?",
      "How do I handle tax implications and residency?",
      "Can I maintain the same lifestyle and routines?",
      "What about parking and transportation changes?"
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
