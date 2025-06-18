
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { QuestionGroup } from "./QuestionGroup";

export function FreeSoulContent() {
  const { t } = useTranslation();
  
  const points = t('faq.accordionContent.freeSoul.points', { returnObjects: true }) as string[];

  // Group the questions into arrays for consistent formatting with other sections
  const questionGroups = [
    points.slice(0, 4),   // First 4 questions
    points.slice(4, 8),   // Next 4 questions  
    points.slice(8, 12),  // Next 4 questions
    points.slice(12, 16), // Next 4 questions
    points.slice(16, 20), // Next 4 questions
    points.slice(20, 24), // Next 4 questions
    points.slice(24, 28), // Next 4 questions
    points.slice(28)      // Remaining questions
  ].filter(group => group.length > 0); // Remove empty groups

  return (
    <div className="space-y-8 text-white">
      {questionGroups.map((questions, index) => (
        <QuestionGroup key={index} questions={questions} />
      ))}
    </div>
  );
}
