
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Hotel } from "@/integrations/supabase/types-custom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Edit, Eye, Trash2, Star, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

const FernandoHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState<Set<string>>(new Set());
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const queryClient = useQueryClient();

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          profiles:owner_id(
            id,
            first_name,
            last_name
          ),
          hotel_images(
            id,
            image_url,
            is_main
          ),
          hotel_themes(
            theme_id,
            themes(
              id,
              name
            )
          ),
          hotel_activities(
            activity_id,
            activities(
              id,
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching hotels:', error);
        toast.error("Error fetching hotels");
        return;
      }

      // Type assertion to handle status field properly
      const typedHotels = (data || []).map(hotel => ({
        ...hotel,
        status: hotel.status as "approved" | "pending" | "rejected"
      })) as Hotel[];

      setHotels(typedHotels);
    } catch (error) {
      console.error('Error in fetchHotels:', error);
      toast.error("Error fetching hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleApprove = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: 'approved' })
        .eq('id', hotelId);

      if (error) {
        toast.error("Error approving hotel");
        return;
      }

      toast.success("Hotel approved successfully");
      fetchHotels();
    } catch (error) {
      toast.error("Error approving hotel");
    }
  };

  const handleDelete = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId);

      if (error) {
        toast.error("Error deleting hotel");
        return;
      }

      toast.success("Hotel deleted successfully");
      fetchHotels();
    } catch (error) {
      toast.error("Error deleting hotel");
    }
  };

  const handleBulkDelete = async () => {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .in('id', Array.from(selectedHotels));

      if (error) {
        toast.error("Error deleting hotels");
        return;
      }

      toast.success(`${selectedHotels.size} hotels deleted successfully`);
      setSelectedHotels(new Set());
      setShowBulkDeleteDialog(false);
      fetchHotels();
    } catch (error) {
      toast.error("Error deleting hotels");
    }
  };

  const toggleHotelSelection = (hotelId: string) => {
    const newSelection = new Set(selectedHotels);
    if (newSelection.has(hotelId)) {
      newSelection.delete(hotelId);
    } else {
      newSelection.add(hotelId);
    }
    setSelectedHotels(newSelection);
  };

  const selectAllHotels = () => {
    if (selectedHotels.size === hotels.length) {
      setSelectedHotels(new Set());
    } else {
      setSelectedHotels(new Set(hotels.map(h => h.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600 text-white">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600 text-white">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600 text-white">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-600 text-white">{status}</Badge>;
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

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading hotels...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Hotel Management</h1>
        {selectedHotels.size > 0 && (
          <Button
            onClick={() => setShowBulkDeleteDialog(true)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete Selected ({selectedHotels.size})
          </Button>
        )}
      </div>

      {/* Bulk selection header */}
      <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
        <Checkbox
          checked={selectedHotels.size === hotels.length && hotels.length > 0}
          onCheckedChange={selectAllHotels}
        />
        <span className="text-white text-sm">
          Select All ({hotels.length} hotels)
        </span>
      </div>

      {/* Hotel list */}
      <div className="space-y-2">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
          >
            {/* Selection checkbox */}
            <Checkbox
              checked={selectedHotels.has(hotel.id)}
              onCheckedChange={() => toggleHotelSelection(hotel.id)}
            />

            {/* Hotel thumbnail */}
            <div className="w-16 h-12 bg-gray-700 rounded overflow-hidden flex-shrink-0">
              {hotel.main_image_url ? (
                <img
                  src={hotel.main_image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                  No image
                </div>
              )}
            </div>

            {/* Hotel info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-white font-medium truncate">{hotel.name}</h3>
                {getStatusBadge(hotel.status)}
                {renderStars(hotel.category)}
              </div>
              <div className="text-gray-300 text-sm">
                {hotel.city}, {hotel.country} • €{hotel.price_per_month}/month
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {hotel.status === 'pending' && (
                <Button
                  onClick={() => handleApprove(hotel.id)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </Button>
              )}
              
              <Button
                onClick={() => window.open(`/admin/hotel/${hotel.id}`, '_blank')}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>

              <Button
                onClick={() => window.open(`/dashboard/property/${hotel.id}`, '_blank')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>

              <Button
                onClick={() => handleDelete(hotel.id)}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {hotels.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No hotels found.
        </div>
      )}

      {/* Bulk delete confirmation dialog */}
      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
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
};

export default FernandoHotels;
