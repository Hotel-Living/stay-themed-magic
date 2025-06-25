import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Download, Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

type SortField = 'name' | 'location' | 'status' | 'price' | 'created';
type SortDirection = 'asc' | 'desc';

export default function FernandoHotels() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('created');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleView = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  const handleEdit = (hotelId: string) => {
    navigate(`/add-property?edit=${hotelId}`);
  };

  const handleDelete = async (hotelId: string) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        const { error } = await supabase
          .from('hotels')
          .delete()
          .eq('id', hotelId);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Hotel deleted successfully",
        });
        
        fetchHotels(); // Refresh the list
      } catch (error) {
        console.error('Error deleting hotel:', error);
        toast({
          title: "Error",
          description: "Failed to delete hotel",
          variant: "destructive"
        });
      }
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <div className="w-4 h-4" />; // Empty space to maintain alignment
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  const sortedAndFilteredHotels = hotels
    .filter(hotel => 
      hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.country?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'name':
          aValue = a.name || '';
          bValue = b.name || '';
          break;
        case 'location':
          aValue = `${a.city || ''}, ${a.country || ''}`;
          bValue = `${b.city || ''}, ${a.country || ''}`;
          break;
        case 'status':
          aValue = a.status || '';
          bValue = b.status || '';
          break;
        case 'price':
          aValue = a.price_per_month || 0;
          bValue = b.price_per_month || 0;
          break;
        case 'created':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  useEffect(() => {
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

        if (error) {
          toast({
            title: "Error",
            description: "Failed to fetch hotels",
            variant: "destructive"
          });
          return;
        }

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

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading hotels...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Fernando Hotels Management</h1>
        <div className="flex gap-3">
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => navigate('/add-property')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Hotel
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Hotels Overview</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search hotels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th 
                    className="text-left py-3 px-4 text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center justify-between">
                      Name
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort('location')}
                  >
                    <div className="flex items-center justify-between">
                      Location
                      {getSortIcon('location')}
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center justify-between">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center justify-between">
                      Price/Month
                      {getSortIcon('price')}
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort('created')}
                  >
                    <div className="flex items-center justify-between">
                      Created
                      {getSortIcon('created')}
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredHotels.map((hotel) => (
                  <tr key={hotel.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{hotel.name}</td>
                    <td className="py-3 px-4 text-white">{hotel.city}, {hotel.country}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        hotel.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : hotel.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {hotel.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white">€{hotel.price_per_month}</td>
                    <td className="py-3 px-4 text-white">
                      {new Date(hotel.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleView(hotel.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          className="h-8 w-8 p-0 bg-fuchsia-600 hover:bg-fuchsia-700"
                          onClick={() => handleEdit(hotel.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700"
                          onClick={() => handleDelete(hotel.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {sortedAndFilteredHotels.length === 0 && (
              <div className="text-center py-8 text-white/70">
                {searchTerm ? 'No hotels found matching your search.' : 'No hotels available.'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
