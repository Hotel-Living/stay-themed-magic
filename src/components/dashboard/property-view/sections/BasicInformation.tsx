
import React from 'react';
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { formatCurrency } from "@/utils/dynamicPricing";

export const BasicInformation = ({ hotel }) => {
  const renderStars = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <Star key={index} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
    ));
  };
  
  // Helper function to display rates in the desired format
  const displayRates = () => {
    const rates = hotel.rates || {};
    const stayLengths = ["8", "16", "24", "32"];
    const availableRates = stayLengths.filter(length => rates[length]);
    
    if (availableRates.length === 0) {
      // If no rates defined in the new format, use the old pricePerMonth
      return hotel.price_per_month ? `${formatCurrency(hotel.price_per_month, hotel.currency || "USD")}` : "Not specified";
    }
    
    return (
      <>
        From: {availableRates.map(length => 
          `${formatCurrency(rates[length], hotel.currency || "USD")} (${length} days)`
        ).join(" · ")}
      </>
    );
  };

  return (
    <Card className="p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-fuchsia-200">Category</h4>
          <div className="flex items-center mt-1">
            {hotel.category ? renderStars(hotel.category) : <span className="text-gray-400">Not specified</span>}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-fuchsia-200">Property Type</h4>
          <p>{hotel.property_type || "Not specified"}</p>
        </div>

        <div>
          <h4 className="font-medium text-fuchsia-200">Style</h4>
          <p>{hotel.style || "Not specified"}</p>
        </div>

        <div>
          <h4 className="font-medium text-fuchsia-200">Pricing</h4>
          <p>{displayRates()}</p>
        </div>

        <div className="col-span-1 md:col-span-2">
          <h4 className="font-medium text-fuchsia-200">Description</h4>
          <p>{hotel.description || "No description provided."}</p>
        </div>
      </div>
    </Card>
  );
};
