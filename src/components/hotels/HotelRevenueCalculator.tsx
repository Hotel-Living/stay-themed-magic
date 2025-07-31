import React, { useState, useMemo } from 'react';
import { useTranslation } from "@/hooks/useTranslation";

export function HotelRevenueCalculator() {
  const { language } = useTranslation();
  const [emptyRooms, setEmptyRooms] = useState<string>('10');
  const [monthlyPrice, setMonthlyPrice] = useState<string>('1500');

  const calculatedRevenue = useMemo(() => {
    const rooms = parseFloat(emptyRooms) || 0;
    const price = parseFloat(monthlyPrice) || 0;
    
    if (rooms <= 0 || price <= 0) return 0;
    
    // Formula: (Empty rooms × 365 ÷ 28) × Monthly price
    return Math.round((rooms * 365 / 28) * price);
  }, [emptyRooms, monthlyPrice]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getLabels = () => {
    switch (language) {
      case 'es':
        return {
          emptyRoomsLabel: 'SUS HABITACIONES VACÍAS\nPROMEDIO DIARIAS?',
          monthlyPriceLabel: 'PRECIO MENSUAL\n(USD)?',
          resultTitle: 'INGRESOS ADICIONALES ANUALES*',
          resultPrefix: ''
        };
      case 'pt':
        return {
          emptyRoomsLabel: 'SEUS QUARTOS VAZIOS\nMÉDIOS DIÁRIOS?',
          monthlyPriceLabel: 'PREÇO MENSAL\n(USD)?',
          resultTitle: 'RECEITA ADICIONAL ANUAL*',
          resultPrefix: ''
        };
      case 'ro':
        return {
          emptyRoomsLabel: 'CAMERELE DUMNEAVOASTRĂ GOALE\nZILNICE ÎN MEDIE?',
          monthlyPriceLabel: 'PREȚ LUNAR\n(USD)?',
          resultTitle: 'VENITURI SUPLIMENTARE ANUALE*',
          resultPrefix: ''
        };
      default:
        return {
          emptyRoomsLabel: 'YOUR AVERAGE DAILY\nEMPTY ROOMS?',
          monthlyPriceLabel: 'AVERAGE MONTHLY\nPRICE (USD)?',
          resultTitle: 'ADDITIONAL YEARLY REVENUE*',
          resultPrefix: ''
        };
    }
  };

  const labels = getLabels();

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-8 animate-fade-in">
      {/* Blue glow wrapper for calculator */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-90 transition-opacity duration-300"></div>
        <div className="relative">
          
          {/* Calculator Box */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Empty Rooms Input */}
                 <div className="space-y-2">
                    <label className="block text-white font-bold text-base text-center whitespace-pre-line uppercase">
                     {labels.emptyRoomsLabel}
                   </label>
                  <input
                    type="number"
                    value={emptyRooms}
                    onChange={(e) => setEmptyRooms(e.target.value)}
                    placeholder="0"
                    min="0"
                    step="1"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300 text-center text-xl"
                  />
                </div>
                
                 {/* Monthly Price Input */}
                 <div className="space-y-2">
                   <label className="block text-white font-bold text-base text-center whitespace-pre-line uppercase">
                     {labels.monthlyPriceLabel}
                   </label>
                  <input
                    type="number"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    placeholder="1500"
                    min="0"
                    step="50"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300 text-center text-xl"
                  />
                </div>
              </div>
              
              {/* Result Display */}
              <div className="mt-6 p-4 bg-white/15 backdrop-blur-sm rounded-lg border border-white/20 text-center space-y-2">
                <p className="text-white text-lg font-semibold uppercase">
                  {labels.resultTitle}
                </p>
                <p className="text-white text-2xl font-bold">
                  {formatCurrency(calculatedRevenue)} USD
                </p>
                <div className="mt-3">
                  <p className="text-white/80 text-sm text-center">
                    (Almost pure profit: empty rooms<br />
                    already have all fixed costs paid)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}