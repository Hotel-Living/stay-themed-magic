
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function FernandoPayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    completedPayments: 0,
    pendingPayments: 0
  });
  const { toast } = useToast();

  const fetchPayments = async () => {
    try {
      console.log('Starting to fetch payments...');
      
      // First, let's try to get the current user to see if they're admin
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user?.id);
      
      // Check if user is admin
      const { data: adminCheck, error: adminError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', user?.id)
        .single();
      
      console.log('Admin check result:', adminCheck, adminError);
      
      if (adminError && adminError.code !== 'PGRST116') {
        throw new Error('Not authorized to view payments');
      }
      
      if (!adminCheck) {
        throw new Error('Access denied: Admin privileges required');
      }

      // Use RPC call or direct query to bypass RLS issues
      const { data: paymentsData, error: paymentsError } = await supabase
        .rpc('get_all_payments_admin')
        .then(result => {
          // If RPC doesn't exist, fall back to direct query
          if (result.error && result.error.code === '42883') {
            console.log('RPC not found, using direct query...');
            return supabase
              .from('payments')
              .select(`
                *,
                hotels(name)
              `)
              .order('created_at', { ascending: false });
          }
          return result;
        });

      if (paymentsError) {
        console.error('Payments query error:', paymentsError);
        throw paymentsError;
      }
      
      const payments = paymentsData || [];
      console.log('Fetched payments:', payments.length);
      
      // Get user profiles separately
      const userIds = [...new Set(payments.map(p => p.user_id).filter(Boolean))];
      let profilesData = [];
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, first_name, last_name')
          .in('id', userIds);
        profilesData = profiles || [];
      }

      // Combine payments with profile data
      const enrichedPayments = payments.map(payment => {
        const profile = profilesData.find(p => p.id === payment.user_id);
        return {
          ...payment,
          user_name: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Unknown' : 'Unknown'
        };
      });

      setPayments(enrichedPayments);

      // Calculate stats
      const totalRevenue = enrichedPayments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + Number(p.amount), 0);
      
      const completedPayments = enrichedPayments.filter(p => p.status === 'completed').length;
      const pendingPayments = enrichedPayments.filter(p => p.status === 'pending').length;

      setStats({
        totalRevenue,
        completedPayments,
        pendingPayments
      });

      console.log('Successfully processed payments data');
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch payments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { color: 'bg-green-600', text: 'Completed' },
      pending: { color: 'bg-yellow-600', text: 'Pending' },
      failed: { color: 'bg-red-600', text: 'Failed' },
      cancelled: { color: 'bg-gray-600', text: 'Cancelled' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge className={`${config.color} text-white`}>
        {config.text}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardContent className="p-6">
          <div className="text-center text-white/60">Loading payments...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Payments Management</h2>
          <p className="text-white/60">View payment history and revenue information</p>
        </div>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Total Revenue</h3>
              <p className="text-2xl font-bold text-green-400">${stats.totalRevenue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Completed</h3>
              <p className="text-2xl font-bold text-blue-400">{stats.completedPayments}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Pending</h3>
              <p className="text-2xl font-bold text-yellow-400">{stats.pendingPayments}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments List */}
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">All Payments ({payments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <p>No payments found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-purple-800/20 rounded-lg border border-purple-700/30">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">${Number(payment.amount).toLocaleString()}</h3>
                    <p className="text-white/60 text-sm">
                      Hotel: {payment.hotels?.name || 'N/A'}
                    </p>
                    <p className="text-white/40 text-xs">
                      Customer: {payment.user_name}
                    </p>
                    <p className="text-white/40 text-xs">
                      Method: {payment.method} | {new Date(payment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {payment.transaction_id && (
                      <div className="text-right">
                        <p className="text-white/60 text-xs">Transaction ID:</p>
                        <p className="text-white/40 text-xs">{payment.transaction_id}</p>
                      </div>
                    )}
                    {getStatusBadge(payment.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
