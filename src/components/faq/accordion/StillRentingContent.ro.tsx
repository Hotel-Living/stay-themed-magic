
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function StillRentingContentRO() {
  const questionGroups = [
    [
      "Cât pot economisi trecând de la închiriere la hotel-living?",
      "Care sunt costurile ascunse ale închirierii tradiționale?",
      "Cum se compară tarifele hotelului cu plățile lunare de închiriere?",
      "Pot să-mi rup contractul de închiriere pentru a începe hotel-living?"
    ],
    [
      "Cum stau cu costurile utilitarilor și internetului?",
      "Cum gestionez depozitul meu de garanție și obligațiile de închiriere?",
      "Ce se întâmplă cu mobilierul și bunurile mele?",
      "Pot încerca hotel-living pentru o lună înainte de a mă angaja?"
    ],
    [
      "Cum explic hotel-living prietenilor și familiei?",
      "Cum stau cu livrarea corespondenței și adresa permanentă?",
      "Cum gestionez implicațiile fiscale și reședința?",
      "Pot menține același stil de viață și rutine?",
      "Cum stau cu schimbările de parcare și transport?"
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
