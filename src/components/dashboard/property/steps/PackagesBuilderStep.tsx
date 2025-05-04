
import React, { useEffect, useState } from "react";
import { PropertyFormData, PricingRow } from "../hooks/usePropertyFormData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PackagesBuilderStepProps {
  formData: PropertyFormData;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const PackagesBuilderStep = ({
  formData,
  updateFormData,
  onValidationChange = () => {}
}: PackagesBuilderStepProps) => {
  const [pricingMatrix, setPricingMatrix] = useState<PricingRow[]>([]);
  const [isValid, setIsValid] = useState(false);

  // Initialize pricing matrix from form data or generate it
  useEffect(() => {
    if (formData.pricingMatrix?.length) {
      setPricingMatrix(formData.pricingMatrix);
    } else {
      generatePricingMatrix();
    }
  }, [formData.roomTypes, formData.stayLengths, formData.mealPlans]);

  // Generate the pricing matrix based on selected options
  const generatePricingMatrix = () => {
    const roomTypes = formData.roomTypes || [];
    const stayDurations = formData.stayLengths || [];
    const mealPlans = formData.mealPlans || [];
    
    if (!roomTypes.length || !stayDurations.length || !mealPlans.length) {
      return;
    }

    const newMatrix: PricingRow[] = [];
    
    roomTypes.forEach(room => {
      stayDurations.forEach(duration => {
        mealPlans.forEach(mealPlan => {
          // Check if this combination already exists in pricingMatrix
          const existingRow = pricingMatrix.find(
            row => row.roomType === room.name && 
                  row.stayDuration === duration && 
                  row.mealPlan === mealPlan
          );
          
          newMatrix.push({
            id: `${room.name}-${duration}-${mealPlan}`,
            roomType: room.name,
            stayDuration: duration,
            mealPlan: mealPlan,
            price: existingRow ? existingRow.price : ''
          });
        });
      });
    });
    
    setPricingMatrix(newMatrix);
  };

  // Update price for a specific row - Fixed to ensure correct type handling
  const updatePrice = (id: string, value: string | number) => {
    const numericValue = value === '' ? '' : Number(value);
    const updatedMatrix = pricingMatrix.map(row => 
      row.id === id ? { ...row, price: numericValue } : row
    );
    
    setPricingMatrix(updatedMatrix);
    updateFormData('pricingMatrix', updatedMatrix);
  };

  // Check if all prices are filled in
  useEffect(() => {
    if (pricingMatrix.length === 0) return;
    
    const allFilled = pricingMatrix.every(row => 
      row.price !== null && 
      row.price !== undefined && 
      row.price !== '' && 
      !isNaN(Number(row.price))
    );
    
    setIsValid(allFilled);
    onValidationChange(allFilled);
  }, [pricingMatrix, onValidationChange]);

  // Apply the same price to all rows
  const applyBulkPrice = (price: number) => {
    const updatedMatrix = pricingMatrix.map(row => ({
      ...row,
      price: price
    }));
    
    setPricingMatrix(updatedMatrix);
    updateFormData('pricingMatrix', updatedMatrix);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Packages & Pricing</h3>
        <div className="flex space-x-2 items-center">
          <Input
            type="number"
            placeholder="Bulk price"
            className="w-24"
            id="bulk-price"
          />
          <Button 
            onClick={() => {
              const input = document.getElementById('bulk-price') as HTMLInputElement;
              if (input && input.value) {
                applyBulkPrice(Number(input.value));
              }
            }}
            size="sm"
          >
            Apply to All
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-red-400">
        All prices must be filled in before you can proceed to the next step.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-fuchsia-950/50">
              <th className="border px-4 py-2 text-left">Room Type</th>
              <th className="border px-4 py-2 text-left">Duration (nights)</th>
              <th className="border px-4 py-2 text-left">Meal Plan</th>
              <th className="border px-4 py-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {pricingMatrix.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? "bg-fuchsia-950/20" : ""}>
                <td className="border px-4 py-2">{row.roomType}</td>
                <td className="border px-4 py-2">{row.stayDuration}</td>
                <td className="border px-4 py-2">{row.mealPlan}</td>
                <td className="border px-4 py-2 w-32">
                  <Input
                    type="number"
                    value={row.price === '' ? '' : row.price}
                    onChange={(e) => updatePrice(row.id, e.target.value)}
                    className={`w-full ${row.price === '' ? 'border-red-400' : ''}`}
                    placeholder="Price"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {!isValid && (
        <p className="text-sm text-red-400">
          Please enter prices for all room combinations.
        </p>
      )}
    </div>
  );
};
