
import React from "react";
import { Hotel } from "@/integrations/supabase/types-custom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface PendingHotelsTableProps {
  hotels: Hotel[];
  onApprove: (hotel: Hotel) => void;
  onReject: (hotel: Hotel) => void;
  onDelete: (hotel: Hotel) => void;
  isAllHotelsView?: boolean;
}

export default function PendingHotelsTable({ 
  hotels, 
  onApprove, 
  onReject, 
  onDelete,
  isAllHotelsView 
}: PendingHotelsTableProps) {

  return (
    <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Property Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell className="font-medium">{hotel.name}</TableCell>
                <TableCell>{hotel.country}</TableCell>
                <TableCell>{hotel.city}</TableCell>
                <TableCell>{hotel.property_type || "Not specified"}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    hotel.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    hotel.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {hotel.status}
                  </span>
                </TableCell>
                <TableCell className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/admin/hotels/${hotel.id}`}
                  >
                    Details
                  </Button>
                  
                  {hotel.status === 'pending' && (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onApprove(hotel)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 hover:bg-red-100 hover:text-red-600"
                        onClick={() => onReject(hotel)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => onDelete(hotel)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                <p className="text-muted-foreground">
                  {isAllHotelsView
                    ? "No hotels found in the database."
                    : "No pending hotel registrations at the moment."}
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
