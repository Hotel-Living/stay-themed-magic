
import React, { useState } from 'react';
import { Calendar, Check, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Booking } from '@/integrations/supabase/types-custom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface BookingItemProps {
  booking: Booking;
  name: string;
  dates: string;
  property: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

const BookingItem = ({ booking, name, dates, property, status }: BookingItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [expandDetails, setExpandDetails] = useState(false);

  const statusIcons = {
    confirmed: <Check className="h-4 w-4" />,
    pending: <Calendar className="h-4 w-4" />,
    cancelled: <Trash2 className="h-4 w-4" />,
    completed: <Check className="h-4 w-4" />,
  };

  const cancelBooking = async () => {
    try {
      setIsDeleting(true);
      
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', booking.id);
      
      if (error) throw error;
      
      toast({
        title: "Booking cancelled",
        description: "Your booking has been successfully cancelled.",
      });
      
      setShowCancelDialog(false);
    } catch (error: any) {
      toast({
        title: "Error cancelling booking",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const checkInDate = new Date(booking.check_in);
  const checkOutDate = new Date(booking.check_out);
  const daysUntilCheckIn = Math.ceil((checkInDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const stayDuration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const canCancel = status !== 'cancelled' && status !== 'completed' && daysUntilCheckIn > 1;

  return (
    <>
      <div className={cn(
        "glass-card transition-all duration-300 rounded-xl overflow-hidden",
        expandDetails ? "p-0" : "p-4"
      )}>
        <div 
          className="flex items-start p-4 cursor-pointer"
          onClick={() => setExpandDetails(!expandDetails)}
        >
          <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex-shrink-0 flex items-center justify-center mr-3">
            <Calendar className="w-5 h-5 text-fuchsia-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{name}</p>
            <p className="text-sm text-foreground/70 truncate">{property}</p>
            <p className="text-xs text-foreground/60">{dates}</p>
          </div>
          <div className={cn(
            "px-2 py-1 text-xs rounded-full flex items-center gap-1",
            status === 'confirmed' ? "bg-green-500/20 text-green-300" : 
            status === 'pending' ? "bg-amber-500/20 text-amber-300" :
            status === 'completed' ? "bg-blue-500/20 text-blue-300" :
            "bg-red-500/20 text-red-300"
          )}>
            {statusIcons[status]}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
        
        {expandDetails && (
          <div className="p-4 pt-0 border-t border-fuchsia-800/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-xs text-fuchsia-300 mb-1">Check-in</h4>
                <p className="text-sm">{checkInDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                {daysUntilCheckIn > 0 && <p className="text-xs text-fuchsia-400 mt-1">{daysUntilCheckIn} days from now</p>}
              </div>
              
              <div>
                <h4 className="text-xs text-fuchsia-300 mb-1">Check-out</h4>
                <p className="text-sm">{checkOutDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-xs text-fuchsia-400 mt-1">{stayDuration} day stay</p>
              </div>
              
              <div>
                <h4 className="text-xs text-fuchsia-300 mb-1">Booking ID</h4>
                <p className="text-sm font-mono">{booking.id.slice(0, 8)}</p>
              </div>
              
              <div>
                <h4 className="text-xs text-fuchsia-300 mb-1">Total Price</h4>
                <p className="text-sm">${booking.total_price.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/hotel/${booking.hotel_id}`, '_blank');
                }}
              >
                View Hotel
              </Button>
              
              {canCancel && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCancelDialog(true);
                  }}
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={cancelBooking}
              className="bg-red-500 hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? "Cancelling..." : "Yes, Cancel Booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingItem;
