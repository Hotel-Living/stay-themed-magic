import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function AssociationAccordion() {
  return (
    <div className="bg-[#7802A9] backdrop-blur-md rounded-2xl p-8 md:p-12 border border-blue-400/30 shadow-[0_0_60px_rgba(59,130,246,0.4)] max-w-4xl mx-auto">
      <div className="mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          
          <AccordionItem value="advantages">
            <AccordionTrigger className="text-left text-2xl font-bold text-yellow-300 uppercase hover:text-yellow-200">
              ¿QUÉ VENTAJAS OBTIENEN SUS HOTELES ASOCIADOS POR REGISTRARSE A TRAVÉS DE SU ASOCIACIÓN?
            </AccordionTrigger>
            <AccordionContent className="text-white text-lg leading-relaxed pt-4 text-left">
              <div className="space-y-2">
                <div>✅ Posicionamiento preferente en los resultados</div>
                <div>✅ Publicación garantizada en 48 horas</div>
                <div>✅ Ficha destacada visualmente</div>
                <div>✅ Participación automática en campañas locales</div>
                <div>✅ Etiqueta oficial de "hotel aliado"</div>
                <div>✅ Derecho a feedback directo con el equipo de Hotel Living</div>
                <div>✅ Inclusión en sorteos promocionales</div>
                <div>✅ Onboarding asistido personalizado</div>
                <div>✅ Revisión gratuita de su ficha</div>
                <div>✅ Traducción prioritaria de su ficha a otros idiomas</div>
                <div>✅ Beneficio acumulativo si refiere a otros hoteles (no pertenecientes a ninguna asociación)</div>
                <div>✅ Acceso anticipado a nuevos módulos del sistema Hotel Living</div>
                <div>✅ Para probar funciones antes de su lanzamiento oficial</div>
                <div>✅ Atención prioritaria en soporte técnico y resolución de incidencias</div>
                <div>✅ Acceso gratuito a formaciones exclusivas sobre optimización de estancias largas y revenue management para su equipo</div>
                <div>✅ Una mención o publicación personalizada mensual (rotativa)</div>
                <div>✅ Etiqueta de "Top Hotel Asociación" en su ficha durante los 3 primeros meses</div>
                <div>✅ Mayor frecuencia de aparición en segmentos de afinidades personalizadas</div>
                <div>✅ Convocatoria preferente a encuentros o mesas redondas con otros hoteles aliados</div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clients">
            <AccordionTrigger className="text-left text-2xl font-bold text-yellow-300 uppercase hover:text-yellow-200">
              CIENTOS DE MILLONES DE CLIENTES ESTÁN ESPERANDO
            </AccordionTrigger>
            <AccordionContent className="text-white text-lg leading-relaxed pt-4 text-left">
              <div className="space-y-2">
                <div>✅ Jubilados activos que quieren vivir de verdad</div>
                <div>✅ Trabajadores online y nómadas digitales</div>
                <div>✅ Profesionales en ciudades dormitorio</div>
                <div>✅ Inquilinos hartos de dificultades</div>
                <div>✅ Viajeros frecuentes buscando alma</div>
                <div>✅ Usuarios de apartamentos improvisados</div>
                <div>✅ Almas libres que quieren todo resuelto</div>
                <div>✅ Ciudadanos que desean romper la soledad y conocer afines</div>
                <div className="mt-4">Todos ellos tienen algo en común: buscan un nuevo modo de habitar.</div>
                <div>Ya no se trata de alquilar. Ya no se trata de viajar.</div>
                <div>Se trata de vivir distinto.</div>
                <div>Y para todo eso, el hotel es la solución natural.</div>
                <div>Hotel Living llega para cambiarlo.</div>
                <div>Modelo de larga duración</div>
                <div>Desplegado en fases con módulos revolucionarios</div>
                <div>Rentabiliza, posiciona y moderniza</div>
                <div>Actualmente solo está desplegado en un 20% de su totalidad</div>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
}