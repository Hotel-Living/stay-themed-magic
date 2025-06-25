
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, Edit, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  status: string;
  price_per_month: number;
  category: number;
  main_image_url?: string;
}

export const FernandoHotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [hotels, statusFilter, countryFilter]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('created_at', { ascending: false });

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
      
      // Extract unique countries
      const countries = [...new Set((data || []).map(hotel => hotel.country))].filter(Boolean);
      setAvailableCountries(countries);
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

  const applyFilters = () => {
    let filtered = hotels;

    if (statusFilter !== "all") {
      filtered = filtered.filter(hotel => hotel.status === statusFilter);
    }

    if (countryFilter !== "all") {
      filtered = filtered.filter(hotel => hotel.country === countryFilter);
    }

    setFilteredHotels(filtered);
  };

  const handleSelectAll = () => {
    if (selectedHotels.length === filteredHotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(filteredHotels.map(hotel => hotel.id));
    }
  };

  const handleSelectHotel = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const renderStars = (category: number) => {
    const stars = Math.max(1, Math.min(5, category || 3));
    return '⭐'.repeat(stars);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-purple-400" />
        <span className="ml-2 text-white">Loading hotels...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Hotels Management</h1>
        <Button 
          onClick={fetchHotels}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">Filter by Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white font-medium">Filter by Country:</span>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {availableCountries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Select All */}
      <div className="flex items-center gap-3 mb-4 p-4 bg-gray-800/50 rounded-lg">
        <input
          type="checkbox"
          checked={selectedHotels.length === filteredHotels.length && filteredHotels.length > 0}
          onChange={handleSelectAll}
          className="h-4 w-4"
        />
        <span className="text-white font-medium">
          Select All ({filteredHotels.length} hotels)
        </span>
      </div>

      {/* Hotels List */}
      <div className="space-y-4">
        {filteredHotels.map((hotel) => (
          <div key={hotel.id} className="bg-gray-800/50 rounded-lg p-4 flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedHotels.includes(hotel.id)}
              onChange={() => handleSelectHotel(hotel.id)}
              className="h-4 w-4"
            />
            
            <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center text-gray-400 text-xs">
              {hotel.main_image_url ? (
                <img 
                  src={hotel.main_image_url} 
                  alt={hotel.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                'No img'
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-white font-semibold text-lg">{hotel.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(hotel.status)}`}>
                  {hotel.status}
                </span>
                <span className="text-yellow-400 text-sm">
                  {renderStars(hotel.category)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-300 text-sm">
                <span>📍 {hotel.city}, {hotel.country}</span>
                <span>💰 €{hotel.price_per_month}/month</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No hotels found matching the current filters.</p>
        </div>
      )}
    </div>
  );
};
