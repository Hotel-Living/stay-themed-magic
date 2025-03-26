
import React from "react";
import { LengthOfStaysSection } from "./sections/LengthOfStaysSection";
import { PricingSection } from "./sections/PricingSection";
import { DynamicPricingSection } from "./sections/DynamicPricingSection";
import { RoomTypesSection } from "./sections/RoomTypesSection";

export default function RoomsAndPricingStep() {
  return (
    <div className="space-y-6">
      <LengthOfStaysSection />
      <PricingSection />
      <DynamicPricingSection />
      <RoomTypesSection />
    </div>
  );
}
