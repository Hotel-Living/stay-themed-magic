import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
interface MenuOption {
  id: string;
  labelKey: string;
  contentKey?: string;
}
const CostItemsTab: React.FC = () => {
  const {
    t
  } = useTranslation();
  const [activeOption, setActiveOption] = useState<string>("utilities");
  const menuOptions: MenuOption[] = [{
    id: "utilities",
    labelKey: "dashboard.ratesCalculator.utilities",
    contentKey: "utilities"
  }, {
    id: "cleaning",
    labelKey: "dashboard.ratesCalculator.cleaning",
    contentKey: "cleaning"
  }, {
    id: "meal-plans",
    labelKey: "dashboard.ratesCalculator.meals",
    contentKey: "meals"
  }, {
    id: "total-costs",
    labelKey: "dashboard.ratesCalculator.totalCost"
  }];
  const getContentForOption = (optionId: string): string => {
    switch (optionId) {
      case "utilities":
        return `**${t('dashboard.ratesCalculator.utilitiesTitle')}**

⚙️ ${t('dashboard.ratesCalculator.utilitiesGuestsNotTransients')}
${t('dashboard.ratesCalculator.utilitiesDescription1')}

🌿 ${t('dashboard.ratesCalculator.utilitiesSmartGuestsTitle')}
${t('dashboard.ratesCalculator.utilitiesDescription2')}
${t('dashboard.ratesCalculator.utilitiesDescription3')}
________________________________________
⚡ EL CONSUMO DE SERVICIOS ES MÁS BAJO Y MÁS ESTABLE
💡 LOS SISTEMAS DE EFICIENCIA ENERGÉTICA (como iluminación LED y control climático moderado) resultan aún más efectivos
🌱 AL SENTIRSE COMO EN CASA, los huéspedes adoptan naturalmente hábitos más conservadores
________________________________________
💜 UN SENTIDO DE RESPONSABILIDAD COMPARTIDA
Dado que Hotel-Living ofrece tarifas accesibles, los huéspedes suelen ser conscientes y respetuosos de la oportunidad que se les brinda.
Saben que este modelo depende del equilibrio, el cuidado y la sostenibilidad — y la mayoría actúa en consecuencia.
________________________________________
🔄 OPERACIONES OPTIMIZADAS = CONSUMO OPTIMIZADO
Gracias a la menor rotación de habitaciones y a los protocolos de limpieza simplificados, el uso de servicios permanece constante y optimizado, con menos picos de demanda de electricidad o agua.
________________________________________`;
      case "cleaning":
        return `**${t('dashboard.ratesCalculator.cleaningModelTitle')}**

🧼 ${t('dashboard.ratesCalculator.cleaningHotelLivingStandard')}
🏡 ${t('dashboard.ratesCalculator.cleaningFeelsLikeHome')}
${t('dashboard.ratesCalculator.cleaningDescription1')}

${t('dashboard.ratesCalculator.cleaningDescription2')}
________________________________________
🧹 ${t('dashboard.ratesCalculator.cleaningCompleteTitle')}
Uma limpeza completa de la habitación cada 7 días garantiza higiene e frescura, com uma mínima intrusão.
________________________________________
🔄 REFRESCO LIGERO DIARIO (A PETICIÓN)
Pequeños retoques opcionales — 🗑️ retirada de basura, 🧺 orden ligero, 🌬️ ventilación — están disponibles, respetando la privacidad y el estilo de vida.
________________________________________
🛏️ CAMBIO DE ROPA DE CAMA — CADA 5 DÍAS
Las sábanas y toallas se renuevan regularmente, siguiendo los estándares de comodidad del hogar.
________________________________________
💼 BENEFICIOS OPERATIVOS
Este modelo reduce los costes operativos para los hoteles, mientras ofrece a los huéspedes una experiencia residencial:

•	Menos interrupciones
•	Más privacidad
•	La sensación de realmente pertenecer — no solo alojarse.`;
      case "meal-plans":
        return `${t('dashboard.ratesCalculator.mealsModelTitle')}

${t('dashboard.ratesCalculator.mealsModelDescription1')}

${t('dashboard.ratesCalculator.mealsModelDescription2')}

${t('dashboard.ratesCalculator.mealsModelDescription3')}

${t('dashboard.ratesCalculator.mealsModelDescription4')}
________________________________________
🔧 POR ESO NUESTRO MODELO DE ALIMENTACIÓN ES:

✅ 🥗 Equilibrado, estilo hogar y fácil de preparar

✅ 🍎 Diseñado para la moderación y el bienestar, no para el exceso

✅ 👨‍🍳 Compatible con la cocina y el personal existentes de su hotel

✅ ♻️ Bajo en residuos y en coste — sin sacrificar calidad ni cuidado
________________________________________
🍳 PLANES DE COMIDAS FLEXIBLES

Tanto si ofrece solo desayuno como pensión completa, los planes de comidas de Hotel-Living están diseñados para:

•	🧘 Consistencia

•	🏡 Comodidad

•	🙂 Satisfacción de los huéspedes — no exhibiciones culinarias.
________________________________________
💼 VENTAJAS OPERATIVAS:

🧑‍🍳 Menor complejidad operativa

🧾 Costes predecibles y control de porciones

😊 Una experiencia gastronómica relajada y familiar que sus huéspedes valoran realmente
________________________________________
📊 BENEFICIOS PARA EL PRESUPUESTO Y LA PLANIFICACIÓN:

Como todas las reservas se realizan por adelantado y con duración fija:

✅ 📅 Usted sabrá exactamente cuántos huéspedes vendrán — y durante cuánto tiempo.

✅ 🚫 El desperdicio de alimentos puede llegar prácticamente a cero.
________________________________________
🔁 ESTRATEGIA DE COCINA SIMPLE Y EFICIENTE:

Para cocinas sencillas, existe una estrategia comprobada y rentable:

🔄 MENÚS SEMANALES ROTATIVOS

Donde cada día de la semana tiene un menú fijo que puede repetirse semanalmente, lo que permite:

•	🛒 Compras al por mayor

•	🍳 Preparación simplificada

•	💰 Reducción adicional de costes
________________________________________
🔑 EL RESULTADO:

🏨 Su hotel ahorra

🏡 Sus huéspedes se sienten como en casa

🌍 Y toda la experiencia se vuelve escalable, sostenible y profundamente humana.`;
      default:
        return "";
    }
  };
  const activeContent = getContentForOption(activeOption);
  return <div className="space-y-6">
      {/* Redesigned Horizontal Menu with Hotel-Living Colors */}
      <div className="flex justify-center space-x-3">
        {menuOptions.map(option => <div key={option.id} onClick={() => setActiveOption(option.id)} className={`
              relative cursor-pointer px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border backdrop-blur-sm
              ${activeOption === option.id ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg transform scale-105 border-blue-300/40' : 'bg-gradient-to-r from-blue-800/40 to-purple-800/40 text-white/80 hover:from-blue-700/60 hover:to-purple-700/60 hover:text-white hover:scale-102 border-blue-500/30'}
            `}>
            {/* Soft glow effect for active item */}
            {activeOption === option.id && <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur-lg opacity-60 -z-10"></div>}
            {t(option.labelKey)}
          </div>)}
      </div>

      {/* Content Area with Updated Background */}
      <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
        
        {/* Utilities Cost Table Image with purple glow */}
        {activeOption === "utilities" && <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img src="/lovable-uploads/deb45c8f-8210-452d-90f0-f949c675fa76.png" alt="Utilities Cost Breakdown Table" className="rounded-lg shadow-lg border border-purple-400/20" />
            </div>
          </div>}
        
        {/* Cleaning Cost Table Image with purple glow */}
        {activeOption === "cleaning" && <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img src="/lovable-uploads/f41a8e9d-034a-40b2-9a49-73fa5727f76d.png" alt="Cleaning & Laundry Costs Table" className="rounded-lg shadow-lg border border-purple-400/20" />
            </div>
          </div>}
        
        {/* Meal Plan Cost Table Image with purple glow */}
        {activeOption === "meal-plans" && <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img alt="Meal Plan Cost Table" className="rounded-lg shadow-lg border border-purple-400/20" src="/lovable-uploads/110303a2-ca68-4631-9654-8546151560be.png" />
            </div>
          </div>}
        
        {/* Content display only for non-total-costs sections */}
        {activeOption !== "total-costs" && <div className="text-lg whitespace-pre-line">{activeContent}</div>}
        
        {/* Total Costs Tables Images with purple glow - 3 images vertically arranged with negative margins for tight spacing */}
        {activeOption === "total-costs" && <div className="flex flex-col items-center">
            {/* 3-STAR Hotel Table */}
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img alt="3-Star Hotel Total Cost Per Full Stay Table" className="rounded-lg shadow-lg border border-purple-400/20" src="/lovable-uploads/19b1348e-95c1-47b0-994b-f51b541b3b66.png" />
            </div>
            
            {/* 4-STAR Hotel Table */}
            <div className="transform scale-[0.65] origin-top relative -mt-16">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img alt="4-Star Hotel Total Cost Per Full Stay Table" className="rounded-lg shadow-lg border border-purple-400/20" src="/lovable-uploads/de1ac570-1974-4c95-b5b4-c4e058faf1f2.png" />
            </div>
            
            {/* 5-STAR Hotel Table */}
            <div className="transform scale-[0.65] origin-top relative -mt-16">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img alt="5-Star Hotel Total Cost Per Full Stay Table" className="rounded-lg shadow-lg border border-purple-400/20" src="/lovable-uploads/2732e24f-67d9-4697-9c03-a77aa12a50ff.png" />
            </div>
          </div>}
        
        {/* Add disclaimer at the bottom */}
        <div className="mt-8 pt-4 border-t border-purple-500/30">
          <p className="text-sm text-white/60 italic text-center">
            {t("dashboard.ratesCalculator.disclaimer")}
          </p>
        </div>
      </div>
    </div>;
};
export { CostItemsTab };