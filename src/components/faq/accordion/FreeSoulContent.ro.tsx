
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function FreeSoulContentRO() {
  const questionGroups = [
    [
      "Cum susține hotel-living un stil de viață nomad?",
      "Ce locații sunt disponibile la nivel mondial?",
      "Pot rezerva călătorii spontane și șederi prelungite?",
      "Cum îmi gestionez bunurile în timp ce călătoresc?"
    ],
    [
      "Care sunt considerațiile legale și de viză?",
      "Cum gestionez banca și finanțele internațional?",
      "Pot să-mi mențin cariera profesională fiind nomad?",
      "Cum stau cu acoperirea sănătății în străinătate?"
    ],
    [
      "Cum construiesc comunitate fiind nomad digital?",
      "Ce oportunități de networking sunt disponibile?",
      "Pot să mă conectez cu alți nomazi din hotel-living?",
      "Cum combat izolarea și singurătatea?"
    ],
    [
      "Ce cerințe tehnologice am nevoie?",
      "Cât de fiabilă este conectivitatea la internet?",
      "Pot să-mi configurez un spațiu de lucru productiv?",
      "Cum stau cu gestionarea fusului orar pentru muncă?"
    ],
    [
      "Cum gestionez variațiile sezoniere de preț?",
      "Ce recompense de loialitate pot câștiga?",
      "Sunt reduceri de grup pentru comunitățile nomade?",
      "Cum fac buget pentru hotel-living pe termen lung?"
    ],
    [
      "Cum stau cu barierele de limbă în diferite țări?",
      "Cum mă adaptez la diferite norme culturale?",
      "Pot obține recomandări și îndrumări locale?",
      "Ce considerații de siguranță ar trebui să țin minte?"
    ],
    [
      "Cum mențin relațiile personale?",
      "Cum stau cu întâlnirile și conexiunile romantice?",
      "Pot aduce oaspeți sau însoțitori de călătorie?",
      "Cum gestionez vizitele familiei și obligațiile?"
    ],
    [
      "Care sunt impacturile asupra mediului ale hotel-living?",
      "Cum pot călători mai sustenabil?",
      "Sunt opțiuni de hoteluri eco-prietenoase?",
      "Ce programe de compensare a carbonului sunt disponibile?"
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
