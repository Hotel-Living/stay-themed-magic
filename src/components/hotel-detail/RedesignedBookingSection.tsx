import React, { useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PricingMatrixItem {
  roomType: string;
  stayLength: string;
  mealPlan: string;
  price: number;
}

interface RedesignedBookingSectionProps {
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  selectedDuration: number;
  setSelectedDuration: (duration: number) => void;
  stayDurations: number[];
  rates: Record<string, number>;
  currency: string;
  handleBookClick: () => void;
  preferredWeekday: string;
  enable_price_increase?: boolean;
  price_increase_cap?: number;
  availableMonths?: string[];
  pricingMatrix?: PricingMatrixItem[];
  mealPlans?: string[];
}

export function RedesignedBookingSection({
  checkInDate,
  setCheckInDate,
  selectedDuration,
  setSelectedDuration,
  stayDurations,
  rates,
  currency,
  handleBookClick,
  preferredWeekday,
  enable_price_increase,
  price_increase_cap,
  availableMonths,
  pricingMatrix,
  mealPlans
}: RedesignedBookingSectionProps) {
  const [selectedRoomType, setSelectedRoomType] = useState<string>("");
  const [showUnavailableMessage, setShowUnavailableMessage] = useState(false);

  // Calculate checkout date
  const checkoutDate = checkInDate ? addDays(checkInDate, selectedDuration) : null;

  // Filter available pricing options
  const availableOptions = pricingMatrix || [];
  const roomTypes = [...new Set(availableOptions.map(option => option.roomType))];

  // Get pricing for current selection with fallback
  const getCurrentPrice = () => {
    if (!availableOptions.length && !Object.keys(rates).length) {
      return null; // Will show fallback message
    }
    
    if (!selectedRoomType || !selectedDuration) {
      return rates[selectedDuration?.toString()] || null;
    }
    
    const matchingOption = availableOptions.find(option => 
      option.roomType === selectedRoomType && 
      option.stayLength === selectedDuration.toString()
    );
    
    return matchingOption?.price || rates[selectedDuration.toString()] || null;
  };

  const currentPrice = getCurrentPrice();
  
  // Determine if price is per person based on room type
  const isPricePerPerson = selectedRoomType && (
    selectedRoomType.toLowerCase().includes('double') || 
    selectedRoomType.toLowerCase().includes('twin') ||
    selectedRoomType.toLowerCase().includes('shared')
  );

  const isDateAvailable = (date: Date): boolean => {
    if (!availableMonths || availableMonths.length === 0) {
      return true;
    }
    const formattedDate = format(date, "MMMM").toLowerCase();
    return availableMonths.some(month => month.toLowerCase() === formattedDate);
  };

  const isDateSelectable = (date: Date): boolean => {
    const day = format(date, "EEEE");
    const isPreferredDay = day === preferredWeekday;
    const isAvailable = isDateAvailable(date);
    const isFuture = date > new Date();
    
    return isPreferredDay && isAvailable && isFuture;
  };

  const handleFinalBooking = () => {
    // Show unavailable message only at final booking step
    setShowUnavailableMessage(true);
  };

  const formatMealPlans = () => {
    if (!mealPlans || mealPlans.length === 0) return "";
    
    const mealPlanDisplayNames = mealPlans.map(plan => {
      switch (plan) {
        case 'breakfast-included':
          return 'Breakfast';
        case 'half-board':
          return 'Half Board';
        case 'full-board':
        case 'fullBoard':
          return 'Full Board';
        case 'all-inclusive':
          return 'All Inclusive';
        case 'laundry':
          return 'Laundry';
        case 'external-laundry':
          return 'External Laundry Service Available';
        default:
          return plan.split(/[-_]/).map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(' ');
      }
    });
    
    if (mealPlanDisplayNames.length === 1) {
      return mealPlanDisplayNames[0];
    }
    
    if (mealPlanDisplayNames.length === 2) {
      return `${mealPlanDisplayNames[0]} and ${mealPlanDisplayNames[1]}`;
    }
    
    const lastPlan = mealPlanDisplayNames[mealPlanDisplayNames.length - 1];
    const otherPlans = mealPlanDisplayNames.slice(0, -1);
    return `${otherPlans.join(", ")} and ${lastPlan}`;
  };

  if (showUnavailableMessage) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/40 to-fuchsia-900/30 border-purple-700/30 shadow-2xl">
        <div className="p-6">
          <Alert className="border-orange-500/50 bg-orange-950/30">
            <AlertCircle className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-200">
              This hotel is currently not available for reservations.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={() => setShowUnavailableMessage(false)}
            variant="outline"
            className="mt-4 w-full bg-purple-800/30 border-purple-600/50 text-white hover:bg-purple-700/40"
          >
            Back to Selection
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/40 to-fuchsia-900/30 border-purple-700/30 shadow-2xl">
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">Book Your Stay</h2>
          <p className="text-white/80 mb-2">
            Weekly Check-In Day: {preferredWeekday}
          </p>
          
          {/* Display meal plans if available */}
          {mealPlans && mealPlans.length > 0 && (
            <p className="text-white/90 mb-4 text-sm">
              Meals: {formatMealPlans()}
            </p>
          )}
        </div>

        {/* Room Type Selection */}
        {roomTypes.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">Room Type</label>
            <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
              <SelectTrigger className="bg-purple-800/30 border-purple-600/50 text-white">
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-600/50">
                {roomTypes.map((roomType) => (
                  <SelectItem key={roomType} value={roomType} className="text-white hover:bg-purple-700/50">
                    {roomType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Stay Duration Selection */}
        {stayDurations.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">Stay Duration</label>
            <Select 
              value={selectedDuration.toString()} 
              onValueChange={(value) => setSelectedDuration(parseInt(value))}
            >
              <SelectTrigger className="bg-purple-800/30 border-purple-600/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-600/50">
                {stayDurations.map((duration) => (
                  <SelectItem key={duration} value={duration.toString()} className="text-white hover:bg-purple-700/50">
                    {duration} {duration === 1 ? 'day' : 'days'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Calendar - Only Mondays selectable */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white">Check-in Date (Mondays only)</label>
          <Calendar
            mode="single"
            selected={checkInDate}
            onSelect={(date) => {
              if (date && isDateSelectable(date)) {
                setCheckInDate(date);
              }
            }}
            disabled={date => !isDateSelectable(date)}
            className="border rounded-md w-full mx-auto bg-purple-800/20 text-white border-purple-600/30"
          />
        </div>

        {/* Check-out Date Display */}
        {checkInDate && checkoutDate && (
          <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Your Stay Details</h3>
              <div className="space-y-1 text-white/90">
                <p><strong>Check-in:</strong> {format(checkInDate, "EEEE, MMMM do, yyyy")}</p>
                <p><strong>Check-out:</strong> {format(checkoutDate, "EEEE, MMMM do, yyyy")}</p>
                <p><strong>Duration:</strong> {selectedDuration} {selectedDuration === 1 ? 'day' : 'days'}</p>
                {selectedRoomType && <p><strong>Room Type:</strong> {selectedRoomType}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Price Display - Always show */}
        <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/30 rounded-lg p-4 border border-yellow-600/30">
          <div className="text-center">
            {currentPrice !== null ? (
              <>
                <p className="text-white/80 text-sm">
                  {isPricePerPerson ? 'Price per person' : 'Price for room'}
                </p>
                <p className="text-2xl font-bold text-white">
                  {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency}{currentPrice.toLocaleString()}
                </p>
                <p className="text-white/70 text-xs">for {selectedDuration} {selectedDuration === 1 ? 'day' : 'days'}</p>
                {isPricePerPerson && (
                  <p className="text-yellow-200/80 text-xs mt-1">
                    Total for 2 guests: {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency}{(currentPrice * 2).toLocaleString()}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-white/80 text-sm">Pricing Information</p>
                <p className="text-lg font-semibold text-white">Price not available yet</p>
                <p className="text-white/70 text-xs">Please contact us for current rates</p>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Pricing Promotional Message */}
        <div className="bg-gradient-to-r from-fuchsia-900/40 to-purple-900/40 border border-fuchsia-700/30 rounded-lg p-4">
          <div className="text-center">
            <p className="text-white text-sm flex items-center justify-center gap-2">
              🔔 <strong>Take advantage of today's price!</strong>
            </p>
            <p className="text-white/80 text-xs mt-1">
              These are not final rates — this hotel uses our smart occupancy-based pricing system.
            </p>
          </div>
        </div>

        {/* Booking Button */}
        <Button
          onClick={handleFinalBooking}
          disabled={!checkInDate || !selectedDuration || (roomTypes.length > 0 && !selectedRoomType)}
          className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Booking
        </Button>
      </div>
    </Card>
  );
}