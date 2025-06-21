
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { AccordionMenuItem } from "./accordion/AccordionMenuItem";
import { MenuItemText } from "./accordion/MenuItemText";

export function HotelAccordionMenuES() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      <AccordionMenuItem
        value="item-1"
        title="1 – ¿Por qué los hoteles necesitan Hotel-Living?"
        titleClassName="text-xl md:text-2xl font-bold text-white hover:text-[#FEF7CD] transition-colors duration-300"
      >
        <MenuItemText items={[
          "Los hoteles independientes enfrentan una competencia feroz de las grandes cadenas y plataformas de reservas.",
          "Necesitan diferenciarse, atraer huéspedes de calidad y maximizar sus ingresos.",
          "Hotel-Living ofrece una solución innovadora que transforma hoteles tradicionales en destinos temáticos únicos.",
          "Conectamos hoteles con viajeros que buscan experiencias específicas y auténticas."
        ]} />
      </AccordionMenuItem>

      <AccordionMenuItem
        value="item-2"
        title="2 – Beneficios únicos para hoteles socios"
        titleClassName="text-xl md:text-2xl font-bold text-white hover:text-[#FEF7CD] transition-colors duration-300"
      >
        <MenuItemText items={[
          "• Acceso a un mercado de nicho de viajeros con intereses específicos",
          "• Aumento significativo en la duración promedio de las estancias",
          "• Reducción de la estacionalidad através de segmentación temática",
          "• Mayor lealtad del cliente y reservas repetidas",
          "• Diferenciación clara de la competencia tradicional",
          "• Incremento en ingresos auxiliares através de experiencias temáticas"
        ]} />
      </AccordionMenuItem>

      <AccordionMenuItem
        value="item-3"
        title="3 – Cómo funciona nuestro modelo de negocio"
        titleClassName="text-xl md:text-2xl font-bold text-white hover:text-[#FEF7CD] transition-colors duration-300"
      >
        <MenuItemText items={[
          "Comisión competitiva: Solo cobramos cuando generas reservas exitosas",
          "Sin costos ocultos: No hay tarifas de membresía o gastos iniciales",
          "Marketing incluido: Promocionamos tu hotel en nuestros canales especializados",
          "Soporte completo: Te acompañamos en todo el proceso de integración y más allá"
        ]} />
      </AccordionMenuItem>

      <AccordionMenuItem
        value="item-4"
        title="4 – ¿Cuánto beneficio estás perdiendo?"
        titleClassName="text-xl md:text-2xl font-bold text-white hover:text-[#FEF7CD] transition-colors duration-300"
      >
        <MenuItemText items={[
          "Los hoteles socios de Hotel-Living experimentan:",
          "• 40% más de duración promedio en las estancias",
          "• 65% más de reservas repetidas",
          "• 30% menos de dependencia de temporadas altas",
          "• 50% más de ingresos por servicios adicionales",
          "",
          "¿Cuánto dinero estás dejando sobre la mesa cada mes al no formar parte de nuestra red?"
        ]} />
      </AccordionMenuItem>

      <AccordionMenuItem
        value="item-5"
        title="5 – ¿Qué son los hoteles por afinidades?"
        titleClassName="text-xl md:text-2xl font-bold text-white hover:text-[#FEF7CD] transition-colors duration-300"
      >
        <MenuItemText items={[
          "Son establecimientos que se especializan en atender a viajeros con intereses específicos:",
          "• Hoteles para nómadas digitales con espacios de coworking",
          "• Retiros para jubilados activos con programas de bienestar",
          "• Espacios para artistas con talleres y estudios",
          "• Destinos para amantes de la naturaleza con actividades eco-turísticas",
          "• Y muchas más afinidades que conectan personas con intereses similares"
        ]} />
      </AccordionMenuItem>

      <AccordionMenuItem
        value="item-6"
        title="6 – Inigualable segmentación hotelera"
        titleClassName="text-xl md:text-2xl font-bold text-white hover:text-[#FEF7CD] transition-colors duration-300"
      >
        <MenuItemText items={[
          "• Identificamos y conectamos nichos de mercado específicos con hoteles ideales.",
          "• Creamos experiencias personalizadas que ninguna plataforma generalista puede igualar.",
          "• Desarrollamos comunidades temáticas que generan lealtad y recomendaciones orgánicas.",
          "• Optimizamos la ocupación através de segmentación psicológica avanzada."
        ]} />
      </AccordionMenuItem>

      <AccordionMenuItem
        value="item-7"
        title="7 – Nuestra tecnología hace lo que otras no pueden"
        titleClassName="text-xl md:text-2xl font-bold text-white hover:text-[#FEF7CD] transition-colors duration-300"
      >
        <MenuItemText items={[
          "• Conecta personas con intereses compartidos",
          "• Coordina entradas y salidas para cero huecos",
          "• Optimiza estancias para máxima rentabilidad",
          "• Una plataforma. Múltiples fuentes de ingresos"
        ]} />
      </AccordionMenuItem>

      <AccordionMenuItem
        value="item-8"
        title="8 – Hoteles por afinidades = Redes Sociales Perfectas"
        titleClassName="text-xl md:text-2xl font-bold text-white hover:text-[#FEF7CD] transition-colors duration-300"
      >
        <MenuItemText items={[
          "• Los intereses compartidos crean conexiones instantáneas",
          "• La psicología grupal impulsa estancias más largas y visitas de retorno",
          "• Las actividades temáticas aumentan el compromiso y la lealtad",
          "• La pertenencia comunitaria se vuelve adictiva"
        ]} />
      </AccordionMenuItem>

      <AccordionMenuItem
        value="item-9"
        title="9 – Proceso de registro simplificado"
        titleClassName="text-xl md:text-2xl font-bold text-white hover:text-[#FEF7CD] transition-colors duration-300"
      >
        <MenuItemText items={[
          "Unirse a Hotel-Living es rápido y sencillo:",
          "1. Completa nuestro formulario de registro online",
          "2. Nuestro equipo revisa tu solicitud en 48 horas",
          "3. Te ayudamos a configurar tu perfil y afinidades",
          "4. Comenzamos a promocionar tu hotel inmediatamente",
          "",
          "¡En menos de una semana puedes estar recibiendo tus primeras reservas temáticas!"
        ]} />
      </AccordionMenuItem>

      <AccordionMenuItem
        value="item-10"
        title="10 – Únete hoy y transforma tu hotel"
        titleClassName="text-xl md:text-2xl font-bold text-white hover:text-[#FEF7CD] transition-colors duration-300"
      >
        <MenuItemText items={[
          "No esperes más para formar parte de la revolución hotelera:",
          "• Sin riesgos: Solo pagas cuando generas ingresos",
          "• Soporte completo: Te acompañamos en cada paso",
          "• Resultados rápidos: Primeras reservas en semanas",
          "• Crecimiento sostenible: Construye una base de clientes leales",
          "",
          "Regístrate ahora y descubre cómo Hotel-Living puede transformar tu negocio hotelero."
        ]} />
      </AccordionMenuItem>
    </Accordion>
  );
}
