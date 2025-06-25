
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHotelsData } from "@/components/dashboard/admin/hooks/useHotelsData";
import { useHotelActions } from "@/components/dashboard/admin/hooks/useHotelActions";
import DeleteDialog from "@/components/dashboard/admin/DeleteDialog";
import RejectDialog from "@/components/dashboard/admin/RejectDialog";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Eye, Edit, Trash2, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FernandoHotels() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [bulkAction, setBulkAction] = useState<'delete' | 'approve' | null>(null);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  const { hotels, loading, fetchAllHotels } = useHotelsData();

  const refreshHotels = async () => {
    await fetchAllHotels();
  };

  const { handleApprove, handleReject, handleDelete } = useHotelActions(refreshHotels);

  useEffect(() => {
    refreshHotels();
  }, []);

  // Get unique countries for filter
  const countries = [...new Set(hotels.map(hotel => hotel.country))].sort();

  // Filter hotels
  const filteredHotels = hotels.filter(hotel => {
    const matchesStatus = !statusFilter || hotel.status === statusFilter;
    const matchesCountry = !countryFilter || hotel.country === countryFilter;
    return matchesStatus && matchesCountry;
  });

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

  const handleBulkAction = (action: 'delete' | 'approve') => {
    if (selectedHotels.length === 0) return;
    setBulkAction(action);
    setShowBulkConfirm(true);
  };

  const confirmBulkAction = async () => {
    if (!bulkAction || selectedHotels.length === 0) return;
    
    try {
      for (const hotelId of selectedHotels) {
        if (bulkAction === 'delete') {
          await handleDelete(hotelId);
        } else if (bulkAction === 'approve') {
          await handleApprove(hotelId);
        }
      }
      setSelectedHotels([]);
      await refreshHotels();
    } catch (error) {
      console.error(`Error during bulk ${bulkAction}:`, error);
    }
    
    setShowBulkConfirm(false);
    setBulkAction(null);
  };

  const handleView = (hotelId: string) => {
    navigate(`/admin/hotels/${hotelId}`);
  };

  const handleEdit = (hotelId: string) => {
    navigate(`/admin/hotels/${hotelId}/edit`);
  };

  const handleSingleDelete = (hotel: any) => {
    setSelectedHotel(hotel);
    setDeleteDialogOpen(true);
  };

  const handleSingleApprove = async (hotelId: string) => {
    await handleApprove(hotelId);
    await refreshHotels();
  };

  const confirmDelete = async () => {
    if (selectedHotel) {
      await handleDelete(selectedHotel.id);
      await refreshHotels();
    }
    setDeleteDialogOpen(false);
    setSelectedHotel(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <HotelStarfield />
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-white">Loading hotels...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <HotelStarfield />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Hotels Management</h1>
          <Button 
            onClick={refreshHotels}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          >
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-fuchsia-900/50 text-white border border-fuchsia-500/30 rounded px-3 py-2"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="bg-fuchsia-900/50 text-white border border-fuchsia-500/30 rounded px-3 py-2"
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Select All and Bulk Actions */}
        <div className="mb-6 flex items-center gap-4">
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={selectedHotels.length === filteredHotels.length && filteredHotels.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="rounded"
            />
            Select All ({selectedHotels.length} selected)
          </label>

          {selectedHotels.length > 0 && (
            <div className="flex gap-2">
              <Button
                onClick={() => handleBulkAction('approve')}
                className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white"
              >
                Approve Selected
              </Button>
              <Button
                onClick={() => handleBulkAction('delete')}
                className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white"
              >
                Delete Selected
              </Button>
            </div>
          )}
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-fuchsia-500/20">
              <div className="flex items-start justify-between mb-4">
                <input
                  type="checkbox"
                  checked={selectedHotels.includes(hotel.id)}
                  onChange={(e) => handleSelectHotel(hotel.id, e.target.checked)}
                  className="rounded"
                />
                <Badge 
                  variant={hotel.status === 'approved' ? 'success' : hotel.status === 'pending' ? 'warning' : 'error'}
                  className="text-xs"
                >
                  {hotel.status}
                </Badge>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">{hotel.name}</h3>
                <p className="text-gray-300 text-sm mb-2">{hotel.city}, {hotel.country}</p>
                <p className="text-gray-400 text-xs">
                  Owner: {hotel.profiles?.first_name} {hotel.profiles?.last_name}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleView(hotel.id)}
                  size="sm"
                  className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleEdit(hotel.id)}
                  size="sm"
                  className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleSingleDelete(hotel)}
                  size="sm"
                  className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {hotel.status === 'pending' && (
                  <Button
                    onClick={() => handleSingleApprove(hotel.id)}
                    size="sm"
                    className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No hotels found matching the current filters.</p>
          </div>
        )}

        {/* Delete Dialog */}
        <DeleteDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          hotelName={selectedHotel?.name || ""}
        />

        {/* Bulk Action Confirmation */}
        {showBulkConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">
                Confirm Bulk {bulkAction === 'delete' ? 'Delete' : 'Approve'}
              </h3>
              <p className="mb-6">
                Are you sure you want to {bulkAction} {selectedHotels.length} selected hotel(s)?
                {bulkAction === 'delete' && ' This action cannot be undone.'}
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={() => setShowBulkConfirm(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmBulkAction}
                  className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white"
                >
                  Confirm {bulkAction === 'delete' ? 'Delete' : 'Approve'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
