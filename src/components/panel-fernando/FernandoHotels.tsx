
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, Edit, Trash2, Loader2 } from "lucide-react";
import { useHotelsData } from "@/components/dashboard/admin/hooks/useHotelsData";
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
  const { toast } = useToast();
  const { fetchAllHotels } = useHotelsData();
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);

  const { data: hotels = [], isLoading, refetch } = useQuery({
    queryKey: ['fernando-hotels'],
    queryFn: async () => {
      const result = await fetchAllHotels();
      return result.data || [];
    }
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedHotels(hotels.map(hotel => hotel.id));
    } else {
      setSelectedHotels([]);
    }
  };

  const handleSelectHotel = (hotelId: string, checked: boolean) => {
    if (checked) {
      setSelectedHotels(prev => [...prev, hotelId]);
    } else {
      setSelectedHotels(prev => prev.filter(id => id !== hotelId));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedHotels.length === 0) return;

    setIsDeleting(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const hotelId of selectedHotels) {
        try {
          // Delete related data first
          await supabase.from("hotel_images").delete().eq("hotel_id", hotelId);
          await supabase.from("hotel_themes").delete().eq("hotel_id", hotelId);
          await supabase.from("hotel_activities").delete().eq("hotel_id", hotelId);
          await supabase.from("hotel_availability").delete().eq("hotel_id", hotelId);
          await supabase.from("bookings").delete().eq("hotel_id", hotelId);
          await supabase.from("favorites").delete().eq("hotel_id", hotelId);
          await supabase.from("reviews").delete().eq("hotel_id", hotelId);

          // Delete the hotel
          const { error: deleteError } = await supabase
            .from("hotels")
            .delete()
            .eq("id", hotelId);

          if (deleteError) {
            throw deleteError;
          }

          successCount++;
        } catch (error) {
          console.error(`Error deleting hotel ${hotelId}:`, error);
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast({
          title: "Bulk Delete Complete",
          description: `Successfully deleted ${successCount} hotel(s).${errorCount > 0 ? ` Failed to delete ${errorCount} hotel(s).` : ''}`,
        });
      }

      if (errorCount > 0 && successCount === 0) {
        toast({
          title: "Delete Failed",
          description: "Failed to delete the selected hotels. Please try again.",
          variant: "destructive"
        });
      }

      setSelectedHotels([]);
      await refetch();
    } catch (error) {
      console.error("Bulk delete error:", error);
      toast({
        title: "Error",
        description: "An error occurred during bulk delete. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setShowBulkDeleteDialog(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const allSelected = hotels.length > 0 && selectedHotels.length === hotels.length;
  const someSelected = selectedHotels.length > 0 && selectedHotels.length < hotels.length;

  return (
    <div className="space-y-6">
      <Card className="bg-[#7a0486]">
        <CardHeader>
          <CardTitle className="text-white">Hotels Management</CardTitle>
          {selectedHotels.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-white/80 text-sm">
                {selectedHotels.length} hotel(s) selected
              </span>
              <Button
                onClick={() => setShowBulkDeleteDialog(true)}
                disabled={isDeleting}
                variant="destructive"
                size="sm"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Selected
                  </>
                )}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-purple-600/30 bg-purple-900/20">
            <Table>
              <TableHeader>
                <TableRow className="border-purple-600/30">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={handleSelectAll}
                      ref={(el) => {
                        if (el) {
                          el.indeterminate = someSelected;
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Location</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Category</TableHead>
                  <TableHead className="text-white">Price/Month</TableHead>
                  <TableHead className="text-white">Owner</TableHead>
                  <TableHead className="text-white w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotels.map((hotel) => (
                  <TableRow key={hotel.id} className="border-purple-600/30">
                    <TableCell>
                      <Checkbox
                        checked={selectedHotels.includes(hotel.id)}
                        onCheckedChange={(checked) => handleSelectHotel(hotel.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      {hotel.name}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {hotel.city}, {hotel.country}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        hotel.status === 'approved' ? 'bg-green-100 text-green-800' :
                        hotel.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {hotel.status || 'pending'}
                      </span>
                    </TableCell>
                    <TableCell className="text-white/80">
                      {hotel.category ? `${hotel.category} stars` : 'N/A'}
                    </TableCell>
                    <TableCell className="text-white/80">
                      €{hotel.price_per_month}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {hotel.profiles?.first_name || 'N/A'} {hotel.profiles?.last_name || ''}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent className="bg-purple-900 border-purple-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Selected Hotels
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Are you sure you want to delete {selectedHotels.length} selected hotel(s)? This action cannot be undone and will permanently remove all associated data including bookings, reviews, and images.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setShowBulkDeleteDialog(false)}
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
                'Delete All Selected'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
