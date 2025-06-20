
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function HotelContentES() {
  const questionGroups = [
    [
      "¿Cómo puede mi hotel unirse a la red Hotel-Living?",
      "¿Cuáles son los requisitos para hoteles participantes?",
      "¿Cómo funciona el modelo de reparto de ingresos?",
      "¿Qué entrenamiento necesita el personal para huéspedes de larga estancia?"
    ],
    [
      "¿Cómo manejamos los precios de estadía prolongada?",
      "¿Qué comodidades debemos proporcionar para huéspedes de hotel-living?",
      "¿Cómo gestionamos el inventario para reservas de largo plazo?",
      "¿Qué protocolos de limpieza se necesitan?"
    ],
    [
      "¿Cómo evaluamos a potenciales huéspedes de largo plazo?",
      "¿Qué contratos de arrendamiento se requieren?",
      "¿Cómo manejamos quejas y problemas de huéspedes?",
      "¿Qué procedimientos de emergencia deben estar establecidos?"
    ],
    [
      "¿Cómo comercializamos al demográfico de hotel-living?",
      "¿Qué asociaciones pueden ayudar a atraer huéspedes?",
      "¿Cómo optimizamos nuestra presencia en línea?",
      "¿Qué estrategias promocionales funcionan mejor?"
    ],
    [
      "¿Cómo manejamos el procesamiento de pagos para estadías prolongadas?",
      "¿Qué consideraciones de seguro hay?",
      "¿Cómo gestionamos el flujo de efectivo con reservas más largas?",
      "¿Qué implicaciones fiscales debemos conocer?"
    ],
    [
      "¿Cómo mantenemos la calidad del servicio para huéspedes de largo plazo?",
      "¿Qué ajustes de horarios de personal se necesitan?",
      "¿Cómo manejamos el mantenimiento y reparaciones?",
      "¿Qué comodidades de huéspedes requieren reabastecimiento regular?"
    ],
    [
      "¿Cómo creamos comunidad entre huéspedes de hotel-living?",
      "¿Qué espacios sociales y actividades debemos proporcionar?",
      "¿Cómo manejamos los conflictos entre huéspedes?",
      "¿Qué consideraciones de privacidad son importantes?"
    ],
    [
      "¿Cómo rastreamos y analizamos métricas de rendimiento?",
      "¿Qué herramientas de reporte están disponibles?",
      "¿Cómo medimos la satisfacción del huésped?",
      "¿Qué indicadores clave de rendimiento importan más?"
    ],
    [
      "¿Cómo manejamos las fluctuaciones estacionales de demanda?",
      "¿Qué estrategias ayudan a mantener ocupación durante todo el año?",
      "¿Cómo ponemos precios competitivos en diferentes mercados?",
      "¿Qué factores de ubicación afectan el éxito?"
    ],
    [
      "¿Qué integraciones tecnológicas se necesitan?",
      "¿Cómo gestionamos los sistemas de reserva eficientemente?",
      "¿Qué aplicaciones móviles o plataformas debemos usar?",
      "¿Cómo aseguramos la seguridad y privacidad de datos?"
    ],
    [
      "¿Cómo manejamos huéspedes internacionales y regulaciones?",
      "¿Qué requisitos de visa y legales aplican?",
      "¿Cómo gestionamos problemas de cambio de moneda?",
      "¿Qué consideraciones culturales son importantes?"
    ],
    [
      "¿Cómo escalamos nuestras operaciones de hotel-living?",
      "¿Qué oportunidades de expansión existen?",
      "¿Cómo replicamos el éxito a través de propiedades?",
      "¿Qué requisitos de inversión debemos planificar?"
    ],
    [
      "¿Cómo aseguramos la retención y lealtad del huésped?",
      "¿Qué programas de recompensas funcionan para estadías prolongadas?",
      "¿Cómo manejamos las referencias y reseñas de huéspedes?",
      "¿Qué estrategias de comunicación construyen relaciones?"
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
