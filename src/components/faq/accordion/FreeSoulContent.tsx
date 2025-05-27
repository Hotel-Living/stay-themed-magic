
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function FreeSoulContent() {
  const questionGroups = [
    [
      "Why stay stuck in one place — when you could live freely from city to city, on your terms?",
      "Why tie yourself to one address — when the world is full of places waiting to feel like home?",
      "Why live one fixed life — when every few weeks can bring a whole new chapter?",
      "Why rent forever in one city — when you could rotate between countries, cultures, and communities?"
    ],
    [
      "Why plan months ahead — when flexibility means staying as long as it feels right?",
      "Why unpack your suitcase for good — when life feels more alive with motion, meaning, and new people?",
      "Why live surrounded by the same stories — when you could collect new ones every month?",
      "Why keep meeting the same neighbors — when you could connect with creatives, travelers, and thinkers from around the world?"
    ],
    [
      "Why shrink your life — when retirement is the time to expand it?",
      "Why grow old quietly — when you can age joyfully, boldly, beautifully?",
      "Why limit your life — when the world is waiting?",
      "Why stay in one place — when living in many keeps you young?"
    ],
    [
      "Why live in one home — when you could live across cities, countries, cultures?",
      "Why settle for stillness — when movement brings back vitality?",
      "Why wake up invisible — when Hotel Living makes you part of something?",
      "Why cling to comfort zones — when discovery is the true comfort of life?"
    ],
    [
      "Why be surrounded by the past — when you could build a present worth remembering?",
      "Why choose routine — when you can choose adventure, elegance, surprise?",
      "Why dress down — when Hotel Living gives you reasons to dress up again?",
      "Why drift from place to place — when you can land in a home for your lifestyle?"
    ],
    [
      "Why be far from life — when hotels bring the world (and people) to your doorstep?",
      "Why rent — when you could be hosted, welcomed, and even befriended?",
      "Why stay in a hotel full of strangers — when you could live in one where everyone gets you?",
      "Why settle for isolation — when your affinities may bring you closer to your tribe?"
    ],
    [
      "Why live alone — when every hallway holds a new connection?",
      "Why wait to feel alive — when your next journey starts at your door?",
      "Why eat alone — when your table can be filled with new friends?",
      "Why scroll through delivery apps — when you can share a table and a story?"
    ],
    [
      "Why feel like the only one working — when your neighbors are designers, developers, and dreamers too?",
      "This is not just accommodation — it's a lifestyle for those who live by inspiration, not by obligation.",
      "This is Hotel Living. Where the world is home. And freedom is the only address."
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
