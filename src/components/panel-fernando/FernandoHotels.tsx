import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Hotel } from '@/integrations/supabase/types/hotelTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Edit, Check, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HotelWithProfile extends Hotel {
  profiles?: {
    first_name: string | null;
    last_name: string | null;
  };
}

const FernandoHotels = () => {
  const [hotels, setHotels] = useState<HotelWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filter states
  const [filters, setFilters] = useState({
    country: '',
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    status: ''
  });

  // Sort states
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
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
        return;
      }

      // Type cast the status field to match Hotel type expectations
      const typedHotels = (data || []).map(hotel => ({
        ...hotel,
        status: hotel.status as "approved" | "pending" | "rejected"
      })) as HotelWithProfile[];

      setHotels(typedHotels);
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

  const filteredAndSortedHotels = hotels
    .filter(hotel => {
      if (filters.country && !hotel.country.toLowerCase().includes(filters.country.toLowerCase())) return false;
      if (filters.name && !hotel.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
      if (filters.category && hotel.category?.toString() !== filters.category) return false;
      if (filters.minPrice && hotel.price_per_month < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && hotel.price_per_month > parseInt(filters.maxPrice)) return false;
      if (filters.status && hotel.status !== filters.status) return false;
      return true;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof Hotel];
      let bValue: any = b[sortBy as keyof Hotel];

      if (sortBy === 'created_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
      }
      if (typeof bValue === 'string') {
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSelectHotel = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const handleSelectAll = () => {
    if (selectedHotels.length === filteredAndSortedHotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(filteredAndSortedHotels.map(hotel => hotel.id));
    }
  };

  const handleApproveHotel = async (hotelId: string) => {
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

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hotel rejected successfully"
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
    if (selectedHotels.length === 0) return;

    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .in('id', selectedHotels);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedHotels.length} hotels deleted successfully`
      });

      setSelectedHotels([]);
      fetchHotels();
    } catch (error) {
      console.error('Error deleting hotels:', error);
      toast({
        title: "Error",
        description: "Failed to delete hotels",
        variant: "destructive"
      });
    }
  };

  const handleViewProperty = (hotelId: string) => {
    window.open(`/hotel/${hotelId}`, '_blank');
  };

  const handleEditProperty = (hotelId: string) => {
    navigate(`/dashboard/properties?edit=${hotelId}`);
  };

  if (loading) {
    return <div className="p-4">Loading hotels...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hotel Management</h1>
        {selectedHotels.length > 0 && (
          <Button 
            onClick={handleBulkDelete} 
            variant="destructive"
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected ({selectedHotels.length})
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
        <Input
          placeholder="Filter by country"
          value={filters.country}
          onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
        />
        <Input
          placeholder="Filter by hotel name"
          value={filters.name}
          onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
        />
        <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by stars" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Min price"
          type="number"
          value={filters.minPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
        />
        <Input
          placeholder="Max price"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
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
      </div>

      {/* Sort Controls */}
      <div className="flex gap-4 items-center">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
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
        <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Hotels Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">
                <Checkbox
                  checked={selectedHotels.length === filteredAndSortedHotels.length && filteredAndSortedHotels.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="border border-gray-300 p-2 text-left">Hotel Name</th>
              <th className="border border-gray-300 p-2 text-left">Country</th>
              <th className="border border-gray-300 p-2 text-left">City</th>
              <th className="border border-gray-300 p-2 text-left">Stars</th>
              <th className="border border-gray-300 p-2 text-left">Price/Month</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-left">Owner</th>
              <th className="border border-gray-300 p-2 text-left">Created</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedHotels.map((hotel) => (
              <tr key={hotel.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  <Checkbox
                    checked={selectedHotels.includes(hotel.id)}
                    onCheckedChange={() => handleSelectHotel(hotel.id)}
                  />
                </td>
                <td className="border border-gray-300 p-2 font-medium">{hotel.name}</td>
                <td className="border border-gray-300 p-2">{hotel.country}</td>
                <td className="border border-gray-300 p-2">{hotel.city}</td>
                <td className="border border-gray-300 p-2">{hotel.category || 'N/A'}</td>
                <td className="border border-gray-300 p-2">€{hotel.price_per_month}</td>
                <td className="border border-gray-300 p-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    hotel.status === 'approved' ? 'bg-green-100 text-green-800' :
                    hotel.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {hotel.status}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">
                  {hotel.profiles?.first_name || hotel.profiles?.last_name 
                    ? `${hotel.profiles.first_name || ''} ${hotel.profiles.last_name || ''}`.trim()
                    : 'N/A'
                  }
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(hotel.created_at).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex gap-1 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewProperty(hotel.id)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditProperty(hotel.id)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    {hotel.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleApproveHotel(hotel.id)}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-3 w-3" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRejectHotel(hotel.id)}
                          className="flex items-center gap-1"
                        >
                          <X className="h-3 w-3" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteHotel(hotel.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedHotels.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hotels found matching the current filters.
        </div>
      )}
    </div>
  );
};

export default FernandoHotels;
