
import React, { useState, useEffect } from 'react';
import { Users, Search, Flag, Calendar, DollarSign, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "./utils/dateUtils";
import { ReportGuestDialog } from "./hotel-bookings/ReportGuestDialog";
import { GuestBlacklistCheck } from "./hotel-bookings/GuestBlacklistCheck";

interface GuestData {
  user_id: string;
  first_name: string;
  last_name: string;
  total_stays: number;
  total_spent: number;
  last_visit: string;
  first_visit: string;
  has_reports: boolean;
}

export const GuestsContent = () => {
  const [guests, setGuests] = useState<GuestData[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<GuestData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'flagged' | 'frequent' | 'new'>('all');
  const [reportDialog, setReportDialog] = useState<{
    open: boolean;
    guestId: string;
    guestName: string;
    hotelId: string;
  }>({
    open: false,
    guestId: "",
    guestName: "",
    hotelId: ""
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchGuestData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // First get the hotel owned by this user
        const { data: hotels, error: hotelError } = await supabase
          .from('hotels')
          .select('id')
          .eq('owner_id', user.id)
          .limit(1);
        
        if (hotelError) throw hotelError;
        
        if (!hotels || hotels.length === 0) {
          setGuests([]);
          return;
        }
        
        const hotelId = hotels[0].id;
        
        // Fetch all bookings for this hotel with guest profiles
        const { data: bookings, error } = await supabase
          .from('bookings')
          .select(`
            user_id,
            total_price,
            check_in,
            check_out,
            user:profiles(first_name, last_name)
          `)
          .eq('hotel_id', hotelId)
          .not('user_id', 'is', null);
        
        if (error) throw error;
        
        // Aggregate guest data
        const guestMap = new Map<string, GuestData>();
        
        for (const booking of bookings || []) {
          const userId = booking.user_id;
          const guestName = booking.user 
            ? `${booking.user.first_name || ''} ${booking.user.last_name || ''}`.trim()
            : 'Unknown Guest';
          
          if (guestMap.has(userId)) {
            const existing = guestMap.get(userId)!;
            existing.total_stays += 1;
            existing.total_spent += booking.total_price || 0;
            
            // Update date ranges
            if (new Date(booking.check_in) > new Date(existing.last_visit)) {
              existing.last_visit = booking.check_in;
            }
            if (new Date(booking.check_in) < new Date(existing.first_visit)) {
              existing.first_visit = booking.check_in;
            }
          } else {
            guestMap.set(userId, {
              user_id: userId,
              first_name: booking.user?.first_name || '',
              last_name: booking.user?.last_name || '',
              total_stays: 1,
              total_spent: booking.total_price || 0,
              last_visit: booking.check_in,
              first_visit: booking.check_in,
              has_reports: false
            });
          }
        }
        
        // Check for reports on each guest
        const guestIds = Array.from(guestMap.keys());
        if (guestIds.length > 0) {
          const { data: reports } = await supabase
            .from('user_reports')
            .select('reported_user_id')
            .in('reported_user_id', guestIds);
          
          const reportedUserIds = new Set(reports?.map(r => r.reported_user_id) || []);
          
          guestMap.forEach((guest, userId) => {
            guest.has_reports = reportedUserIds.has(userId);
          });
        }
        
        const guestsList = Array.from(guestMap.values())
          .sort((a, b) => new Date(b.last_visit).getTime() - new Date(a.last_visit).getTime());
        
        setGuests(guestsList);
      } catch (error: any) {
        console.error("Error fetching guest data:", error);
        toast({
          title: "Error loading guest data",
          description: "We couldn't load your guest information. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGuestData();
  }, [user, toast]);

  useEffect(() => {
    let filtered = guests;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(guest => 
        `${guest.first_name} ${guest.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    switch (filterStatus) {
      case 'flagged':
        filtered = filtered.filter(guest => guest.has_reports);
        break;
      case 'frequent':
        filtered = filtered.filter(guest => guest.total_stays >= 3);
        break;
      case 'new':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        filtered = filtered.filter(guest => new Date(guest.first_visit) > thirtyDaysAgo);
        break;
    }
    
    setFilteredGuests(filtered);
  }, [guests, searchTerm, filterStatus]);

  const handleReportGuest = async (guest: GuestData) => {
    try {
      // Get hotel ID for the current user
      const { data: hotels, error } = await supabase
        .from('hotels')
        .select('id')
        .eq('owner_id', user?.id)
        .limit(1);

      if (error) throw error;
      
      if (hotels && hotels.length > 0) {
        const guestName = `${guest.first_name} ${guest.last_name}`.trim() || 'Guest';
        
        setReportDialog({
          open: true,
          guestId: guest.user_id,
          guestName: guestName,
          hotelId: hotels[0].id
        });
      }
    } catch (error) {
      console.error("Error preparing report dialog:", error);
      toast({
        title: "Error",
        description: "Could not open report dialog. Please try again.",
        variant: "destructive"
      });
    }
  };

  const closeReportDialog = () => {
    setReportDialog({
      open: false,
      guestId: "",
      guestName: "",
      hotelId: ""
    });
  };

  const getGuestStatusBadge = (guest: GuestData) => {
    if (guest.has_reports) {
      return <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">Flagged</span>;
    }
    if (guest.total_stays >= 3) {
      return <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">Frequent</span>;
    }
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    if (new Date(guest.first_visit) > thirtyDaysAgo) {
      return <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">New</span>;
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Guest Management</h2>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-6 h-6 animate-spin text-fuchsia-500" />
          <span className="ml-2">Loading guest data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Guest Management</h2>
      
      {guests.length > 0 ? (
        <>
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search guests by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'flagged', 'frequent', 'new'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-2 text-sm rounded capitalize ${
                    filterStatus === status
                      ? 'bg-fuchsia-500/30 text-fuchsia-200'
                      : 'bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/20'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Guest List */}
          <div className="space-y-4">
            {filteredGuests.map((guest) => {
              const guestName = `${guest.first_name} ${guest.last_name}`.trim() || 'Unknown Guest';
              const isPastGuest = new Date(guest.last_visit) < new Date();
              
              return (
                <div key={guest.user_id} className="border border-fuchsia-900/20 rounded-lg p-4 bg-fuchsia-500/10">
                  {/* Guest Alert Check */}
                  {guest.has_reports && (
                    <GuestBlacklistCheck guestId={guest.user_id} />
                  )}
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex-shrink-0 flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-fuchsia-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{guestName}</h3>
                        {getGuestStatusBadge(guest)}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
                        <div className="bg-fuchsia-950/30 p-3 rounded">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-fuchsia-300" />
                            <p className="text-xs text-muted-foreground">Total Stays</p>
                          </div>
                          <p className="font-medium">{guest.total_stays}</p>
                        </div>
                        <div className="bg-fuchsia-950/30 p-3 rounded">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-fuchsia-300" />
                            <p className="text-xs text-muted-foreground">Total Spent</p>
                          </div>
                          <p className="font-medium">${guest.total_spent}</p>
                        </div>
                        <div className="bg-fuchsia-950/30 p-3 rounded">
                          <p className="text-xs text-muted-foreground">First Visit</p>
                          <p className="font-medium">{formatDate(guest.first_visit)}</p>
                        </div>
                        <div className="bg-fuchsia-950/30 p-3 rounded">
                          <p className="text-xs text-muted-foreground">Last Visit</p>
                          <p className="font-medium">{formatDate(guest.last_visit)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <button className="px-3 py-1 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm rounded">
                          View History
                        </button>
                        {isPastGuest && (
                          <Button
                            onClick={() => handleReportGuest(guest)}
                            variant="outline"
                            size="sm"
                            className="px-3 py-1 text-sm"
                          >
                            <Flag className="w-3 h-3 mr-1" />
                            Report Guest
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredGuests.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No guests found matching your criteria.</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fuchsia-950/30 flex items-center justify-center">
            <Users className="w-8 h-8 text-fuchsia-400" />
          </div>
          <h3 className="text-lg font-bold mb-2">No Guest Data Yet</h3>
          <p className="text-muted-foreground mb-6">Guest information will appear here once you receive bookings.</p>
        </div>
      )}

      <ReportGuestDialog
        open={reportDialog.open}
        onClose={closeReportDialog}
        guestId={reportDialog.guestId}
        guestName={reportDialog.guestName}
        hotelId={reportDialog.hotelId}
      />
    </div>
  );
};

export default GuestsContent;
