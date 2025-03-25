import React, { useState } from 'react';
import BookingItem from './BookingItem';
import EmptyState from './EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { Booking } from '@/integrations/supabase/types-custom';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Filter, Search, Calendar, ListOrdered, CalendarCheck, CalendarMinus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

  // Filter bookings by status and search term
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const hotelName = ''; // Hotel name is not available in the Booking type
    const matchesSearch = !searchTerm || hotelName.includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBookings = sortedBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Helper to generate page links
  const getPageLinks = () => {
    const pageLinks = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pageLinks;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="glass-card rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4 animate-pulse">
              <Skeleton className="h-24 w-24 md:h-36 md:w-36 rounded-lg" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-60" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-5 w-24 mt-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
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

  if (filteredBookings.length === 0) {
    return (
      <>
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search bookings"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            title={sortOrder === 'asc' ? 'Oldest first' : 'Newest first'}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
        
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
      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search bookings"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          title={sortOrder === 'asc' ? 'Oldest first' : 'Newest first'}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

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

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {getPageLinks()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default BookingsContent;
