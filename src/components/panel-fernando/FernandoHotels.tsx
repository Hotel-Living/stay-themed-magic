
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchHotels = async () => {
    try {
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

      if (error) throw error;
      setHotels(data || []);
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

  const updateHotelStatus = async (hotelId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status })
        .eq('id', hotelId);

      if (error) throw error;
      
      toast({
        description: `Hotel ${status} successfully`
      });
      
      fetchHotels();
    } catch (error) {
      console.error('Error updating hotel status:', error);
      toast({
        title: "Error",
        description: "Failed to update hotel status",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-600', text: 'Pending' },
      approved: { color: 'bg-green-600', text: 'Approved' },
      rejected: { color: 'bg-red-600', text: 'Rejected' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge className={`${config.color} text-white`}>
        {config.text}
      </Badge>
    );
  };

  const pendingHotels = hotels.filter(hotel => hotel.status === 'pending');
  const approvedHotels = hotels.filter(hotel => hotel.status === 'approved');
  const rejectedHotels = hotels.filter(hotel => hotel.status === 'rejected');

  if (loading) {
    return (
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardContent className="p-6">
          <div className="text-center text-white/60">Loading hotels...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Hotels Management</h2>
          <p className="text-white/60">Manage all hotel submissions and status</p>
        </div>
      </div>

      {/* Pending Hotels */}
      {pendingHotels.length > 0 && (
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white">Pending Hotels ({pendingHotels.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingHotels.map((hotel) => (
                <div key={hotel.id} className="flex items-center justify-between p-4 bg-purple-800/20 rounded-lg border border-purple-700/30">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{hotel.name}</h3>
                    <p className="text-white/60 text-sm">{hotel.city}, {hotel.country}</p>
                    <p className="text-white/40 text-xs">
                      Submitted by {hotel.profiles?.first_name} {hotel.profiles?.last_name} on {new Date(hotel.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(hotel.status)}
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-purple-600 hover:bg-purple-800/50"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => updateHotelStatus(hotel.id, 'approved')}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => updateHotelStatus(hotel.id, 'rejected')}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Approved Hotels */}
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Approved Hotels ({approvedHotels.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {approvedHotels.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <p>No approved hotels found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {approvedHotels.map((hotel) => (
                <div key={hotel.id} className="flex items-center justify-between p-4 bg-purple-800/20 rounded-lg border border-purple-700/30">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{hotel.name}</h3>
                    <p className="text-white/60 text-sm">{hotel.city}, {hotel.country}</p>
                    <p className="text-white/40 text-xs">
                      Owner: {hotel.profiles?.first_name} {hotel.profiles?.last_name}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(hotel.status)}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-white border-purple-600 hover:bg-purple-800/50"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rejected Hotels */}
      {rejectedHotels.length > 0 && (
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white">Rejected Hotels ({rejectedHotels.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rejectedHotels.map((hotel) => (
                <div key={hotel.id} className="flex items-center justify-between p-4 bg-purple-800/20 rounded-lg border border-purple-700/30">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{hotel.name}</h3>
                    <p className="text-white/60 text-sm">{hotel.city}, {hotel.country}</p>
                    <p className="text-white/40 text-xs">
                      Rejected on {new Date(hotel.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(hotel.status)}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-white border-purple-600 hover:bg-purple-800/50"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
