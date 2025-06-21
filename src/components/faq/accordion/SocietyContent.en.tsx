
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function SocietyContentEN() {
  const questionGroups = [
    [
      "How does hotel-living impact local communities?",
      "What are the economic benefits for cities and regions?",
      "How does this affect traditional housing markets?",
      "What environmental impacts does hotel-living have?"
    ],
    [
      "How do hotels adapt to long-term residents?",
      "What changes are needed in hospitality regulations?",
      "How does this create new job opportunities?",
      "What infrastructure improvements are needed?"
    ],
    [
      "How does hotel-living change urban development?",
      "What are the tax implications for municipalities?",
      "How does this affect public transportation systems?",
      "What new services emerge from hotel-living?"
    ],
    [
      "How do communities integrate hotel-living residents?",
      "What are the social implications of this lifestyle?",
      "How does this affect traditional neighborhoods?",
      "What new business models emerge?"
    ],
    [
      "How does hotel-living impact healthcare systems?",
      "What changes are needed in education systems?",
      "How does this affect voting and civic participation?",
      "What legal frameworks need updating?"
    ],
    [
      "How does this change retail and service industries?",
      "What impact does it have on local food systems?",
      "How do emergency services adapt?",
      "What new insurance models are needed?"
    ],
    [
      "How does hotel-living affect cultural preservation?",
      "What impact does it have on local traditions?",
      "How do religious communities adapt?",
      "What changes occur in community organizations?"
    ],
    [
      "How does this affect intergenerational relationships?",
      "What impact does it have on family structures?",
      "How do education systems need to evolve?",
      "What new social support systems emerge?"
    ],
    [
      "How does hotel-living change retirement planning?",
      "What impact does it have on wealth accumulation?",
      "How do inheritance patterns change?",
      "What new financial products are needed?"
    ],
    [
      "How does this affect global migration patterns?",
      "What impact does it have on international relations?",
      "How do visa and immigration policies need updating?",
      "What new diplomatic considerations arise?"
    ],
    [
      "How does hotel-living change work-life balance?",
      "What impact does it have on productivity?",
      "How do companies adapt to distributed teams?",
      "What new management approaches are needed?"
    ],
    [
      "How does this affect technology infrastructure?",
      "What impact does it have on data privacy?",
      "How do cybersecurity needs change?",
      "What new digital services emerge?"
    ],
    [
      "How does hotel-living change travel patterns?",
      "What impact does it have on tourism industries?",
      "How do transportation systems adapt?",
      "What new mobility solutions are needed?"
    ],
    [
      "How does this affect environmental sustainability?",
      "What impact does it have on resource consumption?",
      "How do waste management systems change?",
      "What new green technologies are needed?"
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
