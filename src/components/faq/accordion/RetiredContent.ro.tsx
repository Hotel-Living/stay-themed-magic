
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function RetiredContentRO() {
  const questionGroups = [
    [
      "Cum poate beneficia hotel-living pensionarii cu venituri fixe?",
      "Care sunt avantajele sociale ale hotel-living pentru pensionari?",
      "Cum mențin acoperirea sănătății în timp ce trăiesc în hoteluri?",
      "Pot obține reduceri pentru seniori pentru șederi prelungite?"
    ],
    [
      "Cum stau cu considerațiile Medicare și asigurări?",
      "Cum gestionez medicamentele cu rețetă în timp ce călătoresc?",
      "Pot menține relații cu doctorii mei actuali?",
      "Ce servicii medicale de urgență sunt disponibile?"
    ],
    [
      "Cum rămân conectat cu familia și nepoții?",
      "Ce activități sociale sunt disponibile pentru seniori?",
      "Pot găsi comunități potrivite pentru vârsta mea în hoteluri?",
      "Cum combat singurătatea și izolarea?"
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
