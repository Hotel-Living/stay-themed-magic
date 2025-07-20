import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { useTranslation } from "@/hooks/useTranslation";
import BubbleCounter from "@/components/common/BubbleCounter";

const Agents = () => {
  const { t } = useTranslation('agents');

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
                  <h2 className="text-2xl font-bold mb-4">💰 Comisiones</h2>
                  <p className="text-lg leading-relaxed mb-4">{t('commissions')}</p>
                </div>

                <hr className="border-white/30 my-8" />

                {/* Panel Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">📊 Panel de Control</h2>
                  <p className="text-lg leading-relaxed">{t('panel_description')}</p>
                </div>

                <hr className="border-white/30 my-8" />

                {/* Bank Requirements */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">🏦 Requisitos de Pago</h2>
                  <p className="text-lg leading-relaxed">{t('bank_data')}</p>
                </div>

                <hr className="border-white/30 my-8" />

                {/* Call to Action */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">🚀 ¡Únete Ahora!</h2>
                  <p className="text-lg leading-relaxed mb-6">Comienza tu camino como agente de Hotel Living y genera ingresos pasivos durante 30 meses por cada hotel que registres.</p>
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