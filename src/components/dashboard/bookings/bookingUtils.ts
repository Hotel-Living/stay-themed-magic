
import { Booking } from '@/integrations/supabase/types-custom';

export const filterBookings = (
  bookings: Booking[],
  statusFilter: string,
  searchTerm: string
): Booking[] => {
  return bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = !searchTerm || searchTerm.toLowerCase() === '';
    
    return matchesStatus && matchesSearch;
  });
};

export const sortBookings = (
  bookings: Booking[],
  sortOrder: 'asc' | 'desc'
): Booking[] => {
  return [...bookings].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

export const paginateBookings = (
  bookings: Booking[],
  currentPage: number,
  itemsPerPage: number
): Booking[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return bookings.slice(startIndex, startIndex + itemsPerPage);
};

export const calculateTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage);
};
