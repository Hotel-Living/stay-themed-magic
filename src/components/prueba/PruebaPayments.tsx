
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Payment {
  id: string;
  amount: number;
  method: string;
  status: string;
  created_at: string;
  transaction_id?: string;
  user_name?: string;
  hotel_name?: string;
}

export default function PruebaPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          id,
          amount,
          method,
          status,
          created_at,
          transaction_id,
          user:profiles(first_name, last_name),
          hotel:hotels(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const paymentsWithNames = data?.map(payment => ({
        ...payment,
        user_name: payment.user 
          ? `${payment.user.first_name || ''} ${payment.user.last_name || ''}`.trim()
          : 'Unknown',
        hotel_name: payment.hotel?.name || 'Unknown Hotel'
      })) || [];

      setPayments(paymentsWithNames);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch payments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.hotel_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusColors = {
      completed: "bg-green-500",
      pending: "bg-yellow-500",
      failed: "bg-red-500",
      refunded: "bg-blue-500"
    };
    return statusColors[status as keyof typeof statusColors] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="bg-[#7a0486] border-purple-600">
          <CardContent className="p-6">
            <div className="text-center text-white">Loading payments...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Payment Management</h2>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Search and Filter Controls */}
      <Card className="bg-[#7a0486] border-purple-600">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="bg-[#7a0486] border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Payments ({filteredPayments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-600">
                  <th className="text-left p-3 text-white">Transaction ID</th>
                  <th className="text-left p-3 text-white">User</th>
                  <th className="text-left p-3 text-white">Hotel</th>
                  <th className="text-left p-3 text-white">Amount</th>
                  <th className="text-left p-3 text-white">Method</th>
                  <th className="text-left p-3 text-white">Status</th>
                  <th className="text-left p-3 text-white">Date</th>
                  <th className="text-left p-3 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-purple-600/30 hover:bg-purple-800/20">
                    <td className="p-3 text-white/80 font-mono text-sm">
                      {payment.transaction_id || payment.id.slice(0, 8)}
                    </td>
                    <td className="p-3 text-white/80">{payment.user_name}</td>
                    <td className="p-3 text-white/80">{payment.hotel_name}</td>
                    <td className="p-3 text-white font-medium">${payment.amount.toFixed(2)}</td>
                    <td className="p-3 text-white/80 capitalize">{payment.method}</td>
                    <td className="p-3">
                      <Badge className={`${getStatusBadge(payment.status)} text-white`}>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-white/80">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <CreditCard className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
