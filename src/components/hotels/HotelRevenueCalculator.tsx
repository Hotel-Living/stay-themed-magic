import React, { useState, useMemo } from 'react';
import { useTranslation } from "@/hooks/useTranslation";

export function HotelRevenueCalculator() {
  const { language } = useTranslation();
  const [emptyRooms, setEmptyRooms] = useState<string>('');
  const [monthlyPrice, setMonthlyPrice] = useState<string>('1500');

  const calculatedRevenue = useMemo(() => {
    const rooms = parseFloat(emptyRooms) || 0;
    const price = parseFloat(monthlyPrice) || 0;
    
    if (rooms <= 0 || price <= 0) return 0;
    
    // Formula: (Empty rooms × 365 ÷ 12) × Monthly price
    return Math.round((rooms * 365 / 12) * price);
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
          title: 'CALCULADORA EN LÍNEA (¹)',
          emptyRoomsLabel: 'Sus habitaciones vacías promedio diarias?',
          monthlyPriceLabel: 'Precio mensual (USD)',
          resultLabel: 'Ingresos adicionales estimados: USD',
          perMonth: '/ mes'
        };
      case 'pt':
        return {
          title: 'CALCULADORA ONLINE (¹)',
          emptyRoomsLabel: 'Seus quartos vazios médios diários?',
          monthlyPriceLabel: 'Preço mensal (USD)',
          resultLabel: 'Receita adicional estimada: USD',
          perMonth: '/ mês'
        };
      case 'ro':
        return {
          title: 'CALCULATOR ONLINE (¹)',
          emptyRoomsLabel: 'Camerele goale zilnice în medie?',
          monthlyPriceLabel: 'Preț lunar (USD)',
          resultLabel: 'Venituri suplimentare estimate: USD',
          perMonth: '/ lună'
        };
      default:
        return {
          title: 'ONLINE CALCULATOR (¹)',
          emptyRoomsLabel: 'Your average daily empty rooms?',
          monthlyPriceLabel: 'Monthly price (USD)',
          resultLabel: 'Estimated additional revenue: USD',
          perMonth: '/ month'
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
          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-white mb-6 tracking-wide">
            {labels.title}
          </h2>
          
          {/* Calculator Box */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Empty Rooms Input */}
                <div className="space-y-2">
                  <label className="block text-white font-medium text-sm">
                    {labels.emptyRoomsLabel}
                  </label>
                  <input
                    type="number"
                    value={emptyRooms}
                    onChange={(e) => setEmptyRooms(e.target.value)}
                    placeholder="0"
                    min="0"
                    step="1"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                {/* Monthly Price Input */}
                <div className="space-y-2">
                  <label className="block text-white font-medium text-sm">
                    {labels.monthlyPriceLabel}
                  </label>
                  <input
                    type="number"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    placeholder="1500"
                    min="0"
                    step="50"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              {/* Result Display */}
              <div className="mt-6 p-4 bg-white/15 backdrop-blur-sm rounded-lg border border-white/20">
                <p className="text-white text-lg font-semibold text-center">
                  {labels.resultLabel} {formatCurrency(calculatedRevenue)} {labels.perMonth}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}