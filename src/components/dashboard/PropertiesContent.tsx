import React, { useState, useEffect } from 'react';
import { Building, Edit } from "lucide-react";
import EmptyState from "./EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useMyProperties } from "@/hooks/useMyProperties";
import { HotelCard } from "@/components/HotelCard";
import AddProperty from "./AddProperty";
import { Hotel } from "@/integrations/supabase/types-custom";
import { Card } from "@/components/ui/card";

export function formatStayLengths(value: unknown): React.ReactNode {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }
  return <></>;
}

export const PropertiesContent = () => {
  const { user } = useAuth();
  const [editingHotelId, setEditingHotelId] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  if (!user) {
    return (
      <EmptyState
        icon={<Building className="w-8 h-8" />}
        title="No Properties Found"
        description="You haven't added any properties yet. Add your first property to get started."
      />
    );
  }

  const { data: hotels, isLoading } = useMyProperties(user.id);
  
  useEffect(() => {
    if (hotels && hotels.length > 0) {
      console.log("Loaded hotel properties:", hotels);
    }
  }, [hotels]);

  const handleViewDetails = (hotel) => {
    setSelectedHotel(hotel);
    setEditingHotelId(null);
  };

  const handleBackToList = () => {
    setSelectedHotel(null);
    setEditingHotelId(null);
  };

  if (editingHotelId) {
    return (
      <div>
        <button
          className="mb-3 px-4 py-2 rounded bg-fuchsia-700 text-white"
          onClick={handleBackToList}
        >
          Back to My Properties
        </button>
        <AddProperty editingHotelId={editingHotelId} onDoneEditing={handleBackToList} />
      </div>
    );
  }

  if (selectedHotel) {
    return (
      <div>
        <button
          className="mb-3 px-4 py-2 rounded bg-fuchsia-700 text-white"
          onClick={handleBackToList}
        >
          Back to My Properties
        </button>
        <PropertyDetailView 
          hotel={selectedHotel} 
          onEdit={() => setEditingHotelId(selectedHotel.id)} 
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 animate-pulse h-80 bg-[#5c0869]" />
        ))}
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <EmptyState
        icon={<Building className="w-8 h-8" />}
        title="No Properties Found"
        description="You haven't added any properties yet. Add your first property to get started."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="relative group">
          <div onClick={() => handleViewDetails(hotel)} className="cursor-pointer">
            <HotelCard
              id={hotel.id}
              name={hotel.name}
              city={hotel.city}
              country={hotel.country}
              stars={hotel.category || 0}
              pricePerMonth={hotel.price_per_month || 0}
              themes={(hotel.hotel_themes || []).map((ht) => ht.themes)}
              image={
                hotel.main_image_url
                  ? hotel.main_image_url
                  : hotel.hotel_images && hotel.hotel_images.length > 0
                  ? hotel.hotel_images[0].image_url
                  : "/placeholder.svg"
              }
              availableMonths={hotel.available_months || []}
            />
          </div>
          <button
            className="absolute top-2 right-2 z-10 bg-fuchsia-600/90 text-white rounded-full p-2 shadow hover:bg-fuchsia-700 transition-opacity opacity-90 group-hover:opacity-100"
            title="Edit this property"
            onClick={() => setEditingHotelId(hotel.id)}
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

const PropertyDetailView = ({ hotel, onEdit }) => {
  if (!hotel) return null;

  const formatArrayData = (arr) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) {
      return "None specified";
    }
    return arr.join(", ");
  };

  const renderFeatures = (features) => {
    if (!features || Object.keys(features).length === 0) {
      return <p>No features specified</p>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {Object.entries(features)
          .filter(([_, selected]) => selected)
          .map(([featureId]) => (
            <span 
              key={featureId} 
              className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm"
            >
              {featureId.replace(/_/g, ' ')}
            </span>
          ))
        }
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{hotel.name}</h2>
        <button
          onClick={onEdit}
          className="px-4 py-2 rounded bg-fuchsia-700 text-white flex items-center gap-2"
        >
          <Edit className="w-4 h-4" /> Edit Property
        </button>
      </div>

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

      <Card className="p-6 bg-[#2A0F44]">
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

      <Card className="p-6 bg-[#2A0F44]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Features</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h4 className="font-medium text-lg text-fuchsia-200 mb-2">Hotel Features</h4>
            {renderFeatures(hotel.features_hotel)}
          </div>
          <div>
            <h4 className="font-medium text-lg text-fuchsia-200 mb-2">Room Features</h4>
            {renderFeatures(hotel.features_room)}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-[#2A0F44]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Accommodation Terms</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm text-gray-400">Available Months</p>
            <p className="font-medium">{formatArrayData(hotel.available_months)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Meal Plans</p>
            <p className="font-medium">{formatArrayData(hotel.meal_plans)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Stay Lengths</p>
            {formatStayLengths(hotel.stay_lengths)}
          </div>
          <div>
            <p className="text-sm text-gray-400">Preferred Check-in Day</p>
            <p className="font-medium">{hotel.preferredWeekday || "Monday"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Room Types</p>
            <div className="mt-2 space-y-2">
              {Array.isArray(hotel.room_types) && hotel.room_types.length > 0 ? (
                hotel.room_types.map((room, index) => (
                  <div key={index} className="p-3 border border-purple-500/20 rounded-lg bg-purple-900/20">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{room.name || "Unnamed Room"}</p>
                        <p className="text-sm text-purple-300">{room.description || "No description"}</p>
                        {room.roomCount && <p className="text-sm mt-1">Quantity: {room.roomCount}</p>}
                      </div>
                      <p className="text-sm">Base Price: ${room.basePrice || room.baseRate || "N/A"}</p>
                    </div>
                    
                    {room.rates && Object.keys(room.rates).length > 0 && (
                      <div className="mt-2 pt-2 border-t border-purple-500/20">
                        <p className="text-sm font-medium mb-1">Rates:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {Object.entries(room.rates).map(([days, rate]) => (
                            <div key={days} className="text-xs">
                              {days} days: ${rate}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {room.images && room.images.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-purple-500/20">
                        <p className="text-sm font-medium mb-1">Room Images:</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {room.images.map((img, i) => (
                            <div key={i} className="aspect-square rounded overflow-hidden">
                              <img 
                                src={img} 
                                alt={`${room.name || "Room"} - image ${i+1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No room types specified</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-[#2A0F44]">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Themes</h3>
          <div className="flex flex-wrap gap-2">
            {hotel.hotel_themes && hotel.hotel_themes.length > 0 ? (
              hotel.hotel_themes.map((theme) => (
                <span key={theme.theme_id} className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm">
                  {theme.themes?.name || "Unknown Theme"}
                </span>
              ))
            ) : (
              <p>No themes specified</p>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-[#2A0F44]">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Activities</h3>
          <div className="flex flex-wrap gap-2">
            {hotel.hotel_activities && hotel.hotel_activities.length > 0 ? (
              hotel.hotel_activities.map((activity) => (
                <span key={activity.activity_id} className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm">
                  {activity.activities?.name || "Unknown Activity"}
                </span>
              ))
            ) : (
              <p>No activities specified</p>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-[#2A0F44]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Hotel Images</h3>
        {hotel.hotel_images && hotel.hotel_images.length > 0 ? (
          <div>
            <p className="text-sm text-gray-400 mb-2">Main Image</p>
            <div className="mb-4 w-full aspect-video rounded-lg overflow-hidden">
              <img 
                src={hotel.main_image_url || hotel.hotel_images.find(img => img.is_main)?.image_url || hotel.hotel_images[0].image_url} 
                alt={`${hotel.name} - Main`}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-400 mb-2">All Images ({hotel.hotel_images.length})</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {hotel.hotel_images.map((image) => (
                <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={image.image_url} 
                    alt={`${hotel.name} - Gallery Image`}
                    className="w-full h-full object-cover"
                  />
                  {image.is_main && (
                    <div className="absolute top-1 right-1 bg-purple-700 text-white text-xs px-2 py-1 rounded">
                      Main
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No images available for this hotel.</p>
        )}
      </Card>

      <Card className="p-6 bg-[#2A0F44]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">FAQs</h3>
        {hotel.faqs && hotel.faqs.length > 0 ? (
          <div className="space-y-4">
            {hotel.faqs.map((faq, index) => (
              <div key={index} className="border-b border-purple-800/30 pb-3">
                <h4 className="font-medium text-fuchsia-300">{faq.question}</h4>
                <p className="mt-1 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No FAQs specified</p>
        )}
      </Card>

      <Card className="p-6 bg-[#2A0F44]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Terms & Conditions</h3>
        <p className="whitespace-pre-wrap">{hotel.terms || "No terms specified"}</p>
      </Card>
    </div>
  );
};

export default PropertyDetailView;
