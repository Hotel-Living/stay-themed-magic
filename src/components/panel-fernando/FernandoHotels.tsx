
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useHotelsData } from "@/components/dashboard/admin/hooks/useHotelsData";
import { useHotelActions } from "@/components/dashboard/admin/hooks/useHotelActions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Edit, Trash2, Check } from "lucide-react";
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

export default function FernandoHotels() {
  const { hotels, loading, setHotels, fetchAllHotels } = useHotelsData();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showSingleDeleteDialog, setShowSingleDeleteDialog] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<string | null>(null);

  const refreshHotels = async () => {
    const result = await fetchAllHotels();
    if (result.data) {
      setHotels(result.data);
    }
  };

  const { handleApprove, handleDelete } = useHotelActions(refreshHotels);

  useEffect(() => {
    refreshHotels();
  }, []);

  const filteredHotels = hotels.filter(hotel => {
    if (statusFilter !== "all" && hotel.status !== statusFilter) return false;
    if (countryFilter !== "all" && hotel.country !== countryFilter) return false;
    return true;
  });

  const countries = [...new Set(hotels.map(hotel => hotel.country).filter(Boolean))];

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

  const handleBulkDelete = async () => {
    for (const hotelId of selectedHotels) {
      await handleDelete(hotelId);
    }
    setSelectedHotels([]);
    setShowDeleteDialog(false);
  };

  const handleBulkApprove = async () => {
    for (const hotelId of selectedHotels) {
      await handleApprove(hotelId);
    }
    setSelectedHotels([]);
    setShowApproveDialog(false);
  };

  const handleSingleDelete = async () => {
    if (hotelToDelete) {
      await handleDelete(hotelToDelete);
      setHotelToDelete(null);
      setShowSingleDeleteDialog(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading hotels...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 bg-[#4b0456] text-white border-purple-400">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="w-48 bg-[#4b0456] text-white border-purple-400">
            <SelectValue placeholder="Filter by country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedHotels.length > 0 && (
          <div className="flex gap-2">
            <Button
              onClick={() => setShowApproveDialog(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Approve Selected ({selectedHotels.length})
            </Button>
            <Button
              onClick={() => setShowDeleteDialog(true)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Selected ({selectedHotels.length})
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center p-3 bg-[#4b0456] rounded-lg border border-purple-400">
          <input
            type="checkbox"
            checked={selectedHotels.length === filteredHotels.length && filteredHotels.length > 0}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="mr-4"
          />
          <div className="flex-1 grid grid-cols-12 gap-4 text-white font-semibold text-sm">
            <div className="col-span-3">Hotel Name</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-1">Price</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Owner</div>
            <div className="col-span-1">Created</div>
            <div className="col-span-2">Actions</div>
          </div>
        </div>

        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="flex items-center p-3 bg-[#4b0456] rounded-lg border border-purple-400 hover:bg-[#5a1661] transition-colors">
            <input
              type="checkbox"
              checked={selectedHotels.includes(hotel.id)}
              onChange={(e) => handleSelectHotel(hotel.id, e.target.checked)}
              className="mr-4"
            />
            <div className="flex-1 grid grid-cols-12 gap-4 items-center text-white text-sm">
              <div className="col-span-3 font-medium">{hotel.name}</div>
              <div className="col-span-2">{hotel.city}, {hotel.country}</div>
              <div className="col-span-1">€{hotel.starting_price}/month</div>
              <div className="col-span-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  hotel.status === 'approved' ? 'bg-green-600' : 
                  hotel.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                }`}>
                  {hotel.status}
                </span>
              </div>
              <div className="col-span-2">
                {hotel.profiles?.first_name} {hotel.profiles?.last_name}
              </div>
              <div className="col-span-1">{new Date(hotel.created_at).toLocaleDateString()}</div>
              <div className="col-span-2 flex gap-1">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-xs"
                  onClick={() => window.open(`/hotel/${hotel.id}`, '_blank')}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  className="bg-[#4b0456] hover:bg-[#5a1661] text-white border border-purple-400 px-2 py-1 text-xs"
                  onClick={() => window.open(`/dashboard/property/${hotel.id}`, '_blank')}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                {hotel.status === 'pending' && (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs"
                    onClick={() => handleApprove(hotel.id)}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Approve
                  </Button>
                )}
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs"
                  onClick={() => {
                    setHotelToDelete(hotel.id);
                    setShowSingleDeleteDialog(true);
                  }}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[#4b0456] text-white border border-purple-400">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Bulk Delete</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Are you sure you want to delete {selectedHotels.length} selected hotels? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-600 hover:bg-gray-700 text-white border-gray-500">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Hotels
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Approve Confirmation Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent className="bg-[#4b0456] text-white border border-purple-400">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Bulk Approve</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Are you sure you want to approve {selectedHotels.length} selected hotels?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-600 hover:bg-gray-700 text-white border-gray-500">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkApprove}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Approve Hotels
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Single Delete Confirmation Dialog */}
      <AlertDialog open={showSingleDeleteDialog} onOpenChange={setShowSingleDeleteDialog}>
        <AlertDialogContent className="bg-[#4b0456] text-white border border-purple-400">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Are you sure you want to delete this hotel? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-600 hover:bg-gray-700 text-white border-gray-500">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSingleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Hotel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
