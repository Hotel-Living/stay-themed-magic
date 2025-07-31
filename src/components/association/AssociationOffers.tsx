import React from "react";

export function AssociationOffers() {
  return (
    <div className="bg-[#7802A9] backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.4)]">
      <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 uppercase tracking-wide mb-8 text-center">
        Qué ofrecemos a su asociación
      </h2>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-yellow-300">4%</span>
            <span className="text-white ml-2 text-lg">de las reservas generadas</span>
          </div>
          <p className="text-white text-center">
            Durante los primeros <span className="font-bold text-yellow-300">18 meses</span>
          </p>
        </div>
        
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-yellow-300">2%</span>
            <span className="text-white ml-2 text-lg">de las reservas generadas</span>
          </div>
          <p className="text-white text-center">
            Durante los siguientes <span className="font-bold text-yellow-300">12 meses</span>
          </p>
        </div>
        
        <div className="bg-yellow-300/20 rounded-xl p-6 border border-yellow-300/40">
          <p className="text-white text-center text-lg leading-relaxed">
            <span className="font-bold text-yellow-300">Este ingreso no afecta en nada a los hoteles</span>, 
            proviene de nuestro propio coste de gestión y puede ser reinvertido en beneficio de la asociación y sus miembros.
          </p>
        </div>
      </div>
    </div>
  );
}