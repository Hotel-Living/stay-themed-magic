
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Check, AlertCircle } from "lucide-react";
import { useHotelsData } from "@/components/dashboard/admin/hooks/useHotelsData";
import { useHotelActions } from "@/components/dashboard/admin/hooks/useHotelActions";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function FernandoHotels() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { hotels, loading, fetchAllHotels } = useHotelsData();
  const { handleApprove, handleReject, handleDelete } = useHotelActions(fetchAllHotels);
  
  const [filteredHotels, setFilteredHotels] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [selectedHotels, setSelectedHotels] = useState<Set<string>>(new Set());
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [bulkAction, setBulkAction] = useState<'delete' | 'approve' | null>(null);

  useEffect(() => {
    fetchAllHotels().then(({ data }) => {
      if (data) {
        setFilteredHotels(data);
      }
    });
  }, []);

  useEffect(() => {
    let filtered = hotels;
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(hotel => hotel.status === statusFilter);
    }
    
    if (countryFilter !== "all") {
      filtered = filtered.filter(hotel => hotel.country === countryFilter);
    }
    
    setFilteredHotels(filtered);
  }, [hotels, statusFilter, countryFilter]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedHotels(new Set(filteredHotels.map(hotel => hotel.id)));
    } else {
      setSelectedHotels(new Set());
    }
  };

  const handleSelectHotel = (hotelId: string, checked: boolean) => {
    const newSelected = new Set(selectedHotels);
    if (checked) {
      newSelected.add(hotelId);
    } else {
      newSelected.delete(hotelId);
    }
    setSelectedHotels(newSelected);
  };

  const handleBulkDelete = () => {
    setBulkAction('delete');
    setShowDeleteDialog(true);
  };

  const handleBulkApprove = () => {
    setBulkAction('approve');
    setShowApproveDialog(true);
  };

  const confirmBulkAction = async () => {
    try {
      const selectedHotelIds = Array.from(selectedHotels);
      
      if (bulkAction === 'delete') {
        for (const hotelId of selectedHotelIds) {
          await handleDelete(hotelId);
        }
        toast({
          title: "Success",
          description: `${selectedHotelIds.length} hotels deleted successfully`,
        });
      } else if (bulkAction === 'approve') {
        for (const hotelId of selectedHotelIds) {
          await handleApprove(hotelId);
        }
        toast({
          title: "Success",
          description: `${selectedHotelIds.length} hotels approved successfully`,
        });
      }
      
      setSelectedHotels(new Set());
      await fetchAllHotels();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete bulk action",
        variant: "destructive"
      });
    }
    
    setShowDeleteDialog(false);
    setShowApproveDialog(false);
    setBulkAction(null);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const uniqueCountries = [...new Set(hotels.map(hotel => hotel.country))].filter(Boolean);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading hotels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Hotels Management</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Filter by Status:</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Filter by Country:</label>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {uniqueCountries.map(country => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedHotels.size === filteredHotels.length && filteredHotels.length > 0}
            onCheckedChange={handleSelectAll}
            id="select-all"
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select All ({selectedHotels.size} selected)
          </label>
        </div>
        
        {selectedHotels.size > 0 && (
          <div className="flex gap-2">
            <Button
              onClick={handleBulkApprove}
              className="bg-purple-700 hover:bg-purple-800 text-white"
              size="sm"
            >
              <Check className="h-4 w-4 mr-1" />
              Approve Selected
            </Button>
            <Button
              onClick={handleBulkDelete}
              variant="destructive"
              className="bg-purple-700 hover:bg-purple-800 text-white"
              size="sm"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Selected
            </Button>
          </div>
        )}
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedHotels.has(hotel.id)}
                    onCheckedChange={(checked) => handleSelectHotel(hotel.id, checked as boolean)}
                  />
                  <Badge variant={getStatusBadgeVariant(hotel.status)}>
                    {hotel.status}
                  </Badge>
                </div>
              </div>

              {hotel.main_image_url && (
                <img
                  src={hotel.main_image_url}
                  alt={hotel.name}
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}

              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {hotel.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-1">
                {hotel.city}, {hotel.country}
              </p>
              
              <p className="text-sm text-muted-foreground mb-3">
                Price: €{hotel.price_per_month}/month
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  onClick={() => navigate(`/admin/hotel-detail/${hotel.id}`)}
                  className="bg-purple-700 hover:bg-purple-800 text-white"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => navigate(`/dashboard/property/${hotel.id}`)}
                  className="bg-purple-700 hover:bg-purple-800 text-white"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                
                {hotel.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => handleApprove(hotel.id)}
                    className="bg-purple-700 hover:bg-purple-800 text-white"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(hotel.id)}
                  className="bg-purple-700 hover:bg-purple-800 text-white"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hotels found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or check back later.
          </p>
        </div>
      )}

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Bulk Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedHotels.size} selected hotels? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkAction} className="bg-red-600 hover:bg-red-700">
              Delete Hotels
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Approve Confirmation Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Bulk Approve</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve {selectedHotels.size} selected hotels?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkAction} className="bg-green-600 hover:bg-green-700">
              Approve Hotels
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
