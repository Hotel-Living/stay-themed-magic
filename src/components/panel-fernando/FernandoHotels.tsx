
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hotel } from "@/types/hotel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Eye, Edit, Check, MessageSquare, Checkbox } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FetchedHotel {
  id: string;
  name: string;
  city: string;
  country: string;
  status: string;
  price_per_month: number;
  main_image_url: string | null;
  category: number | null;
  created_at: string;
  profiles?: {
    id: string;
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState<Set<string>>(new Set());
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const { toast } = useToast();

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          id,
          name,
          city,
          country,
          status,
          price_per_month,
          main_image_url,
          category,
          created_at,
          profiles:owner_id(
            id,
            first_name,
            last_name
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

      // Transform the data to match our Hotel type
      const transformedHotels: Hotel[] = (data as FetchedHotel[]).map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        city: hotel.city,
        country: hotel.country,
        status: hotel.status,
        price_per_month: hotel.price_per_month,
        main_image_url: hotel.main_image_url,
        category: hotel.category,
        created_at: hotel.created_at,
        // Provide defaults for missing required fields
        description: null,
        address: null,
        latitude: null,
        longitude: null,
        owner_id: null,
        updated_at: hotel.created_at,
        rejection_reason: null,
        pending_changes: null,
        ideal_guests: null,
        atmosphere: null,
        perfect_location: null,
        is_featured: false,
        available_months: [],
        postal_code: null,
        contact_name: null,
        contact_email: null,
        contact_phone: null,
        property_type: null,
        style: null,
        features_hotel: {},
        features_room: {},
        meal_plans: [],
        room_types: [],
        stay_lengths: [],
        faqs: [],
        terms: null,
        rates: {},
        enable_price_increase: false,
        price_increase_cap: 0,
        enablePriceIncrease: false,
        priceIncreaseCap: 0,
        preferredWeekday: null,
        check_in_weekday: null,
        pricingMatrix: [],
        hotel_images: [],
        hotel_themes: [],
        hotel_activities: []
      }));

      setHotels(transformedHotels);
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

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleSelectAll = () => {
    if (selectedHotels.size === hotels.length) {
      setSelectedHotels(new Set());
    } else {
      setSelectedHotels(new Set(hotels.map(h => h.id)));
    }
  };

  const handleSelectHotel = (hotelId: string) => {
    const newSelected = new Set(selectedHotels);
    if (newSelected.has(hotelId)) {
      newSelected.delete(hotelId);
    } else {
      newSelected.add(hotelId);
    }
    setSelectedHotels(newSelected);
  };

  const handleBulkDelete = async () => {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .in('id', Array.from(selectedHotels));

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedHotels.size} hotels deleted successfully`
      });

      setSelectedHotels(new Set());
      fetchHotels();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete hotels",
        variant: "destructive"
      });
    }
    setShowBulkDeleteDialog(false);
  };

  const handleApprove = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: 'approved' })
        .eq('id', hotelId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hotel approved successfully"
      });

      fetchHotels();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to approve hotel",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hotel deleted successfully"
      });

      fetchHotels();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete hotel",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const renderStars = (category: number | null) => {
    if (!category) return null;
    return '★'.repeat(Math.min(category, 5));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading hotels...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotels Management</h1>
        <div className="flex gap-2">
          {selectedHotels.size > 0 && (
            <Button
              variant="destructive"
              onClick={() => setShowBulkDeleteDialog(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected ({selectedHotels.size})
            </Button>
          )}
        </div>
      </div>

      {/* Header with select all */}
      <div className="bg-gray-50 p-3 rounded-t-lg border-b flex items-center gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectedHotels.size === hotels.length && hotels.length > 0}
            onChange={handleSelectAll}
            className="h-4 w-4"
          />
          <span className="ml-2 text-sm font-medium">Select All</span>
        </div>
        <div className="text-sm text-gray-600">
          {hotels.length} hotels total
        </div>
      </div>

      {/* Hotels list */}
      <div className="border border-t-0 rounded-b-lg">
        {hotels.map((hotel, index) => (
          <div
            key={hotel.id}
            className={`flex items-center gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50 ${
              selectedHotels.has(hotel.id) ? 'bg-blue-50' : ''
            }`}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={selectedHotels.has(hotel.id)}
              onChange={() => handleSelectHotel(hotel.id)}
              className="h-4 w-4"
            />

            {/* Thumbnail */}
            <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
              {hotel.main_image_url ? (
                <img
                  src={hotel.main_image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Status */}
            <div className="flex-shrink-0">
              <span
                className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(hotel.status)}`}
              >
                {hotel.status?.charAt(0).toUpperCase() + hotel.status?.slice(1)}
              </span>
            </div>

            {/* Hotel Info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{hotel.name}</div>
              <div className="text-xs text-gray-500 truncate">
                {hotel.city}, {hotel.country}
              </div>
            </div>

            {/* Price */}
            <div className="flex-shrink-0 text-right">
              <div className="text-sm font-medium">€{hotel.price_per_month}</div>
              <div className="text-xs text-gray-500">/month</div>
            </div>

            {/* Stars */}
            <div className="flex-shrink-0 text-yellow-500 text-sm">
              {renderStars(hotel.category)}
            </div>

            {/* Actions */}
            <div className="flex gap-1 flex-shrink-0">
              {hotel.status === 'pending' && (
                <Button
                  size="sm"
                  onClick={() => handleApprove(hotel.id)}
                  className="bg-green-600 hover:bg-green-700 text-white h-8 px-2"
                >
                  <Check className="h-3 w-3" />
                </Button>
              )}
              
              <Button
                size="sm"
                variant="outline"
                className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600 h-8 px-2"
              >
                <Eye className="h-3 w-3" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600 h-8 px-2"
              >
                <Edit className="h-3 w-3" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600 h-8 px-2"
              >
                <MessageSquare className="h-3 w-3" />
              </Button>
              
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(hotel.id)}
                className="bg-red-600 hover:bg-red-700 h-8 px-2"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {hotels.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No hotels found
        </div>
      )}

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Bulk Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedHotels.size} selected hotels? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Hotels
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
