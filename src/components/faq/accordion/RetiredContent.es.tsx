
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function RetiredContentES() {
  const questionGroups = [
    [
      "¿Cómo puede beneficiar el hotel-living a los jubilados con ingresos fijos?",
      "¿Cuáles son las ventajas sociales del hotel-living para jubilados?",
      "¿Cómo mantengo la cobertura de salud mientras vivo en hoteles?",
      "¿Puedo obtener descuentos para personas mayores en estadías prolongadas?"
    ],
    [
      "¿Qué pasa con las consideraciones de Medicare y seguros?",
      "¿Cómo manejo los medicamentos recetados mientras viajo?",
      "¿Puedo mantener relaciones con mis doctores actuales?",
      "¿Qué servicios médicos de emergencia están disponibles?"
    ],
    [
      "¿Cómo me mantengo conectado con la familia y nietos?",
      "¿Qué actividades sociales están disponibles para personas mayores?",
      "¿Puedo encontrar comunidades apropiadas para mi edad en hoteles?",
      "¿Cómo combato la soledad y el aislamiento?"
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
