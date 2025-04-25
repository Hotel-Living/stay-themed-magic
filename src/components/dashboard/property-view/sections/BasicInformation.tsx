
import React from 'react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";

interface BasicInformationProps {
  hotel: Hotel;
}

export const BasicInformation = ({ hotel }: BasicInformationProps) => {
  return (
    <Card className="p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Category/Stars</p>
          <p className="font-medium">{hotel.category || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Property Type</p>
          <p className="font-medium">{hotel.property_type || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Style</p>
          <p className="font-medium">{hotel.style || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Price Per Month</p>
          <p className="font-medium">${hotel.price_per_month}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Description</p>
          <p className="font-medium whitespace-pre-wrap">{hotel.description || "No description provided."}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Ideal Guests</p>
          <p className="font-medium">{hotel.ideal_guests || "Not specified"}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Atmosphere</p>
          <p className="font-medium">{hotel.atmosphere || "Not specified"}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Perfect Location</p>
          <p className="font-medium">{hotel.perfect_location || "Not specified"}</p>
        </div>
      </div>
    </Card>
  );
};
