
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { QuestionGroup } from "./QuestionGroup";

export function StillRentingContent() {
  const { t } = useTranslation();
  
  const points = t('faq.accordionContent.stillRenting.points', { returnObjects: true }) as string[];

  // Group the questions into arrays for consistent formatting with other sections
  const questionGroups = [
    points.slice(0, 4),   // First 4 questions
    points.slice(4, 8),   // Next 4 questions  
    points.slice(8, 12),  // Next 4 questions
    points.slice(12, 16), // Next 4 questions
    points.slice(16)      // Remaining question(s)
  ].filter(group => group.length > 0); // Remove empty groups

  return (
    <div className="space-y-8 text-white">
      {questionGroups.map((questions, index) => (
        <QuestionGroup key={index} questions={questions} />
      ))}
    </div>
  );
}
