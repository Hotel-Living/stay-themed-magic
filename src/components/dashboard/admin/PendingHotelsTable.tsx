
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RejectDialog from "./RejectDialog";
import DeleteDialog from "./DeleteDialog";

interface PendingHotelsTableProps {
  hotels: any[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onDelete: (id: string) => void;
  isAllHotelsView?: boolean;
}

export default function PendingHotelsTable({ 
  hotels, 
  onApprove, 
  onReject,
  onDelete,
  isAllHotelsView = false
}: PendingHotelsTableProps) {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [selectedHotelName, setSelectedHotelName] = useState<string>("");

  const handleRejectClick = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    setRejectDialogOpen(true);
  };

  const handleDeleteClick = (hotelId: string, hotelName: string) => {
    setSelectedHotelId(hotelId);
    setSelectedHotelName(hotelName);
    setDeleteDialogOpen(true);
  };

  const handleRejectConfirm = (reason: string) => {
    if (selectedHotelId) {
      onReject(selectedHotelId, reason);
    }
    setRejectDialogOpen(false);
    setSelectedHotelId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedHotelId) {
      onDelete(selectedHotelId);
    }
    setDeleteDialogOpen(false);
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
                  {isAllHotelsView ? (
                    <Button 
                      variant="destructive"
                      onClick={() => handleDeleteClick(hotel.id, hotel.name)}
                    >
                      Delete
                    </Button>
                  ) : (
                    <>
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
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {hotels.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  {isAllHotelsView ? "No hotels found" : "No pending hotel registrations"}
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

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        hotelName={selectedHotelName}
      />
    </>
  );
}
