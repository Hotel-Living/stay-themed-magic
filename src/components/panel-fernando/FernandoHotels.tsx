
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, Edit, Trash2, CheckCircle, XCircle, Search } from "lucide-react";
import { Hotel } from "@/integrations/supabase/types/hotelTypes";

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("hotels")
        .select(`
          *,
          profiles:owner_id(first_name, last_name, email)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching hotels:", error);
        toast.error("Error loading hotels");
        return;
      }

      if (data) {
        // Map the data to match Hotel type expectations
        const mappedHotels = data.map(hotel => ({
          ...hotel,
          hotel_name: hotel.name, // Map name to hotel_name to satisfy the type
          status: hotel.status as "approved" | "pending" | "rejected"
        }));
        
        setHotels(mappedHotels);
        
        // Extract unique countries for filter
        const uniqueCountries = [...new Set(data.map(hotel => hotel.country))].filter(Boolean);
        setCountries(uniqueCountries);
      }
    } catch (error) {
      console.error("Exception fetching hotels:", error);
      toast.error("Error loading hotels");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from("hotels")
        .update({ status: "approved" })
        .eq("id", hotelId);

      if (error) {
        console.error("Error approving hotel:", error);
        toast.error("Error approving hotel");
        return;
      }

      toast.success("Hotel approved successfully");
      fetchHotels(); // Refresh the list
    } catch (error) {
      console.error("Exception approving hotel:", error);
      toast.error("Error approving hotel");
    }
  };

  const handleReject = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from("hotels")
        .update({ status: "rejected" })
        .eq("id", hotelId);

      if (error) {
        console.error("Error rejecting hotel:", error);
        toast.error("Error rejecting hotel");
        return;
      }

      toast.success("Hotel rejected successfully");
      fetchHotels(); // Refresh the list
    } catch (error) {
      console.error("Exception rejecting hotel:", error);
      toast.error("Error rejecting hotel");
    }
  };

  const handleDelete = async (hotelId: string) => {
    if (!confirm("Are you sure you want to delete this hotel? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("hotels")
        .delete()
        .eq("id", hotelId);

      if (error) {
        console.error("Error deleting hotel:", error);
        toast.error("Error deleting hotel");
        return;
      }

      toast.success("Hotel deleted successfully");
      fetchHotels(); // Refresh the list
    } catch (error) {
      console.error("Exception deleting hotel:", error);
      toast.error("Error deleting hotel");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedHotels.length === 0) {
      toast.error("Please select hotels to delete");
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedHotels.length} hotels? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("hotels")
        .delete()
        .in("id", selectedHotels);

      if (error) {
        console.error("Error bulk deleting hotels:", error);
        toast.error("Error deleting hotels");
        return;
      }

      toast.success(`${selectedHotels.length} hotels deleted successfully`);
      setSelectedHotels([]);
      fetchHotels(); // Refresh the list
    } catch (error) {
      console.error("Exception bulk deleting hotels:", error);
      toast.error("Error deleting hotels");
    }
  };

  const handleViewProperty = (hotelId: string) => {
    // Open hotel detail page in new tab
    window.open(`/hotel/${hotelId}`, '_blank');
  };

  const handleEditProperty = (hotelId: string) => {
    // Navigate to property edit page
    window.open(`/dashboard/properties/edit/${hotelId}`, '_blank');
  };

  const toggleHotelSelection = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedHotels.length === filteredHotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(filteredHotels.map(hotel => hotel.id));
    }
  };

  // Filter and sort hotels
  const filteredHotels = hotels
    .filter(hotel => {
      const matchesSearch = hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           hotel.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hotel.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCountry = countryFilter === "all" || hotel.country === countryFilter;
      const matchesCategory = categoryFilter === "all" || hotel.category?.toString() === categoryFilter;
      const matchesStatus = statusFilter === "all" || hotel.status === statusFilter;
      
      return matchesSearch && matchesCountry && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "name":
          aValue = a.name || "";
          bValue = b.name || "";
          break;
        case "created_at":
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        case "price":
          aValue = a.price_per_month || 0;
          bValue = b.price_per_month || 0;
          break;
        default:
          aValue = a.name || "";
          bValue = b.name || "";
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading hotels...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hotels Management</h1>
        {selectedHotels.length > 0 && (
          <Button onClick={handleBulkDelete} variant="destructive">
            Delete Selected ({selectedHotels.length})
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search hotels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="created_at">Date Created</SelectItem>
                <SelectItem value="price">Price</SelectItem>
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

      {/* Hotels List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Hotels ({filteredHotels.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedHotels.length === filteredHotels.length && filteredHotels.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm">Select All</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredHotels.map(hotel => (
              <div key={hotel.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedHotels.includes(hotel.id)}
                      onCheckedChange={() => toggleHotelSelection(hotel.id)}
                    />
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{hotel.name}</h3>
                      <p className="text-sm text-gray-600">{hotel.city}, {hotel.country}</p>
                      <p className="text-sm text-gray-500">{hotel.description?.substring(0, 100)}...</p>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(hotel.status || "pending")}
                        <span className="text-sm text-gray-500">
                          €{hotel.price_per_month}/month
                        </span>
                        {hotel.category && (
                          <span className="text-sm text-gray-500">
                            {hotel.category} ⭐
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleViewProperty(hotel.id)}
                      size="sm"
                      variant="outline"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    
                    <Button
                      onClick={() => handleEditProperty(hotel.id)}
                      size="sm"
                      variant="outline"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    
                    {hotel.status === "pending" && (
                      <>
                        <Button
                          onClick={() => handleApprove(hotel.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        
                        <Button
                          onClick={() => handleReject(hotel.id)}
                          size="sm"
                          variant="destructive"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    
                    <Button
                      onClick={() => handleDelete(hotel.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredHotels.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hotels found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
