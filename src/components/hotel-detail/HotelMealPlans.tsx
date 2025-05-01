// RUTA: src/components/hotel-detail/HotelMealPlans.tsx

import React from "react";

interface HotelMealPlansProps {
  plans: string[];
}

export const HotelMealPlans: React.FC<HotelMealPlansProps> = ({ plans }) => {
  if (!plans || plans.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Meal Plans</h3>
      <ul className="list-disc list-inside text-gray-700">
        {plans.map((plan, index) => (
          <li key={index}>{plan}</li>
        ))}
      </ul>
    </div>
  );
};
