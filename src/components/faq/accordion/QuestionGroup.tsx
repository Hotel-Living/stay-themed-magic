
import React from "react";
import { QuestionItem } from "./QuestionItem";

interface QuestionGroupProps {
  questions: string[];
}

export function QuestionGroup({ questions }: QuestionGroupProps) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <QuestionItem key={index} question={question} />
      ))}
    </div>
  );
}
