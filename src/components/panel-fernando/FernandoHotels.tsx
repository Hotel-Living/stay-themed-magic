
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, X, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const { toast } = useToast();

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          profiles(first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const hotelsData = data || [];
      setHotels(hotelsData);

      // Calculate stats
      setStats({
        total: hotelsData.length,
        pending: hotelsData.filter(h => h.status === 'pending').length,
        approved: hotelsData.filter(h => h.status === 'approved').length,
        rejected: hotelsData.filter(h => h.status === 'rejected').length
      });
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
          <p className="text-white/60">View and manage all hotels on the platform</p>
        </div>
      </div>

      {/* Hotel Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Total Hotels</h3>
              <p className="text-2xl font-bold text-blue-400">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Pending</h3>
              <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Approved</h3>
              <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Rejected</h3>
              <p className="text-2xl font-bold text-red-400">{stats.rejected}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hotels List */}
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building className="w-5 h-5" />
            All Hotels ({hotels.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hotels.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <p>No hotels found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="flex items-center justify-between p-4 bg-purple-800/20 rounded-lg border border-purple-700/30">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{hotel.name}</h3>
                    <p className="text-white/60 text-sm">{hotel.city}, {hotel.country}</p>
                    <p className="text-white/40 text-xs">
                      Owner: {hotel.profiles?.first_name} {hotel.profiles?.last_name}
                    </p>
                    <p className="text-white/40 text-xs">
                      Created: {new Date(hotel.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button size="sm" variant="outline" className="text-white border-purple-600">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    
                    {hotel.status === 'pending' && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Check className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="bg-red-600 hover:bg-red-700">
                          <X className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {getStatusBadge(hotel.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
