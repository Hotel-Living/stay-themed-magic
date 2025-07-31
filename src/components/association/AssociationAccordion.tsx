import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function AssociationAccordion() {
  return (
    <div className="bg-[#7802A9] backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.4)] max-w-4xl mx-auto">
      <div className="mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          
          <AccordionItem value="advantages">
            <AccordionTrigger className="text-left text-2xl font-bold text-yellow-300 uppercase hover:text-yellow-200">
              ¿QUÉ VENTAJAS OBTIENEN SUS HOTELES ASOCIADOS POR REGISTRARSE A TRAVÉS DE SU ASOCIACIÓN?
            </AccordionTrigger>
            <AccordionContent className="text-white text-lg leading-relaxed pt-4 text-left whitespace-pre-line">
              ✅ Posicionamiento preferente en los resultados
✅ Publicación garantizada en 48 horas
✅ Ficha destacada visualmente
✅ Participación automática en campañas locales
✅ Etiqueta oficial de "hotel aliado"
✅ Derecho a feedback directo con el equipo de Hotel Living
✅ Inclusión en sorteos promocionales
✅ Onboarding asistido personalizado
✅ Revisión gratuita de su ficha
✅ Traducción prioritaria de su ficha a otros idiomas
✅ Beneficio acumulativo si refiere a otros hoteles (no pertenecientes a ninguna asociación)
✅ Acceso anticipado a nuevos módulos del sistema Hotel Living
✅ Para probar funciones antes de su lanzamiento oficial
✅ Atención prioritaria en soporte técnico y resolución de incidencias
✅ Acceso gratuito a formaciones exclusivas sobre optimización de estancias largas y revenue management para su equipo
✅ Una mención o publicación personalizada mensual (rotativa)
✅ Etiqueta de "Top Hotel Asociación" en su ficha durante los 3 primeros meses
✅ Mayor frecuencia de aparición en segmentos de afinidades personalizadas
✅ Convocatoria preferente a encuentros o mesas redondas con otros hoteles aliados
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clients">
            <AccordionTrigger className="text-left text-2xl font-bold text-yellow-300 uppercase hover:text-yellow-200">
              CIENTOS DE MILLONES DE CLIENTES ESTÁN ESPERANDO
            </AccordionTrigger>
            <AccordionContent className="text-white text-lg leading-relaxed pt-4 text-left whitespace-pre-line">
              Jubilados activos que quieren vivir de verdad

Trabajadores online y nómadas digitales

Profesionales en ciudades dormitorio

Inquilinos hartos de dificultades

Viajeros frecuentes buscando alma

Usuarios de apartamentos improvisados

Almas libres que quieren todo resuelto

Ciudadanos que desean romper la soledad y conocer afines

Todos ellos tienen algo en común: buscan un nuevo modo de habitar.

Ya no se trata de alquilar. Ya no se trata de viajar.

Se trata de vivir distinto.

Y para todo eso, el hotel es la solución natural.

Hotel Living llega para cambiarlo.

Modelo de larga duración

Desplegado en fases con módulos revolucionarios

Rentabiliza, posiciona y moderniza

Actualmente solo está desplegado en un 20% de su totalidad
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
}