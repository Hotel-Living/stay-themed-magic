import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Calendar, Users, MapPin, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { AvailabilityPackage } from "@/types/availability-package";
import { useToast } from "@/hooks/use-toast";
import { usePackageBookingOperations } from "@/hooks/usePackageBookingOperations";

interface PackageBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: AvailabilityPackage | null;
  hotelName: string;
  hotelId: string;
  pricePerMonth: number;
}

export function PackageBookingModal({
  isOpen,
  onClose,
  package: selectedPackage,
  hotelName,
  hotelId,
  pricePerMonth
}: PackageBookingModalProps) {
  const [roomsToReserve, setRoomsToReserve] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const { toast } = useToast();
  const { loading, createPackageBooking, validateBookingData } = usePackageBookingOperations();

  if (!selectedPackage) return null;

  const totalPrice = (pricePerMonth / 30) * selectedPackage.duration_days * roomsToReserve;

  const handleBookingSubmit = async () => {
    try {
      const bookingData = {
        guestName,
        guestEmail,
        guestPhone,
        roomsToReserve
      };

      // Validate booking data
      validateBookingData(bookingData, selectedPackage);

      // Create the package booking
      await createPackageBooking(selectedPackage, hotelId, bookingData, totalPrice);

      toast({
        title: "Booking Confirmed!",
        description: `Your reservation at ${hotelName} has been confirmed for ${roomsToReserve} room(s).`,
      });

      // Reset form and close modal
      setRoomsToReserve(1);
      setGuestName("");
      setGuestEmail("");
      setGuestPhone("");
      onClose();

    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Book Your Package
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Details */}
          <div className="bg-secondary/10 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {hotelName}
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date(selectedPackage.start_date), 'MMM dd')} - {format(new Date(selectedPackage.end_date), 'MMM dd, yyyy')}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              <span>{selectedPackage.duration_days} days • {selectedPackage.available_rooms} rooms available</span>
            </div>
          </div>

          {/* Room Selection */}
          <div className="space-y-3">
            <Label htmlFor="rooms">Number of Rooms</Label>
            <Input
              id="rooms"
              type="number"
              min="1"
              max={selectedPackage.available_rooms}
              value={roomsToReserve}
              onChange={(e) => setRoomsToReserve(parseInt(e.target.value) || 1)}
            />
          </div>

          {/* Guest Details */}
          <div className="space-y-4">
            <h3 className="font-medium">Guest Information</h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4" />
              <span className="font-medium">Total Amount</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              €{Math.round(totalPrice)}
            </div>
            <div className="text-sm text-muted-foreground">
              €{Math.round((pricePerMonth / 30) * selectedPackage.duration_days)} per room × {roomsToReserve} room(s)
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleBookingSubmit} 
              disabled={loading || !guestName || !guestEmail}
              className="flex-1"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}