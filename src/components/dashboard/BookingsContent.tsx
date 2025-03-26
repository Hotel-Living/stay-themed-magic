
import React, { useState } from 'react';
import BookingItem from './BookingItem';
import EmptyState from './EmptyState';
import { Booking } from '@/integrations/supabase/types-custom';
import BookingsFilter from './bookings/BookingsFilter';
import BookingsLoading from './bookings/BookingsLoading';
import BookingsPagination from './bookings/BookingsPagination';
import { 
  filterBookings, 
  sortBookings, 
  paginateBookings, 
  calculateTotalPages 
} from './bookings/bookingUtils';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingsContentProps {
  bookings: Booking[];
  isLoading: boolean;
}

const ITEMS_PER_PAGE = 5;

const BookingsContent: React.FC<BookingsContentProps> = ({ bookings, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return <BookingsLoading />;
  }

  if (bookings.length === 0) {
    return (
      <EmptyState 
        title="No bookings yet"
        description="You haven't made any bookings yet. Start exploring hotels and make your first reservation!"
        icon={<span className="w-10 h-10">📅</span>}
        actionLink="/"
        actionText="Explore Hotels"
      />
    );
  }

  // Apply filters and sorting
  const filteredBookings = filterBookings(bookings, statusFilter, searchTerm);
  const sortedBookings = sortBookings(filteredBookings, sortOrder);
  
  // Calculate pagination
  const totalPages = calculateTotalPages(sortedBookings.length, ITEMS_PER_PAGE);
  const paginatedBookings = paginateBookings(sortedBookings, currentPage, ITEMS_PER_PAGE);

  // Show empty state for filtered results
  if (filteredBookings.length === 0) {
    return (
      <>
        <BookingsFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        
        <EmptyState 
          title="No matching bookings"
          description="No bookings match your current filters. Try adjusting your search criteria."
          icon={<Filter className="w-10 h-10 text-muted-foreground" />}
          action={
            <Button onClick={() => {
              setStatusFilter('all');
              setSearchTerm('');
            }}>
              Clear filters
            </Button>
          }
        />
      </>
    );
  }

  return (
    <div>
      <BookingsFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="space-y-4">
        {paginatedBookings.map((booking) => (
          <BookingItem 
            key={booking.id} 
            booking={booking}
            name="Hotel Name"
            dates={`${new Date(booking.check_in).toLocaleDateString()} - ${new Date(booking.check_out).toLocaleDateString()}`}
            property="Unknown Location"
            status={booking.status || "pending"}
          />
        ))}
      </div>

      <BookingsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default BookingsContent;
