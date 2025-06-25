import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Eye, Check, X, ChevronUp, ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHotelsData } from "@/components/dashboard/admin/hooks/useHotelsData";
import { useHotelActions } from "@/components/dashboard/admin/hooks/useHotelActions";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

type SortField = 'name' | 'city' | 'status' | 'price_per_month' | 'created_at';
type SortDirection = 'asc' | 'desc';

export default function FernandoHotels() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { hotels, loading, setHotels, fetchAllHotels } = useHotelsData();
  
  const refreshHotels = async () => {
    const result = await fetchAllHotels();
    if (result.data) {
      setHotels(result.data);
    }
  };
  
  const { handleApprove, handleReject, handleDelete } = useHotelActions(refreshHotels);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);
  const [bulkAction, setBulkAction] = useState<'approve' | 'delete' | null>(null);

  useEffect(() => {
    refreshHotels();
  }, []);

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
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  const handleSelectHotel = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const handleSelectAll = () => {
    if (selectedHotels.length === filteredAndSortedHotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(filteredAndSortedHotels.map(hotel => hotel.id));
    }
  };

  const handleBulkAction = (action: 'approve' | 'delete') => {
    if (selectedHotels.length === 0) {
      toast({
        title: "No hotels selected",
        description: "Please select hotels to perform bulk actions",
        variant: "destructive"
      });
      return;
    }
    setBulkAction(action);
    setShowBulkConfirm(true);
  };

  const confirmBulkAction = async () => {
    if (!bulkAction || selectedHotels.length === 0) return;

    try {
      const promises = selectedHotels.map(hotelId => {
        if (bulkAction === 'approve') {
          return handleApprove(hotelId);
        } else {
          return handleDelete(hotelId);
        }
      });

      await Promise.all(promises);
      
      toast({
        title: "Bulk action completed",
        description: `${selectedHotels.length} hotels ${bulkAction === 'approve' ? 'approved' : 'deleted'} successfully`,
      });

      setSelectedHotels([]);
      await refreshHotels();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${bulkAction} selected hotels`,
        variant: "destructive"
      });
    } finally {
      setShowBulkConfirm(false);
      setBulkAction(null);
    }
  };

  const filteredAndSortedHotels = hotels
    .filter(hotel => {
      const searchLower = searchTerm.toLowerCase();
      return (
        hotel.name.toLowerCase().includes(searchLower) ||
        hotel.city.toLowerCase().includes(searchLower) ||
        hotel.status.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'city':
          aValue = a.city;
          bValue = b.city;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'price_per_month':
          aValue = a.price_per_month;
          bValue = b.price_per_month;
          break;
        case 'created_at':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading hotels...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-800">Hotels Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6 gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search hotels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {selectedHotels.length > 0 && (
                <>
                  <Button
                    onClick={() => handleBulkAction('approve')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve Selected ({selectedHotels.length})
                  </Button>
                  <Button
                    onClick={() => handleBulkAction('delete')}
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete Selected ({selectedHotels.length})
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedHotels.length === filteredAndSortedHotels.length && filteredAndSortedHotels.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50 select-none"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Name
                      {getSortIcon('name')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50 select-none"
                    onClick={() => handleSort('city')}
                  >
                    <div className="flex items-center gap-1">
                      Location
                      {getSortIcon('city')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50 select-none"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50 select-none"
                    onClick={() => handleSort('price_per_month')}
                  >
                    <div className="flex items-center gap-1">
                      Price/Month
                      {getSortIcon('price_per_month')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50 select-none"
                    onClick={() => handleSort('created_at')}
                  >
                    <div className="flex items-center gap-1">
                      Created
                      {getSortIcon('created_at')}
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedHotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedHotels.includes(hotel.id)}
                        onChange={() => handleSelectHotel(hotel.id)}
                        className="rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{hotel.name}</TableCell>
                    <TableCell>{hotel.city}, {hotel.country}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={hotel.status === 'approved' ? 'default' : 
                                hotel.status === 'pending' ? 'secondary' : 'destructive'}
                      >
                        {hotel.status}
                      </Badge>
                    </TableCell>
                    <TableCell>€{hotel.price_per_month}</TableCell>
                    <TableCell>{format(new Date(hotel.created_at), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/hotel/${hotel.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/add-property?edit=${hotel.id}`)}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {hotel.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleApprove(hotel.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(hotel.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAndSortedHotels.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No hotels found matching your search.' : 'No hotels found.'}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showBulkConfirm} onOpenChange={setShowBulkConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirm Bulk {bulkAction === 'approve' ? 'Approval' : 'Deletion'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {bulkAction} {selectedHotels.length} selected hotel{selectedHotels.length > 1 ? 's' : ''}?
              {bulkAction === 'delete' && ' This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBulkAction}
              className={bulkAction === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
            >
              {bulkAction === 'approve' ? 'Approve' : 'Delete'} Selected
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
