
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Hotel } from "@/integrations/supabase/types-custom";

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const { data: hotelsData, error } = await supabase
        .from("hotels")
        .select(`
          *,
          profiles:owner_id(id, first_name, last_name, email),
          hotel_images(id, image_url, is_main),
          hotel_themes(theme_id, themes(id, name, category)),
          hotel_activities(activity_id, activities(id, name, category))
        `);

      if (error) {
        console.error("Error fetching hotels:", error);
        return;
      }

      if (hotelsData) {
        // Transform the data to match the Hotel type
        const transformedHotels: Hotel[] = hotelsData.map((hotel: any) => ({
          ...hotel,
          // Map name to match Hotel type (uses 'name', not 'hotel_name')
          name: hotel.name,
          // Handle nullable fields with defaults
          address: hotel.address || "",
          atmosphere: hotel.atmosphere || "",
          atmosphere_description: hotel.atmosphere_description || "",
          available_months: hotel.available_months || [],
          // Type cast JSON fields to expected types
          features_hotel: (hotel.features_hotel as Record<string, boolean>) || {},
          features_room: (hotel.features_room as Record<string, boolean>) || {},
          rates: (hotel.rates as Record<string, number>) || {},
          // Handle camelCase vs snake_case field mapping
          enablePriceIncrease: hotel.enablepriceincrease || false,
          enable_price_increase: hotel.enable_price_increase || false,
          priceIncreaseCap: hotel.priceincreasecap || 0,
          price_increase_cap: hotel.price_increase_cap || 0,
          pricingMatrix: (hotel.pricingmatrix as Array<{
            roomType: string;
            stayLength: string;
            mealPlan: string;
            price: number;
          }>) || [],
          // Ensure required relationship fields exist
          hotel_images: hotel.hotel_images || [],
          hotel_themes: hotel.hotel_themes || [],
          hotel_activities: hotel.hotel_activities || [],
          // Cast status to union type
          status: hotel.status as 'approved' | 'pending' | 'rejected',
          // Handle other required fields
          meal_plans: hotel.meal_plans || [],
          room_types: hotel.room_types || [],
          stay_lengths: hotel.stay_lengths || [],
          faqs: hotel.faqs || [],
          terms: hotel.terms || "",
          preferredWeekday: hotel.preferredWeekday || "Monday",
          pending_changes: hotel.pending_changes || {},
          // Add profiles data
          profiles: hotel.profiles
        }));

        setHotels(transformedHotels);
      }
    } catch (error) {
      console.error("Error in fetchHotels:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Hotels Management</h1>
        </div>
        <div className="text-center py-8">Loading hotels...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Hotels Management</h1>
        <Button onClick={fetchHotels}>Refresh</Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search hotels by name, city, or country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="spain">Spain</SelectItem>
            <SelectItem value="portugal">Portugal</SelectItem>
            <SelectItem value="france">France</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Stars" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stars</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="name">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="asc">
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Asc</SelectItem>
            <SelectItem value="desc">Desc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-1">{hotel.name}</CardTitle>
                <Badge variant={getStatusBadgeVariant(hotel.status)}>
                  {hotel.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {hotel.city}, {hotel.country}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {hotel.main_image_url && (
                <div className="aspect-video relative overflow-hidden rounded-md">
                  <img
                    src={hotel.main_image_url}
                    alt={hotel.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Price:</span> €{hotel.price_per_month}/month
                </p>
                
                {hotel.category && (
                  <p className="text-sm">
                    <span className="font-medium">Category:</span> {hotel.category} stars
                  </p>
                )}

                {hotel.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {hotel.description}
                  </p>
                )}

                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  {hotel.status === 'pending' && (
                    <>
                      <Button size="sm" variant="default">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No hotels found matching your search criteria.
        </div>
      )}
    </div>
  );
}
