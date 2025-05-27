
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function RetiredContent() {
  const questionGroups = [
    [
      "Why limit your life — when the world is waiting?",
      "Why stay in one place — when living in many keeps you young?",
      "Why shrink your life — when retirement is the time to expand it?",
      "Why live in one home — when you could live across cities, countries, cultures?"
    ],
    [
      "Why settle for stillness — when movement brings back vitality?",
      "Why wait to feel alive — when your next journey starts at your door?",
      "Why choose routine — when you can choose adventure, elegance, surprise?",
      "Why be surrounded by the past — when you could build a present worth remembering?"
    ],
    [
      "Why see the same faces — when every trip brings new stories?",
      "Why cling to comfort zones — when discovery is the true comfort of life?",
      "Why grow old quietly — when you can age joyfully, boldly, beautifully?",
      "Why dress down — when Hotel Living gives you reasons to dress up again?"
    ],
    [
      "Why isolate yourself — when a vibrant life waits just outside your room?",
      "Why eat alone — when your table can be filled with new friends?",
      "Why wait for visits — when every hallway holds a friendly face?",
      "Why be invisible in your own home — when people greet you by name every morning?"
    ],
    [
      "Why handle repairs, noise, or neighbors — when Hotel Living handles it all for you?",
      "Why keep a house empty — when you could rent it and fill your life instead?",
      "Why sleep behind a door — when Hotel Living offers 24/7 care and presence?",
      "Why risk silence — when help is just a knock away?"
    ],
    [
      "Why worry about who's at your door — when hotel security already knows?",
      "Why stay behind closed doors — when safety, warmth, and care are built into Hotel Living?",
      "Why face emergencies alone — when trained staff are always nearby?",
      "Why worry about falls, breaks, or nights alone — when you're never truly alone again?"
    ],
    [
      "Why live in fear — when someone always knows you're there, and cares that you are?"
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
