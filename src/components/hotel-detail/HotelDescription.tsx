import React from "react";
interface HotelDescriptionProps {
  description: string | null;
}
export function HotelDescriptionSection({
  description
}: HotelDescriptionProps) {
  if (!description) return null;
  return <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2 text-white">THE HOTEL AT A GLANCE...</h2>
      <p className="text-white">
        {description || "No description available for this hotel."}
      </p>
    </div>;
}