
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function OnlineWorkerContent() {
  const questionGroups = [
    [
      "Why stay stuck in one place — when you could live freely from city to city, on your terms?",
      "Why tie yourself to one address — when the world is full of places waiting to feel like home?",
      "Why rent forever in one city — when you could rotate between countries, cultures, and communities?",
      "Why live one fixed life — when every few weeks can bring a whole new chapter?"
    ],
    [
      "Why plan months ahead — when flexibility means staying as long as it feels right?",
      "Why unpack your suitcase for good — when life feels more alive with motion, meaning, and new people?",
      "Why live surrounded by the same stories — when you could collect new ones every month?",
      "Why keep meeting the same neighbors — when you could connect with creatives, travelers, and thinkers from around the world?"
    ],
    [
      "Why pay ten bills — when Hotel Living gives you one price, zero stress, and full comfort?",
      "Why pay a deposit — when you could invest in fast Wi-Fi, real people, and shared experiences?",
      "Why rent — when you could be hosted in a place full of people just like you?",
      "Why apply with endless requirements — when you could just check in and instantly belong?"
    ],
    [
      "Why rent like it's 1999 — when your office, your friends, and your next adventure are one check-in away?",
      "Why lock yourself into a year — when freedom means moving from city to city with your tribe?",
      "Why carry furniture — when your suite already knows what a digital nomad needs?",
      "Why clean — when someone else takes care of it while you meet inspiring people downstairs?"
    ],
    [
      "Why give up comfort — when your room is cleaned, your workspace is ready, and the vibe is yours?",
      "Why live under inspection — when you could live with support, service, and no pressure?",
      "Why chase landlords — when Hotel Living gives you check-in, coffee, and colleagues in minutes?",
      "Why drift from place to place — when you can land in a home for your lifestyle?"
    ],
    [
      "Why be far from life — when Hotel Living brings life, work, and connection under one roof?",
      "Why feel like the only one working — when your neighbors are designers, developers, and dreamers too?",
      "Why eat alone — when dinners become conversations, and strangers become collaborators?",
      "Why scroll through delivery apps — when you can share a table and a story?"
    ],
    [
      "Why stay in a hotel full of strangers — when you could live in one where everyone gets you?",
      "Why settle for isolation — when affinities in hotels bring people like you together?",
      "Why live alone — when every hallway holds a new connection?",
      "Why wake up invisible — when Hotel Living makes you part of something?"
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
