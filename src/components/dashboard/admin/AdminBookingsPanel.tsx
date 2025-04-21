
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminBookingsPanel() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            hotels:hotel_id(name),
            profiles:user_id(first_name, last_name)
          `);

        if (error) {
          throw error;
        }

        setBookings(data || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch bookings",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="p-4">Loading bookings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Booking Management</h2>
      </div>

      <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Hotel</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map(booking => (
              <TableRow key={booking.id}>
                <TableCell className="font-mono text-xs">{booking.id}</TableCell>
                <TableCell>{booking.hotels?.name || "-"}</TableCell>
                <TableCell>
                  {booking.profiles?.first_name && booking.profiles?.last_name 
                    ? `${booking.profiles.first_name} ${booking.profiles.last_name}`
                    : "-"}
                </TableCell>
                <TableCell>{new Date(booking.check_in).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(booking.check_out).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </TableCell>
                <TableCell>${booking.total_price}</TableCell>
              </TableRow>
            ))}
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">No bookings found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
