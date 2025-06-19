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

• Menos interrupciones
• Más privacidad
• La sensación de realmente pertenecer — no solo alojarse.`
    },
    {
      id: "meals",
      labelKey: "dashboard.ratesCalculator.meals",
      content: `` // Se mantiene en blanco porque no fue modificado
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
            {activeOption === option.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur-lg opacity-60 -z-10"></div>
            )}
            {t(option.labelKey)}
          </div>
        ))}
      </div>

      <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
        <div className="text-lg whitespace-pre-line">{activeContent}</div>
      </div>
    </div>
  );
};

export { CostItemsTab };
