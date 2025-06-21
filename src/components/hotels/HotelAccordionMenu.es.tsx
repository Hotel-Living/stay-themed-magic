
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { AccordionMenuItem } from "./accordion/AccordionMenuItem";
import { MenuItemText } from "./accordion/MenuItemText";
import { CollapsibleMenuItem } from "./accordion/CollapsibleMenuItem";
import { ComparisonTable } from "./accordion/ComparisonTable";

export function HotelAccordionMenuES() {
  return (
    <div className="bg-gradient-to-r from-[#8B0000] via-[#B91C7C] to-[#9333EA] p-8 rounded-xl shadow-2xl">
      <Accordion 
        type="multiple" 
        className="w-full space-y-2"
        defaultValue={[]}
      >
        <AccordionMenuItem 
          value="item-1" 
          title="1 – ¿POR QUÉ necesitan de Hotel-Living los Hoteles?" 
          titleClassName="text-white hover:text-[#FEF7CD] transition-colors duration-300"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 p-6 rounded-lg border border-fuchsia-300/20">
            <MenuItemText items={[
              "Los hoteles luchan contra períodos de baja ocupación.",
              "Dependen excesivamente de las OTAs con altas comisiones.",
              "Necesitan una base sólida de huéspedes leales para obtener beneficios constantes.",
              "Buscan diferenciarse en un mercado saturado."
            ]} />
            
            <CollapsibleMenuItem 
              title="Gestionan ineficientemente su inventario"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Hotel-Living transforma habitaciones vacías en centros de estancias largas.",
                  "Reducimos drásticamente los períodos de baja ocupación.",
                  "Optimizamos el RevPAR del hotel a través de estadías prolongadas.",
                  "Los ingresos se vuelven más predecibles y constantes."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Dependen excesivamente de las OTAs"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Hotel-Living genera reservas directas con comisiones mínimas.",
                  "Creamos una base de huéspedes leales que reservan directamente.",
                  "Reducimos significativamente los costes de intermediación.",
                  "El hotel recupera el control sobre sus precios y políticas."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Buscan huéspedes de calidad con mayor valor"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Nuestros miembros son viajeros responsables con ingresos estables.",
                  "Buscan experiencias auténticas, no solo alojamiento barato.",
                  "Permanecen más tiempo, gastando más en servicios del hotel.",
                  "Generan menos desgaste y requieren menos limpieza diaria."
                ]} />
              </div>
            </CollapsibleMenuItem>
          </div>
        </AccordionMenuItem>

        <AccordionMenuItem 
          value="item-2" 
          title="2 – ¿Qué BENEFICIOS obtienen los hoteles?" 
          titleClassName="text-white hover:text-[#FEF7CD] transition-colors duration-300"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 p-6 rounded-lg border border-fuchsia-300/20">
            <MenuItemText items={[
              "Ocupación constante durante temporadas bajas.",
              "Ingresos predecibles y sostenibles.",
              "Reducción de costes operativos por menor rotación.",
              "Mayor prestigio al formar parte de una red exclusiva."
            ]} />
            
            <CollapsibleMenuItem 
              title="Incremento significativo del RevPAR"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Las estancias largas aumentan el ingreso por habitación disponible.",
                  "Menor rotación significa menos costes de limpieza y mantenimiento.",
                  "Los huéspedes de estancias largas consumen más servicios del hotel.",
                  "El pricing dinámico optimiza los ingresos según la demanda."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Posicionamiento premium en el mercado"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Hotel-Living eleva la percepción de calidad del establecimiento.",
                  "Nos dirigimos a un segmento de mercado con mayor poder adquisitivo.",
                  "La marca se asocia con experiencias auténticas y exclusivas.",
                  "El hotel se diferencia claramente de la competencia tradicional."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Operaciones más eficientes"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Menos check-ins y check-outs reducen la carga de trabajo.",
                  "Huéspedes de largo plazo requieren menos atención diaria.",
                  "Mantenimiento predictivo vs. reactivo por ocupación estable.",
                  "Personal más eficiente al gestionar menos rotación de huéspedes."
                ]} />
              </div>
            </CollapsibleMenuItem>
          </div>
        </AccordionMenuItem>

        <AccordionMenuItem 
          value="item-3" 
          title="3 – ¿Cómo funciona la INTEGRACIÓN sin problemas?" 
          titleClassName="text-white hover:text-[#FEF7CD] transition-colors duration-300"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 p-6 rounded-lg border border-fuchsia-300/20">
            <MenuItemText items={[
              "Implementación gradual sin interrumpir operaciones actuales.",
              "Panel de gestión intuitivo integrado con sistemas existentes.",
              "Formación completa del equipo incluida.",
              "Soporte técnico 24/7 durante la transición."
            ]} />
            
            <CollapsibleMenuItem 
              title="Tecnología que se adapta a su hotel"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Nuestra plataforma se integra con PMS existentes.",
                  "API robusta para sincronización automática de inventario.",
                  "Dashboard personalizado para cada propiedad.",
                  "Reportes en tiempo real de ocupación y rendimiento."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Implementación por fases"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Comenzamos con un porcentaje pequeño del inventario.",
                  "Escalamos gradualmente según resultados y comodidad del hotel.",
                  "Prueba piloto de 90 días para evaluar rendimiento.",
                  "Flexibilidad total para ajustar según necesidades específicas."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Soporte integral incluido"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Account manager dedicado para cada propiedad.",
                  "Formación presencial y online para todo el equipo.",
                  "Material de marketing y promocional incluido.",
                  "Acceso prioritario a nuevas funcionalidades y actualizaciones."
                ]} />
              </div>
            </CollapsibleMenuItem>
          </div>
        </AccordionMenuItem>

        <AccordionMenuItem 
          value="item-4" 
          title="4 – Hotel-Living NO es solo llenar habitaciones" 
          titleClassName="text-white hover:text-[#FEF7CD] transition-colors duration-300"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 p-6 rounded-lg border border-fuchsia-300/20">
            <MenuItemText items={[
              "Creamos una experiencia residencial premium.",
              "Fomentamos comunidades de huéspedes con intereses afines.",
              "Maximizamos el valor por estadía, no solo la ocupación.",
              "Transformamos huéspedes ocasionales en embajadores de marca."
            ]} />
            
            <CollapsibleMenuItem 
              title="Experiencia residencial vs. hotelera tradicional"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Los huéspedes se sienten 'en casa' durante estancias prolongadas.",
                  "Servicios adaptados a necesidades de largo plazo.",
                  "Flexibilidad en horarios y servicios según el estilo de vida del huésped.",
                  "Creación de rutinas y vínculos emocionales con el establecimiento."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Comunidad como valor diferencial"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Huéspedes con afinidades comunes generan networking natural.",
                  "Eventos y actividades que fortalecen la comunidad.",
                  "Referencias orgánicas entre miembros de la comunidad.",
                  "Fidelización a través de vínculos sociales, no solo servicios."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Maximización del lifetime value"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Huéspedes que regresan múltiples veces al año.",
                  "Recomendaciones activas a su red de contactos.",
                  "Consumo adicional de servicios del hotel (spa, restaurante, etc.).",
                  "Participación en programas de fidelidad de largo plazo."
                ]} />
              </div>
            </CollapsibleMenuItem>
          </div>
        </AccordionMenuItem>

        <AccordionMenuItem 
          value="item-5" 
          title="5 – La REVOLUCIÓN de las afinidades" 
          titleClassName="text-white hover:text-[#FEF7CD] transition-colors duration-300"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 p-6 rounded-lg border border-fuchsia-300/20">
            <MenuItemText items={[
              "Las afinidades crean conexiones instantáneas entre huéspedes.",
              "Temas específicos generan comunidades leales y comprometidas.",
              "Los intereses compartidos impulsan estancias más largas.",
              "La pertenencia se vuelve adictiva y genera retorno constante."
            ]} />
            
            <CollapsibleMenuItem 
              title="Psicología de las afinidades en hospitalidad"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Los humanos buscamos tribu: gente que comparta nuestros intereses.",
                  "Las afinidades reducen la ansiedad social del viaje.",
                  "Conversaciones naturales surgen alrededor de pasiones comunes.",
                  "El sentimiento de pertenencia genera lealtad emocional al lugar."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Casos de éxito documentados"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Hoteles temáticos de yoga: 40% más de retorno de huéspedes.",
                  "Propiedades enfocadas en arte: estancias 60% más largas.",
                  "Destinos wellness: 3x más referencias orgánicas.",
                  "Comunidades gastronómicas: mayor consumo en F&B del hotel."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Implementación práctica de afinidades"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Identificamos las afinidades que mejor se adaptan a su propiedad.",
                  "Creamos eventos y actividades específicas para cada tema.",
                  "Facilitamos conexiones entre huéspedes con intereses similares.",
                  "Desarrollamos partnerships locales que enriquezcan la experiencia."
                ]} />
              </div>
            </CollapsibleMenuItem>
          </div>
        </AccordionMenuItem>

        <AccordionMenuItem 
          value="item-6" 
          title="6 – ¿QUÉ tipo de hotel necesitamos?" 
          titleClassName="text-white hover:text-[#FEF7CD] transition-colors duration-300"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 p-6 rounded-lg border border-fuchsia-300/20">
            <MenuItemText items={[
              "Hoteles con visión de futuro y mentalidad innovadora.",
              "Propiedades que valoren la comunidad sobre la transacción.",
              "Establecimientos dispuestos a invertir en experiencias únicas.",
              "Equipos comprometidos con el servicio personalizado."
            ]} />
            
            <CollapsibleMenuItem 
              title="Características físicas ideales"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Espacios comunes que faciliten la interacción social.",
                  "Habitaciones cómodas para estancias de 7+ días.",
                  "Ubicación accesible con buena conectividad.",
                  "Infraestructura tecnológica robusta (WiFi, espacios de work)."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Perfil del equipo hotelero"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Staff con mentalidad de anfitriones, no solo empleados.",
                  "Capacidad para crear relaciones genuinas con huéspedes.",
                  "Flexibilidad para adaptar servicios a necesidades individuales.",
                  "Pasión por crear experiencias memorables y auténticas."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Filosofía empresarial compatible"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Visión a largo plazo, no solo resultados trimestrales.",
                  "Valoración de la calidad sobre la cantidad de huéspedes.",
                  "Disposición a experimentar con nuevos modelos de negocio.",
                  "Compromiso genuino con la sostenibilidad y responsabilidad social."
                ]} />
              </div>
            </CollapsibleMenuItem>
          </div>
        </AccordionMenuItem>

        <AccordionMenuItem 
          value="item-7" 
          title="7 – PASOS para unirse" 
          titleClassName="text-white hover:text-[#FEF7CD] transition-colors duration-300"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 p-6 rounded-lg border border-fuchsia-300/20">
            <MenuItemText items={[
              "1. Evaluación inicial de compatibilidad",
              "2. Visita técnica y propuesta personalizada",  
              "3. Prueba piloto de 90 días",
              "4. Implementación completa y optimización"
            ]} />
            
            <CollapsibleMenuItem 
              title="Fase 1: Evaluación y compatibilidad"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Análisis de la propiedad y su potencial para estancias largas.",
                  "Revisión de ocupación histórica y identificación de oportunidades.",
                  "Evaluación de la cultura empresarial y alineación de valores.",
                  "Determinación de las afinidades más adecuadas para la propiedad."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Fase 2: Propuesta personalizada"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Visita in-situ de nuestro equipo técnico.",
                  "Desarrollo de estrategia específica para su mercado local.",
                  "Proyecciones financieras detalladas y ROI esperado.",
                  "Plan de implementación adaptado a sus operaciones actuales."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Fase 3: Prueba piloto controlada"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Implementación en un porcentaje limitado del inventario.",
                  "Monitoreo intensivo de resultados y feedback.",
                  "Ajustes y optimizaciones basados en datos reales.",
                  "Evaluación completa al final del período piloto."
                ]} />
              </div>
            </CollapsibleMenuItem>

            <CollapsibleMenuItem 
              title="Fase 4: Implementación y crecimiento"
              className="mb-4"
            >
              <div className="bg-fuchsia-800/10 p-6 rounded-lg border border-fuchsia-300/10 mt-4">
                <MenuItemText items={[
                  "Escalado gradual según resultados del piloto.",
                  "Formación avanzada del equipo en gestión de estancias largas.",
                  "Desarrollo de partnerships locales para enriquecer la oferta.",
                  "Integración completa en el ecosistema Hotel-Living."
                ]} />
              </div>
            </CollapsibleMenuItem>
          </div>
        </AccordionMenuItem>

        <AccordionMenuItem 
          value="item-8" 
          title="8 – Hoteles por afinidades = Redes Sociales Perfectas" 
          titleClassName="text-white hover:text-[#FEF7CD] transition-colors duration-300"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 p-6 rounded-lg border border-fuchsia-300/20">
            <MenuItemText items={[
              "Los intereses compartidos crean conexiones instantáneas",
              "La psicología grupal impulsa estancias más largas y visitas de retorno",
              "Las actividades temáticas aumentan el compromiso y la lealtad",
              "La pertenencia comunitaria se vuelve adictiva"
            ]} />
          </div>
        </AccordionMenuItem>

        <AccordionMenuItem 
          value="comparison" 
          title="Comparación: Modelo Tradicional vs Hotel-Living" 
          titleClassName="text-white hover:text-[#FEF7CD] transition-colors duration-300"
        >
          <ComparisonTable />
        </AccordionMenuItem>
      </Accordion>
    </div>
  );
}
