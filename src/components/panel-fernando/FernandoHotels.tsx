
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Hotel } from '@/integrations/supabase/types-custom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit, Eye, Search } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';

export const FernandoHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);
  const { toast } = useToast();

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Type assertion to ensure compatibility with Hotel type
      setHotels((data as Hotel[]) || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch hotels',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedHotels(new Set(filteredHotels.map(hotel => hotel.id)));
    } else {
      setSelectedHotels(new Set());
    }
  };

  const handleSelectHotel = (hotelId: string, checked: boolean) => {
    const newSelected = new Set(selectedHotels);
    if (checked) {
      newSelected.add(hotelId);
    } else {
      newSelected.delete(hotelId);
    }
    setSelectedHotels(newSelected);
  };

  const isAllSelected = filteredHotels.length > 0 && selectedHotels.size === filteredHotels.length;
  const isIndeterminate = selectedHotels.size > 0 && selectedHotels.size < filteredHotels.length;

  const deleteHotel = async (hotelId: string) => {
    try {
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
        .from('hotels')
        .delete()
        .eq('id', hotelId);

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: 'Hotel deleted successfully',
      });

      await fetchHotels();
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete hotel',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteClick = (hotel: Hotel) => {
    setHotelToDelete(hotel);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (hotelToDelete) {
      await deleteHotel(hotelToDelete.id);
      setDeleteDialogOpen(false);
      setHotelToDelete(null);
    }
  };

  const handleBulkDelete = async () => {
    try {
      const selectedIds = Array.from(selectedHotels);
      
      // Delete related data for all selected hotels
      await Promise.all([
        supabase.from("hotel_images").delete().in("hotel_id", selectedIds),
        supabase.from("hotel_themes").delete().in("hotel_id", selectedIds),
        supabase.from("hotel_activities").delete().in("hotel_id", selectedIds),
        supabase.from("hotel_availability").delete().in("hotel_id", selectedIds),
        supabase.from("bookings").delete().in("hotel_id", selectedIds),
        supabase.from("favorites").delete().in("hotel_id", selectedIds),
        supabase.from("reviews").delete().in("hotel_id", selectedIds)
      ]);

      // Delete the hotels
      const { error } = await supabase
        .from('hotels')
        .delete()
        .in('id', selectedIds);

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: `${selectedIds.length} hotels deleted successfully`,
      });

      setSelectedHotels(new Set());
      setBulkDeleteDialogOpen(false);
      await fetchHotels();
    } catch (error) {
      console.error('Error deleting hotels:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete hotels',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Loading hotels...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotels Management</h1>
        {selectedHotels.size > 0 && (
          <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedHotels.size})
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Selected Hotels</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {selectedHotels.size} selected hotels? This action cannot be undone and will permanently remove all associated data including bookings, reviews, and images.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleBulkDelete}>
                  Delete All Selected
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search hotels by name, city, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    ref={(el) => {
                      if (el) {
                        (el as any).indeterminate = isIndeterminate;
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hotel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Checkbox
                      checked={selectedHotels.has(hotel.id)}
                      onCheckedChange={(checked) => handleSelectHotel(hotel.id, checked as boolean)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {hotel.main_image_url && (
                        <img
                          className="h-10 w-10 rounded-full mr-3"
                          src={hotel.main_image_url}
                          alt={hotel.name}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {hotel.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Category: {hotel.category || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {hotel.city}, {hotel.country}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      €{hotel.price_per_month}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      hotel.status === 'approved' ? 'bg-green-100 text-green-800' :
                      hotel.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {hotel.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteClick(hotel)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hotels found matching your search.
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Hotel</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{hotelToDelete?.name}"? This action cannot be undone and will permanently remove all associated data including bookings, reviews, and images.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
