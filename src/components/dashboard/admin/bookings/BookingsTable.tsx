
import React from "react";
import { format } from "date-fns";
import { Calendar, Check, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BookingTableProps {
  bookings: any[];
  loading: boolean;
  sortField: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
  searchTerm: string;
  statusFilter: string;
  updateBookingStatus: (bookingId: string, newStatus: string) => Promise<void>;
}

export const BookingsTable: React.FC<BookingTableProps> = ({
  bookings,
  loading,
  sortField,
  sortDirection,
  handleSort,
  searchTerm,
  statusFilter,
  updateBookingStatus
}) => {
  const { toast } = useToast();
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const hotelName = booking.hotel?.name?.toLowerCase() || "";
    const userName = `${booking.user?.first_name || ""} ${booking.user?.last_name || ""}`.toLowerCase();
    const matchesSearch = 
      hotelName.includes(searchTerm.toLowerCase()) ||
      userName.includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading && bookings.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        <p className="mt-2">Loading bookings...</p>
      </div>
    );
  }

  if (filteredBookings.length === 0) {
    return (
      <div className="text-center py-10">
        <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-medium">No bookings found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {searchTerm || statusFilter !== 'all' 
            ? "Try changing your search or filter criteria."
            : "There are no bookings in the system yet."}
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer" onClick={() => handleSort('hotel.name')}>
            Hotel {sortField === 'hotel.name' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead>Guest</TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('check_in')}>
            Check-In {sortField === 'check_in' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('check_out')}>
            Check-Out {sortField === 'check_out' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('total_price')}>
            Total {sortField === 'total_price' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
            Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredBookings.map(booking => (
          <TableRow key={booking.id}>
            <TableCell>{booking.hotel?.name || "Unknown Hotel"}</TableCell>
            <TableCell>
              {booking.user?.first_name} {booking.user?.last_name}
            </TableCell>
            <TableCell>{formatDate(booking.check_in)}</TableCell>
            <TableCell>{formatDate(booking.check_out)}</TableCell>
            <TableCell>{formatPrice(booking.total_price)}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Feature coming soon",
                      description: "Booking detail view is under development"
                    });
                  }}
                  className="mr-2"
                >
                  View
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => updateBookingStatus(booking.id, 'pending')}
                      className="flex items-center"
                    >
                      {booking.status === 'pending' && <Check className="mr-2 h-4 w-4" />}
                      <span className={booking.status === 'pending' ? 'font-medium' : ''}>Mark as Pending</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                      className="flex items-center"
                    >
                      {booking.status === 'confirmed' && <Check className="mr-2 h-4 w-4" />}
                      <span className={booking.status === 'confirmed' ? 'font-medium' : ''}>Mark as Confirmed</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                      className="flex items-center"
                    >
                      {booking.status === 'completed' && <Check className="mr-2 h-4 w-4" />}
                      <span className={booking.status === 'completed' ? 'font-medium' : ''}>Mark as Completed</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                      className="flex items-center"
                    >
                      {booking.status === 'cancelled' && <Check className="mr-2 h-4 w-4" />}
                      <span className={booking.status === 'cancelled' ? 'font-medium' : ''}>Mark as Cancelled</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
