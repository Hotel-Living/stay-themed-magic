
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function HotelContentEN() {
  const questionGroups = [
    [
      "How can my hotel join the Hotel-Living network?",
      "What are the requirements for participating hotels?",
      "How does the revenue sharing model work?",
      "What training do staff need for long-term guests?"
    ],
    [
      "How do we handle extended stay pricing?",
      "What amenities should we provide for hotel-living guests?",
      "How do we manage inventory for long-term bookings?",
      "What housekeeping protocols are needed?"
    ],
    [
      "How do we screen potential long-term guests?",
      "What lease agreements or contracts are required?",
      "How do we handle guest complaints and issues?",
      "What emergency procedures should be in place?"
    ],
    [
      "How do we market to the hotel-living demographic?",
      "What partnerships can help attract guests?",
      "How do we optimize our online presence?",
      "What promotional strategies work best?"
    ],
    [
      "How do we handle payment processing for extended stays?",
      "What insurance considerations are there?",
      "How do we manage cash flow with longer bookings?",
      "What tax implications should we be aware of?"
    ],
    [
      "How do we maintain service quality for long-term guests?",
      "What staff scheduling adjustments are needed?",
      "How do we handle maintenance and repairs?",
      "What guest amenities require regular restocking?"
    ],
    [
      "How do we create community among hotel-living guests?",
      "What social spaces and activities should we provide?",
      "How do we handle conflicts between guests?",
      "What privacy considerations are important?"
    ],
    [
      "How do we track and analyze performance metrics?",
      "What reporting tools are available?",
      "How do we measure guest satisfaction?",
      "What key performance indicators matter most?"
    ],
    [
      "How do we handle seasonal demand fluctuations?",
      "What strategies help maintain year-round occupancy?",
      "How do we price competitively in different markets?",
      "What location factors affect success?"
    ],
    [
      "What technology integrations are needed?",
      "How do we manage booking systems efficiently?",
      "What mobile apps or platforms should we use?",
      "How do we ensure data security and privacy?"
    ],
    [
      "How do we handle international guests and regulations?",
      "What visa and legal requirements apply?",
      "How do we manage currency exchange issues?",
      "What cultural considerations are important?"
    ],
    [
      "How do we scale our hotel-living operations?",
      "What expansion opportunities exist?",
      "How do we replicate success across properties?",
      "What investment requirements should we plan for?"
    ],
    [
      "How do we ensure guest retention and loyalty?",
      "What rewards programs work for extended stays?",
      "How do we handle guest referrals and reviews?",
      "What communication strategies build relationships?"
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
