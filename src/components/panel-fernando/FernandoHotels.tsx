import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Edit, Trash2, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Hotel } from "@/integrations/supabase/types-custom";
import { useNavigate } from "react-router-dom";

interface FilterState {
  country: string;
  name: string;
  minStars: string;
  maxStars: string;
  minPrice: string;
  maxPrice: string;
  status: string;
}

interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    country: '',
    name: '',
    minStars: '',
    maxStars: '',
    minPrice: '',
    maxPrice: '',
    status: ''
  });
  const [sort, setSort] = useState<SortState>({
    field: 'created_at',
    direction: 'desc'
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchHotels = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('hotels')
        .select(`
          *,
          profiles:owner_id(
            first_name,
            last_name
          )
        `);

      // Apply filters
      if (filters.country) {
        query = query.ilike('country', `%${filters.country}%`);
      }
      if (filters.name) {
        query = query.ilike('name', `%${filters.name}%`);
      }
      if (filters.minStars) {
        query = query.gte('category', parseInt(filters.minStars));
      }
      if (filters.maxStars) {
        query = query.lte('category', parseInt(filters.maxStars));
      }
      if (filters.minPrice) {
        query = query.gte('price_per_month', parseInt(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte('price_per_month', parseInt(filters.maxPrice));
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      // Apply sorting
      query = query.order(sort.field, { ascending: sort.direction === 'asc' });

      const { data, error } = await query;

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

  useEffect(() => {
    fetchHotels();
  }, [filters, sort]);

  const handleApproveHotel = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: 'approved' })
        .eq('id', hotelId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to approve hotel",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Hotel has been approved",
      });

      fetchHotels();
    } catch (error) {
      console.error('Error approving hotel:', error);
      toast({
        title: "Error",
        description: "Failed to approve hotel",
        variant: "destructive"
      });
    }
  };

  const handleRejectHotel = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: 'rejected' })
        .eq('id', hotelId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to reject hotel",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Hotel has been rejected",
      });

      fetchHotels();
    } catch (error) {
      console.error('Error rejecting hotel:', error);
      toast({
        title: "Error",
        description: "Failed to reject hotel",
        variant: "destructive"
      });
    }
  };

  const handleDeleteHotel = async (hotelId: string) => {
    if (!confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) {
      return;
    }

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
        .from("hotels")
        .delete()
        .eq("id", hotelId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Hotel has been deleted",
      });

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

    if (!confirm(`Are you sure you want to delete ${selectedHotels.length} hotels? This action cannot be undone.`)) {
      return;
    }

    try {
      for (const hotelId of selectedHotels) {
        await handleDeleteHotel(hotelId);
      }
      setSelectedHotels([]);
    } catch (error) {
      console.error('Error in bulk delete:', error);
    }
  };

  const handleViewProperty = (hotelId: string) => {
    // Navigate to the hotel detail page that clients see
    window.open(`/hotel/${hotelId}`, '_blank');
  };

  const handleEditProperty = (hotelId: string) => {
    // Navigate to the edit property page using the AddProperty component
    navigate(`/add-property?edit=${hotelId}`);
  };

  const toggleHotelSelection = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const toggleAllSelection = () => {
    if (selectedHotels.length === hotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(hotels.map(hotel => hotel.id));
    }
  };

  const renderStars = (category: number | null) => {
    if (!category) return '-';
    return '★'.repeat(category);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'pending':
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
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
        <h1 className="text-3xl font-bold">Hotels Management</h1>
        {selectedHotels.length > 0 && (
          <Button
            onClick={handleBulkDelete}
            variant="destructive"
            className="ml-4"
          >
            Delete Selected ({selectedHotels.length})
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Sorting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="Filter by country..."
              value={filters.country}
              onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
            />
            <Input
              placeholder="Filter by hotel name..."
              value={filters.name}
              onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
            />
            <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Input
                placeholder="Min stars"
                type="number"
                min="1"
                max="5"
                value={filters.minStars}
                onChange={(e) => setFilters(prev => ({ ...prev, minStars: e.target.value }))}
              />
              <Input
                placeholder="Max stars"
                type="number"
                min="1"
                max="5"
                value={filters.maxStars}
                onChange={(e) => setFilters(prev => ({ ...prev, maxStars: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex gap-2">
              <Input
                placeholder="Min price/month"
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              />
              <Input
                placeholder="Max price/month"
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              />
            </div>
            <Select value={sort.field} onValueChange={(value) => setSort(prev => ({ ...prev, field: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Hotel Name</SelectItem>
                <SelectItem value="country">Country</SelectItem>
                <SelectItem value="category">Stars</SelectItem>
                <SelectItem value="price_per_month">Price/Month</SelectItem>
                <SelectItem value="created_at">Created Date</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort.direction} onValueChange={(value: 'asc' | 'desc') => setSort(prev => ({ ...prev, direction: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sort direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Hotel List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Hotels ({hotels.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedHotels.length === hotels.length && hotels.length > 0}
                onCheckedChange={toggleAllSelection}
              />
              <span className="text-sm">Select All</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      checked={selectedHotels.includes(hotel.id)}
                      onCheckedChange={() => toggleHotelSelection(hotel.id)}
                    />
                    {hotel.main_image_url && (
                      <img 
                        src={hotel.main_image_url} 
                        alt={hotel.name}
                        className="w-20 h-20 rounded object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{hotel.name}</h3>
                      <p className="text-gray-600">{hotel.city}, {hotel.country}</p>
                      <p className="text-sm text-gray-500">
                        Stars: {renderStars(hotel.category)} | 
                        Price: €{hotel.price_per_month}/month |
                        Created: {new Date(hotel.created_at).toLocaleDateString()}
                      </p>
                      <div className="mt-2">
                        {getStatusBadge(hotel.status || 'pending')}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProperty(hotel.id)}
                      title="View as client sees it"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProperty(hotel.id)}
                      title="Edit property"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {hotel.status !== 'approved' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApproveHotel(hotel.id)}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        title="Approve hotel"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    {hotel.status !== 'rejected' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRejectHotel(hotel.id)}
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        title="Reject hotel"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteHotel(hotel.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete hotel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
