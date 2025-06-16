
import { Calendar, DollarSign, Users } from "lucide-react";

export function HotelFeatures() {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-[#ebd4ee] to-[#f5ecf6] bg-clip-text text-transparent">¿Por qué unirse a Hotel-Living?</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="glass-card p-6 rounded-xl bg-gradient-to-b from-[#6a0a95] to-[#460F54] transform hover:scale-105 transition-all duration-300 border border-fuchsia-400/30 shadow-lg hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]">
          <div className="w-16 h-16 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-4 border border-fuchsia-400/30">
            <Calendar className="h-8 w-8 text-fuchsia-300" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-[#f5ecf6]">100% de Ocupación</h3>
          <p className="text-sm text-[#f0e3f2]/90">Llena tus habitaciones vacías con huéspedes de larga estancia todo el año</p>
        </div>
        <div className="glass-card p-6 rounded-xl bg-gradient-to-b from-[#6a0a95] to-[#460F54] transform hover:scale-105 transition-all duration-300 border border-fuchsia-400/30 shadow-lg hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]">
          <div className="w-16 h-16 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-4 border border-fuchsia-400/30">
            <DollarSign className="h-8 w-8 text-fuchsia-300" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-[#f5ecf6]">Mayores Ingresos</h3>
          <p className="text-sm text-[#f0e3f2]/90">Tarifas promedio diarias más altas con costes operativos reducidos</p>
        </div>
        <div className="glass-card p-6 rounded-xl bg-gradient-to-b from-[#6a0a95] to-[#460F54] transform hover:scale-105 transition-all duration-300 border border-fuchsia-400/30 shadow-lg hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]">
          <div className="w-16 h-16 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-4 border border-fuchsia-400/30">
            <Users className="h-8 w-8 text-fuchsia-300" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-[#f5ecf6]">Red Global</h3>
          <p className="text-sm text-[#f0e3f2]/90">Acceso a huéspedes internacionales que buscan experiencias temáticas</p>
        </div>
      </div>
    </div>
  );
}
