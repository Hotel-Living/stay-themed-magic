import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useHotelActions } from "@/components/dashboard/admin/hooks/useHotelActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Edit, Trash2, Check, X } from "lucide-react";

export function FernandoHotels() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const { toast } = useToast();

  // Create a wrapper function that returns Promise<void>
  const refreshHotels = async (): Promise<void> => {
    const result = await fetchAllHotels();
    if (result.data) {
      setHotels(result.data);
    }
  };

  const { handleApprove, handleReject, handleDelete } = useHotelActions(refreshHotels);

  const fetchAllHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          profiles:owner_id(
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch hotels",
          variant: "destructive"
        });
        return { data: null, error };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Error in fetchAllHotels:', error);
      return { data: null, error };
    }
  };

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      const result = await fetchAllHotels();
      if (result.data) {
        setHotels(result.data);
      }
      setLoading(false);
    };

    loadHotels();
  }, []);

  const filteredHotels = hotels.filter(hotel => {
    const statusMatch = statusFilter === "all" || hotel.status === statusFilter;
    const countryMatch = countryFilter === "all" || hotel.country === countryFilter;
    return statusMatch && countryMatch;
  });

  const uniqueCountries = [...new Set(hotels.map(hotel => hotel.country))].sort();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedHotels(filteredHotels.map(hotel => hotel.id));
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
    try {
      for (const hotelId of selectedHotels) {
        await handleDelete(hotelId);
      }
      setSelectedHotels([]);
      toast({
        title: "Success",
        description: `${selectedHotels.length} hotels deleted successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete some hotels",
        variant: "destructive"
      });
    }
  };

  const handleBulkApprove = async () => {
    try {
      for (const hotelId of selectedHotels) {
        await handleApprove(hotelId);
      }
      setSelectedHotels([]);
      toast({
        title: "Success",
        description: `${selectedHotels.length} hotels approved successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve some hotels",
        variant: "destructive"
      });
    }
  };

  const handleView = (hotelId: string) => {
    window.open(`/hotel/${hotelId}`, '_blank');
  };

  const handleEdit = (hotelId: string) => {
    window.open(`/dashboard/properties/edit/${hotelId}`, '_blank');
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      approved: "bg-green-500",
      pending: "bg-yellow-500", 
      rejected: "bg-red-500"
    };
    return (
      <Badge className={`${colors[status as keyof typeof colors] || "bg-gray-500"} text-white`}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return <div className="p-6">Loading hotels...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hotels Management</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {uniqueCountries.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedHotels.length === filteredHotels.length && filteredHotels.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select All ({selectedHotels.length} selected)
          </label>
        </div>

        {selectedHotels.length > 0 && (
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="bg-[#7A0486] hover:bg-[#7A0486]/90">
                  Delete Selected ({selectedHotels.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Bulk Delete</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedHotels.length} selected hotels? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBulkDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-[#7A0486] hover:bg-[#7A0486]/90 text-white">
                  Approve Selected ({selectedHotels.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Bulk Approval</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to approve {selectedHotels.length} selected hotels?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBulkApprove}>Approve</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedHotels.includes(hotel.id)}
                    onCheckedChange={(checked) => handleSelectHotel(hotel.id, checked as boolean)}
                  />
                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                </div>
                {getStatusBadge(hotel.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">{hotel.city}, {hotel.country}</p>
              <p className="text-sm">€{hotel.price_per_month}/month</p>
              {hotel.profiles && (
                <p className="text-sm text-gray-500">
                  Owner: {hotel.profiles.first_name} {hotel.profiles.last_name}
                </p>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleView(hotel.id)}
                  className="bg-[#7A0486] hover:bg-[#7A0486]/90 text-white border-[#7A0486]"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(hotel.id)}
                  className="bg-[#7A0486] hover:bg-[#7A0486]/90 text-white border-[#7A0486]"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-[#7A0486] hover:bg-[#7A0486]/90 text-white border-[#7A0486]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{hotel.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(hotel.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {hotel.status === 'pending' && (
                  <Button
                    size="sm"
                    onClick={() => handleApprove(hotel.id)}
                    className="bg-[#7A0486] hover:bg-[#7A0486]/90 text-white"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No hotels found matching the current filters.</p>
        </div>
      )}
    </div>
  );
}
