
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Hotel } from "@/integrations/supabase/types/hotelTypes";

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [starsFilter, setStarsFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
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

      // Transform the data to match the Hotel type
      const transformedHotels: Hotel[] = (data || []).map(hotel => ({
        ...hotel,
        hotel_name: hotel.name,
        status: hotel.status as "approved" | "pending" | "rejected",
        features_hotel: hotel.features_hotel as Record<string, boolean> || {},
        features_room: hotel.features_room as Record<string, boolean> || {},
        // Handle nullable fields
        address: hotel.address || "",
        atmosphere: hotel.atmosphere || "",
        ideal_guests: hotel.ideal_guests || "",
        perfect_location: hotel.perfect_location || "",
        description: hotel.description || "",
        main_image_url: hotel.main_image_url || "",
        property_type: hotel.property_type || "",
        style: hotel.style || "",
        contact_name: hotel.contact_name || "",
        contact_email: hotel.contact_email || "",
        contact_phone: hotel.contact_phone || "",
        postal_code: hotel.postal_code || "",
        terms: hotel.terms || "",
        // Handle arrays
        available_months: hotel.available_months || [],
        meal_plans: hotel.meal_plans || [],
        stay_lengths: hotel.stay_lengths || [],
        room_types: hotel.room_types || [],
        faqs: hotel.faqs || [],
        // Handle numeric fields
        latitude: hotel.latitude || 0,
        longitude: hotel.longitude || 0,
        category: hotel.category || 0,
        // Handle boolean fields
        is_featured: hotel.is_featured || false,
        allow_stay_extensions: hotel.allow_stay_extensions || false,
        enable_price_increase: hotel.enable_price_increase || false,
        enablePriceIncrease: hotel.enablePriceIncrease || false,
        // Handle numeric fields with defaults
        price_increase_cap: hotel.price_increase_cap || 0,
        priceIncreaseCap: hotel.priceIncreaseCap || 0,
        // Handle JSON fields
        rates: hotel.rates || {},
        pending_changes: hotel.pending_changes || {},
        pricingMatrix: hotel.pricingMatrix || [],
        // Handle profile data
        hotel_images: hotel.hotel_images || [],
        hotel_themes: hotel.hotel_themes || [],
        hotel_activities: hotel.hotel_activities || []
      }));

      setHotels(transformedHotels);
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

  // Get unique countries from hotels
  const countries = [...new Set(hotels.map(hotel => hotel.country))];

  // Filter and sort hotels
  const filteredHotels = hotels
    .filter(hotel => {
      const matchesSearch = hotel.hotel_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hotel.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hotel.country?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = countryFilter === "all" || hotel.country === countryFilter;
      const matchesStars = starsFilter === "all" || hotel.category?.toString() === starsFilter;
      const matchesStatus = statusFilter === "all" || hotel.status === statusFilter;
      
      return matchesSearch && matchesCountry && matchesStars && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "name":
          aValue = a.hotel_name || "";
          bValue = b.hotel_name || "";
          break;
        case "country":
          aValue = a.country || "";
          bValue = b.country || "";
          break;
        case "city":
          aValue = a.city || "";
          bValue = b.city || "";
          break;
        case "price":
          aValue = a.price_per_month || 0;
          bValue = b.price_per_month || 0;
          break;
        case "created":
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        default:
          aValue = a.hotel_name || "";
          bValue = b.hotel_name || "";
      }
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc" 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

  const updateHotelStatus = async (hotelId: string, newStatus: "approved" | "pending" | "rejected") => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: newStatus })
        .eq('id', hotelId);

      if (error) throw error;

      setHotels(prevHotels =>
        prevHotels.map(hotel =>
          hotel.id === hotelId ? { ...hotel, status: newStatus } : hotel
        )
      );

      toast({
        title: "Success",
        description: `Hotel status updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update hotel status",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading hotels...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hotel Management</h1>
        <Button onClick={fetchHotels}>Refresh</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Input
              placeholder="Search hotels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={starsFilter} onValueChange={setStarsFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Stars" />
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

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="country">Country</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="created">Created Date</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{hotel.hotel_name}</CardTitle>
                <Badge variant={
                  hotel.status === 'approved' ? 'default' :
                  hotel.status === 'pending' ? 'secondary' : 'destructive'
                }>
                  {hotel.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {hotel.city}, {hotel.country}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Price:</strong> €{hotel.price_per_month}/month
                </p>
                <p className="text-sm">
                  <strong>Category:</strong> {hotel.category} stars
                </p>
                <p className="text-sm">
                  <strong>Created:</strong> {new Date(hotel.created_at).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedHotel(hotel)}>
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{selectedHotel?.hotel_name}</DialogTitle>
                    </DialogHeader>
                    {selectedHotel && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Basic Info</h4>
                          <p><strong>ID:</strong> {selectedHotel.id}</p>
                          <p><strong>Location:</strong> {selectedHotel.city}, {selectedHotel.country}</p>
                          <p><strong>Address:</strong> {selectedHotel.address}</p>
                          <p><strong>Price:</strong> €{selectedHotel.price_per_month}/month</p>
                          <p><strong>Category:</strong> {selectedHotel.category} stars</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold">Description</h4>
                          <p className="text-sm">{selectedHotel.description}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Available Months</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedHotel.available_months?.map((month) => (
                              <Badge key={month} variant="outline">{month}</Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold">Status Actions</h4>
                          <div className="flex gap-2 mt-2">
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => updateHotelStatus(selectedHotel.id, "approved")}
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => updateHotelStatus(selectedHotel.id, "pending")}
                            >
                              Set Pending
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => updateHotelStatus(selectedHotel.id, "rejected")}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No hotels found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
