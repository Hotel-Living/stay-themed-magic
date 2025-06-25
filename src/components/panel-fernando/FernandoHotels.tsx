
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FernandoHotels = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [countries, setCountries] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchHotels = async () => {
    try {
      setLoading(true);
      let query = supabase
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
            theme_id,
            themes (
              id,
              name,
              description,
              category
            )
          ),
          hotel_activities (
            activity_id,
            activities (
              id,
              name,
              category
            )
          )
        `)
        .order('created_at', { ascending: false });

      // Apply status filter
      if (statusFilter !== "all") {
        query = query.eq('status', statusFilter);
      }

      // Apply country filter
      if (countryFilter !== "all") {
        query = query.eq('country', countryFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching hotels:", error);
        toast({
          title: "Error",
          description: "Failed to fetch hotels",
          variant: "destructive",
        });
        return;
      }

      setHotels(data || []);

      // Extract unique countries for filter
      const uniqueCountries = [...new Set((data || []).map(hotel => hotel.country).filter(Boolean))];
      setCountries(uniqueCountries);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [statusFilter, countryFilter]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hotels Management</h1>
        <Button onClick={fetchHotels} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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
            <SelectTrigger className="w-[150px]">
              <SelectValue />
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
        </div>
      </div>

      <div className="grid gap-4">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {hotel.city}, {hotel.country}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusBadgeVariant(hotel.status)}>
                    {hotel.status}
                  </Badge>
                  <span className="text-sm font-medium">
                    €{hotel.price_per_month}/month
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Category:</span> {hotel.category || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Property Type:</span> {hotel.property_type || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(hotel.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hotels.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hotels found matching the current filters.</p>
        </div>
      )}
    </div>
  );
};
