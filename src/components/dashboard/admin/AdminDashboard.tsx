
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import AdminDashboardLayout from "./AdminDashboardLayout";
import PendingHotelsTable from "./PendingHotelsTable";
import { useAdminAccess } from "./hooks/useAdminAccess";
import { useHotelsData } from "./hooks/useHotelsData";
import { useHotelActions } from "./hooks/useHotelActions";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAllHotelsView = location.pathname.includes('/all');
  
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
        } else {
          await fetchPendingHotels();
        }
      }
    };

    init();
  }, [user, isAllHotelsView]);

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
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
          isAllHotelsView={isAllHotelsView}
        />
      </div>
    </AdminDashboardLayout>
  );
}
