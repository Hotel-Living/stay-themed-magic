
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, X, Search, Filter, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  status: string;
  owner_name?: string;
  created_at: string;
  price_per_month: number;
}

export default function PruebaHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          id,
          name,
          city,
          country,
          status,
          created_at,
          price_per_month,
          profiles:owner_id(first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const hotelsWithOwner = data?.map(hotel => ({
        ...hotel,
        owner_name: hotel.profiles 
          ? `${hotel.profiles.first_name || ''} ${hotel.profiles.last_name || ''}`.trim()
          : 'Unknown'
      })) || [];

      setHotels(hotelsWithOwner);
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

  const updateHotelStatus = async (hotelId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: newStatus })
        .eq('id', hotelId);

      if (error) throw error;

      setHotels(prev => prev.map(hotel => 
        hotel.id === hotelId ? { ...hotel, status: newStatus } : hotel
      ));

      toast({
        description: `Hotel ${newStatus} successfully`
      });
    } catch (error) {
      console.error('Error updating hotel status:', error);
      toast({
        title: "Error",
        description: "Failed to update hotel status",
        variant: "destructive"
      });
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || hotel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-500",
      approved: "bg-green-500", 
      rejected: "bg-red-500"
    };
    return statusColors[status as keyof typeof statusColors] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="bg-[#7a0486] border-purple-600">
          <CardContent className="p-6">
            <div className="text-center text-white">Loading hotels...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Hotel Management</h2>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Search and Filter Controls */}
      <Card className="bg-[#7a0486] border-purple-600">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search hotels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Hotels Table */}
      <Card className="bg-[#7a0486] border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Hotels ({filteredHotels.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-600">
                  <th className="text-left p-3 text-white">Hotel</th>
                  <th className="text-left p-3 text-white">Location</th>
                  <th className="text-left p-3 text-white">Owner</th>
                  <th className="text-left p-3 text-white">Price/Month</th>
                  <th className="text-left p-3 text-white">Status</th>
                  <th className="text-left p-3 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHotels.map((hotel) => (
                  <tr key={hotel.id} className="border-b border-purple-600/30 hover:bg-purple-800/20">
                    <td className="p-3 text-white font-medium">{hotel.name}</td>
                    <td className="p-3 text-white/80">{hotel.city}, {hotel.country}</td>
                    <td className="p-3 text-white/80">{hotel.owner_name}</td>
                    <td className="p-3 text-white/80">${hotel.price_per_month}</td>
                    <td className="p-3">
                      <Badge className={`${getStatusBadge(hotel.status)} text-white`}>
                        {hotel.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {hotel.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                              onClick={() => updateHotelStatus(hotel.id, 'approved')}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700"
                              onClick={() => updateHotelStatus(hotel.id, 'rejected')}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
