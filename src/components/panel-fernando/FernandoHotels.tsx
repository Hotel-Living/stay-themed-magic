
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Download, Edit, Trash2, Eye, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  status: string;
  price_per_month: number;
  created_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  };
}

export const FernandoHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [actionType, setActionType] = useState<'single' | 'bulk'>('single');
  const [targetHotelId, setTargetHotelId] = useState<string>('');
  const { toast } = useToast();

  console.log('FernandoHotels component loaded');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      console.log('Fetching hotels...');
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          id, name, city, country, status, price_per_month, created_at,
          profiles:owner_id(first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('Hotels fetched:', data?.length);
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

  const handleApprove = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: 'approved' })
        .eq('id', hotelId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hotel has been approved",
        variant: "default"
      });

      fetchHotels();
    } catch (error) {
      console.error('Error approving hotel:', error);
      toast({
        title: "Error",
        description: "Failed to approve hotel",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hotel has been deleted",
        variant: "default"
      });

      fetchHotels();
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast({
        title: "Error",
        description: "Failed to delete hotel",
        variant: "destructive"
      });
    }
  };

  const handleBulkApprove = async () => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ status: 'approved' })
        .in('id', selectedHotels);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedHotels.length} hotels have been approved`,
        variant: "default"
      });

      setSelectedHotels([]);
      fetchHotels();
    } catch (error) {
      console.error('Error approving hotels:', error);
      toast({
        title: "Error",
        description: "Failed to approve hotels",
        variant: "destructive"
      });
    }
  };

  const handleBulkDelete = async () => {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .in('id', selectedHotels);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedHotels.length} hotels have been deleted`,
        variant: "default"
      });

      setSelectedHotels([]);
      fetchHotels();
    } catch (error) {
      console.error('Error deleting hotels:', error);
      toast({
        title: "Error",
        description: "Failed to delete hotels",
        variant: "destructive"
      });
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || hotel.status === statusFilter;
    const matchesCountry = countryFilter === 'all' || hotel.country === countryFilter;
    
    return matchesSearch && matchesStatus && matchesCountry;
  });

  const uniqueCountries = Array.from(new Set(hotels.map(hotel => hotel.country)));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedHotels(filteredHotels.map(hotel => hotel.id));
    } else {
      setSelectedHotels([]);
    }
  };

  const handleSelectHotel = (hotelId: string, checked: boolean) => {
    if (checked) {
      setSelectedHotels(prev => [...prev, hotelId]);
    } else {
      setSelectedHotels(prev => prev.filter(id => id !== hotelId));
    }
  };

  const confirmAction = (type: 'approve' | 'delete', isBulk: boolean, hotelId?: string) => {
    setActionType(isBulk ? 'bulk' : 'single');
    setTargetHotelId(hotelId || '');
    
    if (type === 'approve') {
      setShowApprovalDialog(true);
    } else {
      setShowDeleteDialog(true);
    }
  };

  const executeAction = () => {
    if (showDeleteDialog) {
      if (actionType === 'bulk') {
        handleBulkDelete();
      } else {
        handleDelete(targetHotelId);
      }
      setShowDeleteDialog(false);
    } else if (showApprovalDialog) {
      if (actionType === 'bulk') {
        handleBulkApprove();
      } else {
        handleApprove(targetHotelId);
      }
      setShowApprovalDialog(false);
    }
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
        <h2 className="text-2xl font-bold text-white">Hotels Management</h2>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2 bg-[#7a0486] hover:bg-purple-700 text-white">
            <Plus className="w-4 h-4" />
            Add Hotel
          </Button>
          <Button className="flex items-center gap-2 bg-[#7a0486] hover:bg-purple-700 text-white">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card className="bg-[#7a0486] border-purple-600">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search hotels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-purple-800 border-purple-600">
                <SelectItem value="all" className="text-white">All Status</SelectItem>
                <SelectItem value="pending" className="text-white">Pending</SelectItem>
                <SelectItem value="approved" className="text-white">Approved</SelectItem>
                <SelectItem value="rejected" className="text-white">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-40 bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent className="bg-purple-800 border-purple-600">
                <SelectItem value="all" className="text-white">All Countries</SelectItem>
                {uniqueCountries.map(country => (
                  <SelectItem key={country} value={country} className="text-white">{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedHotels.length > 0 && (
        <Card className="bg-[#7a0486] border-purple-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <span className="text-white">{selectedHotels.length} hotels selected</span>
              <Button 
                onClick={() => confirmAction('approve', true)}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Approve Selected
              </Button>
              <Button 
                onClick={() => confirmAction('delete', true)}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Select All Card */}
        <Card className="bg-[#7a0486] border-purple-600">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedHotels.length === filteredHotels.length && filteredHotels.length > 0}
                onCheckedChange={handleSelectAll}
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-800"
              />
              <label htmlFor="select-all" className="text-white font-medium cursor-pointer">
                Select All ({filteredHotels.length})
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Hotel Cards */}
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id} className="bg-[#7a0486] border-purple-600">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedHotels.includes(hotel.id)}
                    onCheckedChange={(checked) => handleSelectHotel(hotel.id, !!checked)}
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-800"
                  />
                  <CardTitle className="text-white font-medium">{hotel.name}</CardTitle>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  hotel.status === 'approved' ? 'bg-green-600' : 
                  hotel.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                } text-white`}>
                  {hotel.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-white/80">{hotel.city}, {hotel.country}</p>
                <p className="text-white/80">€{hotel.price_per_month}/month</p>
                <p className="text-white/80 text-sm">
                  Owner: {hotel.profiles?.first_name || 'Unknown'} {hotel.profiles?.last_name || ''}
                </p>
                <p className="text-white/80 text-sm">
                  Created: {new Date(hotel.created_at).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                  onClick={() => window.open(`/hotel/${hotel.id}`, '_blank')}
                >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  className="bg-[#7a0486] hover:bg-purple-700 text-white border border-white flex items-center gap-1"
                  onClick={() => window.open(`/dashboard/properties/edit/${hotel.id}`, '_blank')}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                {hotel.status === 'pending' && (
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                    onClick={() => confirmAction('approve', false, hotel.id)}
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </Button>
                )}
                <Button 
                  size="sm" 
                  className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                  onClick={() => confirmAction('delete', false, hotel.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <Card className="bg-[#7a0486] border-purple-600">
          <CardContent className="p-6">
            <div className="text-center text-white">No hotels found matching your criteria.</div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[#7a0486] border-purple-600">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-white/80">
              {actionType === 'bulk' 
                ? `Are you sure you want to delete ${selectedHotels.length} selected hotels? This action cannot be undone.`
                : 'Are you sure you want to delete this hotel? This action cannot be undone.'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-600 hover:bg-gray-700 text-white border-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeAction}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Approval Confirmation Dialog */}
      <AlertDialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <AlertDialogContent className="bg-[#7a0486] border-purple-600">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Approval</AlertDialogTitle>
            <AlertDialogDescription className="text-white/80">
              {actionType === 'bulk' 
                ? `Are you sure you want to approve ${selectedHotels.length} selected hotels?`
                : 'Are you sure you want to approve this hotel?'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-600 hover:bg-gray-700 text-white border-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeAction}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
