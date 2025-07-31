import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export function AssociationMiniCalculator() {
  const [hotels, setHotels] = useState<string>("100");
  const [roomsPerHotel, setRoomsPerHotel] = useState<string>("10");
  const [avgPrice, setAvgPrice] = useState<string>("1500");

  // Calculate values
  const hotelCount = parseInt(hotels) || 0;
  const roomsCount = parseInt(roomsPerHotel) || 0;
  const priceValue = parseInt(avgPrice) || 0;

  const hotelSales = (hotelCount * roomsCount * 365 / 12) * priceValue;
  const associationEarnings = (hotelSales / 100) * 4;

  return (
    <div className="bg-gradient-to-br from-[#7802A9] to-[#5A0280] backdrop-blur-md rounded-3xl p-8 md:p-12 border border-blue-400/30 shadow-[0_0_60px_rgba(59,130,246,0.4)] max-w-4xl mx-auto relative overflow-hidden">
      {/* Calculator background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Calculator Title */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text uppercase tracking-wide mb-2">
            Calculadora Online
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-300 to-yellow-400 mx-auto rounded-full"></div>
        </div>
        
        {/* Calculator Body */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-[inset_0_4px_20px_rgba(0,0,0,0.1)] border-2 border-gray-200/50 mb-8 relative">
          {/* Calculator screen effect */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl"></div>
          
          {/* Input Fields */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col group">
              <label className="block text-gray-700 font-bold mb-3 text-center uppercase text-xs tracking-wider flex-shrink-0 transition-colors group-hover:text-[#7802A9]">
                ¿CUÁNTOS HOTELES<br />AFILIADOS?
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={hotels}
                  onChange={(e) => setHotels(e.target.value)}
                  className="bg-gradient-to-b from-white to-gray-50 border-3 border-gray-300 text-gray-800 text-center text-2xl font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] focus:border-[#7802A9] focus:ring-4 focus:ring-[#7802A9]/20 mt-auto rounded-xl h-14 transition-all duration-300 hover:shadow-[inset_0_2px_12px_rgba(0,0,0,0.15)] hover:border-[#7802A9]/50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/40 rounded-xl pointer-events-none"></div>
              </div>
            </div>
            
            <div className="flex flex-col group">
              <label className="block text-gray-700 font-bold mb-3 text-center uppercase text-xs tracking-wider flex-shrink-0 transition-colors group-hover:text-[#7802A9]">
                ¿CUÁNTAS HABITACIONES<br />VACÍAS DIARIAS DE MEDIA?
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={roomsPerHotel}
                  onChange={(e) => setRoomsPerHotel(e.target.value)}
                  className="bg-gradient-to-b from-white to-gray-50 border-3 border-gray-300 text-gray-800 text-center text-2xl font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] focus:border-[#7802A9] focus:ring-4 focus:ring-[#7802A9]/20 mt-auto rounded-xl h-14 transition-all duration-300 hover:shadow-[inset_0_2px_12px_rgba(0,0,0,0.15)] hover:border-[#7802A9]/50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/40 rounded-xl pointer-events-none"></div>
              </div>
            </div>
            
            <div className="flex flex-col group">
              <label className="block text-gray-700 font-bold mb-3 text-center uppercase text-xs tracking-wider flex-shrink-0 transition-colors group-hover:text-[#7802A9]">
                ¿PRECIO MENSUAL<br />POR HABITACIÓN?
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={avgPrice}
                  onChange={(e) => setAvgPrice(e.target.value)}
                  className="bg-gradient-to-b from-white to-gray-50 border-3 border-gray-300 text-gray-800 text-center text-2xl font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] focus:border-[#7802A9] focus:ring-4 focus:ring-[#7802A9]/20 mt-auto rounded-xl h-14 transition-all duration-300 hover:shadow-[inset_0_2px_12px_rgba(0,0,0,0.15)] hover:border-[#7802A9]/50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/40 rounded-xl pointer-events-none"></div>
              </div>
            </div>
          </div>
          
          {/* Calculate divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="px-6 py-2 bg-gradient-to-r from-[#7802A9] to-[#5A0280] text-white text-sm font-bold rounded-full shadow-lg uppercase tracking-wider">
              Resultado
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* Results Display */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="group cursor-default">
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/30 text-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:bg-white/20 relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="text-white/90 text-lg font-bold mb-4 leading-tight">
                  <div>Beneficios para</div>
                  <div>los hoteles *:</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent font-black text-3xl md:text-4xl tracking-tight">
                  ${hotelSales.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="group cursor-default">
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/30 text-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:bg-white/20 relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="text-white/90 text-lg font-bold mb-4 leading-tight">
                  <div>Beneficios para</div>
                  <div>la asociación *:</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent font-black text-3xl md:text-4xl tracking-tight">
                  ${associationEarnings.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}