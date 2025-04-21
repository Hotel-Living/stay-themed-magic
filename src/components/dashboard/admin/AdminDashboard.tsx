
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import AdminDashboardLayout from "./AdminDashboardLayout";
import PendingHotelsTable from "./PendingHotelsTable";
import { useAdminAccess } from "./hooks/useAdminAccess";
import { useHotelsData } from "./hooks/useHotelsData";
import { useHotelActions } from "./hooks/useHotelActions";
import AdminUsersPanel from "./AdminUsersPanel";
import AdminBookingsPanel from "./AdminBookingsPanel";
import AdminPaymentsPanel from "./AdminPaymentsPanel";
import AdminAffinitiesPanel from "./AdminAffinitiesPanel";
import AdminFiltersPanel from "./AdminFiltersPanel";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  
  const isAllHotelsView = path.includes('/all');
  const isUsersView = path.includes('/users');
  const isBookingsView = path.includes('/bookings');
  const isPaymentsView = path.includes('/payments');
  const isAffinitiesView = path.includes('/affinities');
  const isFiltersView = path.includes('/filters');
  
  const { checkAdminAccess } = useAdminAccess();
  const {
    hotels,
    loading,
    fetchAllHotels,
    fetchPendingHotels
  } = useHotelsData();

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
        } else if (!isUsersView && !isBookingsView && !isPaymentsView && !isAffinitiesView && !isFiltersView) {
          await fetchPendingHotels();
        }
      }
    };

    init();
  }, [user, path]);

  if (loading && !isUsersView && !isBookingsView && !isPaymentsView && !isAffinitiesView && !isFiltersView) {
    return (
      <AdminDashboardLayout>
        <div className="p-4">Loading...</div>
      </AdminDashboardLayout>
    );
  }

  // Render appropriate content based on the current route
  const renderContent = () => {
    if (isUsersView) {
      return <AdminUsersPanel />;
    } else if (isBookingsView) {
      return <AdminBookingsPanel />;
    } else if (isPaymentsView) {
      return <AdminPaymentsPanel />;
    } else if (isAffinitiesView) {
      return <AdminAffinitiesPanel />;
    } else if (isFiltersView) {
      return <AdminFiltersPanel />;
    } else {
      // Default to hotels views
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {isAllHotelsView ? "All Hotels" : "Pending Hotel Registrations"}
            </h2>
          </div>

          <PendingHotelsTable
            hotels={hotels}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDelete}
            isAllHotelsView={isAllHotelsView}
          />
        </div>
      );
    }
  };

  return (
    <AdminDashboardLayout>
      {renderContent()}
    </AdminDashboardLayout>
  );
}
