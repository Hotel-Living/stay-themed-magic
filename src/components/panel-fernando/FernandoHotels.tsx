import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, MessageSquare, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FernandoHotels() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("hotels")
        .select(`
          *,
          hotel_images (
            id,
            hotel_id,
            image_url,
            is_main,
            created_at
          ),
          hotel_themes (
            id,
            themes (
              id,
              name
            )
          ),
          hotel_activities (
            id,
            activities (
              id,
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const hotelsWithFixedStatus = data.map(hotel => ({
        ...hotel,
        status: hotel.status as "approved" | "pending" | "rejected"
      }));

      setHotels(hotelsWithFixedStatus);
      
      // Extract unique countries for filter
      const countries = [...new Set(data.map(hotel => hotel.country).filter(Boolean))];
      setAvailableCountries(countries.sort());
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Filter hotels based on selected filters
  const filteredHotels = hotels.filter(hotel => {
    const statusMatch = statusFilter === "all" || hotel.status === statusFilter;
    const countryMatch = countryFilter === "all" || hotel.country === countryFilter;
    return statusMatch && countryMatch;
  });

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(filteredHotels.map(hotel => hotel.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectHotel = (hotelId: string) => {
    if (selectedHotels.includes(hotelId)) {
      setSelectedHotels(selectedHotels.filter(id => id !== hotelId));
    } else {
      setSelectedHotels([...selectedHotels, hotelId]);
    }
  };

  useEffect(() => {
    setSelectAll(selectedHotels.length === filteredHotels.length && filteredHotels.length > 0);
  }, [selectedHotels, filteredHotels]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const renderStars = (category: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < category ? "text-yellow-400" : "text-gray-400"}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-fuchsia-900 text-white">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-80 bg-purple-900/50 backdrop-blur border-r border-purple-700/50 p-6">
          <h1 className="text-2xl font-bold mb-8 text-purple-200">Advanced Admin Control Panel</h1>
          
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-800/50 border border-purple-600/50">
              <span>🏨</span>
              <span className="font-medium">Hotels</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
              <span>📅</span>
              <span>Bookings</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
              <span>💳</span>
              <span>Payments</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
              <span>📊</span>
              <span>Statistics</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
              <span>💬</span>
              <span>Communications</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
              <span>📢</span>
              <span>Advertising</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
              <span>💝</span>
              <span>Affinities</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
              <span>🔍</span>
              <span>Filters</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
              <span>👥</span>
              <span>User Roles</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
              <span>📊</span>
              <span>Analytics</span>
            </div>
          </nav>
        </div>
        <div className="flex-1 ml-80 p-8">
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading hotels...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-fuchsia-900 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-purple-900/50 backdrop-blur border-r border-purple-700/50 p-6">
        <h1 className="text-2xl font-bold mb-8 text-purple-200">Advanced Admin Control Panel</h1>
        
        <nav className="space-y-2">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-800/50 border border-purple-600/50">
            <span>🏨</span>
            <span className="font-medium">Hotels</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
            <span>📅</span>
            <span>Bookings</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
            <span>💳</span>
            <span>Payments</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
            <span>📊</span>
            <span>Statistics</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
            <span>💬</span>
            <span>Communications</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
            <span>📢</span>
            <span>Advertising</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
            <span>💝</span>
            <span>Affinities</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
            <span>🔍</span>
            <span>Filters</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
            <span>👥</span>
            <span>User Roles</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 cursor-pointer">
            <span>📊</span>
            <span>Analytics</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-80 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Hotels Management</h2>
          <Button 
            onClick={fetchHotels}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filter by Status:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-purple-800/50 border-purple-600">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent className="bg-purple-800 border-purple-600">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filter by Country:</span>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-48 bg-purple-800/50 border-purple-600">
                <SelectValue placeholder="All countries" />
              </SelectTrigger>
              <SelectContent className="bg-purple-800 border-purple-600">
                <SelectItem value="all">All Countries</SelectItem>
                {availableCountries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-purple-300">
            Showing {filteredHotels.length} of {hotels.length} hotels
          </div>
        </div>

        {/* Select All */}
        <div className="mb-6 flex items-center space-x-2">
          <Checkbox
            checked={selectAll}
            onCheckedChange={handleSelectAll}
          />
          <span>Select All ({filteredHotels.length} hotels)</span>
        </div>

        {/* Hotels List */}
        <div className="space-y-4">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-purple-800/30 rounded-lg p-6 border border-purple-600/50 hover:bg-purple-800/40 transition-all"
            >
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedHotels.includes(hotel.id)}
                  onCheckedChange={() => handleSelectHotel(hotel.id)}
                />
                
                <div className="w-16 h-16 bg-purple-700/50 rounded-lg flex items-center justify-center text-purple-300">
                  {hotel.main_image_url ? (
                    <img 
                      src={hotel.main_image_url} 
                      alt={hotel.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-xs">No img</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{hotel.name}</h3>
                  <div className="flex items-center space-x-4 text-purple-300 mt-1">
                    <span>📍 {hotel.city}, {hotel.country}</span>
                    <span>💰 €{hotel.price_per_month}/month</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusBadgeVariant(hotel.status)}>
                    {hotel.status}
                  </Badge>
                  
                  <div className="flex">
                    {renderStars(hotel.category || 0)}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/20">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  
                  <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/20">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  
                  <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12 text-purple-300">
            <p>No hotels found matching the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
