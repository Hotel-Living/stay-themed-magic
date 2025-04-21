import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PendingHotelsTable from "./PendingHotelsTable";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminDashboardLayout from "./AdminDashboardLayout";

export default function AdminDashboard() {
  const [pendingHotels, setPendingHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const init = async () => {
      const isAdmin = await checkAdminAccess();
      if (isAdmin) {
        await fetchPendingHotels();
      }
    };

    init();
  }, [user]);

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

    setPendingHotels(data || []);
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
          <h2 className="text-2xl font-bold">Pending Hotel Registrations</h2>
        </div>

        <PendingHotelsTable
          hotels={pendingHotels}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </AdminDashboardLayout>
  );
}
