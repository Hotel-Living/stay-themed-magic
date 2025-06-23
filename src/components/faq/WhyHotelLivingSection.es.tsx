
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function WhyHotelLivingSectionES() {
  const accordionOptions = [
    {
      value: "retired",
      label: "¿Jubilado?",
      content: (
        <div className="space-y-4">
          <p>¿Estás cansado de pagar alquiler o hipoteca por una casa que apenas usas? Vivir en hoteles ofrece la solución perfecta para jubilados que quieren maximizar sus años dorados.</p>
          <p><strong>Beneficios para jubilados:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sin responsabilidades de mantenimiento - enfócate en disfrutar la vida</li>
            <li>Oportunidades sociales y actividades incorporadas</li>
            <li>Servicios profesionales de limpieza y comidas</li>
            <li>Ubicaciones privilegiadas cerca de atracciones culturales y atención médica</li>
            <li>Arreglos flexibles - viaja cuando quieras</li>
          </ul>
        </div>
      )
    },
    {
      value: "online-worker",
      label: "¿Trabajador Online?",
      content: (
        <div className="space-y-4">
          <p>Transforma tu rutina de trabajo desde casa en una aventura de trabajo desde cualquier lugar. Vivir en hoteles proporciona la infraestructura perfecta para profesionales digitales.</p>
          <p><strong>Perfecto para trabajadores remotos:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Internet de alta velocidad confiable y espacios de trabajo dedicados</li>
            <li>Ambiente profesional lejos de las distracciones del hogar</li>
            <li>Oportunidades de networking con otros profesionales</li>
            <li>Todos los servicios públicos y servicios incluidos en un precio</li>
            <li>Ventajas fiscales para alojamiento de negocios</li>
          </ul>
        </div>
      )
    },
    {
      value: "commuter",
      label: "¿Lejos del trabajo?",
      content: (
        <div className="space-y-4">
          <p>Evita el estrés del viaje diario y vive donde trabajas. Vivir en hoteles cerca de tu lugar de trabajo puede revolucionar tu equilibrio trabajo-vida.</p>
          <p><strong>Ventajas para viajeros:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Eliminar el tiempo y los costos de viaje diario</li>
            <li>Reducir el estrés y mejorar el rendimiento laboral</li>
            <li>Más tiempo para actividades personales y relaciones</li>
            <li>Servicios profesionales como lavandería y comidas manejados</li>
            <li>Arreglos flexibles para diferentes horarios de trabajo</li>
          </ul>
        </div>
      )
    },
    {
      value: "free-soul",
      label: "¿Alma Libre?",
      content: (
        <div className="space-y-4">
          <p>Libérate de las limitaciones de la vivienda tradicional. Vivir en hoteles ofrece la máxima libertad para aquellos que se niegan a estar atados.</p>
          <p><strong>Beneficios de libertad:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sin compromisos a largo plazo o contratos vinculantes</li>
            <li>Explorar diferentes vecindarios y ciudades fácilmente</li>
            <li>Posesiones mínimas, experiencias máximas</li>
            <li>Conocer personas diversas de todo el mundo</li>
            <li>Vivir espontáneamente sin responsabilidades de propiedad</li>
          </ul>
        </div>
      )
    },
    {
      value: "hotel",
      label: "¿Hotel?",
      content: (
        <div className="space-y-4">
          <p>¿Buscas revolucionar tu modelo de negocio hotelero? Asóciate con nosotros para transformar habitaciones vacías en flujos de ingresos consistentes.</p>
          <p><strong>Beneficios para hoteles:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ocupación garantizada e ingresos estables</li>
            <li>Costos reducidos de marketing y reservas</li>
            <li>Evaluación y gestión profesional de huéspedes</li>
            <li>Mantener operaciones hoteleras mientras maximizas ingresos</li>
            <li>Únete a una red creciente de propiedades innovadoras</li>
          </ul>
        </div>
      )
    },
    {
      value: "society",
      label: "¿Sociedad?",
      content: (
        <div className="space-y-4">
          <p>Vivir en hoteles representa una solución sostenible a los desafíos de vivienda, promoviendo el uso eficiente de recursos y la construcción de comunidad.</p>
          <p><strong>Beneficios sociales:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reducción de la expansión urbana y el impacto ambiental</li>
            <li>Uso eficiente de la infraestructura existente</li>
            <li>Conexiones comunitarias mejoradas e interacción social</li>
            <li>Beneficios económicos para negocios locales y turismo</li>
            <li>Solución innovadora a la crisis de asequibilidad de vivienda</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#5A1876] via-[#6B1E88] to-[#7C2A9A] py-12 mb-8 rounded-2xl">
      <div className="container max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#FEF7CD]">
          ¿Por qué Vivir en Hoteles?
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {accordionOptions.map((option) => (
            <AccordionItem 
              key={option.value} 
              value={option.value}
              className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 group"
            >
              <AccordionTrigger 
                className="px-6 py-4 text-[#FEF7CD] hover:text-white group-hover:bg-white/5 rounded-lg transition-all duration-200"
                titleClassName="text-lg font-semibold"
              >
                {option.label}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-[#E5D5F0]">
                {option.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
