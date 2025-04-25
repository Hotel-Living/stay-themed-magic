
import React from 'react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";

interface LocationInformationProps {
  hotel: Hotel;
}

export const LocationInformation = ({ hotel }: LocationInformationProps) => {
  return (
    <Card className="p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Location</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Country</p>
          <p className="font-medium">{hotel.country || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">City</p>
          <p className="font-medium">{hotel.city || "Not specified"}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Address</p>
          <p className="font-medium">{hotel.address || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Postal Code</p>
          <p className="font-medium">{hotel.postal_code || "Not specified"}</p>
        </div>
      </div>
    </Card>
  );
};
