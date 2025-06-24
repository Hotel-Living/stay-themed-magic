
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Building, Calendar, CreditCard, TrendingUp, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface StatisticsData {
  totalHotels: number;
  approvedHotels: number;
  pendingHotels: number;
  rejectedHotels: number;
  totalUsers: number;
  hotelOwners: number;
  totalBookings: number;
  totalPayments: number;
  totalRevenue: number;
  recentActivity: any[];
}

export default function AdminStatisticsPanel() {
  const [stats, setStats] = useState<StatisticsData>({
    totalHotels: 0,
    approvedHotels: 0,
    pendingHotels: 0,
    rejectedHotels: 0,
    totalUsers: 0,
    hotelOwners: 0,
    totalBookings: 0,
    totalPayments: 0,
    totalRevenue: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStatistics = async () => {
    try {
      // Fetch hotel statistics
      const { data: hotels, error: hotelsError } = await supabase
        .from('hotels')
        .select('status');

      if (hotelsError) throw hotelsError;

      const totalHotels = hotels?.length || 0;
      const approvedHotels = hotels?.filter(h => h.status === 'approved').length || 0;
      const pendingHotels = hotels?.filter(h => h.status === 'pending').length || 0;
      const rejectedHotels = hotels?.filter(h => h.status === 'rejected').length || 0;

      // Fetch user statistics
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('is_hotel_owner');

      if (profilesError) throw profilesError;

      const totalUsers = profiles?.length || 0;
      const hotelOwners = profiles?.filter(p => p.is_hotel_owner).length || 0;

      // Fetch booking statistics
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('id, total_price, created_at');

      if (bookingsError) throw bookingsError;

      const totalBookings = bookings?.length || 0;

      // Fetch payment statistics
      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select('amount');

      if (paymentsError) throw paymentsError;

      const totalPayments = payments?.length || 0;
      const totalRevenue = payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;

      setStats({
        totalHotels,
        approvedHotels,
        pendingHotels,
        rejectedHotels,
        totalUsers,
        hotelOwners,
        totalBookings,
        totalPayments,
        totalRevenue,
        recentActivity: bookings?.slice(-5) || []
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch statistics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardContent className="p-6">
          <div className="text-center text-white/60">Loading statistics...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Platform Statistics</h2>
          <p className="text-white/60">Overview of platform performance and metrics</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Hotels</CardTitle>
            <Building className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalHotels}</div>
            <p className="text-xs text-green-400">
              {stats.approvedHotels} approved, {stats.pendingHotels} pending
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Users</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
            <p className="text-xs text-blue-400">
              {stats.hotelOwners} hotel owners
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalBookings}</div>
            <p className="text-xs text-orange-400">
              All time bookings
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">€{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-400">
              {stats.totalPayments} payments processed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Hotel Status Breakdown */}
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Hotel Status Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-800/30">
              <div className="text-3xl font-bold text-green-400">{stats.approvedHotels}</div>
              <div className="text-sm text-green-300">Approved Hotels</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
              <div className="text-3xl font-bold text-yellow-400">{stats.pendingHotels}</div>
              <div className="text-sm text-yellow-300">Pending Review</div>
            </div>
            <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-800/30">
              <div className="text-3xl font-bold text-red-400">{stats.rejectedHotels}</div>
              <div className="text-sm text-red-300">Rejected Hotels</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentActivity.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <Activity className="w-12 h-12 mx-auto mb-4 text-white/40" />
              <p>No recent activity to display</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-purple-800/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-white text-sm">New booking created</p>
                      <p className="text-white/60 text-xs">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">€{activity.total_price}</p>
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
