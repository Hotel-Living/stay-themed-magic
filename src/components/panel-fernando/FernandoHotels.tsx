
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Hotel } from "@/integrations/supabase/types-custom";
import { Search, Eye, Edit, Trash2, Loader2 } from "lucide-react";
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

const FernandoHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHotels, setSelectedHotels] = useState<Set<string>>(new Set());
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setHotels(data as Hotel[]);
    } catch (error) {
      console.error('Error fetching hotels:', error);
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

  const filteredHotels = hotels.filter(hotel =>
    hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedHotels.size === filteredHotels.length) {
      setSelectedHotels(new Set());
    } else {
      setSelectedHotels(new Set(filteredHotels.map(hotel => hotel.id)));
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
    setIsDeleting(true);
    try {
      const selectedHotelIds = Array.from(selectedHotels);
      
      // Delete related data first for all selected hotels
      for (const hotelId of selectedHotelIds) {
        await supabase.from("hotel_images").delete().eq("hotel_id", hotelId);
        await supabase.from("hotel_themes").delete().eq("hotel_id", hotelId);
        await supabase.from("hotel_activities").delete().eq("hotel_id", hotelId);
        await supabase.from("hotel_availability").delete().eq("hotel_id", hotelId);
        await supabase.from("bookings").delete().eq("hotel_id", hotelId);
        await supabase.from("favorites").delete().eq("hotel_id", hotelId);
        await supabase.from("reviews").delete().eq("hotel_id", hotelId);
      }

      // Delete the hotels
      const { error } = await supabase
        .from("hotels")
        .delete()
        .in("id", selectedHotelIds);

      if (error) {
        throw error;
      }

      toast({
        title: "Hotels deleted",
        description: `${selectedHotelIds.length} hotels have been permanently deleted.`,
      });

      setSelectedHotels(new Set());
      setBulkDeleteDialogOpen(false);
      await fetchHotels();
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

  const isAllSelected = selectedHotels.size === filteredHotels.length && filteredHotels.length > 0;
  const isIndeterminate = selectedHotels.size > 0 && selectedHotels.size < filteredHotels.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#7a0486]">
        <CardHeader>
          <CardTitle className="text-white">Hotel Management</CardTitle>
          <CardDescription className="text-white/80">
            Manage and oversee all hotels in the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search hotels by name, city, or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            {selectedHotels.size > 0 && (
              <Button
                onClick={() => setBulkDeleteDialogOpen(true)}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedHotels.size})
              </Button>
            )}
          </div>

          {filteredHotels.length > 0 && (
            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(el) => {
                  if (el) el.indeterminate = isIndeterminate;
                }}
                onChange={handleSelectAll}
                className="w-4 h-4 text-purple-600 bg-purple-100 border-purple-300 rounded focus:ring-purple-500"
              />
              <span className="text-white/80 text-sm">
                Select All ({filteredHotels.length} hotels)
              </span>
            </div>
          )}

          <div className="space-y-4">
            {filteredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white/10 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedHotels.has(hotel.id)}
                    onCheckedChange={() => handleSelectHotel(hotel.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-medium text-lg">{hotel.name}</h3>
                        <p className="text-white/70 text-sm">
                          {hotel.city}, {hotel.country}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={
                              hotel.status === 'approved' ? 'default' :
                              hotel.status === 'rejected' ? 'destructive' : 'secondary'
                            }
                            className="text-xs"
                          >
                            {hotel.status || 'pending'}
                          </Badge>
                          <span className="text-white/60 text-sm">
                            Category: {hotel.category || 'N/A'} stars
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-white border-white/20">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-white border-white/20">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-white/60 text-sm">
                      <p>€{hotel.price_per_month || 0}/month</p>
                      <p>Created: {new Date(hotel.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredHotels.length === 0 && (
            <div className="text-center py-8 text-white/60">
              {searchTerm ? 'No hotels found matching your search.' : 'No hotels found.'}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent className="bg-purple-900 border-purple-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Selected Hotels
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Are you sure you want to delete {selectedHotels.size} selected hotels? 
              This action cannot be undone and will permanently remove all associated data 
              including bookings, reviews, and images.
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
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Hotels'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FernandoHotels;
