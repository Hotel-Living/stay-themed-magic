
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AdminHotelDetail } from "@/types/hotel";
import { BasicInformation } from "./sections/BasicInformation";
import { LocationInformation } from "./sections/LocationInformation";
import { AccommodationTerms } from "./sections/AccommodationTerms";
import { ThemesActivities } from "./sections/ThemesActivities";
import { FeaturesSection } from "./sections/FeaturesSection";
import { ContactInformation } from "./sections/ContactInformation";
import { FaqSection } from "./sections/FaqSection";
import { ImageGallery } from "./sections/ImageGallery";
import { RoomTypesSection } from "./sections/RoomTypesSection";
import { Card } from "@/components/ui/card";

interface PropertyDetailViewProps {
  hotel: any;
  onEdit?: () => void;
}

export default function PropertyDetailView({ hotel, onEdit }: PropertyDetailViewProps) {
  console.log("PropertyDetailView hotel data:", hotel);
  
  // Helper function to get badge variant based on status
  const getStatusBadge = () => {
    switch (hotel.status) {
      case 'pending':
        return <Badge variant="outline" className="ml-2 bg-yellow-100/20 text-yellow-300 border-yellow-400">Pending Approval</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="ml-2 bg-red-100/20 text-red-300 border-red-400">Rejected</Badge>;
      case 'approved':
        return <Badge variant="outline" className="ml-2 bg-green-100/20 text-green-300 border-green-400">Approved</Badge>;
      default:
        return <Badge variant="outline" className="ml-2 bg-yellow-100/20 text-yellow-300 border-yellow-400">Pending Approval</Badge>;
    }
  };
  
  return (
    <div className="relative bg-fuchsia-950/30 p-4 sm:p-6 rounded-xl">
      {/* Edit Button */}
      <div className="absolute top-4 right-4">
        <Button variant="outline" onClick={onEdit} className="flex items-center gap-2">
          <Edit className="w-4 h-4" /> Edit Property
        </Button>
      </div>

      {/* Property Title with Status Badge */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 pr-24 flex items-center">
        {hotel.name}
        {getStatusBadge()}
      </h2>

      {hotel.rejection_reason && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
          <h3 className="font-semibold text-red-400">Rejection Reason:</h3>
          <p className="mt-1 text-white/80">{hotel.rejection_reason}</p>
        </div>
      )}

      {/* Basic Information Section - Images, Basic Info, Location */}
      <div className="space-y-8">
        <ImageGallery hotel={hotel} />
        <BasicInformation hotel={hotel} />
        <LocationInformation hotel={hotel} />
      </div>

      {/* Property Overview Section */}
      <Card className="p-6 bg-[#5A0080] mb-8 mt-8">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Property Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h4 className="text-sm text-gray-400 mb-2">Check-in / Check-out Day</h4>
            <p className="text-xl font-bold text-white">{hotel.preferredWeekday || "Monday"}</p>
          </div>
          <div className="text-center">
            <h4 className="text-sm text-gray-400 mb-2">Total Available Rooms</h4>
            <p className="text-xl font-bold text-white">
              {hotel.room_types?.reduce((total: number, room: any) => total + (room.roomCount || room.room_count || 0), 0) || 0} rooms
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-sm text-gray-400 mb-2">Availability Dates</h4>
            <p className="text-xl font-bold text-white">
              {hotel.available_months?.length || 0} date periods
            </p>
          </div>
        </div>
      </Card>

      {/* Pricing Section */}
      {hotel.room_types && hotel.room_types.length > 0 && hotel.room_types.some((room: any) => room.rates && Object.keys(room.rates).length > 0) && (
        <Card className="p-6 bg-[#5A0080] mb-8">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Pricing</h3>
          {hotel.room_types.map((room: any, index: number) => {
            if (!room.rates || Object.keys(room.rates).length === 0) return null;
            
            return (
              <div key={index} className="mb-4 last:mb-0">
                <h4 className="font-medium text-purple-300 mb-2">{room.name || `Room Type ${index + 1}`}</h4>
                <p className="text-sm text-gray-400 mb-2">Duration: 32 days</p>
                <p className="text-sm text-gray-400 mb-2">Meal Plan: half board</p>
                {Object.entries(room.rates).map(([duration, price]) => (
                  <p key={duration} className="text-2xl font-bold text-white">${String(price)}</p>
                ))}
              </div>
            );
          })}
        </Card>
      )}

      {/* Hotel Highlights Section */}
      {(hotel.atmosphere || hotel.ideal_guests || hotel.perfect_location) && (
        <Card className="p-6 bg-[#5A0080] mb-8">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Hotel Highlights</h3>
          <div className="space-y-4">
            {hotel.atmosphere && (
              <div>
                <h4 className="text-lg font-medium text-fuchsia-200 mb-2">The atmosphere of this hotel is</h4>
                <p className="text-gray-300">{hotel.atmosphere}</p>
              </div>
            )}
            {hotel.ideal_guests && (
              <div>
                <h4 className="text-lg font-medium text-fuchsia-200 mb-2">This hotel is ideal for guests who enjoy</h4>
                <p className="text-gray-300">{hotel.ideal_guests}</p>
              </div>
            )}
            {hotel.perfect_location && (
              <div>
                <h4 className="text-lg font-medium text-fuchsia-200 mb-2">Our location is perfect for</h4>
                <p className="text-gray-300">{hotel.perfect_location}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Detailed Availability Information - MOVED AFTER BASIC INFO */}
      <Card className="p-6 bg-[#5A0080] mb-8">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Detailed Availability Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-fuchsia-200 mb-3">Available Dates</h4>
            {hotel.available_months && hotel.available_months.length > 0 ? (
              <div className="space-y-2">
                {hotel.available_months.map((month: string, index: number) => (
                  <div key={index} className="px-3 py-2 bg-fuchsia-900/50 rounded text-sm">
                    {month} (Full Month)
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No availability dates specified</p>
            )}
            
            <div className="mt-4">
              <h5 className="font-medium text-fuchsia-200 mb-2">Stay Lengths</h5>
              {hotel.stay_lengths && hotel.stay_lengths.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {hotel.stay_lengths.map((length: number) => (
                    <span key={length} className="px-2 py-1 bg-fuchsia-900/50 rounded text-xs">
                      {length} days
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">No stay lengths specified</p>
              )}
            </div>

            <div className="mt-4">
              <h5 className="font-medium text-fuchsia-200 mb-2">Meal Plans</h5>
              {hotel.meal_plans && hotel.meal_plans.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {hotel.meal_plans.map((plan: string) => (
                    <span key={plan} className="px-2 py-1 bg-fuchsia-900/50 rounded text-xs">
                      {plan}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">No meal plans specified</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-fuchsia-200 mb-3">Room Types & Availability</h4>
            {hotel.room_types && hotel.room_types.length > 0 ? (
              <div className="space-y-3">
                {hotel.room_types.map((room: any, index: number) => (
                  <div key={index} className="p-3 bg-purple-900/20 rounded-lg border border-purple-700/30">
                    <h5 className="font-medium text-purple-300">{room.name || `Room Type ${index + 1}`}</h5>
                    <p className="text-sm text-gray-400">{room.roomCount || room.room_count || 0} rooms available</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No room types specified</p>
            )}
          </div>
        </div>
      </Card>
      
      <div className="space-y-8">
        <AccommodationTerms hotel={hotel} />
        <RoomTypesSection hotel={hotel} />
        <FeaturesSection hotel={hotel} />
        <Card className="p-6 bg-[#5A0080]">
          <ThemesActivities hotel={hotel} />
        </Card>
        <ContactInformation hotel={hotel} />
        <FaqSection hotel={hotel} />
      </div>
    </div>
  );
}
