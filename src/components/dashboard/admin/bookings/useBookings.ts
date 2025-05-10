
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("check_in");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // First, get the total count for pagination
        const { count, error: countError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact' });

        if (countError) {
          throw countError;
        }

        setTotalCount(count || 0);

        // Then fetch the current page of bookings
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            user:profiles(first_name, last_name),
            hotel:hotels(name)
          `)
          .order(sortField, { ascending: sortDirection === 'asc' })
          .range(from, to);

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
  }, [page, sortField, sortDirection, toast]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(totalCount / limit);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      // Update the local state to reflect the change
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus } 
          : booking
      ));
      
      toast({
        title: "Status Updated",
        description: `Booking status changed to ${newStatus}`,
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update booking status",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    bookings,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortField,
    sortDirection,
    page,
    totalCount,
    limit,
    handleSort,
    handlePageChange,
    updateBookingStatus
  };
};
