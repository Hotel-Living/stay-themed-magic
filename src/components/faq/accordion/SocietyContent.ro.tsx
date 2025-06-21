
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function SocietyContentRO() {
  const questionGroups = [
    [
      "Cum impactează hotel-living comunitățile locale?",
      "Care sunt beneficiile economice pentru orașe și regiuni?",
      "Cum afectează aceasta piețele imobiliare tradiționale?",
      "Ce impacturi asupra mediului are hotel-living?"
    ],
    [
      "Cum se adaptează hotelurile la rezidenții pe termen lung?",
      "Ce schimbări sunt necesare în reglementările de ospitalitate?",
      "Cum creează aceasta noi oportunități de muncă?",
      "Ce îmbunătățiri de infrastructură sunt necesare?"
    ],
    [
      "Cum schimbă hotel-living dezvoltarea urbană?",
      "Care sunt implicațiile fiscale pentru municipalități?",
      "Cum afectează aceasta sistemele de transport public?",
      "Ce noi servicii emergen din hotel-living?"
    ],
    [
      "Cum integrează comunitățile rezidenții de hotel-living?",
      "Care sunt implicațiile sociale ale acestui stil de viață?",
      "Cum afectează aceasta cartierele tradiționale?",
      "Ce noi modele de afaceri emerge?"
    ],
    [
      "Cum impactează hotel-living sistemele de sănătate?",
      "Ce schimbări sunt necesare în sistemele educaționale?",
      "Cum afectează aceasta votul și participarea civică?",
      "Ce cadre legale au nevoie de actualizare?"
    ],
    [
      "Cum schimbă aceasta industriile de retail și servicii?",
      "Ce impact are asupra sistemelor alimentare locale?",
      "Cum se adaptează serviciile de urgență?",
      "Ce noi modele de asigurare sunt necesare?"
    ],
    [
      "Cum afectează hotel-living preservarea culturală?",
      "Ce impact are asupra tradițiilor locale?",
      "Cum se adaptează comunitățile religioase?",
      "Ce schimbări apar în organizațiile comunitare?"
    ],
    [
      "Cum afectează aceasta relațiile intergeneraționale?",
      "Ce impact are asupra structurilor familiale?",
      "Cum trebuie să evolueze sistemele educaționale?",
      "Ce noi sisteme de sprijin social emerge?"
    ],
    [
      "Cum schimbă hotel-living planificarea pensionării?",
      "Ce impact are asupra acumulării de bogății?",
      "Cum se schimbă modelele de moștenire?",
      "Ce noi produse financiare sunt necesare?"
    ],
    [
      "Cum afectează aceasta modelele de migrație globală?",
      "Ce impact are asupra relațiilor internaționale?",
      "Cum trebuie actualizate politicile de viză și imigrație?",
      "Ce noi considerații diplomatice apar?"
    ],
    [
      "Cum schimbă hotel-living echilibrul muncă-viață?",
      "Ce impact are asupra productivității?",
      "Cum se adaptează companiile la echipele distribuite?",
      "Ce noi abordări de management sunt necesare?"
    ],
    [
      "Cum afectează aceasta infrastructura tehnologică?",
      "Ce impact are asupra confidențialității datelor?",
      "Cum se schimbă nevoile de cybersecurity?",
      "Ce noi servicii digitale emerge?"
    ],
    [
      "Cum schimbă hotel-living modelele de călătorie?",
      "Ce impact are asupra industriilor de turism?",
      "Cum se adaptează sistemele de transport?",
      "Ce noi soluții de mobilitate sunt necesare?"
    ],
    [
      "Cum afectează aceasta sustenabilitatea mediului?",
      "Ce impact are asupra consumului de resurse?",
      "Cum se schimbă sistemele de gestionare a deșeurilor?",
      "Ce noi tehnologii verzi sunt necesare?"
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
