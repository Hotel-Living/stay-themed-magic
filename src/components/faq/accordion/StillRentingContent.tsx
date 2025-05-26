
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function StillRentingContent() {
  const questionGroups = [
    [
      "Why Rent a Flat When You Can Have Room Service?",
      "Why apply with endless requirements — when you could just check in and feel at home, instantly?",
      "Why pay a deposit — when you could pay for comfort, connection, and care?",
      "Why lock yourself into a year — when freedom lives in themed weeks with people like you?"
    ],
    [
      "Why clean — when someone else takes care of that, so you can enjoy your time with others?",
      "Why give up comfort — when Hotel Living includes cleaning, smiles, and maybe a dinner invite?",
      "Why live alone — when you can live connected?",
      "Why settle for isolation — when your affinities may bring you closer to your tribe?"
    ],
    [
      "Why live under inspection — when you could live with service and be treated like a guest?",
      "Why be far from life — when hotels bring the world (and people) to your doorstep?",
      "Why rent — when you could be hosted, welcomed, and even befriended?",
      "Why carry furniture — when your room is ready, your neighbors are interesting, and dinner is downstairs?"
    ],
    [
      "Why chase landlords — when Hotel Living welcomes you, feeds you, and introduces you to new friends?",
      "Why eat alone — when you can share a table with people who get you?",
      "Why scroll through food delivery apps — when you have a restaurant steps away?",
      "Why get ten bills a month — when Hotel Living wraps it all into one simple stay?"
    ],
    [
      "Why rent like it's 1999 — when Hotel Living is the future of staying?"
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
