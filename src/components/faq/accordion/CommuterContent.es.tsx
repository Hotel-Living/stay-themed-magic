
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function CommuterContentES() {
  const questionGroups = [
    [
      "¿Cómo puede beneficiar el hotel-living a mi desplazamiento diario?",
      "¿Cuáles son los ahorros de costos comparado con la vivienda tradicional?",
      "¿Puedo quedarme en hoteles cerca de mi lugar de trabajo?",
      "¿Qué tan flexibles son los arreglos de reserva?"
    ],
    [
      "¿Qué comodidades están típicamente incluidas?",
      "¿Cómo funciona el hotel-living para viajeros de negocios?",
      "¿Puedo obtener tarifas corporativas para estadías prolongadas?",
      "¿Qué pasa con el estacionamiento y transporte?"
    ],
    [
      "¿Cómo manejo el correo y los paquetes?",
      "¿Qué pasa con los servicios de lavandería y limpieza?",
      "¿Puedo trabajar desde mi habitación de hotel?",
      "¿Qué tan estable es el wifi para trabajo remoto?"
    ],
    [
      "¿Qué pasa durante las temporadas altas de viaje?",
      "¿Puedo reservar múltiples ubicaciones para diferentes proyectos?",
      "¿Cómo funciona la facturación para estadías prolongadas?",
      "¿Qué programas de lealtad están disponibles?"
    ],
    [
      "¿Cómo mantengo el equilibrio trabajo-vida?",
      "¿Qué pasa con las instalaciones de gimnasio y fitness?",
      "¿Puedo organizar reuniones de negocios en el hotel?",
      "¿Cómo me relaciono con otros profesionales del hotel-living?"
    ],
    [
      "¿Cuáles son las implicaciones fiscales?",
      "¿Cómo establezco residencia para propósitos legales?",
      "¿Puedo usar hotel-living para asignaciones temporales?",
      "¿Qué documentación necesito para reportes de gastos?"
    ],
    [
      "¿Cómo manejo las emergencias mientras vivo en hoteles?",
      "¿Qué pasa con el cuidado de la salud y seguros?",
      "¿Puedo traer invitados a mi habitación de hotel?",
      "¿Cómo mantengo las relaciones profesionales?"
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
