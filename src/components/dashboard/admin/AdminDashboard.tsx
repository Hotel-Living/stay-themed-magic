import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";
import BatchImagePopulation from "./BatchImagePopulation";

export default function AdminDashboard() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [activeTab, setActiveTab] = useState('hotels');
  const { toast } = useToast();

  useEffect(() => {
    fetchHotels();
  }, [searchTerm, selectedStatus]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('hotels')
        .select('*');

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      if (selectedStatus) {
        query = query.eq('status', selectedStatus);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching hotels:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch hotels"
        });
      } else {
        setHotels(data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleHotelUpdate = async (id, updates) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating hotel:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update hotel status"
        });
      } else {
        toast({
          title: "Success",
          description: "Hotel status updated successfully"
        });
        fetchHotels(); // Refresh hotels
      }
    } catch (error) {
      console.error('Update failed:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update hotel status"
      });
    }
  };

  const handleHotelDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting hotel:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete hotel"
        });
      } else {
        toast({
          title: "Success",
          description: "Hotel deleted successfully"
        });
        fetchHotels(); // Refresh hotels
      }
    } catch (error) {
      console.error('Delete failed:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete hotel"
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'hotels':
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Search hotels..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableCaption>A list of your hotels.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : hotels.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">No hotels found.</TableCell>
                  </TableRow>
                ) : (
                  hotels.map((hotel) => (
                    <TableRow key={hotel.id}>
                      <TableCell className="font-medium">{hotel.id}</TableCell>
                      <TableCell>{hotel.name}</TableCell>
                      <TableCell>{hotel.city}</TableCell>
                      <TableCell>{hotel.country}</TableCell>
                      <TableCell>{hotel.status}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/hotel/${hotel.id}`}>
                                <Edit className="h-4 w-4 mr-2" />
                                <span>Edit</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleHotelDelete(hotel.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {hotel.status !== 'approved' && (
                              <DropdownMenuItem onClick={() => handleHotelUpdate(hotel.id, { status: 'approved' })}>
                                Approve
                              </DropdownMenuItem>
                            )}
                            {hotel.status !== 'rejected' && (
                              <DropdownMenuItem onClick={() => handleHotelUpdate(hotel.id, { status: 'rejected' })}>
                                Reject
                              </DropdownMenuItem>
                            )}
                            {hotel.status !== 'pending' && (
                              <DropdownMenuItem onClick={() => handleHotelUpdate(hotel.id, { status: 'pending' })}>
                                Set to Pending
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        );
      
      case 'batch-images':
        return <BatchImagePopulation />;
      
      default:
        return <div>Select a tab to view content.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('hotels')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'hotels'
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Hotels
            </button>
            
            <button
              onClick={() => setActiveTab('batch-images')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'batch-images'
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Batch Images
            </button>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
