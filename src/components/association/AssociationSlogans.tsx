import React from "react";

export function AssociationSlogans() {
  const slogans = [
    "SOMOS HOTEL-LIVING.COM",
    "SOMOS POSIBLE OCUPACIÓN MASIVA PARA SUS HOTELES AFILIADOS",
    "SOMOS UNA GRAN FUENTE DE INGRESOS PARA SU ASOCIACIÓN",
    "SOMOS LA REVOLUCIÓN HOTELERA MUNDIAL QUE SU ASOCIACIÓN PUEDE SER LA PRIMERA EN COMUNICAR A SUS AFILIADOS"
  ];

  return (
    <div className="space-y-4">
      {slogans.map((slogan, index) => (
        <div
          key={index}
          className="bg-[#7802A9] backdrop-blur-md rounded-2xl p-6 border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.4)]"
        >
          <p className="text-sm md:text-lg font-bold text-white text-center leading-relaxed">
            {slogan}
          </p>
        </div>
      ))}
    </div>
  );
}