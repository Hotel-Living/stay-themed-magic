import React from "react";

export function AssociationDisclaimer() {
  return (
    <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-gray-600/30">
      <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wide mb-4 text-center">
        Disclaimer Legal
      </h3>
      <div className="text-xs text-gray-300 leading-relaxed space-y-2">
        <p>
          Las cifras presentadas son estimaciones basadas en el potencial máximo de ocupación.
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