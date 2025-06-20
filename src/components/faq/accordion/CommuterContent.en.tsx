
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function CommuterContentEN() {
  const questionGroups = [
    [
      "How can hotel-living benefit my daily commute?",
      "What are the cost savings compared to traditional housing?",
      "Can I stay in hotels near my workplace?",
      "How flexible are the booking arrangements?"
    ],
    [
      "What amenities are typically included?",
      "How does hotel-living work for business travelers?",
      "Can I get corporate rates for extended stays?",
      "What about parking and transportation?"
    ],
    [
      "How do I handle mail and packages?",
      "What about laundry and cleaning services?",
      "Can I work from my hotel room?",
      "How stable is the wifi for remote work?"
    ],
    [
      "What happens during peak travel seasons?",
      "Can I book multiple locations for different projects?",
      "How does billing work for extended stays?",
      "What loyalty programs are available?"
    ],
    [
      "How do I maintain work-life balance?",
      "What about gym and fitness facilities?",
      "Can I host business meetings at the hotel?",
      "How do I network with other hotel-living professionals?"
    ],
    [
      "What are the tax implications?",
      "How do I establish residency for legal purposes?",
      "Can I use hotel-living for temporary assignments?",
      "What documentation do I need for expense reports?"
    ],
    [
      "How do I handle emergencies while hotel-living?",
      "What about healthcare and insurance?",
      "Can I bring guests to my hotel room?",
      "How do I maintain professional relationships?"
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
