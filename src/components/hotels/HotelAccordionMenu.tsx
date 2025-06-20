
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function HotelAccordionMenu() {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());
  const { t, language } = useTranslation();

  const toggleSection = (index: number) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(index)) {
      newOpenSections.delete(index);
    } else {
      newOpenSections.add(index);
    }
    setOpenSections(newOpenSections);
  };

  const getAccordionContent = () => {
    if (language === 'pt') {
      return [
        {
          title: "1 - Os benefícios",
          content: "O Hotel-Living maximiza a ocupação anual do seu hotel, transformando quartos vazios em receita constante através de estadias prolongadas de 8, 16, 24 ou 32 dias."
        },
        {
          title: "2 - Vamos comparar sistemas",
          content: "Ao contrário das reservas tradicionais de 1-3 noites, o Hotel-Living oferece estadias de longa duração que reduzem custos operacionais, aumentam a fidelização dos hóspedes e geram receita mais previsível."
        },
        {
          title: "3 - Não apenas preenchemos quartos",
          content: "Criamos comunidades baseadas em afinidades compartilhadas, oferecendo experiências autênticas que vão além da hospedagem tradicional."
        },
        {
          title: "4 - Quanto lucro estamos perdendo?",
          content: "Os hotéis ocidentais perdem coletivamente $110 bilhões por ano em lucro puro devido a quartos vazios. Um hotel com apenas 5 quartos vazios por dia perde cerca de $55.000 anuais."
        },
        {
          title: "5 - Nosso modelo resolve isso",
          content: "O Hotel-Living maximiza a ocupação através de estadias longas, preços flexíveis e um sistema que se adapta às necessidades sazonais do seu hotel."
        },
        {
          title: "6 - Custos reduzidos, eficiência máxima",
          content: "Estadias mais longas significam menos rotatividade, menos limpezas, menos check-ins/check-outs e custos operacionais significativamente reduzidos por hóspede."
        },
        {
          title: "7 - Estabilidade da equipe, serviço superior",
          content: "Com menos rotatividade de hóspedes, sua equipe pode focar na qualidade do serviço em vez de processar constantemente novas chegadas e partidas."
        },
        {
          title: "8 - Hóspedes de qualidade, experiências autênticas",
          content: "Nosso processo de verificação rigoroso garante hóspedes responsáveis que buscam experiências genuínas de comunidade e estilo de vida."
        },
        {
          title: "9 - Flexibilidade total para hotéis",
          content: "Você mantém controle total sobre quantos quartos dedicar ao Hotel-Living, podendo ajustar conforme suas necessidades e sazonalidade."
        },
        {
          title: "10 - Tecnologia integrada, operação simples",
          content: "Nossa plataforma se integra perfeitamente com seus sistemas existentes, sem necessidade de mudanças complexas em suas operações diárias."
        },
        {
          title: "11 - Marketing direcionado, ROI superior",
          content: "Conectamos sua propriedade diretamente com comunidades interessadas nas experiências que você oferece, resultando em maior conversão e menor custo de aquisição."
        },
        {
          title: "12 - Receita previsível, crescimento sustentável",
          content: "Estadias longas criam um fluxo de receita mais estável e previsível, permitindo melhor planejamento financeiro e crescimento sustentável do negócio."
        }
      ];
    } else if (language === 'ro') {
      return [
        {
          title: "1 - Beneficiile",
          content: "Hotel-Living maximizează ocuparea anuală a hotelului dvs., transformând camerele goale în venituri constante prin șederi prelungite de 8, 16, 24 sau 32 de zile."
        },
        {
          title: "2 - Să comparăm sistemele",
          content: "Spre deosebire de rezervările tradiționale de 1-3 nopți, Hotel-Living oferă șederi de lungă durată care reduc costurile operaționale, cresc fidelitatea oaspeților și generează venituri mai previzibile."
        },
        {
          title: "3 - Nu doar umplem camerele",
          content: "Creăm comunități bazate pe afinități comune, oferind experiențe autentice care depășesc cazarea tradițională."
        },
        {
          title: "4 - Cât profit pierdem?",
          content: "Hotelurile occidentale pierd colectiv 110 miliarde de dolari pe an în profit pur din cauza camerelor goale. Un hotel cu doar 5 camere goale pe zi pierde aproximativ 55.000$ anual."
        },
        {
          title: "5 - Modelul nostru rezolvă acest lucru",
          content: "Hotel-Living maximizează ocuparea prin șederi lungi, prețuri flexibile și un sistem care se adaptează nevoilor sezoniere ale hotelului dvs."
        },
        {
          title: "6 - Costuri reduse, eficiență maximă",
          content: "Șederile mai lungi înseamnă mai puțină rotație, mai puține curățenii, mai puține check-in/check-out și costuri operaționale semnificativ reduse per oaspete."
        },
        {
          title: "7 - Stabilitatea echipei, servicii superioare",
          content: "Cu mai puțină rotație a oaspeților, echipa dvs. se poate concentra pe calitatea serviciului în loc să proceseze constant noi sosiri și plecări."
        },
        {
          title: "8 - Oaspeți de calitate, experiențe autentice",
          content: "Procesul nostru riguros de verificare garantează oaspeți responsabili care caută experiențe genuine de comunitate și stil de viață."
        },
        {
          title: "9 - Flexibilitate totală pentru hoteluri",
          content: "Păstrați controlul total asupra câtor camere să dedicați Hotel-Living, putând ajusta conform nevoilor și sezonalității dvs."
        },
        {
          title: "10 - Tehnologie integrată, operare simplă",
          content: "Platforma noastră se integrează perfect cu sistemele dvs. existente, fără necesitatea de schimbări complexe în operațiunile zilnice."
        },
        {
          title: "11 - Marketing țintit, ROI superior",
          content: "Conectăm proprietatea dvs. direct cu comunitățile interesate de experiențele pe care le oferiți, rezultând în conversie mai mare și cost mai mic de achiziție."
        },
        {
          title: "12 - Venituri previzibile, creștere sustenabilă",
          content: "Șederile lungi creează un flux de venituri mai stabil și previzibil, permițând o planificare financiară mai bună și creșterea sustenabilă a afacerii."
        }
      ];
    } else if (language === 'en') {
      return [
        {
          title: "1 - The benefits",
          content: "Hotel-Living maximizes your hotel's annual occupancy, turning empty rooms into consistent revenue through extended stays of 8, 16, 24, or 32 days."
        },
        {
          title: "2 - Let's compare systems",
          content: "Unlike traditional 1-3 night bookings, Hotel-Living offers long-term stays that reduce operational costs, increase guest loyalty, and generate more predictable revenue."
        },
        {
          title: "3 - We don't just fill rooms",
          content: "We create communities based on shared affinities, offering authentic experiences that go beyond traditional accommodation."
        },
        {
          title: "4 - How much profit are we missing?",
          content: "Western hotels collectively lose $110 billion per year in pure profit due to empty rooms. A hotel with just 5 empty rooms per day loses about $55,000 annually."
        },
        {
          title: "5 - Our model solves this",
          content: "Hotel-Living maximizes occupancy through long stays, flexible pricing, and a system that adapts to your hotel's seasonal needs."
        },
        {
          title: "6 - Reduced costs, maximum efficiency",
          content: "Longer stays mean less turnover, fewer cleanings, fewer check-ins/check-outs, and significantly reduced operational costs per guest."
        },
        {
          title: "7 - Staff stability, superior service",
          content: "With less guest turnover, your staff can focus on service quality instead of constantly processing new arrivals and departures."
        },
        {
          title: "8 - Quality guests, authentic experiences",
          content: "Our rigorous verification process ensures responsible guests who seek genuine community and lifestyle experiences."
        },
        {
          title: "9 - Total flexibility for hotels",
          content: "You maintain full control over how many rooms to dedicate to Hotel-Living, adjusting according to your needs and seasonality."
        },
        {
          title: "10 - Integrated technology, simple operation",
          content: "Our platform integrates seamlessly with your existing systems, without requiring complex changes to your daily operations."
        },
        {
          title: "11 - Targeted marketing, superior ROI",
          content: "We connect your property directly with communities interested in the experiences you offer, resulting in higher conversion and lower acquisition costs."
        },
        {
          title: "12 - Predictable revenue, sustainable growth",
          content: "Long stays create a more stable and predictable revenue stream, enabling better financial planning and sustainable business growth."
        }
      ];
    } else {
      // Spanish version (default)
      return [
        {
          title: "1 - Los beneficios",
          content: "Hotel-Living maximiza la ocupación anual de tu hotel, convirtiendo habitaciones vacías en ingresos constantes a través de estancias prolongadas de 8, 16, 24 o 32 días."
        },
        {
          title: "2 - Comparemos sistemas",
          content: "A diferencia de las reservas tradicionales de 1-3 noches, Hotel-Living ofrece estancias de larga duración que reducen costos operativos, aumentan la fidelización de huéspedes y generan ingresos más predecibles."
        },
        {
          title: "3 - No solo llenamos habitaciones",
          content: "Creamos comunidades basadas en afinidades compartidas, ofreciendo experiencias auténticas que van más allá del alojamiento tradicional."
        },
        {
          title: "4 - ¿Cuánto beneficio estamos perdiendo?",
          content: "Los hoteles occidentales pierden colectivamente $110 mil millones por año en beneficio puro debido a habitaciones vacías. Un hotel con solo 5 habitaciones vacías por día pierde cerca de $55,000 anuales."
        },
        {
          title: "5 - Nuestro modelo resuelve esto",
          content: "Hotel-Living maximiza la ocupación a través de estancias largas, precios flexibles y un sistema que se adapta a las necesidades estacionales de tu hotel."
        },
        {
          title: "6 - Costos reducidos, eficiencia máxima",
          content: "Las estancias más largas significan menos rotación, menos limpiezas, menos check-ins/check-outs y costos operativos significativamente reducidos por huésped."
        },
        {
          title: "7 - Estabilidad del personal, servicio superior",
          content: "Con menos rotación de huéspedes, tu personal puede enfocarse en la calidad del servicio en lugar de procesar constantemente nuevas llegadas y salidas."
        },
        {
          title: "8 - Huéspedes de calidad, experiencias auténticas",
          content: "Nuestro proceso de verificación riguroso garantiza huéspedes responsables que buscan experiencias genuinas de comunidad y estilo de vida."
        },
        {
          title: "9 - Flexibilidad total para hoteles",
          content: "Mantienes control total sobre cuántas habitaciones dedicar a Hotel-Living, pudiendo ajustar según tus necesidades y estacionalidad."
        },
        {
          title: "10 - Tecnología integrada, operación simple",
          content: "Nuestra plataforma se integra perfectamente con tus sistemas existentes, sin requerir cambios complejos en tus operaciones diarias."
        },
        {
          title: "11 - Marketing dirigido, ROI superior",
          content: "Conectamos tu propiedad directamente con comunidades interesadas en las experiencias que ofreces, resultando en mayor conversión y menor costo de adquisición."
        },
        {
          title: "12 - Ingresos predecibles, crecimiento sostenible",
          content: "Las estancias largas crean un flujo de ingresos más estable y predecible, permitiendo mejor planificación financiera y crecimiento sostenible del negocio."
        }
      ];
    }
  };

  const accordionItems = getAccordionContent();

  return (
    <div className="w-full space-y-3">
      {accordionItems.map((item, index) => (
        <div key={index} className="border border-fuchsia-400/30 rounded-lg overflow-hidden bg-gradient-to-r from-[#6a0a95]/20 to-[#460F54]/20 backdrop-blur-sm">
          <button
            onClick={() => toggleSection(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-fuchsia-500/10 transition-colors duration-200"
          >
            <h3 className="text-[#f9d3f6] font-semibold text-base md:text-lg">
              {item.title}
            </h3>
            <ChevronDown 
              className={`h-5 w-5 text-fuchsia-300 transition-transform duration-200 ${
                openSections.has(index) ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {openSections.has(index) && (
            <div className="px-6 pb-4 border-t border-fuchsia-400/20">
              <p className="text-[#f0e3f2] text-sm md:text-base leading-relaxed">
                {item.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
