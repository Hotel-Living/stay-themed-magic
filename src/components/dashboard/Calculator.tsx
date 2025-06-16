
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Calculator = () => {
  const [nights, setNights] = useState<number>(8);
  const [occupancy, setOccupancy] = useState<number>(75);
  const [price, setPrice] = useState<number>(85);
  
  const calculateRevenue = () => {
    return nights * occupancy * price;
  };

  return (
    <Card className="glass-card bg-[#5d0478] border-purple-400/20">
      <CardHeader>
        <CardTitle className="text-white text-center">Revenue Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-fuchsia-200 mb-2">
              Nights per Stay
            </label>
            <Input
              type="number"
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="bg-white/10 border-fuchsia-300 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-fuchsia-200 mb-2">
              Occupancy Rate (%)
            </label>
            <Input
              type="number"
              value={occupancy}
              onChange={(e) => setOccupancy(Number(e.target.value))}
              className="bg-white/10 border-fuchsia-300 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-fuchsia-200 mb-2">
              Price per Night ($)
            </label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="bg-white/10 border-fuchsia-300 text-white"
            />
          </div>
        </div>
        
        <div className="text-center pt-4">
          <div className="bg-fuchsia-900/30 rounded-lg p-4">
            <p className="text-sm text-fuchsia-300 mb-2">Estimated Revenue</p>
            <p className="text-2xl font-bold text-white">${calculateRevenue().toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
