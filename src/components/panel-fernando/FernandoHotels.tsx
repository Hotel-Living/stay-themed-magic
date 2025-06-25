
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, Edit, Trash2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DeleteDialog from "@/components/dashboard/admin/DeleteDialog";

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  status: string;
  price_per_month: number;
  created_at: string;
}

export default function FernandoHotels() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);
  const { toast } = useToast();

  const { data: hotels = [], isLoading, refetch } = useQuery({
    queryKey: ["fernando-hotels", searchTerm],
    queryFn: async () => {
      let query = supabase
        .from("hotels")
        .select("id, name, city, country, status, price_per_month, created_at")
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,country.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  const handleDeleteClick = (hotel: Hotel) => {
    setHotelToDelete(hotel);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!hotelToDelete) return;

    try {
      // Delete related data first
      await supabase.from("hotel_images").delete().eq("hotel_id", hotelToDelete.id);
      await supabase.from("hotel_themes").delete().eq("hotel_id", hotelToDelete.id);
      await supabase.from("hotel_activities").delete().eq("hotel_id", hotelToDelete.id);
      await supabase.from("hotel_availability").delete().eq("hotel_id", hotelToDelete.id);
      await supabase.from("bookings").delete().eq("hotel_id", hotelToDelete.id);
      await supabase.from("favorites").delete().eq("hotel_id", hotelToDelete.id);
      await supabase.from("reviews").delete().eq("hotel_id", hotelToDelete.id);

      // Finally delete the hotel
      const { error } = await supabase
        .from("hotels")
        .delete()
        .eq("id", hotelToDelete.id);

      if (error) throw error;

      toast({
        title: "Hotel deleted",
        description: `${hotelToDelete.name} has been permanently deleted.`,
      });

      await refetch();
      setDeleteDialogOpen(false);
      setHotelToDelete(null);
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast({
        title: "Error",
        description: "Failed to delete hotel. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Hotels Management</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Hotels Management</h1>
        <div className="flex gap-3">
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Hotel
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="bg-purple-900/50 border-purple-700/50">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search hotels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-purple-800/50 border-purple-600/50 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Hotels ({hotels.length})</CardTitle>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-600/50">
                    <th className="text-left py-3 px-4 text-white font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-white font-medium">Location</th>
                    <th className="text-left py-3 px-4 text-white font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-white font-medium">Price/Month</th>
                    <th className="text-left py-3 px-4 text-white font-medium">Created</th>
                    <th className="text-left py-3 px-4 text-white font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.map((hotel) => (
                    <tr key={hotel.id} className="border-b border-purple-800/30 hover:bg-purple-800/20">
                      <td className="py-3 px-4 text-white font-medium">{hotel.name}</td>
                      <td className="py-3 px-4 text-white/80">
                        {hotel.city}, {hotel.country}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`${getStatusColor(hotel.status)} text-white`}>
                          {hotel.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-white/80">€{hotel.price_per_month}</td>
                      <td className="py-3 px-4 text-white/80">{formatDate(hotel.created_at)}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(hotel)}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/20"
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

            {hotels.length === 0 && (
              <div className="text-center py-8 text-white/60">
                No hotels found matching your search criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        hotelName={hotelToDelete?.name || ""}
      />
    </div>
  );
}
