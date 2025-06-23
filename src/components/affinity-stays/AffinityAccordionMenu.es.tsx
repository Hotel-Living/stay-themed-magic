
import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function AffinityAccordionMenuES() {
  const faqItems = [
    {
      question: "¿Qué son las Afinidades de Hotel-Living?",
      answer: "Las Afinidades de Hotel-Living son temas de interés compartido que conectan a huéspedes con pasiones similares. Desde gastronomía y arte hasta tecnología y bienestar, cada afinidad crea una comunidad natural de personas que comparten los mismos intereses, haciendo que tu estadía sea más significativa y conectada."
    },
    {
      question: "¿Cansado de viajar solo? ¿Quieres conocer gente que realmente te entienda?",
      answer: "Nuestras estancias por afinidades te conectan con viajeros que comparten tus pasiones. Ya sea que ames la cocina gourmet, el arte contemporáneo, la tecnología de vanguardia o el yoga matutino, encontrarás tu tribu en nuestros hoteles temáticos."
    },
    {
      question: "¿Qué es exactamente un Hotel de Afinidad?",
      answer: "Un Hotel de Afinidad es una propiedad que se especializa en uno o más temas específicos, ofreciendo actividades, servicios y experiencias diseñadas alrededor de esos intereses. Los huéspedes se alojan no solo por la ubicación, sino por la oportunidad de conectar con otros que comparten sus pasiones."
    },
    {
      question: "¿Haré amigos?",
      answer: "¡Absolutamente! Nuestros hoteles por afinidades están diseñados para fomentar conexiones naturales. Las actividades compartidas, espacios comunes temáticos y experiencias grupales crean el ambiente perfecto para formar amistades duraderas con personas que realmente 'te entienden'."
    },
    {
      question: "¿El hotel organiza actividades?",
      answer: "Sí, cada hotel de afinidad organiza actividades regulares relacionadas con sus temas. Esto puede incluir talleres de cocina, clases de arte, sesiones de networking tecnológico, retiros de bienestar, o tours locales específicos del tema. El calendario de actividades está disponible al reservar."
    },
    {
      question: "¿Siempre hay un coordinador o anfitrión?",
      answer: "Cada hotel de afinidad cuenta con un coordinador de comunidad dedicado que facilita las actividades, presenta a los huéspedes y asegura que todos se sientan bienvenidos e incluidos en la experiencia temática."
    },
    {
      question: "¿El hotel está decorado alrededor del tema?",
      answer: "Sí, nuestros hoteles de afinidad incorporan elementos temáticos en su diseño e instalaciones. Desde estudios de arte y cocinas de demostración hasta espacios de bienestar y salas de networking tecnológico, cada propiedad refleja físicamente sus afinidades."
    },
    {
      question: "¿Cuánto tiempo duran las estadías?",
      answer: "Las estadías pueden variar desde unos pocos días hasta varios meses, dependiendo de tus preferencias y los programas específicos del hotel. Muchos huéspedes optan por estadías de 1-4 semanas para sumergirse completamente en la experiencia de afinidad."
    },
    {
      question: "¿Puedo probar diferentes afinidades en diferentes hoteles?",
      answer: "¡Por supuesto! Muchos de nuestros huéspedes crean 'tours de afinidades', explorando diferentes pasiones en diferentes ubicaciones. Puedes pasar un mes en un hotel gastronómico, luego moverte a un retiro de bienestar, seguido de una experiencia de arte creativo."
    },
    {
      question: "¿Qué pasa si solo quiero relajarme?",
      answer: "¡Perfecto! La participación en actividades es siempre opcional. Puedes disfrutar de las instalaciones temáticas y el ambiente de la comunidad a tu propio ritmo, participando tanto o tan poco como desees en las actividades programadas."
    },
    {
      question: "¿Esto es solo para viajeros solitarios?",
      answer: "No, damos la bienvenida a viajeros solos, parejas y grupos pequeños. Las afinidades compartidas crean conexiones naturales independientemente del tamaño de tu grupo de viaje, y muchas parejas encuentran que conocer a otros enriquece su experiencia de viaje."
    },
    {
      question: "¿Qué pasa si aún no encuentro un tema que se ajuste a mis intereses?",
      answer: "Continuamente expandimos nuestras ofertas de afinidades basadas en la demanda de los huéspedes. Puedes sugerir nuevos temas a través de nuestro portal, y muchas de nuestras afinidades actuales fueron sugeridas originalmente por nuestra comunidad."
    },
    {
      question: "¿Las Afinidades, sean las que sean, están disponibles en todos los hoteles socios?",
      answer: "Cada hotel socio se especializa en afinidades específicas basadas en su ubicación, instalaciones y experiencia. Usas nuestros filtros de búsqueda para encontrar hoteles que ofrecen las afinidades que más te interesan."
    },
    {
      question: "¿Puedo conectar incluso si no hay un tema específico?",
      answer: "¡Sí! Incluso hoteles sin temas específicos de afinidad pueden facilitar conexiones a través de espacios comunes, eventos sociales y la filosofía general de Hotel-Living de fomentar la comunidad entre los huéspedes."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Accordion type="multiple" className="w-full space-y-4">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border border-fuchsia-400/30 rounded-lg overflow-hidden bg-[#5C0869]/80 backdrop-blur-sm">
            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#5C0869] to-[#4A0557] hover:from-[#6A037C] hover:to-[#550664] transition-all duration-300">
              <span className="text-[#FFF9B0] font-semibold text-lg">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 bg-[#4A0557]/90 backdrop-blur-md">
              <p className="text-white leading-relaxed">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
