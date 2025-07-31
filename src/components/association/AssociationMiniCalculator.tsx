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

  const hotelSales = hotelCount * roomsCount * 365 * priceValue;
  const associationEarnings = (hotelSales / 100) * 4;

  return (
    <div className="bg-[#7802A9] backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.4)] max-w-3xl mx-auto">
      <div className="mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-white font-semibold mb-2 text-center uppercase text-sm">
              ¿CUÁNTOS HOTELES AFILIADOS?
            </label>
            <Input
              type="number"
              value={hotels}
              onChange={(e) => setHotels(e.target.value)}
              className="bg-white/10 border-white/20 text-white text-center text-xl font-bold"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2 text-center uppercase text-sm">
              ¿CUÁNTAS HABITACIONES VACÍAS DIARIAS DE MEDIA?
            </label>
            <Input
              type="number"
              value={roomsPerHotel}
              onChange={(e) => setRoomsPerHotel(e.target.value)}
              className="bg-white/10 border-white/20 text-white text-center text-xl font-bold"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2 text-center uppercase text-sm">
              ¿PRECIO MENSUAL POR HABITACIÓN?
            </label>
            <Input
              type="number"
              value={avgPrice}
              onChange={(e) => setAvgPrice(e.target.value)}
              className="bg-white/10 border-white/20 text-white text-center text-xl font-bold"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 text-center">
            <p className="text-white text-lg font-bold mb-2">Beneficios para los hoteles:</p>
            <p className="text-yellow-300 font-bold text-2xl">
              ${hotelSales.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 text-center">
            <p className="text-white text-lg font-bold mb-2">Beneficios para la asociación:</p>
            <p className="text-yellow-300 font-bold text-2xl">
              ${associationEarnings.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}