import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function AssociationAccordion() {
  return (
    <div className="bg-[#7802A9] backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.4)] max-w-4xl mx-auto">
      <div className="mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          
          <AccordionItem value="advantages">
            <AccordionTrigger className="text-2xl font-bold text-yellow-300 uppercase hover:text-yellow-200">
              ¿QUÉ VENTAJAS OBTIENEN SUS HOTELES ASOCIADOS POR REGISTRARSE A TRAVÉS DE SU ASOCIACIÓN?
            </AccordionTrigger>
            <AccordionContent className="text-white space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-yellow-300 mb-3">Rentabilidad</h4>
                  <ul className="space-y-2">
                    <li className="text-sm">• Multiplicamos la rentabilidad por huésped hasta 7 veces más que el modelo tradicional hotelero.</li>
                    <li className="text-sm">• Garantizamos un 5% de beneficio neto inmediato por cada reserva confirmada.</li>
                    <li className="text-sm">• Eliminamos la estacionalidad: alta ocupación los 12 meses del año.</li>
                    <li className="text-sm">• Transformamos habitaciones vacías en ingresos constantes y predecibles.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-300 mb-3">Reducción de Costes</h4>
                  <ul className="space-y-2">
                    <li className="text-sm">• Reducimos drásticamente los costes de marketing y adquisición de clientes.</li>
                    <li className="text-sm">• Eliminamos intermediarios costosos y comisiones excesivas de OTAs.</li>
                    <li className="text-sm">• Simplificamos la operativa diaria con un modelo de gestión unificado.</li>
                    <li className="text-sm">• Optimizamos el uso de recursos al consolidar entradas y salidas semanalmente.</li>
                  </ul>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-bold text-yellow-300 mb-3">Personal y Operaciones</h4>
                  <ul className="space-y-2">
                    <li className="text-sm">• Proporcionamos estabilidad laboral absoluta durante todo el año.</li>
                    <li className="text-sm">• Simplificamos la gestión de housekeeping con turnos planificados.</li>
                    <li className="text-sm">• Reducimos el estrés operativo con ocupaciones largas y predecibles.</li>
                    <li className="text-sm">• Creamos un ambiente de trabajo más relajado y profesional.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-300 mb-3">Beneficios Económicos Adicionales</h4>
                  <ul className="space-y-2">
                    <li className="text-sm">• Sin costes de integración, adaptación o formación específica.</li>
                    <li className="text-sm">• Sin contratos forzosos, suscripciones o cuotas mensuales.</li>
                    <li className="text-sm">• Acceso inmediato a una base de clientes globales segmentados.</li>
                    <li className="text-sm">• Ingresos adicionales por servicios complementarios y experiencias locales.</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clients">
            <AccordionTrigger className="text-2xl font-bold text-yellow-300 uppercase hover:text-yellow-200">
              CIENTOS DE MILLONES DE CLIENTES ESTÁN ESPERANDO
            </AccordionTrigger>
            <AccordionContent className="text-white space-y-4">
              <p className="text-lg leading-relaxed">La revolución del turismo residencial ya está aquí. Millones de personas buscan alternativas al modelo tradicional de estancias cortas, y su asociación puede liderar esta transformación en su mercado.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-yellow-300 mb-3">Perfil Demográfico</h4>
                  <ul className="space-y-2">
                    <li className="text-sm">• Nómadas digitales: +50 millones globalmente, creciendo 20% anual.</li>
                    <li className="text-sm">• Profesionales en transición que buscan flexibilidad geográfica.</li>
                    <li className="text-sm">• Jubilados activos con poder adquisitivo y tiempo para viajar.</li>
                    <li className="text-sm">• Estudiantes internacionales y profesionales en programas de intercambio.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-300 mb-3">Cambio Social</h4>
                  <ul className="space-y-2">
                    <li className="text-sm">• Trabajo remoto normalizado post-pandemia en múltiples sectores.</li>
                    <li className="text-sm">• Preferencia creciente por experiencias auténticas vs. turismo masivo.</li>
                    <li className="text-sm">• Búsqueda de comunidades temporales con afinidades compartidas.</li>
                    <li className="text-sm">• Valoración de la sostenibilidad y el impacto positivo local.</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-300/20 rounded-lg border border-yellow-300/40">
                <p className="text-yellow-100 font-semibold text-center">Su asociación puede ser pionera en capturar esta demanda masiva inexplorada, generando beneficios extraordinarios para todos sus miembros.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
}