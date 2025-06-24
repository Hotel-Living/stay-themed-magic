
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Eye, Check, X, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdvertisingRequest {
  id: string;
  user_id?: string;
  contact_name: string;
  contact_email: string;
  available_months?: string[];
  terms_accepted: boolean;
  created_at: string;
}

export default function AdminAdvertisingPanel() {
  const [requests, setRequests] = useState<AdvertisingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAdvertisingRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('advertising_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching advertising requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch advertising requests",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisingRequests();
  }, []);

  const handleApprove = async (requestId: string) => {
    try {
      // For now, we'll just show a success message
      // In a real implementation, you might update a status field
      toast({
        title: "Success",
        description: "Advertising request approved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve request",
        variant: "destructive"
      });
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      // For now, we'll just show a success message
      // In a real implementation, you might update a status field
      toast({
        title: "Success",
        description: "Advertising request rejected",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject request",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardContent className="p-6">
          <div className="text-center text-white/60">Loading advertising requests...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Advertising Management</h2>
          <p className="text-white/60">Manage advertising requests and campaigns</p>
        </div>
      </div>

      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5" />
            Advertising Requests ({requests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              <Megaphone className="w-12 h-12 mx-auto mb-4 text-white/40" />
              <h3 className="text-lg font-semibold mb-2">No advertising requests</h3>
              <p>Advertising requests will appear here when submitted.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="p-4 bg-purple-800/20 rounded-lg border border-purple-700/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{request.contact_name}</h4>
                      <p className="text-white/60 text-sm">{request.contact_email}</p>
                      <p className="text-white/40 text-xs flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        Submitted: {new Date(request.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${request.terms_accepted ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                        {request.terms_accepted ? 'Terms Accepted' : 'Terms Not Accepted'}
                      </Badge>
                    </div>
                  </div>
                  
                  {request.available_months && request.available_months.length > 0 && (
                    <div className="mb-3">
                      <p className="text-white/80 text-sm mb-2">Available Months:</p>
                      <div className="flex flex-wrap gap-1">
                        {request.available_months.map((month, index) => (
                          <Badge key={index} variant="outline" className="text-purple-300 border-purple-600">
                            {month}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleApprove(request.id)}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleReject(request.id)}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-white border-purple-600 hover:bg-purple-800/50"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
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
