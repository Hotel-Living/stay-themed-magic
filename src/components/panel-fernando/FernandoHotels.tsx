import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Eye, Edit2, Check, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Hotel {
  id: string;
  hotel_name: string;
  city: string;
  country: string;
  category: number;
  price_per_month: number;
  status: string;
  created_at: string;
}

interface SortOption {
  value: string;
  label: string;
}

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [starsFilter, setStarsFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch hotels",
          variant: "destructive",
        });
        return;
      }

      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hotels",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
        description: "Hotel approved successfully",
      });

      fetchHotels();
    } catch (error) {
      console.error('Error approving hotel:', error);
      toast({
        title: "Error",
        description: "Failed to approve hotel",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: 'rejected' })
        .eq('id', hotelId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hotel rejected successfully",
      });

      fetchHotels();
    } catch (error) {
      console.error('Error rejecting hotel:', error);
      toast({
        title: "Error",
        description: "Failed to reject hotel",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (hotelId: string) => {
    if (!confirm("Are you sure you want to delete this hotel?")) return;

    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hotel deleted successfully",
      });

      fetchHotels();
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast({
        title: "Error",
        description: "Failed to delete hotel",
        variant: "destructive",
      });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedHotels.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedHotels.length} hotels?`)) return;

    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .in('id', selectedHotels);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedHotels.length} hotels deleted successfully`,
      });

      setSelectedHotels([]);
      fetchHotels();
    } catch (error) {
      console.error('Error deleting hotels:', error);
      toast({
        title: "Error",
        description: "Failed to delete hotels",
        variant: "destructive",
      });
    }
  };

  const handleViewProperty = (hotelId: string) => {
    window.open(`/hotel/${hotelId}`, '_blank');
  };

  const handleEditProperty = (hotelId: string) => {
    navigate(`/dashboard/add-property/${hotelId}`);
  };

  const toggleSelectAll = () => {
    if (selectedHotels.length === filteredAndSortedHotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(filteredAndSortedHotels.map(hotel => hotel.id));
    }
  };

  const toggleSelectHotel = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const filteredHotels = hotels.filter(hotel => {
    const searchTermMatch = hotel.hotel_name.toLowerCase().includes(searchTerm.toLowerCase());
    const countryMatch = countryFilter === "all" || hotel.country === countryFilter;
    const starsMatch = starsFilter === "all" || hotel.category.toString() === starsFilter;
    const statusMatch = statusFilter === "all" || hotel.status === statusFilter;

    const priceMatch =
      (minPrice === "" || hotel.price_per_month >= Number(minPrice)) &&
      (maxPrice === "" || hotel.price_per_month <= Number(maxPrice));

    return searchTermMatch && countryMatch && starsMatch && statusMatch && priceMatch;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = a.hotel_name.localeCompare(b.hotel_name);
    } else if (sortBy === "country") {
      comparison = a.country.localeCompare(b.country);
    } else if (sortBy === "category") {
      comparison = a.category - b.category;
    } else if (sortBy === "price_per_month") {
      comparison = a.price_per_month - b.price_per_month;
    } else if (sortBy === "created_at") {
      comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const filteredAndSortedHotels = sortedHotels;

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Hotels Management</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading hotels...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotels Management ({hotels.length} hotels)</h1>
        {selectedHotels.length > 0 && (
          <Button onClick={handleBulkDelete} variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected ({selectedHotels.length})
          </Button>
        )}
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        {/* Search by Hotel Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Hotel Name</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search hotels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Country Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Country</label>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {Array.from(new Set(hotels.map(h => h.country).filter(Boolean))).map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stars Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Stars</label>
          <Select value={starsFilter} onValueChange={setStarsFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Stars" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Min Price</label>
          <Input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Max Price</label>
          <Input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Sort Section */}
      <div className="flex gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Sort by</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Hotel Name</SelectItem>
              <SelectItem value="country">Country</SelectItem>
              <SelectItem value="category">Stars</SelectItem>
              <SelectItem value="price_per_month">Price/Month</SelectItem>
              <SelectItem value="created_at">Created Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Order</label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Hotels Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Checkbox
                    checked={selectedHotels.length === filteredAndSortedHotels.length && filteredAndSortedHotels.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hotel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stars
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedHotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Checkbox
                      checked={selectedHotels.includes(hotel.id)}
                      onCheckedChange={() => toggleSelectHotel(hotel.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {hotel.hotel_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {hotel.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{hotel.city}, {hotel.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{hotel.category} ⭐</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">€{hotel.price_per_month}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      hotel.status === 'approved' ? 'bg-green-100 text-green-800' :
                      hotel.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {hotel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(hotel.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewProperty(hotel.id)}
                        title="View as client"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProperty(hotel.id)}
                        title="Edit property"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      {hotel.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(hotel.id)}
                          className="text-green-600 hover:text-green-700"
                          title="Approve"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      {hotel.status !== 'rejected' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(hotel.id)}
                          className="text-red-600 hover:text-red-700"
                          title="Reject"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(hotel.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedHotels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">No hotels found matching your criteria.</div>
          </div>
        )}
      </div>
    </div>
  );
}
