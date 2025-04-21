
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RejectDialog from "./RejectDialog";

interface PendingHotelsTableProps {
  hotels: any[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

export default function PendingHotelsTable({ 
  hotels, 
  onApprove, 
  onReject 
}: PendingHotelsTableProps) {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);

  const handleRejectClick = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = (reason: string) => {
    if (selectedHotelId) {
      onReject(selectedHotelId, reason);
    }
    setRejectDialogOpen(false);
    setSelectedHotelId(null);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hotel Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price/Month</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell>{hotel.name}</TableCell>
                <TableCell>
                  {hotel.profiles?.first_name} {hotel.profiles?.last_name}
                </TableCell>
                <TableCell>
                  {hotel.city}, {hotel.country}
                </TableCell>
                <TableCell>${hotel.price_per_month}</TableCell>
                <TableCell className="space-x-2">
                  <Button 
                    variant="default"
                    onClick={() => onApprove(hotel.id)}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleRejectClick(hotel.id)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {hotels.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No pending hotel registrations
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <RejectDialog 
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onConfirm={handleRejectConfirm}
      />
    </>
  );
}
