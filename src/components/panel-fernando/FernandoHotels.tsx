
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useHotelsData } from "@/components/dashboard/admin/hooks/useHotelsData";
import { useHotelActions } from "@/components/dashboard/admin/hooks/useHotelActions";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown, Edit, Check, X, Trash2 } from "lucide-react";

type SortField = 'name' | 'location' | 'status' | 'price_per_month' | 'created_at';
type SortDirection = 'asc' | 'desc';

export default function FernandoHotels() {
  const { hotels, loading, setHotels, fetchAllHotels } = useHotelsData();
  const { handleApprove, handleReject, handleDelete } = useHotelActions(fetchAllHotels);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    const { data } = await fetchAllHotels();
    if (data) {
      setHotels(data);
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedHotels = () => {
    return [...hotels].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'location') {
        aValue = `${a.city}, ${a.country}`;
        bValue = `${b.city}, ${b.country}`;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const filteredHotels = getSortedHotels().filter(hotel =>
    hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedHotels.length === filteredHotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(filteredHotels.map(hotel => hotel.id));
    }
  };

  const handleSelectHotel = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
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
        description: `${selectedHotels.length} hotels approved successfully`
      });
      
      setSelectedHotels([]);
      loadHotels();
    } catch (error) {
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
        description: `${selectedHotels.length} hotels deleted successfully`
      });
      
      setSelectedHotels([]);
      loadHotels();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete hotels",
        variant: "destructive"
      });
    }
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-gray-50" 
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center justify-between">
        {children}
        <ArrowUpDown className="w-4 h-4 ml-1" />
      </div>
    </TableHead>
  );

  if (loading) {
    return <div className="flex justify-center items-center py-8">Loading hotels...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hotels Management</h1>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search hotels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        
        {selectedHotels.length > 0 && (
          <div className="flex gap-2">
            <span className="text-sm text-gray-600">
              {selectedHotels.length} selected
            </span>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Check className="w-4 h-4 mr-1" />
                  Approve Selected
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Bulk Approval</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to approve {selectedHotels.length} selected hotels? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBulkApprove}>Approve All</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete Selected
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Bulk Deletion</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedHotels.length} selected hotels? This action cannot be undone and will permanently remove all selected hotels from the system.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
                    Delete All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedHotels.length === filteredHotels.length && filteredHotels.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <SortableHeader field="name">Name</SortableHeader>
              <SortableHeader field="location">Location</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <SortableHeader field="price_per_month">Price/Month</SortableHeader>
              <SortableHeader field="created_at">Created</SortableHeader>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedHotels.includes(hotel.id)}
                    onCheckedChange={() => handleSelectHotel(hotel.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{hotel.name}</TableCell>
                <TableCell>{hotel.city}, {hotel.country}</TableCell>
                <TableCell>
                  <Badge variant={
                    hotel.status === 'approved' ? 'default' :
                    hotel.status === 'rejected' ? 'destructive' : 'secondary'
                  }>
                    {hotel.status}
                  </Badge>
                </TableCell>
                <TableCell>€{hotel.price_per_month}</TableCell>
                <TableCell>{new Date(hotel.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/add-property?edit=${hotel.id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {hotel.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleApprove(hotel.id)}
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReject(hotel.id, "Rejected by admin")}
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(hotel.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hotels found matching your search criteria.
        </div>
      )}
    </div>
  );
}
