import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Hotel, CheckCircle, XCircle, Eye, Edit, Trash2, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
interface HotelData {
  id: string;
  name: string;
  city: string;
  country: string;
  status: string;
  price_per_month: number;
  main_image_url?: string;
  created_at: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
  };
}
export default function FernandoHotels() {
  const [hotels, setHotels] = useState<HotelData[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchHotels();
  }, []);
  const fetchHotels = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('hotels').select(`
          id,
          name,
          city,
          country,
          status,
          price_per_month,
          main_image_url,
          created_at,
          profiles:owner_id(
            first_name,
            last_name
          )
        `).order('created_at', {
        ascending: false
      });
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
  const updateHotelStatus = async (hotelId: string, newStatus: string) => {
    try {
      const {
        error
      } = await supabase.from('hotels').update({
        status: newStatus
      }).eq('id', hotelId);
      if (error) throw error;
      setHotels(hotels.map(hotel => hotel.id === hotelId ? {
        ...hotel,
        status: newStatus
      } : hotel));
      toast({
        title: "Success",
        description: `Hotel ${newStatus === 'approved' ? 'approved' : 'rejected'} successfully`
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
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };
  if (loading) {
    return <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hotel className="w-5 h-5" />
            Hotels Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading hotels...</div>
        </CardContent>
      </Card>;
  }
  return <Card>
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white bg-[#4fc44f]">
        <CardTitle className="flex items-center gap-2">
          <Hotel className="w-5 h-5" />
          Hotels Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Price/Month</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotels.map(hotel => <TableRow key={hotel.id}>
                  <TableCell className="bg-[#571083]">
                    {hotel.main_image_url ? <img src={hotel.main_image_url} alt={hotel.name} className="w-12 h-12 object-cover rounded border" onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }} /> : null}
                    <div className={`w-12 h-12 bg-gray-100 border rounded flex items-center justify-center ${hotel.main_image_url ? 'hidden' : ''}`}>
                      <ImageIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{hotel.name}</TableCell>
                  <TableCell>{hotel.city}, {hotel.country}</TableCell>
                  <TableCell>
                    {hotel.profiles ? `${hotel.profiles.first_name || ''} ${hotel.profiles.last_name || ''}`.trim() || 'N/A' : 'N/A'}
                  </TableCell>
                  <TableCell>€{hotel.price_per_month}</TableCell>
                  <TableCell>{getStatusBadge(hotel.status)}</TableCell>
                  <TableCell>{new Date(hotel.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {hotel.status === 'pending' && <>
                          <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700" onClick={() => updateHotelStatus(hotel.id, 'approved')}>
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => updateHotelStatus(hotel.id, 'rejected')}>
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>}
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </div>
        {hotels.length === 0 && <div className="text-center py-8 text-gray-500">
            No hotels found
          </div>}
      </CardContent>
    </Card>;
}