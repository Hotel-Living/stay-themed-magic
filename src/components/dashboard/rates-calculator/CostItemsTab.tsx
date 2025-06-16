
import React, { useState } from "react";

interface MenuOption {
  id: string;
  label: string;
  content: string;
}

const menuOptions: MenuOption[] = [
  {
    id: "utilities",
    label: "SERVICIOS",
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
    label: "LIMPIEZA",
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
    label: "COMIDAS",
    content: `🍽 THE HOTEL-LIVING MEAL MODEL: SIMPLE, WHOLESOME, HOMESTYLE

Except for luxury or high-end boutique hotels — or in the case of short 8-day experiential stays centered on fine dining or culinary themes — Hotel-Living is not about gourmet cuisine or lavish buffets.

In most cases, the Hotel-Living experience is built on comfort, simplicity, and sustainability.

Our guests are not here for extravagance.

They are not tourists. They are long-stay residents looking for a reliable, healthy, and affordable meal routine — something that feels like real life at home.
________________________________________
🔧 THAT'S WHY OUR FOOD MODEL IS:

✅ 🥗 Balanced, homestyle, and easy to prepare

✅ 🍎 Designed for moderation and wellness, not indulgence

✅ 👨‍🍳 Compatible with your hotel's existing kitchen setup and staff

✅ ♻️ Low-waste and low-cost — without sacrificing quality or care
________________________________________
🍳 FLEXIBLE MEAL PLANS

Whether offering breakfast only or all-inclusive, Hotel-Living meal plans are built for:

•	🧘 Consistency

•	🏡 Comfort

•	🙂 Guest satisfaction — not culinary showmanship.
________________________________________
💼 OPERATIONAL ADVANTAGES:

🧑‍🍳 Lower operational complexity

🧾 Predictable costs and portion control

😊 A relaxed, familiar dining experience that guests truly value
________________________________________
📊 BUDGET & PLANNING BENEFITS:

Because all bookings are made in advance and fixed-duration:

✅ 📅 You'll know exactly how many guests are coming — and for how long.

✅ 🚫 Zero food waste becomes a real possibility.
________________________________________
🔁 SIMPLE, EFFICIENT KITCHEN STRATEGY:

For simpler kitchens, there's a proven, cost-effective strategy:

🔄 WEEKLY ROTATING MENUS

Where each weekday has a set meal that can be repeated every week — allowing:

•	🛒 Bulk purchasing

•	🍳 Simplified preparation

•	💰 Further cost reduction
________________________________________
🔑 THE RESULT:

🏨 Hotels save

🏡 Guests feel at home

🌍 And the entire experience becomes scalable, sustainable, and deeply human.`
  },
  {
    id: "total-costs",
    label: "COSTE TOTAL",
    content: ``
  }
];

export const CostItemsTab: React.FC = () => {
  const [activeOption, setActiveOption] = useState<string>("utilities");

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
            {option.label}
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
      </div>
    </div>
  );
};
