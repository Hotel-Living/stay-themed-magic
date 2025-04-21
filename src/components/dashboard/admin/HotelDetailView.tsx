
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function HotelDetailView() {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
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

        // Fetch hotel themes
        const { data: themeData, error: themeError } = await supabase
          .from("hotel_themes")
          .select(`
            theme_id,
            themes:theme_id(name)
          `)
          .eq("hotel_id", id);

        if (themeError) throw themeError;
        setThemes(themeData);

        // Fetch hotel activities
        const { data: activityData, error: activityError } = await supabase
          .from("hotel_activities")
          .select(`
            activity_id,
            activities:activity_id(name, category)
          `)
          .eq("hotel_id", id);

        if (activityError) throw activityError;
        setActivities(activityData);

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
          <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
            Loading hotel details...
          </div>
        ) : hotel ? (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Basic Information</h3>
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
              </div>
            </div>

            {/* Location */}
            <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Location</h3>
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
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-400">Coordinates</p>
                    <p className="font-medium">Lat: {hotel.latitude}, Long: {hotel.longitude}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Available Months */}
            <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Availability</h3>
              <div>
                <p className="text-sm text-gray-400 mb-2">Available Months</p>
                {hotel.available_months && hotel.available_months.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {hotel.available_months.map((month: string) => (
                      <span key={month} className="px-3 py-1 bg-fuchsia-900/30 rounded-full text-xs">
                        {month}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>No available months specified.</p>
                )}
              </div>
            </div>

            {/* Themes */}
            <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Themes</h3>
              {themes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {themes.map((theme) => (
                    <span key={theme.theme_id} className="px-3 py-1 bg-purple-900/30 rounded-full text-xs">
                      {theme.themes?.name || "Unknown Theme"}
                    </span>
                  ))}
                </div>
              ) : (
                <p>No themes associated with this hotel.</p>
              )}
            </div>

            {/* Activities */}
            <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Activities</h3>
              {activities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activities.map((activity) => (
                    <div key={activity.activity_id}>
                      <p className="font-medium">{activity.activities?.name || "Unknown Activity"}</p>
                      <p className="text-sm text-gray-400">{activity.activities?.category || "No category"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No activities associated with this hotel.</p>
              )}
            </div>

            {/* Administrative Details */}
            <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Administrative Details</h3>
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
                    <p className="font-medium">{hotel.rejection_reason}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
            <p className="text-center">Hotel not found.</p>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
