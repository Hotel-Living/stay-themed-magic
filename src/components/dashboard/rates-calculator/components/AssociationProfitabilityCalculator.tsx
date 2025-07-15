import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const AssociationProfitabilityCalculator: React.FC = () => {
  const { t } = useTranslation('hotelAssociation');
  
  // Input state
  const [hotelMembers, setHotelMembers] = useState<number>(1000);
  const [emptyRoomsPerDay, setEmptyRoomsPerDay] = useState<number>(10);
  const [monthlyPrice, setMonthlyPrice] = useState<number>(1300);
  
  // Calculated values
  const [totalEmptyRoomsPerYear, setTotalEmptyRoomsPerYear] = useState<number>(0);
  const [totalMonthlyPackages, setTotalMonthlyPackages] = useState<number>(0);
  const [estimatedGrossRevenue, setEstimatedGrossRevenue] = useState<number>(0);
  const [commission, setCommission] = useState<number>(0);

  // Calculate values whenever inputs change
  useEffect(() => {
    const emptyRoomsYear = hotelMembers * emptyRoomsPerDay * 365;
    const monthlyPackages = Math.floor(emptyRoomsYear / 29);
    const grossRevenue = monthlyPackages * monthlyPrice;
    const commissionAmount = grossRevenue * 0.04;

    setTotalEmptyRoomsPerYear(emptyRoomsYear);
    setTotalMonthlyPackages(monthlyPackages);
    setEstimatedGrossRevenue(grossRevenue);
    setCommission(commissionAmount);
  }, [hotelMembers, emptyRoomsPerDay, monthlyPrice]);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-foreground">
          {t('calculator.title')}
        </h2>
      </div>

      {/* Calculator Card */}
      <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/20">
        <div className="space-y-8">
          
            {/* Input Fields */}
            <div className="space-y-6">
              {/* Hotel Members */}
              <div className="space-y-2">
                <Label htmlFor="hotel-members" className="text-lg font-medium text-foreground uppercase tracking-wide">
                  {t('calculator.hotelMembers')}
                </Label>
                <Input
                  id="hotel-members"
                  type="number"
                  value={hotelMembers}
                  onChange={(e) => setHotelMembers(Number(e.target.value))}
                  className="w-full text-lg font-semibold bg-white text-black border-2 border-border/30 rounded-lg p-4 focus:border-primary/50"
                  placeholder="Número de hoteles"
                />
              </div>

              {/* Empty Rooms Per Day */}
              <div className="space-y-2">
                <Label htmlFor="empty-rooms" className="text-lg font-medium text-foreground uppercase tracking-wide">
                  {t('calculator.emptyRooms')}
                </Label>
                <Input
                  id="empty-rooms"
                  type="number"
                  value={emptyRoomsPerDay}
                  onChange={(e) => setEmptyRoomsPerDay(Number(e.target.value))}
                  className="w-full text-lg font-semibold bg-white text-black border-2 border-border/30 rounded-lg p-4 focus:border-primary/50"
                  placeholder="Habitaciones vacías por día"
                />
              </div>

              {/* Monthly Price */}
              <div className="space-y-2">
                <Label htmlFor="monthly-price" className="text-lg font-medium text-foreground uppercase tracking-wide">
                  {t('calculator.monthlyPrice')}
                </Label>
                <Input
                  id="monthly-price"
                  type="number"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                  className="w-full text-lg font-semibold bg-white text-black border-2 border-border/30 rounded-lg p-4 focus:border-primary/50"
                  placeholder="Precio promedio mensual"
                />
              </div>
            </div>

          {/* Results Section */}
          <div className="space-y-6 pt-6 border-t border-border/20">
            {/* Hidden calculations for reference */}
            <div className="hidden">
              <div>Total empty rooms per year: {formatNumber(totalEmptyRoomsPerYear)}</div>
              <div>Total monthly packages: {formatNumber(totalMonthlyPackages)}</div>
              <div>Estimated gross revenue: {formatCurrency(estimatedGrossRevenue)}</div>
            </div>

            {/* Final Commission Result */}
            <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20">
              <div className="text-center">
                <div className="text-base font-medium text-foreground/70 uppercase tracking-wider mb-2">
                  {t('calculator.commissionLabel')}
                </div>
                <div className="text-5xl md:text-6xl font-bold text-primary">
                  {formatCurrency(commission)}
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="pt-4 border-t border-border/10">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('calculator.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};