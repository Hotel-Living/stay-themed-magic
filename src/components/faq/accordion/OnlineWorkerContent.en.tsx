
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function OnlineWorkerContentEN() {
  const questionGroups = [
    [
      "How reliable is hotel internet for remote work?",
      "Can I set up a productive workspace in hotel rooms?",
      "What about video call quality and noise levels?",
      "How do I handle different time zones while hotel-living?"
    ],
    [
      "What equipment should I bring for remote work?",
      "How do I maintain work-life balance in small spaces?",
      "Can I print documents and handle business needs?",
      "What backup internet options are available?"
    ],
    [
      "How do I handle client meetings and professional calls?",
      "What about shipping and receiving work materials?",
      "Can I claim tax deductions for hotel-living workspace?",
      "How do I maintain professional relationships remotely?"
    ],
    [
      "What cybersecurity considerations should I have?",
      "How do I protect sensitive work data on hotel networks?",
      "Can I use hotel business centers effectively?",
      "What about accessing company VPNs and secure systems?"
    ],
    [
      "How do I manage multiple monitor setups?",
      "What ergonomic solutions work in hotel rooms?",
      "Can I install necessary software and applications?",
      "How do I handle software licensing across locations?"
    ],
    [
      "What about collaboration with distributed teams?",
      "How do I participate in company culture remotely?",
      "Can I attend conferences and networking events?",
      "How do I handle performance reviews and career growth?"
    ],
    [
      "What contingency plans should I have for tech failures?",
      "How do I backup important work data regularly?",
      "What mobile hotspot options work best?",
      "How do I handle power outages and connectivity issues?"
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
