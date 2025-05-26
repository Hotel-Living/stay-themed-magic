
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function CommuterContent() {
  const questionGroups = [
    [
      "Why lose hours in traffic when you could gain them in a theater?",
      "Why waste money on gas instead of investing in your life?",
      "Why spend two hours a day on the road when you could live downtown?",
      "Why live for the commute, not the experience?"
    ],
    [
      "Why be a second-class citizen in your own city?",
      "Why always be arriving late when you could already be there?",
      "Why live among cars when you could live among cafés and bookstores?",
      "Why settle for traffic when you could choose pleasure?"
    ],
    [
      "Why let your life depend on the train schedule?",
      "Why live in the waiting?",
      "Why flee each night from the place that inspires you by day?",
      "Why keep going back and forth when you could simply arrive — and stay?"
    ],
    [
      "Why live far from your own plans?",
      "Why wake up far just to arrive late?",
      "Why pay for two lives when you only have one?",
      "Why sleep outside the world when you could live inside it?"
    ],
    [
      "Why distance yourself from culture, art, and life?",
      "Why live far from where everything happens?",
      "Why live on the outskirts if you work in the heart?",
      "Why remain a daily visitor in the city that feeds you?"
    ],
    [
      "Why not live where you truly live?",
      "Why pay rent where you aren't, when you could pay to live where you are?",
      "Why leave your time on the shoulder of the highway?",
      "Why live between two worlds when you can have one that has it all?"
    ],
    [
      "Why be a daily visitor when you could be a free resident?",
      "Why stay in motion when you could stay at home?",
      "Why keep distance between you and your dreams?",
      "Why accept discomfort when Hotel Living exists?"
    ]
  ];

  return (
    <div className="space-y-18 text-yellow-300">
      {questionGroups.map((questions, index) => (
        <QuestionGroup key={index} questions={questions} />
      ))}
    </div>
  );
}
