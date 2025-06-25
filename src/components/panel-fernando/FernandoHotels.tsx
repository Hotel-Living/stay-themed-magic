
import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

interface Hotel {
  id: string;
  name: string;
  country: string;
  city: string;
  category: number | null;
  price_per_month: number;
  status: "approved" | "pending" | "rejected";
  created_at: string;
  owner_id: string | null;
}

interface FilterState {
  country: string;
  category: string;
  priceMin: string;
  priceMax: string;
  nameSearch: string;
  status: string;
}

interface SortState {
  field: 'name' | 'country' | 'created_at' | 'category' | 'price_per_month';
  direction: 'asc' | 'desc';
}

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    country: '',
    category: '',
    priceMin: '',
    priceMax: '',
    nameSearch: '',
    status: ''
  });
  const [sort, setSort] = useState<SortState>({
    field: 'created_at',
    direction: 'desc'
  });
  const { toast } = useToast();

  // Get unique countries for filter dropdown
  const uniqueCountries = useMemo(() => {
    const countries = hotels.map(hotel => hotel.country).filter(Boolean);
    return [...new Set(countries)].sort();
  }, [hotels]);

  // Filter and sort hotels
  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter(hotel => {
      // Country filter
      if (filters.country && hotel.country !== filters.country) return false;
      
      // Category filter
      if (filters.category && hotel.category?.toString() !== filters.category) return false;
      
      // Price range filter
      if (filters.priceMin && hotel.price_per_month < parseInt(filters.priceMin)) return false;
      if (filters.priceMax && hotel.price_per_month > parseInt(filters.priceMax)) return false;
      
      // Name search filter
      if (filters.nameSearch && !hotel.name.toLowerCase().includes(filters.nameSearch.toLowerCase())) return false;
      
      // Status filter
      if (filters.status && hotel.status !== filters.status) return false;
      
      return true;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue: any = a[sort.field];
      let bValue: any = b[sort.field];

      // Handle null values
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return sort.direction === 'asc' ? 1 : -1;
      if (bValue === null) return sort.direction === 'asc' ? -1 : 1;

      // Handle different data types
      if (sort.field === 'created_at') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [hotels, filters, sort]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
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

  const handleDeleteSelected = async () => {
    if (selectedHotels.length === 0) return;

    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .in('id', selectedHotels);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedHotels.length} hotel(s) deleted successfully`
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

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (field: SortState['field']) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearFilters = () => {
    setFilters({
      country: '',
      category: '',
      priceMin: '',
      priceMax: '',
      nameSearch: '',
      status: ''
    });
  };

  if (loading) {
    return <div className="p-6 text-center">Loading hotels...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fernando Hotels Management</h1>
        {selectedHotels.length > 0 && (
          <Button 
            onClick={handleDeleteSelected}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected ({selectedHotels.length})
          </Button>
        )}
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Sorting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Basic Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Search by Name</label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Hotel name..."
                  value={filters.nameSearch}
                  onChange={(e) => handleFilterChange('nameSearch', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Country</label>
              <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All countries</SelectItem>
                  {uniqueCountries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Category (Stars)</label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={clearFilters} variant="outline" className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Price Range Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Min Price (€/month)</label>
              <Input
                type="number"
                placeholder="Minimum price"
                value={filters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Max Price (€/month)</label>
              <Input
                type="number"
                placeholder="Maximum price"
                value={filters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>
          Showing {filteredAndSortedHotels.length} of {hotels.length} hotels
        </span>
        {selectedHotels.length > 0 && (
          <span>{selectedHotels.length} selected</span>
        )}
      </div>

      {/* Hotels Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-left">
                    <Checkbox
                      checked={selectedHotels.length === filteredAndSortedHotels.length && filteredAndSortedHotels.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-4 text-left">
                    <button
                      onClick={() => handleSortChange('name')}
                      className="flex items-center gap-1 font-medium hover:text-blue-600"
                    >
                      Hotel Name
                      {sort.field === 'name' && (
                        sort.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-left">
                    <button
                      onClick={() => handleSortChange('country')}
                      className="flex items-center gap-1 font-medium hover:text-blue-600"
                    >
                      Country
                      {sort.field === 'country' && (
                        sort.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-left">
                    <button
                      onClick={() => handleSortChange('category')}
                      className="flex items-center gap-1 font-medium hover:text-blue-600"
                    >
                      Stars
                      {sort.field === 'category' && (
                        sort.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-left">
                    <button
                      onClick={() => handleSortChange('price_per_month')}
                      className="flex items-center gap-1 font-medium hover:text-blue-600"
                    >
                      Price/Month
                      {sort.field === 'price_per_month' && (
                        sort.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">
                    <button
                      onClick={() => handleSortChange('created_at')}
                      className="flex items-center gap-1 font-medium hover:text-blue-600"
                    >
                      Created Date
                      {sort.field === 'created_at' && (
                        sort.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedHotels.map((hotel) => (
                  <tr key={hotel.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <Checkbox
                        checked={selectedHotels.includes(hotel.id)}
                        onCheckedChange={() => handleSelectHotel(hotel.id)}
                      />
                    </td>
                    <td className="p-4 font-medium">{hotel.name}</td>
                    <td className="p-4">{hotel.country}</td>
                    <td className="p-4">{hotel.category ? `${hotel.category} ⭐` : 'N/A'}</td>
                    <td className="p-4">€{hotel.price_per_month}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        hotel.status === 'approved' ? 'bg-green-100 text-green-800' :
                        hotel.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {hotel.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(hotel.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAndSortedHotels.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No hotels found matching the current filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
