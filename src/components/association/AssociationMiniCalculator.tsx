import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator } from "lucide-react";

export function AssociationMiniCalculator() {
  const [hotels, setHotels] = useState<string>("");
  const [roomsPerHotel, setRoomsPerHotel] = useState<string>("");
  const [avgPrice, setAvgPrice] = useState<string>("");
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateResults = () => {
    setIsCalculated(true);
  };

  const resetCalculator = () => {
    setHotels("");
    setRoomsPerHotel("");
    setAvgPrice("");
    setIsCalculated(false);
  };

  // Calculate values
  const hotelCount = parseInt(hotels) || 0;
  const roomsCount = parseInt(roomsPerHotel) || 0;
  const priceValue = parseInt(avgPrice) || 0;

  const hotelSales = hotelCount * roomsCount * 365 * priceValue;
  const associationEarnings = (hotelSales / 100) * 4;

  return (
    <div className="bg-[#7802A9] backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.4)]">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Calculator className="w-12 h-12 text-yellow-300" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 uppercase tracking-wide">
          Calculadora Integrada
        </h2>
      </div>

      {!isCalculated ? (
        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-white font-semibold mb-2">
                Número de hoteles afiliados
              </label>
              <Input
                type="number"
                placeholder="Ej. 1000"
                value={hotels}
                onChange={(e) => setHotels(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/60"
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">
                Media diaria de habitaciones vacías por hotel
              </label>
              <Input
                type="number"
                placeholder="Ej. 10"
                value={roomsPerHotel}
                onChange={(e) => setRoomsPerHotel(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/60"
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">
                Precio promedio mensual (USD)
              </label>
              <Input
                type="number"
                placeholder="Ej. 1500"
                value={avgPrice}
                onChange={(e) => setAvgPrice(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/60"
              />
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={calculateResults}
              disabled={!hotels || !roomsPerHotel || !avgPrice}
              className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold px-8 py-3 text-lg"
            >
              Calcular pérdidas y beneficios
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="bg-white/10 rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                RESULTADOS INSTANTÁNEOS
              </h3>
              
              <div className="space-y-6">
                <div className="text-white">
                  <p className="text-xl font-bold mb-2">SUS HOTELES:*</p>
                  <p className="text-lg">
                    ({hotelCount.toLocaleString()} hoteles × {roomsCount} habitaciones × 365 días × ${priceValue.toLocaleString()}) = 
                    <span className="text-yellow-300 font-bold text-2xl ml-2">
                      ${hotelSales.toLocaleString()} (VENTAS)
                    </span>
                  </p>
                </div>
                
                <div className="text-white">
                  <p className="text-xl font-bold mb-2">SU ASOCIACIÓN:*</p>
                  <p className="text-lg">
                    (${hotelSales.toLocaleString()} ÷ 100 × 4) = 
                    <span className="text-yellow-300 font-bold text-2xl ml-2">
                      ${associationEarnings.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button
                onClick={resetCalculator}
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-2"
              >
                Calcular nuevamente
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}