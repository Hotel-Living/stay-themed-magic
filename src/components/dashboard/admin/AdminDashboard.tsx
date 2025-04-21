
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import AdminDashboardLayout from "./AdminDashboardLayout";
import PendingHotelsTable from "./PendingHotelsTable";
import { useAdminAccess } from "./hooks/useAdminAccess";
import { useHotelsData } from "./hooks/useHotelsData";
import { useHotelActions } from "./hooks/useHotelActions";
import RejectDialog from "./RejectDialog";
import { Hotel } from "@/integrations/supabase/types-custom";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  
  // Check if we're in the all hotels view
  const isAllHotelsView = path.includes('/admin/all') || path.includes('/admin/hotels');
  
  const { checkAdminAccess } = useAdminAccess();
  const {
    hotels,
    loading,
    fetchAllHotels,
    fetchPendingHotels
  } = useHotelsData();

  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const refreshData = async () => {
    if (isAllHotelsView) {
      return fetchAllHotels();
    }
    return fetchPendingHotels();
  };

  const {
    handleApprove,
    handleReject,
    handleDelete
  } = useHotelActions(refreshData);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const init = async () => {
      const isAdmin = await checkAdminAccess();
      if (isAdmin) {
        if (isAllHotelsView) {
          await fetchAllHotels();
        } else {
          await fetchPendingHotels();
        }
      }
    };

    init();
  }, [user, path]);

  // Wrapper functions to match the expected interface
  const onApprove = (hotel: Hotel) => {
    handleApprove(hotel.id);
  };

  const onReject = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setRejectionDialogOpen(true);
  };

  const onDelete = (hotel: Hotel) => {
    handleDelete(hotel.id);
  };

  const handleConfirmReject = (reason: string) => {
    if (selectedHotel) {
      handleReject(selectedHotel.id, reason);
    }
    setRejectionDialogOpen(false);
    setSelectedHotel(null);
  };

  const handleCloseRejectDialog = () => {
    setRejectionDialogOpen(false);
    setSelectedHotel(null);
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="p-4">Loading...</div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {isAllHotelsView ? "All Hotels" : "Pending Hotel Registrations"}
          </h2>
        </div>

        <PendingHotelsTable
          hotels={hotels}
          onApprove={onApprove}
          onReject={onReject}
          onDelete={onDelete}
          isAllHotelsView={isAllHotelsView}
        />

        <RejectDialog 
          open={rejectionDialogOpen}
          onClose={handleCloseRejectDialog}
          onConfirm={handleConfirmReject}
        />
      </div>
    </AdminDashboardLayout>
  );
}
