
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Hotel } from "@/integrations/supabase/types-custom";
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

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);
  const { toast } = useToast();
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    // Update select all checkbox state
    if (selectAllRef.current) {
      const allSelected = hotels.length > 0 && selectedHotels.size === hotels.length;
      const someSelected = selectedHotels.size > 0 && selectedHotels.size < hotels.length;
      
      selectAllRef.current.checked = allSelected;
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [selectedHotels, hotels]);

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      toast({
        title: "Error",
        description: "Failed to fetch hotels",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedHotels.size === hotels.length) {
      setSelectedHotels(new Set());
    } else {
      setSelectedHotels(new Set(hotels.map(hotel => hotel.id)));
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

  const handleSingleDelete = (hotel: Hotel) => {
    setHotelToDelete(hotel);
    setDeleteDialogOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedHotels.size === 0) return;
    setBulkDeleteDialogOpen(true);
  };

  const confirmSingleDelete = async () => {
    if (!hotelToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteHotelWithRelatedData(hotelToDelete.id);
      
      toast({
        title: "Hotel deleted",
        description: `${hotelToDelete.name} has been permanently deleted.`,
      });
      
      await fetchHotels();
      setDeleteDialogOpen(false);
      setHotelToDelete(null);
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast({
        title: "Error",
        description: "Failed to delete hotel. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmBulkDelete = async () => {
    if (selectedHotels.size === 0) return;
    
    setIsDeleting(true);
    try {
      const deletePromises = Array.from(selectedHotels).map(hotelId => 
        deleteHotelWithRelatedData(hotelId)
      );
      
      await Promise.all(deletePromises);
      
      toast({
        title: "Hotels deleted",
        description: `${selectedHotels.size} hotels have been permanently deleted.`,
      });
      
      await fetchHotels();
      setSelectedHotels(new Set());
      setBulkDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting hotels:", error);
      toast({
        title: "Error",
        description: "Failed to delete hotels. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteHotelWithRelatedData = async (hotelId: string) => {
    // Delete related data first
    await supabase.from("hotel_images").delete().eq("hotel_id", hotelId);
    await supabase.from("hotel_themes").delete().eq("hotel_id", hotelId);
    await supabase.from("hotel_activities").delete().eq("hotel_id", hotelId);
    await supabase.from("hotel_availability").delete().eq("hotel_id", hotelId);
    await supabase.from("bookings").delete().eq("hotel_id", hotelId);
    await supabase.from("favorites").delete().eq("hotel_id", hotelId);
    await supabase.from("reviews").delete().eq("hotel_id", hotelId);

    // Finally delete the hotel
    const { error } = await supabase
      .from("hotels")
      .delete()
      .eq("id", hotelId);

    if (error) throw error;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fernando Hotels Management</h2>
        <div className="flex gap-2">
          {selectedHotels.size > 0 && (
            <Button
              onClick={handleBulkDelete}
              variant="destructive"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected ({selectedHotels.size})
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {hotels.length > 0 && (
        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
          <input
            ref={selectAllRef}
            type="checkbox"
            onChange={handleSelectAll}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">
            Select all hotels ({hotels.length})
          </label>
        </div>
      )}

      <div className="grid gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="border-purple-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedHotels.has(hotel.id)}
                    onChange={() => handleSelectHotel(hotel.id)}
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <CardTitle className="text-lg">{hotel.name}</CardTitle>
                    <p className="text-sm text-gray-600">{hotel.city}, {hotel.country}</p>
                    <p className="text-sm font-medium mt-1">
                      Status: <span className={`px-2 py-1 rounded text-xs ${
                        hotel.status === 'approved' ? 'bg-green-100 text-green-800' :
                        hotel.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {hotel.status || 'pending'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSingleDelete(hotel)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {hotel.main_image_url && (
                  <img 
                    src={hotel.main_image_url} 
                    alt={hotel.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {hotel.description || 'No description available'}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    €{hotel.price_per_month}/month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Single Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-purple-900 border-purple-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Hotel
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Are you sure you want to delete "{hotelToDelete?.name}"? This action cannot be undone and will permanently remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
              className="bg-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmSingleDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Dialog */}
      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent className="bg-purple-900 border-purple-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Multiple Hotels
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Are you sure you want to delete {selectedHotels.size} selected hotels? This action cannot be undone and will permanently remove all associated data for these hotels.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setBulkDeleteDialogOpen(false)}
              disabled={isDeleting}
              className="bg-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmBulkDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                `Delete ${selectedHotels.size} Hotels`
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
