
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function StillRentingContentES() {
  const questionGroups = [
    [
      "¿Cuánto puedo ahorrar cambiando del alquiler al hotel-living?",
      "¿Cuáles son los costos ocultos del alquiler tradicional?",
      "¿Cómo se comparan las tarifas de hotel con los pagos mensuales de alquiler?",
      "¿Puedo romper mi contrato de arrendamiento para comenzar el hotel-living?"
    ],
    [
      "¿Qué pasa con los costos de servicios públicos e internet?",
      "¿Cómo manejo mi depósito de seguridad y obligaciones de arrendamiento?",
      "¿Qué pasa con mis muebles y pertenencias?",
      "¿Puedo probar el hotel-living por un mes antes de comprometerme?"
    ],
    [
      "¿Cómo explico el hotel-living a amigos y familia?",
      "¿Qué pasa con la entrega de correo y dirección permanente?",
      "¿Cómo manejo las implicaciones fiscales y residencia?",
      "¿Puedo mantener el mismo estilo de vida y rutinas?",
      "¿Qué pasa con los cambios de estacionamiento y transporte?"
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
