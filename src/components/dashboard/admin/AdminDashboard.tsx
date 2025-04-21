import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PendingHotelsTable from "./PendingHotelsTable";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import AdminDashboardLayout from "./AdminDashboardLayout";

export default function AdminDashboard() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  
  const isAllHotelsView = location.pathname.includes('/all');

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

  const checkAdminAccess = async () => {
    const { data, error } = await supabase
      .rpc('is_admin', { user_id: user?.id });
    
    if (!data || error) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to view this page",
        variant: "destructive"
      });
      navigate('/');
      return false;
    }
    return true;
  };

  const fetchAllHotels = async () => {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        profiles:owner_id(
          first_name,
          last_name
        )
      `);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch hotels",
        variant: "destructive"
      });
      return;
    }

    setHotels(data || []);
    setLoading(false);
  };

  const fetchPendingHotels = async () => {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        profiles:owner_id(
          first_name,
          last_name
        )
      `)
      .eq('status', 'pending');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch pending hotels",
        variant: "destructive"
      });
      return;
    }

    setHotels(data || []);
    setLoading(false);
  };

  const handleApprove = async (hotelId: string) => {
    const { error } = await supabase
      .from('hotels')
      .update({ status: 'approved' })
      .eq('id', hotelId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to approve hotel",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Hotel has been approved"
    });

    fetchPendingHotels();
  };

  const handleReject = async (hotelId: string, reason: string) => {
    const { error } = await supabase
      .from('hotels')
      .update({ 
        status: 'rejected',
        rejection_reason: reason 
      })
      .eq('id', hotelId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to reject hotel",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Hotel has been rejected"
    });

    fetchPendingHotels();
  };

  const handleDelete = async (hotelId: string) => {
    const { error } = await supabase
      .from('hotels')
      .delete()
      .eq('id', hotelId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete hotel",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Hotel has been deleted"
    });

    if (isAllHotelsView) {
      fetchAllHotels();
    } else {
      fetchPendingHotels();
    }
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
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
          isAllHotelsView={isAllHotelsView}
        />
      </div>
    </AdminDashboardLayout>
  );
}
