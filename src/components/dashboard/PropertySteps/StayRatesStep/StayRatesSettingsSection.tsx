
import React from "react";
import { Slider } from "@/components/ui/slider";

interface StayRatesSettingsSectionProps {
  enablePriceIncrease: boolean;
  setEnablePriceIncrease: (enabled: boolean) => void;
  priceIncreaseCap: number;
  setPriceIncreaseCap: (cap: number) => void;
}

export function StayRatesSettingsSection({
  enablePriceIncrease,
  setEnablePriceIncrease,
  priceIncreaseCap,
  setPriceIncreaseCap
}: StayRatesSettingsSectionProps) {
  console.log("StayRatesSettingsSection - enablePriceIncrease:", enablePriceIncrease);
  console.log("StayRatesSettingsSection - priceIncreaseCap:", priceIncreaseCap);

  return (
    <>
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={enablePriceIncrease}
          onChange={() => setEnablePriceIncrease(!enablePriceIncrease)}
          className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2"
        />
        <span className="text-sm">ACTIVAR PRECIOS DINÁMICOS BASADOS EN NOCHES VENDIDAS</span>
      </label>

      <div
        className={`transform-gpu transition-transform duration-300 origin-top ease-in-out overflow-hidden ${
          enablePriceIncrease ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30 mb-6">
          <div>
            <label className="block text-sm mb-1 uppercase flex items-center justify-between">
              <span>INCREMENTO MÁXIMO DE PRECIO</span>
              <span className="text-fuchsia-400">{priceIncreaseCap}%</span>
            </label>
            {enablePriceIncrease && (
              <Slider
                value={[priceIncreaseCap]}
                onValueChange={values => setPriceIncreaseCap(values[0])}
                min={5}
                max={50}
                step={1}
                className="w-full"
              />
            )}
            <p className="text-xs text-foreground/70 mt-1">
              Este es el porcentaje máximo en que los precios pueden aumentar debido a la demanda.
            </p>
          </div>

          {enablePriceIncrease && (
            <div className="bg-fuchsia-900/20 p-3 rounded-lg border border-fuchsia-800/30 mt-4">
              <h4 className="text-sm font-medium mb-2">Cómo funciona el Precio Dinámico</h4>
              <p className="text-xs text-foreground/80 mb-2">
                El precio aumenta un 1% por cada X noches vendidas en un mes, donde X se calcula como:
              </p>
              <div className="bg-fuchsia-950/50 p-2 rounded-md text-center text-sm font-mono mb-2">
                X = (Total de noches en el mes) ÷ {priceIncreaseCap}
              </div>
              <p className="text-xs text-foreground/80">
                Por ejemplo, con 30 habitaciones × 30 días = 900 noches totales y un aumento máximo del {priceIncreaseCap}%,
                el precio aumentaría un 1% por cada {Math.round(900 / priceIncreaseCap)} noches vendidas.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
