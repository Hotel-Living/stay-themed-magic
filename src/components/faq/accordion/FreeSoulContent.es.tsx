
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function FreeSoulContentES() {
  const questionGroups = [
    [
      "¿Cómo apoya el hotel-living un estilo de vida nómada?",
      "¿Qué ubicaciones están disponibles mundialmente?",
      "¿Puedo reservar viajes espontáneos y estadías prolongadas?",
      "¿Cómo manejo mis pertenencias mientras viajo?"
    ],
    [
      "¿Cuáles son las consideraciones legales y de visa?",
      "¿Cómo manejo la banca y finanzas internacionalmente?",
      "¿Puedo mantener mi carrera profesional siendo nómada?",
      "¿Qué pasa con la cobertura de salud en el extranjero?"
    ],
    [
      "¿Cómo construyo comunidad siendo nómada digital?",
      "¿Qué oportunidades de networking están disponibles?",
      "¿Puedo conectar con otros nómadas del hotel-living?",
      "¿Cómo combato el aislamiento y la soledad?"
    ],
    [
      "¿Qué requisitos tecnológicos necesito?",
      "¿Qué tan confiable es la conectividad a internet?",
      "¿Puedo configurar un espacio de trabajo productivo?",
      "¿Qué pasa con el manejo de zonas horarias para el trabajo?"
    ],
    [
      "¿Cómo manejo las variaciones de precios estacionales?",
      "¿Qué recompensas de lealtad puedo ganar?",
      "¿Hay descuentos grupales para comunidades nómadas?",
      "¿Cómo presupuesto para hotel-living a largo plazo?"
    ],
    [
      "¿Qué pasa con las barreras del idioma en diferentes países?",
      "¿Cómo me adapto a diferentes normas culturales?",
      "¿Puedo obtener recomendaciones y guía local?",
      "¿Qué consideraciones de seguridad debo tener en mente?"
    ],
    [
      "¿Cómo mantengo las relaciones personales?",
      "¿Qué pasa con las citas y conexiones románticas?",
      "¿Puedo traer invitados o compañeros de viaje?",
      "¿Cómo manejo las visitas familiares y obligaciones?"
    ],
    [
      "¿Cuáles son los impactos ambientales del hotel-living?",
      "¿Cómo puedo viajar de manera más sostenible?",
      "¿Hay opciones de hoteles eco-amigables?",
      "¿Qué programas de compensación de carbono están disponibles?"
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
