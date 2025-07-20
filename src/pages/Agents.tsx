
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { useTranslation } from "@/hooks/useTranslation";
import BubbleCounter from "@/components/common/BubbleCounter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Agents = () => {
  const { t } = useTranslation('agents');

  // Calculator state
  const [hotelsContacted, setHotelsContacted] = useState<number>(20);
  const [avgPricePerMonth, setAvgPricePerMonth] = useState<number>(1300);
  const [avgRoomsPerHotel, setAvgRoomsPerHotel] = useState<number>(20);

  // Calculate commissions
  const monthlyCommission = hotelsContacted * avgPricePerMonth * avgRoomsPerHotel * 0.005;
  const totalCommission30Months = (monthlyCommission * 18) + (monthlyCommission * 0.5 * 12);

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };

  return (
    <div className="min-h-screen relative">
      <Starfield />
      <div className="relative z-10">
        <Navbar />
        <BubbleCounter />
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            
            {/* Button Section */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <Link 
                to="/agentes/registro" 
                className="bg-[#70009E] hover:bg-[#70009E]/80 text-white px-8 py-3 rounded-xl transition-all duration-300 font-medium text-lg"
              >
                {t('join_button')}
              </Link>
            </div>

            <div className="bg-[#7E00B3]/90 backdrop-blur-sm rounded-lg p-8 text-white shadow-[0_0_60px_rgba(0,200,255,0.8),0_0_120px_rgba(0,200,255,0.4),0_0_180px_rgba(0,200,255,0.2)]">
              <div className="space-y-6">
                
                {/* Title Section */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-4 glow">{t('heading')}</h1>
                  <div className="space-y-4 text-lg leading-relaxed">
                    <p className="whitespace-pre-line">{t('paragraph_1')}</p>
                  </div>
                </div>

                <hr className="border-white/30 my-8" />

                {/* Commission Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{t('commissions_title')}</h2>
                  <p className="text-lg leading-relaxed mb-4">{t('commissions')}</p>
                </div>

                <hr className="border-white/30 my-8" />

                {/* Panel Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{t('panel_title')}</h2>
                  <p className="text-lg leading-relaxed">{t('panel_description')}</p>
                </div>

                <hr className="border-white/30 my-8" />

                {/* Bank Requirements */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{t('payment_requirements_title')}</h2>
                  <p className="text-lg leading-relaxed">{t('bank_data')}</p>
                </div>

                <hr className="border-white/30 my-8" />

                {/* Commission Calculator */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">Calculadora de Comisiones para Agentes</h2>
                  
                  <div className="bg-[#7801AA]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-[0_0_40px_rgba(0,200,255,0.6),0_0_80px_rgba(0,200,255,0.3)]">
                    
                    {/* Input Fields */}
                    <div className="space-y-6 mb-8">
                      <div>
                        <Label className="text-white text-lg font-medium mb-3 block">
                          Hoteles que ha contactado el agente
                        </Label>
                        <Input
                          type="number"
                          value={hotelsContacted}
                          onChange={(e) => setHotelsContacted(Number(e.target.value) || 0)}
                          className="bg-white/95 border-2 border-purple-300 text-gray-800 text-xl font-bold text-center py-4 rounded-xl focus:border-purple-500 focus:ring-purple-500/50"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-white text-lg font-medium mb-3 block">
                          Habitaciones vacías por hotel (promedio)
                        </Label>
                        <Input
                          type="number"
                          value={avgRoomsPerHotel}
                          onChange={(e) => setAvgRoomsPerHotel(Number(e.target.value) || 0)}
                          className="bg-white/95 border-2 border-purple-300 text-gray-800 text-xl font-bold text-center py-4 rounded-xl focus:border-purple-500 focus:ring-purple-500/50"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-white text-lg font-medium mb-3 block">
                          Precio promedio del paquete mensual
                        </Label>
                        <Input
                          type="number"
                          value={avgPricePerMonth}
                          onChange={(e) => setAvgPricePerMonth(Number(e.target.value) || 0)}
                          className="bg-white/95 border-2 border-purple-300 text-gray-800 text-xl font-bold text-center py-4 rounded-xl focus:border-purple-500 focus:ring-purple-500/50"
                        />
                      </div>
                    </div>
                    
                    {/* Commission Info */}
                    <div className="text-center mb-6">
                      <p className="text-yellow-300 text-lg font-medium">
                        5‰ Comisión sobre ventas durante 18 meses + 2,5‰ durante 12 meses
                      </p>
                    </div>
                    
                    {/* Results */}
                    <div className="space-y-4">
                      <div className="bg-purple-800/60 rounded-xl p-6 text-center border border-purple-400/30">
                        <p className="text-white text-lg font-medium mb-2">Comisión estimada mensual:</p>
                        <p className="text-yellow-300 text-3xl font-bold">${formatNumber(monthlyCommission)}</p>
                      </div>
                      
                      <div className="bg-purple-800/60 rounded-xl p-6 text-center border border-purple-400/30">
                        <p className="text-white text-lg font-medium mb-2">Comisión estimada total en 30 meses:</p>
                        <p className="text-yellow-300 text-4xl font-bold">${formatNumber(totalCommission30Months)}</p>
                      </div>
                    </div>
                    
                    <div className="text-center mt-6">
                      <p className="text-white/80 text-sm italic">* Comisiones automáticas sin trabajo posterior</p>
                    </div>
                  </div>
                </div>

                <hr className="border-white/30 my-8" />

                {/* Call to Action */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">{t('join_now_title')}</h2>
                  <p className="text-lg leading-relaxed mb-6">{t('join_now_description')}</p>
                  <Link 
                    to="/agentes/registro" 
                    className="inline-block bg-[#70009E] hover:bg-[#70009E]/80 text-white px-12 py-4 rounded-xl transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl"
                  >
                    {t('join_button')}
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Agents;
