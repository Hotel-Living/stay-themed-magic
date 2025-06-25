import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hotel } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Eye, MessageSquare, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          profiles:owner_id(id, first_name, last_name),
          hotel_images(id, image_url, is_main),
          hotel_themes(theme_id, themes(id, name, category)),
          hotel_activities(activity_id, activities(id, name, category))
        `);

      if (error) {
        console.error('Error fetching hotels:', error);
        toast.error('Error fetching hotels');
        return;
      }

      if (data) {
        // Transform the data to match the Hotel type
        const transformedHotels = data.map((hotel: any) => ({
          ...hotel,
          name: hotel.name,
          features_hotel: hotel.features_hotel as Record<string, boolean> || {},
          features_room: hotel.features_room as Record<string, boolean> || {},
          rates: hotel.rates as Record<string, number> || {},
          status: hotel.status as 'approved' | 'pending' | 'rejected',
          address: hotel.address || '',
          allow_stay_extensions: hotel.allow_stay_extensions || true,
          atmosphere: hotel.atmosphere || '',
          atmosphere_description: hotel.atmosphere_description || '',
          available_months: hotel.available_months || [],
          category: hotel.category || 0,
          check_in_weekday: hotel.check_in_weekday || 'Monday',
          city: hotel.city || '',
          contact_email: hotel.contact_email || '',
          contact_name: hotel.contact_name || '',
          contact_phone: hotel.contact_phone || '',
          country: hotel.country || '',
          description: hotel.description || '',
          faqs: hotel.faqs || [],
          ideal_guests: hotel.ideal_guests || '',
          ideal_guests_description: hotel.ideal_guests_description || '',
          is_featured: hotel.is_featured || false,
          latitude: hotel.latitude || null,
          location_address: hotel.location_address || '',
          location_description: hotel.location_description || '',
          location_highlight_description: hotel.location_highlight_description || '',
          longitude: hotel.longitude || null,
          main_image_url: hotel.main_image_url || '',
          meal_plans: hotel.meal_plans || [],
          meals_offered: hotel.meals_offered || [],
          owner_id: hotel.owner_id || '',
          perfect_location: hotel.perfect_location || '',
          photos: hotel.photos || [],
          postal_code: hotel.postal_code || '',
          preferredWeekday: hotel.preferredWeekday || 'Monday',
          price_per_month: hotel.price_per_month || 0,
          property_style: hotel.property_style || '',
          property_type: hotel.property_type || '',
          rejection_reason: hotel.rejection_reason || null,
          room_types: hotel.room_types || [],
          stay_lengths: hotel.stay_lengths || [],
          style: hotel.style || '',
          terms: hotel.terms || '',
          pending_changes: hotel.pending_changes || {},
          enable_price_increase: hotel.enable_price_increase || false,
          price_increase_cap: hotel.price_increase_cap || 20,
          enablePriceIncrease: hotel.enablepriceincrease || false,
          priceIncreaseCap: hotel.priceincreasecap || 0,
          pricingMatrix: hotel.pricingmatrix || [],
          hotel_images: hotel.hotel_images || [],
          hotel_themes: hotel.hotel_themes || [],
          hotel_activities: hotel.hotel_activities || []
        }));

        setHotels(transformedHotels);
      }
    } catch (error) {
      console.error('Error in fetchHotels:', error);
      toast.error('Error fetching hotels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (hotelId: string, hotelName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${hotelName}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId);

      if (error) throw error;

      toast.success(`Hotel "${hotelName}" deleted successfully`);
      fetchHotels();
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast.error('Error deleting hotel');
    }
  };

  const handleApprove = async (hotelId: string, hotelName: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: 'approved' })
        .eq('id', hotelId);

      if (error) throw error;

      toast.success(`Hotel "${hotelName}" approved successfully`);
      fetchHotels();
    } catch (error) {
      console.error('Error approving hotel:', error);
      toast.error('Error approving hotel');
    }
  };

  const handleReject = async (hotelId: string, hotelName: string) => {
    const reason = window.prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: 'rejected', rejection_reason: reason })
        .eq('id', hotelId);

      if (error) throw error;

      toast.success(`Hotel "${hotelName}" rejected successfully`);
      fetchHotels();
    } catch (error) {
      console.error('Error rejecting hotel:', error);
      toast.error('Error rejecting hotel');
    }
  };

  const sendMessage = async (hotelId: string, hotelName: string) => {
    const subject = window.prompt('Message subject:');
    if (!subject) return;
    
    const message = window.prompt('Message content:');
    if (!message) return;

    try {
      const { error } = await supabase
        .from('admin_messages')
        .insert({
          hotel_id: hotelId,
          subject,
          message,
          status: 'pending'
        });

      if (error) throw error;

      toast.success(`Message sent to "${hotelName}" successfully`);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message');
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || hotel.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading hotels...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hotels Management</h1>
        <div className="text-sm text-gray-500">
          Total: {hotels.length} | Filtered: {filteredHotels.length}
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search hotels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
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

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{hotel.name}</CardTitle>
                {getStatusBadge(hotel.status)}
              </div>
              <div className="text-sm text-gray-600">
                {hotel.city}, {hotel.country}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div><strong>Price:</strong> €{hotel.price_per_month}/month</div>
                <div><strong>Category:</strong> {hotel.category} stars</div>
                <div><strong>Type:</strong> {hotel.property_type}</div>
              </div>
              
              {hotel.main_image_url && (
                <img 
                  src={hotel.main_image_url} 
                  alt={hotel.name}
                  className="w-full h-32 object-cover rounded"
                />
              )}
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/admin/hotel-detail/${hotel.id}`)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                
                {hotel.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleApprove(hotel.id, hotel.name)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(hotel.id, hotel.name)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => sendMessage(hotel.id, hotel.name)}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </Button>
                
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(hotel.id, hotel.name)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <div className="text-lg text-gray-500">No hotels found</div>
          <div className="text-sm text-gray-400 mt-2">
            {searchQuery || statusFilter !== "all" 
              ? "Try adjusting your search or filter criteria"
              : "No hotels have been registered yet"
            }
          </div>
        </div>
      )}
    </div>
  );
}
