
import React from 'react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";

interface ContactInformationProps {
  hotel: Hotel;
}

export const ContactInformation = ({ hotel }: ContactInformationProps) => {
  return (
    <Card className="p-6 bg-[#5d0083]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Contact Name</p>
          <p className="font-medium">{hotel.contact_name || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Contact Email</p>
          <p className="font-medium">{hotel.contact_email || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Contact Phone</p>
          <p className="font-medium">{hotel.contact_phone || "Not specified"}</p>
        </div>
      </div>
    </Card>
  );
};
