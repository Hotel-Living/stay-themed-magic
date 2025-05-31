
import React from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { formatCurrency } from "@/utils/dynamicPricing";

export const BasicInfo = ({ hotel }: { hotel: any }) => {
  const renderStars = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <Star 
        key={index} 
        className="h-4 w-4 fill-yellow-500 text-yellow-500" 
      />
    ));
  };
  
  // Parse complex rate keys to extract stay lengths and prices
  const parseRatesData = () => {
    const rates = hotel.rates || {};
    const parsedRates: Record<string, number> = {};
    
    Object.keys(rates).forEach(key => {
      // Check for simple numeric keys (8, 16, 24, 32)
      if (/^\d+$/.test(key)) {
        parsedRates[key] = rates[key];
      }
      // Check for complex keys like "8-breakfast-included" or "16-half-board"
      else if (key.includes('-')) {
        const parts = key.split('-');
        const stayLength = parts[0];
        if (/^\d+$/.test(stayLength)) {
          // Use the stay length as key, taking the first rate found for that duration
          if (!parsedRates[stayLength]) {
            parsedRates[stayLength] = rates[key];
          }
        }
      }
    });
    
    return parsedRates;
  };
  
  // Helper function to display rates in the desired format
  const displayRates = () => {
    const parsedRates = parseRatesData();
    const stayLengths = ["8", "16", "24", "32"];
    const availableRates = stayLengths.filter(length => parsedRates[length]);
    
    if (availableRates.length === 0) {
      // If no rates defined in the new format, use the old pricePerMonth
      return hotel.price_per_month ? `${formatCurrency(hotel.price_per_month, hotel.currency || "USD")}` : "Not specified";
    }
    
    // Start with the lowest stay length that has a rate
    const lowestStayLength = availableRates.sort((a, b) => Number(a) - Number(b))[0];
    const lowestRate = parsedRates[lowestStayLength];
    
    if (availableRates.length === 1) {
      return `From ${formatCurrency(lowestRate, hotel.currency || "USD")} (${lowestStayLength} days)`;
    }
    
    // Show the starting price with shortest duration
    return `From ${formatCurrency(lowestRate, hotel.currency || "USD")} (${lowestStayLength} days)`;
  };

  return (
    <Card className="rounded-xl p-6 bg-[#5A0080]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-fuchsia-200">Hotel Name</h4>
          <p className="text-white">{hotel.name}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-fuchsia-200">Category</h4>
          <div className="flex items-center">
            {hotel.category ? renderStars(hotel.category) : "Not specified"}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-fuchsia-200">Property Type</h4>
          <p className="text-white">{hotel.property_type || "Not specified"}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-fuchsia-200">Style</h4>
          <p className="text-white">{hotel.style || "Not specified"}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-fuchsia-200">Pricing</h4>
          <p className="text-white">{displayRates()}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-fuchsia-200">Status</h4>
          <p className="text-white capitalize">
            {hotel.status === 'pending' ? 'Pending approval' : 
             hotel.status === 'approved' ? 'Approved' : 
             hotel.status === 'rejected' ? 'Rejected' : hotel.status}
          </p>
        </div>
      </div>
      
      {hotel.description && (
        <div className="mt-4">
          <h4 className="font-medium text-fuchsia-200">Description</h4>
          <p className="text-white whitespace-pre-wrap">{hotel.description}</p>
        </div>
      )}
      
      {hotel.rejection_reason && hotel.status === 'rejected' && (
        <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-md">
          <h4 className="font-medium text-red-200">Rejection Reason</h4>
          <p className="text-white">{hotel.rejection_reason}</p>
        </div>
      )}
    </Card>
  );
};
