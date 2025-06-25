
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Hotel } from "@/integrations/supabase/types/hotelTypes";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Edit, Trash, Check, X, Star, MessageSquare, Users, Calendar, MapPin } from "lucide-react";

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          hotel_images (
            id,
            hotel_id,
            image_url,
            is_main,
            created_at
          ),
          hotel_themes (
            theme_id,
            themes (
              id,
              name,
              description,
              category
            )
          ),
          hotel_activities (
            activity_id,
            activities (
              id,
              name,
              category
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching hotels:', error);
        toast({
          title: "Error",
          description: "Failed to fetch hotels",
          variant: "destructive"
        });
        return;
      }

      setHotels(data || []);
    } catch (error) {
      console.error('Error in fetchHotels:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hotels",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (hotelId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: newStatus })
        .eq('id', hotelId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update hotel status",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: `Hotel ${newStatus} successfully`,
      });

      // Refresh the hotels list
      fetchHotels();
    } catch (error) {
      console.error('Error updating hotel status:', error);
      toast({
        title: "Error",
        description: "Failed to update hotel status",
        variant: "destructive"
      });
    }
  };

  const handleDeleteHotel = async (hotelId: string) => {
    if (!confirm('Are you sure you want to delete this hotel?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete hotel",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Hotel deleted successfully",
      });

      // Refresh the hotels list
      fetchHotels();
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast({
        title: "Error",
        description: "Failed to delete hotel",
        variant: "destructive"
      });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedHotels.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select hotels to delete",
        variant: "destructive"
      });
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedHotels.length} hotels?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .in('id', selectedHotels);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete hotels",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: `${selectedHotels.length} hotels deleted successfully`,
      });

      setSelectedHotels([]);
      fetchHotels();
    } catch (error) {
      console.error('Error in bulk delete:', error);
      toast({
        title: "Error",
        description: "Failed to delete hotels",
        variant: "destructive"
      });
    }
  };

  const toggleHotelSelection = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedHotels.length === hotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(hotels.map(hotel => hotel.id));
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const renderStars = (category: number | null) => {
    if (!category) return null;
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: category }, (_, i) => (
          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    );
  };

  const getMainImage = (hotel: any) => {
    const mainImage = hotel.hotel_images?.find((img: any) => img.is_main);
    return mainImage?.image_url || hotel.main_image_url;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading hotels...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hotels Management</h1>
        <div className="flex items-center gap-4">
          {selectedHotels.length > 0 && (
            <Button
              onClick={handleBulkDelete}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Selected ({selectedHotels.length})
            </Button>
          )}
          <Button
            onClick={fetchHotels}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Header with Select All */}
      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={selectedHotels.length === hotels.length && hotels.length > 0}
            onCheckedChange={toggleSelectAll}
          />
          <label className="text-sm font-medium">
            Select All ({hotels.length} hotels)
          </label>
        </div>
      </div>

      {/* Hotels List */}
      <div className="space-y-2">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:bg-gray-800/50 transition-colors"
          >
            {/* Selection Checkbox */}
            <Checkbox 
              checked={selectedHotels.includes(hotel.id)}
              onCheckedChange={() => toggleHotelSelection(hotel.id)}
            />

            {/* Hotel Thumbnail */}
            <div className="w-16 h-12 bg-gray-700 rounded overflow-hidden flex-shrink-0">
              {getMainImage(hotel) ? (
                <img 
                  src={getMainImage(hotel)} 
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <span className="text-xs">No img</span>
                </div>
              )}
            </div>

            {/* Hotel Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-white truncate">{hotel.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadgeColor(hotel.status)}`}>
                  {hotel.status}
                </span>
                {renderStars(hotel.category)}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{hotel.city}, {hotel.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>€{hotel.price_per_month}/month</span>
                </div>
                {hotel.hotel_themes?.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{hotel.hotel_themes.length} themes</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {hotel.status === 'pending' && (
                <Button
                  onClick={() => handleStatusChange(hotel.id, 'approved')}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </Button>
              )}
              
              <Button
                onClick={() => window.open(`/admin/hotels/${hotel.id}`, '_blank')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>

              <Button
                onClick={() => window.open(`/dashboard/property/${hotel.id}`, '_blank')}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>

              <Button
                onClick={() => handleDeleteHotel(hotel.id)}
                size="sm"
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {hotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No hotels found</p>
        </div>
      )}
    </div>
  );
}
