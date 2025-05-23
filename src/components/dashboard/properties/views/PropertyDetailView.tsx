
import React from 'react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";
import { ImageGallery } from "../../property-view/sections/ImageGallery";
import { ThemesActivities } from "../../property-view/sections/ThemesActivities";

interface PropertyDetailViewProps {
  hotel: Hotel;
  onBack: () => void;
  onEdit: () => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ 
  hotel, 
  onBack, 
  onEdit 
}) => {
  console.log("PropertyDetailView - Hotel data:", hotel);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          className="px-4 py-2 rounded bg-fuchsia-700 text-white"
          onClick={onBack}
        >
          ← Back to Properties
        </button>
        <button
          className="px-4 py-2 rounded bg-green-600 text-white"
          onClick={onEdit}
        >
          Edit Property
        </button>
      </div>
      
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Basic Information */}
        <Card className="p-6 bg-[#2A0F44]">
          <h2 className="text-2xl font-bold text-white mb-4">{hotel.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
            <div>
              <h4 className="font-medium text-fuchsia-200">Location</h4>
              <p>{hotel.city}, {hotel.country}</p>
              {hotel.address && <p className="text-sm text-gray-300">{hotel.address}</p>}
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
              <h4 className="font-medium text-fuchsia-200">Category</h4>
              <p>{hotel.category ? `${hotel.category} Stars` : "Not specified"}</p>
            </div>
          </div>
          
          {hotel.description && (
            <div className="mt-4">
              <h4 className="font-medium text-fuchsia-200">Description</h4>
              <p className="text-white whitespace-pre-wrap">{hotel.description}</p>
            </div>
          )}
        </Card>

        {/* Hotel Highlights - The Missing Sections */}
        {(hotel.atmosphere || hotel.ideal_guests || hotel.perfect_location) && (
          <Card className="p-6 bg-[#2A0F44]">
            <h3 className="text-xl font-semibold text-white mb-4">Hotel Highlights</h3>
            <div className="space-y-4 text-white">
              {hotel.atmosphere && (
                <div>
                  <h4 className="font-medium text-fuchsia-200">The atmosphere of this hotel is</h4>
                  <p>{hotel.atmosphere}</p>
                </div>
              )}
              {hotel.ideal_guests && (
                <div>
                  <h4 className="font-medium text-fuchsia-200">This hotel is ideal for guests who enjoy</h4>
                  <p>{hotel.ideal_guests}</p>
                </div>
              )}
              {hotel.perfect_location && (
                <div>
                  <h4 className="font-medium text-fuchsia-200">Our location is perfect for</h4>
                  <p>{hotel.perfect_location}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Images */}
        <ImageGallery hotel={hotel} />
        
        {/* Themes and Activities */}
        <ThemesActivities hotel={hotel} />
        
        {/* Status Information */}
        <Card className="p-6 bg-[#2A0F44]">
          <h3 className="text-xl font-semibold text-white mb-4">Status Information</h3>
          <div className="text-white">
            <div className="mb-2">
              <span className="font-medium text-fuchsia-200">Current Status: </span>
              <span className={`px-2 py-1 rounded text-sm ${
                hotel.status === 'approved' ? 'bg-green-600' :
                hotel.status === 'pending' ? 'bg-yellow-600' :
                'bg-red-600'
              }`}>
                {hotel.status === 'pending' ? 'Pending Approval' : 
                 hotel.status === 'approved' ? 'Approved' : 
                 hotel.status === 'rejected' ? 'Rejected' : hotel.status}
              </span>
            </div>
            {hotel.rejection_reason && hotel.status === 'rejected' && (
              <div className="mt-3 p-3 bg-red-900/30 border border-red-700 rounded">
                <h4 className="font-medium text-red-200">Rejection Reason</h4>
                <p className="text-white">{hotel.rejection_reason}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
