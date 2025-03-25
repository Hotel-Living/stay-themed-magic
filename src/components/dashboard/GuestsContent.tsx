
import React, { useState, useEffect } from 'react';
import { Users, Search, Filter } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import EmptyState from './EmptyState';

type Guest = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  phone?: string;
  avatar_url?: string;
};

export const GuestsContent = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchGuests = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch bookings for hotels owned by the current user
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('user_id, hotel_id')
          .eq('status', 'confirmed');
          
        if (bookingsError) throw bookingsError;
        
        if (!bookings || bookings.length === 0) {
          setIsLoading(false);
          return;
        }
        
        // Get unique user IDs from bookings
        const userIds = [...new Set(bookings.map(booking => booking.user_id))];
        
        // Fetch guest profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', userIds);
          
        if (profilesError) throw profilesError;
        
        setGuests(profiles as Guest[]);
      } catch (error) {
        console.error('Error fetching guests:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGuests();
  }, [user]);

  const filteredGuests = guests.filter(guest => {
    const fullName = `${guest.first_name} ${guest.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           (guest.email && guest.email.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  if (isLoading) {
    return (
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Users className="w-6 h-6 mr-2 text-fuchsia-400" />
          Guests
        </h2>
        <div className="text-center py-10">
          <div className="w-8 h-8 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading guests data...</p>
        </div>
      </div>
    );
  }

  if (guests.length === 0) {
    return (
      <EmptyState 
        icon={<Users className="w-8 h-8" />}
        title="No Guests Yet"
        description="Information about guests who have booked your properties will appear here when you receive bookings. Make sure your properties are listed to attract guests."
      />
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Users className="w-6 h-6 mr-2 text-fuchsia-400" />
        Guests
      </h2>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search guests..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center px-4 py-2 bg-fuchsia-950/30 hover:bg-fuchsia-950/50 rounded-lg transition-colors">
          <Filter className="w-4 h-4 mr-2" />
          <span>Filter</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-fuchsia-800/20">
              <th className="text-left py-3 px-4 font-medium text-sm">Guest Name</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Email</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Phone</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Joined</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests.map((guest) => (
              <tr key={guest.id} className="border-b border-fuchsia-800/10 hover:bg-fuchsia-950/30">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-fuchsia-800/30 flex items-center justify-center text-sm font-medium mr-3">
                      {guest.first_name?.[0]}{guest.last_name?.[0]}
                    </div>
                    <span>{guest.first_name} {guest.last_name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-muted-foreground">{guest.email}</td>
                <td className="py-4 px-4 text-muted-foreground">{guest.phone || 'N/A'}</td>
                <td className="py-4 px-4 text-muted-foreground">
                  {new Date(guest.created_at).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <button className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-sm">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredGuests.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No guests found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default GuestsContent;
