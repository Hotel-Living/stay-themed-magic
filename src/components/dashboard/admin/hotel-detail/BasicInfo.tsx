
import React from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { formatCurrency } from "@/utils/dynamicPricing";

export const BasicInfo = ({ hotel }) => {
  const renderStars = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <Star 
        key={index} 
        className="h-4 w-4 fill-yellow-500 text-yellow-500" 
      />
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
    <Card className="rounded-xl p-6 bg-[#2A0F44]">
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
