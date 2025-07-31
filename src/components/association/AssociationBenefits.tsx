import React from "react";

export function AssociationBenefits() {
  const benefits = [
    "Acabamos con las temporadas medias y bajas.",
    "Multiplicamos radicalmente los beneficios hoteleros.",
    "Activamos el 100 % de la rentabilidad de las habitaciones vacías.",
    "El hotel cobra por anticipado el 5 % de cada reserva, beneficio neto no reembolsable.",
    "Recuperamos a los clientes que se fueron a Airbnb.",
    "Reducimos los costes operativos.",
    "Traemos estancias más largas y rentables.",
    "Unificamos entradas y salidas en un solo día semanal.",
    "Simplificamos la gestión diaria.",
    "Damos absoluta estabilidad de personal.",
    "Llenamos de vida y atractivo los hoteles.",
    "Llevamos a los hoteles sus clientes ideales según afinidades elegidas por el propio hotel.",
    "Conectamos a su asociación con una nueva era de rentabilidad, estabilidad y sentido.",
    "Sin suscripciones – Sin membresías – Sin cuotas mensuales – Sin contratos forzosos – Sin costes anticipados – Sin adaptaciones."
  ];

  return (
    <div className="bg-[#7802A9] backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.4)]">
      <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 uppercase tracking-wide mb-8 text-center">
        Beneficios directos para sus miembros afiliados
      </h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3">
            <span className="text-yellow-300 font-bold text-lg">•</span>
            <p className="text-white leading-relaxed">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}