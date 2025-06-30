
import React from "react";
import { Info } from "lucide-react";

interface StayRatesTableSectionProps {
  ratesFilled: boolean;
  enablePriceIncrease: boolean;
  priceIncreaseCap: number;
  rates: Record<string, string | number>;
  roomTypes: string[];
  stayOptions: string[];
  mealOptions: string[];
  handleRateChange: (roomType: string, stayLength: string, mealOption: string, value: string) => void;
}

export function StayRatesTableSection({
  ratesFilled,
  enablePriceIncrease,
  priceIncreaseCap,
  rates,
  roomTypes,
  stayOptions,
  mealOptions,
  handleRateChange
}: StayRatesTableSectionProps) {
  // Allow single entries in each category
  const hasValidInput =
    Array.isArray(roomTypes) && roomTypes.length > 0 &&
    Array.isArray(stayOptions) && stayOptions.length > 0 &&
    Array.isArray(mealOptions) && mealOptions.length > 0;

  if (!hasValidInput) {
    return (
      <div className="bg-fuchsia-950/30 p-4 rounded-lg border border-fuchsia-800/30">
        <p className="text-yellow-300">
          Por favor, defina los tipos de habitación, duraciones de estancia y planes de comidas en el Paso 3 antes de establecer tarifas.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30 mb-6">
      <h3 className="font-medium mb-2 uppercase text-base">AVISO IMPORTANTE</h3>
      <p className="text-xs text-foreground/80">
        Todas las tarifas se establecen <span className="font-bold">POR PERSONA</span>. Las tarifas se mostrarán a los clientes en consecuencia.
      </p>

      {enablePriceIncrease && (
        <div className="mt-3 pt-3 border-t border-fuchsia-800/30">
          <h3 className="font-medium mb-2 uppercase flex items-center text-base">
            <Info className="w-4 h-4 mr-1 text-fuchsia-400" />
            PRECIOS DINÁMICOS ACTIVADOS
          </h3>
          <p className="text-xs text-foreground/80">
            Estas son tarifas base. Los precios reales aumentarán dinámicamente hasta +{priceIncreaseCap}% basado en la demanda.
          </p>
        </div>
      )}

      <div className="space-y-6 mt-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead className="bg-fuchsia-900/30">
              <tr>
                <th className="p-2 text-left text-xs font-medium uppercase">TIPO DE HABITACIÓN</th>
                <th className="p-2 text-left text-xs font-medium uppercase">DURACIÓN DE ESTANCIA</th>
                <th className="p-2 text-left text-xs font-medium uppercase">PLAN DE COMIDAS</th>
                <th className="p-2 text-left text-xs font-medium uppercase">PRECIO POR PERSONA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fuchsia-800/20">
              {roomTypes.map(roomType => 
                stayOptions.map(stayOption => 
                  mealOptions.map((mealOption, idx) => {
                    const rateKey = `${roomType}-${stayOption}-${mealOption}`;
                    return (
                      <tr key={rateKey} className={idx % 2 === 0 ? "bg-fuchsia-900/10" : ""}>
                        <td className="p-2 text-sm">{roomType}</td>
                        <td className="p-2 text-sm">{stayOption}</td>
                        <td className="p-2 text-sm">{mealOption}</td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={rates[rateKey] || ''}
                            onChange={(e) => handleRateChange(roomType, stayOption, mealOption, e.target.value)}
                            className="w-full px-2 py-1 rounded border border-fuchsia-800/30 bg-fuchsia-950/20 text-white placeholder-gray-400"
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    );
                  })
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
