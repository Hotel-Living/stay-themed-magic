
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Tag, Calendar as CalendarIcon, Coffee, Star, Clock, Globe, Home } from "lucide-react";

export default function HotelDetailView() {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      try {
        // Fetch hotel data
        const { data: hotelData, error: hotelError } = await supabase
          .from("hotels")
          .select("*")
          .eq("id", id)
          .single();

        if (hotelError) throw hotelError;
        setHotel(hotelData);

        // Fetch hotel images
        const { data: imageData, error: imageError } = await supabase
          .from("hotel_images")
          .select("*")
          .eq("hotel_id", id);

        if (imageError) throw imageError;
        setImages(imageData || []);

        // Fetch hotel themes
        const { data: themeData, error: themeError } = await supabase
          .from("hotel_themes")
          .select(`
            theme_id,
            themes:theme_id(id, name, description, category)
          `)
          .eq("hotel_id", id);

        if (themeError) throw themeError;
        setThemes(themeData || []);

        // Fetch hotel activities
        const { data: activityData, error: activityError } = await supabase
          .from("hotel_activities")
          .select(`
            activity_id,
            activities:activity_id(id, name, category)
          `)
          .eq("hotel_id", id);

        if (activityError) throw activityError;
        setActivities(activityData || []);

        // Generate sample amenities based on hotel category
        if (hotelData.category) {
          const categoryAmenities = [
            "Free WiFi",
            "Air Conditioning", 
            "Daily Housekeeping"
          ];
          
          if (hotelData.category >= 3) {
            categoryAmenities.push("Pool", "Gym");
          }
          
          if (hotelData.category >= 4) {
            categoryAmenities.push("Spa", "Room Service", "Restaurant");
          }
          
          if (hotelData.category >= 5) {
            categoryAmenities.push("Concierge Service", "Valet Parking", "Business Center");
          }
          
          setAmenities(categoryAmenities);
        }

      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch hotel details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotelDetails();
    }
  }, [id, toast]);

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Hotels
          </Button>
          <h2 className="text-2xl font-bold">Hotel Details</h2>
        </div>

        {loading ? (
          <div className="rounded-xl p-6 bg-[#2A0F44]">
            Loading hotel details...
          </div>
        ) : hotel ? (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="rounded-xl p-6 bg-[#2A0F44]">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Hotel Name</p>
                  <p className="font-medium">{hotel.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="font-medium capitalize">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      hotel.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      hotel.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {hotel.status}
                    </span>
                  </p>
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
                <div>
                  <p className="text-sm text-gray-400">Featured</p>
                  <p className="font-medium">{hotel.is_featured ? "Yes" : "No"}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-400">Description</p>
                  <p className="font-medium">{hotel.description || "No description provided."}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Stars / Category</p>
                  <div className="flex items-center gap-1">
                    {Array.from({length: hotel.category || 0}).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                    {hotel.category ? `${hotel.category}-star` : "No rating provided"}
                  </div>
                </div>
              </div>
            </div>

            {/* Images Gallery */}
            <div className="rounded-xl p-6 bg-[#2A0F44]">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Hotel Images</h3>
              {images && images.length > 0 ? (
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Main Image</p>
                    <div className="w-full aspect-video border rounded-lg overflow-hidden">
                      <img 
                        src={hotel.main_image_url || images.find(img => img.is_main)?.image_url || images[0].image_url} 
                        alt={`${hotel.name} - Main`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">All Images ({images.length})</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {images.map((image, index) => (
                        <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
                          <img 
                            src={image.image_url} 
                            alt={`${hotel.name} - ${index + 1}`}
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
                </div>
              ) : (
                <p>No images available for this hotel.</p>
              )}
            </div>

            {/* Location */}
            <div className="rounded-xl p-6 bg-[#2A0F44]">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Country</p>
                  <p className="font-medium">{hotel.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">City</p>
                  <p className="font-medium">{hotel.city}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="font-medium">{hotel.address || "No address provided."}</p>
                </div>
                {hotel.latitude && hotel.longitude && (
                  <>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-400">Coordinates</p>
                      <p className="font-medium">Lat: {hotel.latitude}, Long: {hotel.longitude}</p>
                    </div>
                    <div className="md:col-span-2">
                      <div className="mt-4 h-64 rounded-lg overflow-hidden">
                        {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
                          <iframe 
                            src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=${hotel.latitude},${hotel.longitude}&zoom=15`}
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy"
                            title="Hotel location"
                          ></iframe>
                        ) : (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <p className="text-gray-400">Google Maps API key not configured</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Available Months */}
            <div className="rounded-xl p-6 bg-[#2A0F44]">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-purple-400" />
                Availability
              </h3>
              <div>
                <p className="text-sm text-gray-400 mb-2">Available Months</p>
                {hotel.available_months && hotel.available_months.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {hotel.available_months.map((month: string) => (
                      <span key={month} className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm">
                        {month}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>No available months specified.</p>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div className="rounded-xl p-6 bg-[#2A0F44]">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-purple-400" />
                Amenities
              </h3>
              {amenities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-purple-900/20 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No amenities specified for this hotel.</p>
              )}
            </div>

            {/* Themes */}
            <div className="rounded-xl p-6 bg-[#2A0F44]">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-400" />
                Themes
              </h3>
              {themes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {themes.map((theme) => (
                    <div key={theme.theme_id} className="p-3 border border-purple-700/30 rounded-lg bg-purple-900/20">
                      <p className="font-medium text-purple-300">{theme.themes?.name || "Unknown Theme"}</p>
                      {theme.themes?.description && (
                        <p className="text-sm text-gray-400 mt-1">{theme.themes.description}</p>
                      )}
                      {theme.themes?.category && (
                        <p className="text-xs text-fuchsia-400 mt-2">Category: {theme.themes.category}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No themes associated with this hotel.</p>
              )}
            </div>

            {/* Activities */}
            <div className="rounded-xl p-6 bg-[#2A0F44]">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-400" />
                Activities
              </h3>
              {activities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activities.map((activity) => (
                    <div key={activity.activity_id} className="p-3 border border-purple-500/20 rounded-lg bg-purple-900/20">
                      <p className="font-medium">{activity.activities?.name || "Unknown Activity"}</p>
                      <p className="text-sm text-purple-300">{activity.activities?.category || "No category"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No activities associated with this hotel.</p>
              )}
            </div>

            {/* Administrative Details */}
            <div className="rounded-xl p-6 bg-[#2A0F44]">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Administrative Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Hotel ID</p>
                  <p className="font-medium font-mono text-xs">{hotel.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Owner ID</p>
                  <p className="font-medium font-mono text-xs">{hotel.owner_id || "Not assigned"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Created At</p>
                  <p className="font-medium">{new Date(hotel.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Last Updated</p>
                  <p className="font-medium">{new Date(hotel.updated_at).toLocaleString()}</p>
                </div>
                {hotel.rejection_reason && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-400">Rejection Reason</p>
                    <p className="font-medium text-red-400">{hotel.rejection_reason}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl p-6 bg-[#2A0F44]">
            <p className="text-center">Hotel not found.</p>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
