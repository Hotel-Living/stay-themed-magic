import React from "react";

export function AssociationDisclaimer() {
  return (
    <div className="bg-[#7E26A6] backdrop-blur-md rounded-xl p-6 border border-purple-400/30 shadow-[0_0_30px_rgba(126,38,166,0.3)] max-w-2xl mx-auto">
      <div className="text-xs text-white leading-relaxed space-y-2">
        <p>
          * Las cifras presentadas son estimaciones basadas en el potencial máximo de ocupación.
        </p>
        <p>
          Los resultados reales pueden variar en función del número de paquetes efectivamente vendidos y del precio promedio mensual.
        </p>
        <p>
          Este último —fijado en $1,300— representa una media ponderada que contempla estancias sin servicio de comidas, así como hoteles de distintas categorías, con ocupaciones tanto individuales como dobles.
        </p>
      </div>
    </div>
  );
}