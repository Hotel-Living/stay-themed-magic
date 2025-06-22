
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function HotelContentEN() {
  const questionGroups = [
    [
      "Why limit your revenue to traditional short stays when long-term guests offer stability?",
      "Why deal with constant turnover when Hotel-Living guests become loyal, long-term residents?",
      "Why depend on seasonal tourism when you can have year-round occupancy?",
      "Why compete only for vacation travelers when you can capture the growing digital nomad market?"
    ],
    [
      "Why leave rooms empty during low season when Hotel-Living fills them consistently?",
      "Why stress about daily housekeeping when long-term guests require less frequent service?",
      "Why handle constant check-ins and check-outs when you can have stable, settled guests?",
      "Why miss the opportunity to be part of the future of hospitality?"
    ],
    [
      "Why operate with high operational costs when long-term stays are more profitable?",
      "Why limit your hotel's potential when Hotel-Living can transform your business model?",
      "Why compete in the saturated short-stay market when you can pioneer the long-stay revolution?",
      "Why watch other hotels struggle when you can lead the way in hospitality innovation?"
    ],
    [
      "Why settle for being just another hotel when you can become a lifestyle destination?",
      "Why miss the chance to build lasting relationships with guests who become community members?",
      "Why remain stuck in the old hospitality model when Hotel-Living represents the future?",
      "Why wait for change when you can be the change that transforms the industry?"
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
