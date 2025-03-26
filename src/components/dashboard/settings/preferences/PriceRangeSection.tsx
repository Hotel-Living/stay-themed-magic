
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface PriceRangeSectionProps {
  minPrice: number;
  maxPrice: number;
  onPriceRangeChange: (values: number[]) => void;
}

export const PriceRangeSection: React.FC<PriceRangeSectionProps> = ({
  minPrice,
  maxPrice,
  onPriceRangeChange
}) => {
  return (
    <div className="space-y-3">
      <h4 className="text-md font-medium">Price Range (per month)</h4>
      <p className="text-sm text-muted-foreground">
        Set your preferred price range for hotels
      </p>
      
      <div className="px-3 pt-6 pb-2">
        <Slider 
          min={0} 
          max={10000} 
          step={100}
          value={[minPrice, maxPrice]}
          onValueChange={onPriceRangeChange}
          className="my-6"
        />
        
        <div className="flex justify-between mt-2">
          <div>
            <span className="text-sm font-medium">Min:</span>
            <span className="ml-1 text-fuchsia-400">${minPrice}</span>
          </div>
          <div>
            <span className="text-sm font-medium">Max:</span>
            <span className="ml-1 text-fuchsia-400">${maxPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
