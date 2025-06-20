
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface MenuOption {
  id: string;
  labelKey: string;
  content: string;
}

const CostItemsTab: React.FC = () => {
  const { t } = useTranslation();
  const [activeOption, setActiveOption] = useState<string>("utilities");

  const menuOptions: MenuOption[] = [
    {
      id: "utilities",
      labelKey: "dashboard.ratesCalculator.utilities",
      content: `**PREVISIBILIDAD – RESPONSABILIDAD – EFICIENCIA**

⚙️ LOS HUÉSPEDES DE HOTEL-LIVING NO SON TURISTAS TRANSITORIOS
Son residentes respetuosos de larga estancia que permanecen 8, 16, 24 o 32 días.

🌿 HUÉSPEDES MÁS INTELIGENTES, USO DE RECURSOS MÁS INTELIGENTE
Debido a la mayor duración de las estancias y a la relación más personal que establecen con su propiedad, estos huéspedes tienden a ser más conscientes en el uso de los recursos.
Se sienten más como inquilinos temporales que como visitantes de corta estancia — y eso marca una verdadera diferencia.
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
________________________________________`
    },
    {
      id: "cleaning",
      labelKey: "dashboard.ratesCalculator.cleaning",
      content: `**LIMPIEZA ESTILO HOGAR – COMODIDAD A LARGO PLAZO**

🧼 HOTEL-LIVING SIGNIFICA UN NUEVO ESTÁNDAR DE HOSPITALIDAD
🏡 UNO QUE SE SIENTE MÁS COMO EN CASA.
A diferencia de los hoteles tradicionales con limpieza diaria, nuestro enfoque refleja el ritmo de la vida real.

Así como alguien que vive en casa podría recibir ayuda ligera algunas veces por semana, nuestros huéspedes disfrutan de un cuidado atento y discreto que respeta su independencia y comodidad.
________________________________________
🧹 LIMPIEZA COMPLETA — UNA VEZ POR SEMANA
Una limpieza completa de la habitación cada 7 días garantiza higiene y frescura, con una mínima intrusión.
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
•	La sensación de realmente pertenecer — no solo alojarse.`
    },
    {
      id: "meal-plans",
      labelKey: "dashboard.ratesCalculator.meals",
      content: `EL MODELO DE COMIDAS HOTEL-LIVING: SIMPLE, SALUDABLE, ESTILO HOGAR

Excepto en hoteles de lujo, boutique de alta gama o en estancias cortas de 8 días centradas en gastronomía o experiencias culinarias, Hotel-Living no se basa en cocina gourmet ni en buffets lujosos.

En la mayoría de los casos, la experiencia Hotel-Living se fundamenta en la comodidad, la simplicidad y la sostenibilidad.

Nuestros huéspedes no están aquí por el lujo.

No son turistas. Son residentes de larga estancia que buscan una rutina de comidas fiable, saludable y accesible — algo que se asemeje a la vida real en el hogar.
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

🌍 Y toda la experiencia se vuelve escalable, sostenible y profundamente humana.`
    },
    {
      id: "total-costs",
      labelKey: "dashboard.ratesCalculator.totalCost",
      content: ``
    }
  ];

  const activeContent = menuOptions.find(option => option.id === activeOption)?.content || "";

  return (
    <div className="space-y-6">
      {/* Redesigned Horizontal Menu with Hotel-Living Colors */}
      <div className="flex justify-center space-x-3">
        {menuOptions.map(option => (
          <div
            key={option.id}
            onClick={() => setActiveOption(option.id)}
            className={`
              relative cursor-pointer px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border backdrop-blur-sm
              ${activeOption === option.id 
                ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg transform scale-105 border-blue-300/40' 
                : 'bg-gradient-to-r from-blue-800/40 to-purple-800/40 text-white/80 hover:from-blue-700/60 hover:to-purple-700/60 hover:text-white hover:scale-102 border-blue-500/30'}
            `}
          >
            {/* Soft glow effect for active item */}
            {activeOption === option.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur-lg opacity-60 -z-10"></div>
            )}
            {t(option.labelKey)}
          </div>
        ))}
      </div>

      {/* Content Area with Updated Background */}
      <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
        
        {/* Utilities Cost Table Image with purple glow */}
        {activeOption === "utilities" && (
          <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img 
                src="/lovable-uploads/deb45c8f-8210-452d-90f0-f949c675fa76.png" 
                alt="Utilities Cost Breakdown Table" 
                className="rounded-lg shadow-lg border border-purple-400/20" 
              />
            </div>
          </div>
        )}
        
        {/* Cleaning Cost Table Image with purple glow */}
        {activeOption === "cleaning" && (
          <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img 
                src="/lovable-uploads/f41a8e9d-034a-40b2-9a49-73fa5727f76d.png" 
                alt="Cleaning & Laundry Costs Table" 
                className="rounded-lg shadow-lg border border-purple-400/20" 
              />
            </div>
          </div>
        )}
        
        {/* Meal Plan Cost Table Image with purple glow */}
        {activeOption === "meal-plans" && (
          <div className="mb-8 flex justify-center">
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img 
                src="/lovable-uploads/6a458e43-6e8b-4ed0-a804-719a0edfbc9d.png" 
                alt="Meal Plan Cost Table" 
                className="rounded-lg shadow-lg border border-purple-400/20" 
              />
            </div>
          </div>
        )}
        
        {/* Content display only for non-total-costs sections */}
        {activeOption !== "total-costs" && (
          <div className="text-lg whitespace-pre-line">{activeContent}</div>
        )}
        
        {/* Total Costs Tables Images with purple glow - 3 images vertically arranged with negative margins for tight spacing */}
        {activeOption === "total-costs" && (
          <div className="flex flex-col items-center">
            {/* 3-STAR Hotel Table */}
            <div className="transform scale-[0.65] origin-top relative">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img 
                src="/lovable-uploads/a4d6ce0f-a7ff-4efb-9829-5c03bf5785d8.png" 
                alt="3-Star Hotel Total Cost Per Full Stay Table" 
                className="rounded-lg shadow-lg border border-purple-400/20" 
              />
            </div>
            
            {/* 4-STAR Hotel Table */}
            <div className="transform scale-[0.65] origin-top relative -mt-16">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img 
                src="/lovable-uploads/92000e0e-b70a-4664-8fcf-2fc75d33d6f9.png" 
                alt="4-Star Hotel Total Cost Per Full Stay Table" 
                className="rounded-lg shadow-lg border border-purple-400/20" 
              />
            </div>
            
            {/* 5-STAR Hotel Table */}
            <div className="transform scale-[0.65] origin-top relative -mt-16">
              <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl opacity-60 -z-10"></div>
              <img 
                src="/lovable-uploads/d7e96b77-c634-4ec1-a9b9-80f95f4b8ee0.png" 
                alt="5-Star Hotel Total Cost Per Full Stay Table" 
                className="rounded-lg shadow-lg border border-purple-400/20" 
              />
            </div>
          </div>
        )}
        
        {/* Add disclaimer at the bottom */}
        <div className="mt-8 pt-4 border-t border-purple-500/30">
          <p className="text-sm text-white/60 italic text-center">
            {t("dashboard.ratesCalculator.disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
};

export { CostItemsTab };
