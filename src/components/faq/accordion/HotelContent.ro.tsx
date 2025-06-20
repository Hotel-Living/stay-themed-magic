
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function HotelContentRO() {
  const questionGroups = [
    [
      "Cum poate hotelul meu să se alăture rețelei Hotel-Living?",
      "Care sunt cerințele pentru hotelurile participante?",
      "Cum funcționează modelul de împărțire a veniturilor?",
      "Ce instruire necesită personalul pentru oaspeții pe termen lung?"
    ],
    [
      "Cum gestionăm prețurile pentru șederi prelungite?",
      "Ce facilități ar trebui să oferim pentru oaspeții hotel-living?",
      "Cum gestionăm inventarul pentru rezervări pe termen lung?",
      "Ce protocoale de curățenie sunt necesare?"
    ],
    [
      "Cum evaluăm potențialii oaspeți pe termen lung?",
      "Ce contracte de închiriere sunt necesare?",
      "Cum gestionăm plângerile și problemele oaspeților?",
      "Ce proceduri de urgență ar trebui să fie în vigoare?"
    ],
    [
      "Cum facem marketing către demografia hotel-living?",
      "Ce parteneriate pot ajuta să atragem oaspeți?",
      "Cum ne optimizăm prezența online?",
      "Ce strategii promoționale funcționează cel mai bine?"
    ],
    [
      "Cum gestionăm procesarea plăților pentru șederi prelungite?",
      "Ce considerații de asigurare există?",
      "Cum gestionăm fluxul de numerar cu rezervări mai lungi?",
      "Ce implicații fiscale ar trebui să cunoaștem?"
    ],
    [
      "Cum menținem calitatea serviciului pentru oaspeții pe termen lung?",
      "Ce ajustări de programare a personalului sunt necesare?",
      "Cum gestionăm întreținerea și reparațiile?",
      "Ce facilitați pentru oaspeți necesită reaprovizionare regulată?"
    ],
    [
      "Cum creăm comunitate între oaspeții hotel-living?",
      "Ce spații sociale și activități ar trebui să oferim?",
      "Cum gestionăm conflictele între oaspeți?",
      "Ce considerații de confidențialitate sunt importante?"
    ],
    [
      "Cum urmărim și analizăm metricile de performanță?",
      "Ce instrumente de raportare sunt disponibile?",
      "Cum măsurăm satisfacția oaspeților?",
      "Ce indicatori cheie de performanță contează cel mai mult?"
    ],
    [
      "Cum gestionăm fluctuațiile sezoniere ale cererii?",
      "Ce strategii ajută să menținem ocuparea pe tot parcursul anului?",
      "Cum stabilim prețuri competitive în piețe diferite?",
      "Ce factori de locație afectează succesul?"
    ],
    [
      "Ce integrări tehnologice sunt necesare?",
      "Cum gestionăm sistemele de rezervare eficient?",
      "Ce aplicații mobile sau platforme ar trebui să folosim?",
      "Cum asigurăm securitatea și confidențialitatea datelor?"
    ],
    [
      "Cum gestionăm oaspeții internaționali și reglementările?",
      "Ce cerințe de viză și legale se aplică?",
      "Cum gestionăm problemele de schimb valutar?",
      "Ce considerații culturale sunt importante?"
    ],
    [
      "Cum scalăm operațiunile noastre hotel-living?",
      "Ce oportunități de expansiune există?",
      "Cum replicăm succesul prin proprietăți?",
      "Ce cerințe de investiție ar trebui să planificăm?"
    ],
    [
      "Cum asigurăm retenția și loialitatea oaspeților?",
      "Ce programe de recompense funcționează pentru șederi prelungite?",
      "Cum gestionăm recomandările și recenziile oaspeților?",
      "Ce strategii de comunicare construiesc relații?"
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
