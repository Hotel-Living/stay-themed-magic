
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function SocietyContentES() {
  const questionGroups = [
    [
      "¿Cómo impacta el hotel-living en las comunidades locales?",
      "¿Cuáles son los beneficios económicos para ciudades y regiones?",
      "¿Cómo afecta esto a los mercados inmobiliarios tradicionales?",
      "¿Qué impactos ambientales tiene el hotel-living?"
    ],
    [
      "¿Cómo se adaptan los hoteles a residentes de largo plazo?",
      "¿Qué cambios se necesitan en las regulaciones de hospitalidad?",
      "¿Cómo crea esto nuevas oportunidades de empleo?",
      "¿Qué mejoras de infraestructura se necesitan?"
    ],
    [
      "¿Cómo cambia el hotel-living el desarrollo urbano?",
      "¿Cuáles son las implicaciones fiscales para municipios?",
      "¿Cómo afecta esto a los sistemas de transporte público?",
      "¿Qué nuevos servicios emergen del hotel-living?"
    ],
    [
      "¿Cómo integran las comunidades a los residentes de hotel-living?",
      "¿Cuáles son las implicaciones sociales de este estilo de vida?",
      "¿Cómo afecta esto a los barrios tradicionales?",
      "¿Qué nuevos modelos de negocio emergen?"
    ],
    [
      "¿Cómo impacta el hotel-living en los sistemas de salud?",
      "¿Qué cambios se necesitan en los sistemas educativos?",
      "¿Cómo afecta esto al voto y participación cívica?",
      "¿Qué marcos legales necesitan actualización?"
    ],
    [
      "¿Cómo cambia esto las industrias minoristas y de servicios?",
      "¿Qué impacto tiene en los sistemas alimentarios locales?",
      "¿Cómo se adaptan los servicios de emergencia?",
      "¿Qué nuevos modelos de seguros se necesitan?"
    ],
    [
      "¿Cómo afecta el hotel-living la preservación cultural?",
      "¿Qué impacto tiene en las tradiciones locales?",
      "¿Cómo se adaptan las comunidades religiosas?",
      "¿Qué cambios ocurren en organizaciones comunitarias?"
    ],
    [
      "¿Cómo afecta esto las relaciones intergeneracionales?",
      "¿Qué impacto tiene en las estructuras familiares?",
      "¿Cómo necesitan evolucionar los sistemas educativos?",
      "¿Qué nuevos sistemas de apoyo social emergen?"
    ],
    [
      "¿Cómo cambia el hotel-living la planificación de jubilación?",
      "¿Qué impacto tiene en la acumulación de riqueza?",
      "¿Cómo cambian los patrones de herencia?",
      "¿Qué nuevos productos financieros se necesitan?"
    ],
    [
      "¿Cómo afecta esto los patrones de migración global?",
      "¿Qué impacto tiene en las relaciones internacionales?",
      "¿Cómo necesitan actualizarse las políticas de visa e inmigración?",
      "¿Qué nuevas consideraciones diplomáticas surgen?"
    ],
    [
      "¿Cómo cambia el hotel-living el equilibrio trabajo-vida?",
      "¿Qué impacto tiene en la productividad?",
      "¿Cómo se adaptan las empresas a equipos distribuidos?",
      "¿Qué nuevos enfoques de gestión se necesitan?"
    ],
    [
      "¿Cómo afecta esto la infraestructura tecnológica?",
      "¿Qué impacto tiene en la privacidad de datos?",
      "¿Cómo cambian las necesidades de ciberseguridad?",
      "¿Qué nuevos servicios digitales emergen?"
    ],
    [
      "¿Cómo cambia el hotel-living los patrones de viaje?",
      "¿Qué impacto tiene en las industrias del turismo?",
      "¿Cómo se adaptan los sistemas de transporte?",
      "¿Qué nuevas soluciones de movilidad se necesitan?"
    ],
    [
      "¿Cómo afecta esto la sustentabilidad ambiental?",
      "¿Qué impacto tiene en el consumo de recursos?",
      "¿Cómo cambian los sistemas de gestión de residuos?",
      "¿Qué nuevas tecnologías verdes se necesitan?"
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
