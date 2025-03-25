import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Check, X, Clock, ArrowUpDown, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import EmptyState from './EmptyState';

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

type Booking = {
  id: string;
  user_id: string;
  hotel_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  user_name?: string;
  hotel_name?: string;
};

export const BookingsContent = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortField, setSortField] = useState<'check_in' | 'created_at'>('check_in');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        const { data: hotels, error: hotelsError } = await supabase
          .from('hotels')
          .select('id')
          .eq('owner_id', user.id);
          
        if (hotelsError) throw hotelsError;
        
        if (!hotels || hotels.length === 0) {
          setIsLoading(false);
          return;
        }
        
        const hotelIds = hotels.map(hotel => hotel.id);
        
        let { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            profiles:user_id (first_name, last_name),
            hotels:hotel_id (name)
          `)
          .in('hotel_id', hotelIds);
          
        if (error) throw error;
        
        const formattedBookings = data.map((booking: any) => ({
          ...booking,
          user_name: booking.profiles ? `${booking.profiles.first_name} ${booking.profiles.last_name}` : 'Unknown Guest',
          hotel_name: booking.hotels ? booking.hotels.name : 'Unknown Hotel'
        }));
        
        setBookings(formattedBookings);
        setFilteredBookings(formattedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [user]);

  useEffect(() => {
    let filtered = [...bookings];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.user_name?.toLowerCase().includes(term) ||
        booking.hotel_name?.toLowerCase().includes(term) ||
        booking.id.toLowerCase().includes(term)
      );
    }
    
    filtered.sort((a, b) => {
      const dateA = new Date(a[sortField]);
      const dateB = new Date(b[sortField]);
      
      if (sortDirection === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
    
    setFilteredBookings(filtered);
  }, [bookings, statusFilter, searchTerm, sortField, sortDirection]);

  const handleUpdateStatus = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);
        
      if (error) throw error;
      
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      
      toast({
        title: "Booking updated",
        description: `Booking status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Update failed",
        description: "Could not update booking status",
        variant: "destructive",
      });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBookings(filteredBookings.map(booking => booking.id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (bookingId: string) => {
    if (selectedBookings.includes(bookingId)) {
      setSelectedBookings(selectedBookings.filter(id => id !== bookingId));
    } else {
      setSelectedBookings([...selectedBookings, bookingId]);
    }
  };

  const handleBulkAction = async (action: BookingStatus) => {
    if (selectedBookings.length === 0) return;
    
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: action })
        .in('id', selectedBookings);
        
      if (error) throw error;
      
      setBookings(bookings.map(booking => 
        selectedBookings.includes(booking.id) ? { ...booking, status: action } : booking
      ));
      
      toast({
        title: "Bookings updated",
        description: `${selectedBookings.length} bookings updated to ${action}`,
      });
      
      setSelectedBookings([]);
    } catch (error) {
      console.error('Error updating bookings:', error);
      toast({
        title: "Update failed",
        description: "Could not update booking statuses",
        variant: "destructive",
      });
    }
  };

  const toggleSort = (field: 'check_in' | 'created_at') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <X className="w-4 h-4 text-red-500" />;
      case 'completed':
        return <Check className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-fuchsia-400" />
          Bookings
        </h2>
        <div className="text-center py-10">
          <div className="w-8 h-8 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <EmptyState 
        icon={<Calendar className="w-8 h-8" />}
        title="No Bookings Yet"
        description="Your bookings and reservations will appear here. Find a hotel you like and book a stay to see it listed here."
        actionLink="/search"
        actionText="Find Hotels"
      />
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Calendar className="w-6 h-6 mr-2 text-fuchsia-400" />
        Bookings
      </h2>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search bookings..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <button 
            className="flex items-center px-4 py-2 bg-fuchsia-950/30 hover:bg-fuchsia-950/50 rounded-lg transition-colors"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4 mr-2" />
            <span>{statusFilter === 'all' ? 'All Statuses' : statusFilter}</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-fuchsia-950/80 border border-fuchsia-800/20 rounded-lg shadow-lg z-10">
              <div className="p-2">
                <button 
                  className="w-full text-left px-3 py-2 text-sm rounded hover:bg-fuchsia-900/50 transition-colors"
                  onClick={() => {
                    setStatusFilter('all');
                    setIsFilterOpen(false);
                  }}
                >
                  All Statuses
                </button>
                <button 
                  className="w-full text-left px-3 py-2 text-sm rounded hover:bg-fuchsia-900/50 transition-colors"
                  onClick={() => {
                    setStatusFilter('pending');
                    setIsFilterOpen(false);
                  }}
                >
                  Pending
                </button>
                <button 
                  className="w-full text-left px-3 py-2 text-sm rounded hover:bg-fuchsia-900/50 transition-colors"
                  onClick={() => {
                    setStatusFilter('confirmed');
                    setIsFilterOpen(false);
                  }}
                >
                  Confirmed
                </button>
                <button 
                  className="w-full text-left px-3 py-2 text-sm rounded hover:bg-fuchsia-900/50 transition-colors"
                  onClick={() => {
                    setStatusFilter('cancelled');
                    setIsFilterOpen(false);
                  }}
                >
                  Cancelled
                </button>
                <button 
                  className="w-full text-left px-3 py-2 text-sm rounded hover:bg-fuchsia-900/50 transition-colors"
                  onClick={() => {
                    setStatusFilter('completed');
                    setIsFilterOpen(false);
                  }}
                >
                  Completed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {selectedBookings.length > 0 && (
        <div className="mb-4 p-3 bg-fuchsia-950/30 rounded-lg flex justify-between items-center">
          <span className="text-sm">{selectedBookings.length} bookings selected</span>
          <div className="flex gap-2">
            <button 
              className="px-3 py-1 text-xs bg-green-600/70 hover:bg-green-600 rounded-md transition-colors"
              onClick={() => handleBulkAction('confirmed')}
            >
              Confirm All
            </button>
            <button 
              className="px-3 py-1 text-xs bg-red-600/70 hover:bg-red-600 rounded-md transition-colors"
              onClick={() => handleBulkAction('cancelled')}
            >
              Cancel All
            </button>
            <button 
              className="px-3 py-1 text-xs bg-blue-600/70 hover:bg-blue-600 rounded-md transition-colors"
              onClick={() => handleBulkAction('completed')}
            >
              Complete All
            </button>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-fuchsia-800/20">
              <th className="py-3 px-4 font-medium text-sm text-left">
                <div className="flex items-center">
                  <Checkbox 
                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="mr-2"
                  />
                  Guest
                </div>
              </th>
              <th className="py-3 px-4 font-medium text-sm text-left">Property</th>
              <th className="py-3 px-4 font-medium text-sm text-left">
                <button 
                  className="flex items-center"
                  onClick={() => toggleSort('check_in')}
                >
                  Stay Dates
                  <ArrowUpDown className="w-4 h-4 ml-1" />
                </button>
              </th>
              <th className="py-3 px-4 font-medium text-sm text-left">Total</th>
              <th className="py-3 px-4 font-medium text-sm text-left">Status</th>
              <th className="py-3 px-4 font-medium text-sm text-left">
                <button 
                  className="flex items-center"
                  onClick={() => toggleSort('created_at')}
                >
                  Booked On
                  <ArrowUpDown className="w-4 h-4 ml-1" />
                </button>
              </th>
              <th className="py-3 px-4 font-medium text-sm text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => {
              const checkInDate = new Date(booking.check_in);
              const checkOutDate = new Date(booking.check_out);
              const createdDate = new Date(booking.created_at);
              
              return (
                <tr key={booking.id} className="border-b border-fuchsia-800/10 hover:bg-fuchsia-950/30">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Checkbox 
                        checked={selectedBookings.includes(booking.id)}
                        onCheckedChange={() => handleSelectBooking(booking.id)}
                        className="mr-2"
                      />
                      <span>{booking.user_name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{booking.hotel_name}</td>
                  <td className="py-4 px-4">
                    <div className="text-xs text-muted-foreground">
                      <div>{checkInDate.toLocaleDateString()} - </div>
                      <div>{checkOutDate.toLocaleDateString()}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium">${booking.total_price}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {getStatusIcon(booking.status)}
                      <span className="ml-2 capitalize">{booking.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {createdDate.toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <button 
                            className="px-2 py-1 text-xs bg-green-600/70 hover:bg-green-600 rounded-md transition-colors"
                            onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                          >
                            Confirm
                          </button>
                          <button 
                            className="px-2 py-1 text-xs bg-red-600/70 hover:bg-red-600 rounded-md transition-colors"
                            onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <button 
                          className="px-2 py-1 text-xs bg-blue-600/70 hover:bg-blue-600 rounded-md transition-colors"
                          onClick={() => handleUpdateStatus(booking.id, 'completed')}
                        >
                          Complete
                        </button>
                      )}
                      <button className="px-2 py-1 text-xs bg-fuchsia-600/70 hover:bg-fuchsia-600 rounded-md transition-colors">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {filteredBookings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No bookings match your current filters.</p>
          <button 
            className="mt-4 text-fuchsia-400 hover:text-fuchsia-300"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingsContent;

