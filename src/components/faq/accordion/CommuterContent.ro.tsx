
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function CommuterContentRO() {
  const questionGroups = [
    [
      "Cum poate beneficia hotel-living naveta mea zilnică?",
      "Care sunt economiile de costuri comparativ cu locuința tradițională?",
      "Pot să stau în hoteluri aproape de locul meu de muncă?",
      "Cât de flexibile sunt aranjamentele de rezervare?"
    ],
    [
      "Ce facilități sunt incluse de obicei?",
      "Cum funcționează hotel-living pentru călătorii de afaceri?",
      "Pot obține tarife corporative pentru șederi prelungite?",
      "Cum stau cu parcarea și transportul?"
    ],
    [
      "Cum gestionez corespondența și pachetele?",
      "Cum stau cu serviciile de spălătorie și curățenie?",
      "Pot lucra din camera mea de hotel?",
      "Cât de stabil este wifi-ul pentru munca la distanță?"
    ],
    [
      "Ce se întâmplă în timpul sezoanelor de vârf de călătorie?",
      "Pot rezerva multiple locații pentru proiecte diferite?",
      "Cum funcționează facturarea pentru șederi prelungite?",
      "Ce programe de loialitate sunt disponibile?"
    ],
    [
      "Cum mențin echilibrul muncă-viață?",
      "Cum stau cu facilitățile de sală și fitness?",
      "Pot organiza întâlniri de afaceri la hotel?",
      "Cum mă conectez cu alți profesioniști din hotel-living?"
    ],
    [
      "Care sunt implicațiile fiscale?",
      "Cum stabilesc reședința în scopuri legale?",
      "Pot folosi hotel-living pentru misiuni temporare?",
      "Ce documentație am nevoie pentru rapoartele de cheltuieli?"
    ],
    [
      "Cum gestionez urgențele în timp ce trăiesc în hoteluri?",
      "Cum stau cu îngrijirea sănătății și asigurarea?",
      "Pot aduce oaspeți în camera mea de hotel?",
      "Cum mențin relațiile profesionale?"
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
