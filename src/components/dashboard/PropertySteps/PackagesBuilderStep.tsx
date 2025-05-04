
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";

export type PricingRow = {
  id: string;
  roomType: string;
  stayDuration: number;
  mealPlan: string;
  laundryIncluded: boolean;
  price: number | "";
};

export interface PackagesBuilderStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const PackagesBuilderStep: React.FC<PackagesBuilderStepProps> = ({
  formData,
  updateFormData,
  onValidationChange = () => {}
}) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const roomTypes = formData.roomTypes || [];
    const stayDurations = formData.stayLengths || [];
    const mealPlans = formData.mealPlans || [];

    if (!formData.pricingMatrix || formData.pricingMatrix.length === 0) {
      if (roomTypes.length > 0 && stayDurations.length > 0 && mealPlans.length > 0) {
        const matrix: PricingRow[] = [];

        roomTypes.forEach((room: any) => {
          stayDurations.forEach(duration => {
            mealPlans.forEach(plan => {
              matrix.push({
                id: uuidv4(),
                roomType: room.name || room.type,
                stayDuration: duration,
                mealPlan: plan,
                laundryIncluded: false,
                price: ""
              });
            });
          });
        });

        updateFormData("pricingMatrix", matrix);
        setInitialized(true);
      }
    }
  }, [formData.roomTypes, formData.stayLengths, formData.mealPlans, formData.pricingMatrix, updateFormData]);

  // Update price in the matrix
  const updatePrice = (id: string, value: string) => {
    const parsedValue: number | "" = value === "" ? "" : Number(value);

    const updated: PricingRow[] = formData.pricingMatrix.map((row: PricingRow) =>
      row.id === id ? { ...row, price: parsedValue } : row
    );

    updateFormData('pricingMatrix', updated);
  };

  // Toggle laundry inclusion
  const toggleLaundry = (id: string) => {
    const updated = formData.pricingMatrix.map((row: PricingRow) =>
      row.id === id ? { ...row, laundryIncluded: !row.laundryIncluded } : row
    );
    updateFormData('pricingMatrix', updated);
  };

  // Format meal plan for display
  const formatMealPlan = (planId: string): string => {
    switch(planId) {
      case "breakfast": return "Breakfast";
      case "halfBoard": return "Half Board";
      case "fullBoard": return "Full Board";
      case "allInclusive": return "All Inclusive";
      default: return planId;
    }
  };

  // Validate if all prices have been set
  useEffect(() => {
    if (formData.pricingMatrix) {
      const allComplete = formData.pricingMatrix.every(
        (row: PricingRow) => 
          row.price !== null && 
          row.price !== undefined && 
          row.price !== "" && 
          !isNaN(Number(row.price))
      );
      onValidationChange(allComplete);
    }
  }, [formData.pricingMatrix, onValidationChange]);

  if (!formData.pricingMatrix) {
    return <div className="text-center p-8">Loading pricing matrix...</div>;
  }

  // Group the matrix by room type for better organization
  const matrixByRoom: Record<string, PricingRow[]> = {};
  formData.pricingMatrix.forEach((row: PricingRow) => {
    if (!matrixByRoom[row.roomType]) {
      matrixByRoom[row.roomType] = [];
    }
    matrixByRoom[row.roomType].push(row);
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4 text-white">PACKAGES & PRICING</h2>
      <p className="text-sm text-gray-300 mb-6">
        Define exact prices for each room type, duration, and meal plan combination. 
        All fields need to be completed before moving forward.
      </p>

      {Object.keys(matrixByRoom).map((roomType) => (
        <Card key={roomType} className="p-4 bg-fuchsia-950/30 mb-6">
          <h3 className="font-semibold text-lg mb-4 text-fuchsia-300">{roomType}</h3>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-fuchsia-800/40">
                <TableHead className="py-2 pl-2">Stay Duration</TableHead>
                <TableHead className="py-2">Meal Plan</TableHead>
                <TableHead className="py-2">Laundry</TableHead>
                <TableHead className="py-2">Price (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matrixByRoom[roomType].map((row: PricingRow) => (
                <TableRow key={row.id} className="border-b border-fuchsia-800/20">
                  <TableCell className="py-3 pl-2">{row.stayDuration} days</TableCell>
                  <TableCell className="py-3">{formatMealPlan(row.mealPlan)}</TableCell>
                  <TableCell className="py-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={row.laundryIncluded}
                        onChange={() => toggleLaundry(row.id)}
                        className="w-4 h-4 rounded border-fuchsia-300 text-fuchsia-600 bg-fuchsia-900/30"
                      />
                      <span className="text-sm">Included</span>
                    </label>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input
                        type="number"
                        value={row.price}
                        onChange={(e) => updatePrice(row.id, e.target.value)}
                        className="w-24 py-1 px-2 rounded bg-fuchsia-900/40 border border-fuchsia-800/40 text-white"
                        placeholder="0"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ))}

      <div className="bg-fuchsia-900/20 p-4 rounded-lg mt-6">
        <h4 className="font-medium mb-2">Pricing Guidelines</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
          <li>All prices should be in USD.</li>
          <li>Prices should reflect the total cost for the selected duration.</li>
          <li>Include any applicable taxes in your prices.</li>
          <li>All price fields must be completed before you can proceed.</li>
        </ul>
      </div>
    </div>
  );
};
