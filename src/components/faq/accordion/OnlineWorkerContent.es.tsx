
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function OnlineWorkerContentES() {
  const questionGroups = [
    [
      "¿Qué tan confiable es el internet del hotel para trabajo remoto?",
      "¿Puedo configurar un espacio de trabajo productivo en habitaciones de hotel?",
      "¿Qué pasa con la calidad de videollamadas y niveles de ruido?",
      "¿Cómo manejo diferentes zonas horarias mientras vivo en hoteles?"
    ],
    [
      "¿Qué equipo debo traer para trabajo remoto?",
      "¿Cómo mantengo el equilibrio trabajo-vida en espacios pequeños?",
      "¿Puedo imprimir documentos y manejar necesidades de negocio?",
      "¿Qué opciones de internet de respaldo están disponibles?"
    ],
    [
      "¿Cómo manejo reuniones con clientes y llamadas profesionales?",
      "¿Qué pasa con enviar y recibir materiales de trabajo?",
      "¿Puedo reclamar deducciones fiscales por espacio de trabajo en hotel?",
      "¿Cómo mantengo relaciones profesionales remotamente?"
    ],
    [
      "¿Qué consideraciones de ciberseguridad debo tener?",
      "¿Cómo protejo datos de trabajo sensibles en redes de hotel?",
      "¿Puedo usar centros de negocios de hotel efectivamente?",
      "¿Qué pasa con acceder a VPNs de empresa y sistemas seguros?"
    ],
    [
      "¿Cómo manejo configuraciones de múltiples monitores?",
      "¿Qué soluciones ergonómicas funcionan en habitaciones de hotel?",
      "¿Puedo instalar software y aplicaciones necesarias?",
      "¿Cómo manejo licencias de software entre ubicaciones?"
    ],
    [
      "¿Qué pasa con la colaboración con equipos distribuidos?",
      "¿Cómo participo en la cultura de empresa remotamente?",
      "¿Puedo asistir a conferencias y eventos de networking?",
      "¿Cómo manejo evaluaciones de desempeño y crecimiento profesional?"
    ],
    [
      "¿Qué planes de contingencia debo tener para fallas técnicas?",
      "¿Cómo hago respaldo de datos importantes de trabajo regularmente?",
      "¿Qué opciones de hotspot móvil funcionan mejor?",
      "¿Cómo manejo cortes de energía y problemas de conectividad?"
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
