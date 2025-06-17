
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";

export default function PendingHotelsTable() {
  // Mock data for demonstration
  const pendingHotels = [
    {
      id: '1',
      name: 'Hotel Paradise',
      location: 'Cancun, Mexico',
      status: 'pending',
      submittedDate: '2024-01-15',
      owner: 'John Smith'
    },
    {
      id: '2',
      name: 'Mountain Resort',
      location: 'Aspen, Colorado',
      status: 'pending',
      submittedDate: '2024-01-14',
      owner: 'Sarah Johnson'
    },
    {
      id: '3',
      name: 'Beach Villa',
      location: 'Malibu, California',
      status: 'under_review',
      submittedDate: '2024-01-13',
      owner: 'Mike Wilson'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-600', text: 'Pending' },
      under_review: { color: 'bg-blue-600', text: 'Under Review' },
      approved: { color: 'bg-green-600', text: 'Approved' },
      rejected: { color: 'bg-red-600', text: 'Rejected' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge className={`${config.color} text-white`}>
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Hotels Management</h2>
          <p className="text-white/60">Review and manage hotel submissions</p>
        </div>
      </div>

      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Pending Hotel Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingHotels.map((hotel) => (
              <div key={hotel.id} className="flex items-center justify-between p-4 bg-purple-800/20 rounded-lg border border-purple-700/30">
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{hotel.name}</h3>
                  <p className="text-white/60 text-sm">{hotel.location}</p>
                  <p className="text-white/40 text-xs">Submitted by {hotel.owner} on {hotel.submittedDate}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  {getStatusBadge(hotel.status)}
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-white border-purple-600 hover:bg-purple-800/50"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    
                    {hotel.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">All Hotels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-white/60">
            <p>Complete hotels management interface will be displayed here.</p>
            <p className="text-sm mt-2">This includes approved hotels, statistics, and management tools.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
