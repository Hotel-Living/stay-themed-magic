import React, { useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";
interface PricingMatrixItem {
  roomType: string;
  stayLength: string | number;
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
  const { t } = useTranslation('hotels');
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
    const matchingOption = availableOptions.find(option => option.roomType === selectedRoomType && option.stayLength === selectedDuration.toString());
    return matchingOption?.price || rates[selectedDuration.toString()] || null;
  };
  const currentPrice = getCurrentPrice();

  // Determine if price is per person based on room type
  const isPricePerPerson = selectedRoomType && (selectedRoomType.toLowerCase().includes('double') || selectedRoomType.toLowerCase().includes('twin') || selectedRoomType.toLowerCase().includes('shared'));
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
          return t('mealPlans.breakfast');
        case 'half-board':
          return t('mealPlans.halfBoard');
        case 'full-board':
        case 'fullBoard':
          return t('mealPlans.fullBoard');
        case 'all-inclusive':
          return t('mealPlans.allInclusive');
        case 'laundry':
          return t('mealPlans.laundry');
        case 'external-laundry':
          return t('mealPlans.externalLaundry');
        default:
          return plan.split(/[-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
      }
    });
    if (mealPlanDisplayNames.length === 1) {
      return mealPlanDisplayNames[0];
    }
    if (mealPlanDisplayNames.length === 2) {
      return `${mealPlanDisplayNames[0]} ${t('and')} ${mealPlanDisplayNames[1]}`;
    }
    const lastPlan = mealPlanDisplayNames[mealPlanDisplayNames.length - 1];
    const otherPlans = mealPlanDisplayNames.slice(0, -1);
    return `${otherPlans.join(", ")} ${t('and')} ${lastPlan}`;
  };
  if (showUnavailableMessage) {
    return <Card className="bg-gradient-to-br from-purple-900/40 to-fuchsia-900/30 border-purple-700/30 shadow-2xl">
        <div className="p-6">
          <Alert className="border-orange-500/50 bg-orange-950/30">
            <AlertCircle className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-200">
              {t('hotelNotAvailable')}
            </AlertDescription>
          </Alert>
          <Button onClick={() => setShowUnavailableMessage(false)} variant="outline" className="mt-4 w-full bg-purple-800/30 border-purple-600/50 text-white hover:bg-purple-700/40">
            {t('backToSelection')}
          </Button>
        </div>
      </Card>;
  }
  return <Card className="bg-[#6000B3] border-border shadow-2xl">
      <div className="p-6 space-y-6 bg-[#6000B3]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">{t('bookYourStay')}</h2>
          <p className="text-white/80 mb-2">
            {t('weeklyCheckInDay')}: {preferredWeekday}
          </p>
          
          {/* Display meal plans if available */}
          {mealPlans && mealPlans.length > 0 && <p className="text-white/90 mb-4 text-sm">
              {t('meals')}: {formatMealPlans()}
            </p>}
        </div>

        {/* Room Type Selection */}
        {roomTypes.length > 0 && <div className="space-y-2">
            <label className="text-sm font-semibold text-white">{t('roomType')}</label>
            <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
              <SelectTrigger className="bg-[#6000B3]/30 border-border text-white">
                <SelectValue placeholder={t('selectRoomType')} />
              </SelectTrigger>
              <SelectContent className="bg-[#6000B3] border-border">
                {roomTypes.map(roomType => <SelectItem key={roomType} value={roomType} className="text-white hover:bg-accent/50">
                    {roomType}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>}

        {/* Stay Duration Selection */}
        {stayDurations.length > 0 && <div className="space-y-2">
            <label className="text-sm font-semibold text-white">{t('stayDuration')}</label>
            <Select value={selectedDuration.toString()} onValueChange={value => setSelectedDuration(parseInt(value))}>
              <SelectTrigger className="bg-[#6000B3]/30 border-border text-white font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#6000B3] border-border z-50">
                {stayDurations.map(duration => <SelectItem key={duration} value={duration.toString()} className="text-white font-bold hover:bg-white/10">
                    {duration} {duration === 1 ? t('day') : t('days')}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>}

        {/* Calendar - Only Mondays selectable */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white">{t('checkInDate')}</label>
          <Calendar mode="single" selected={checkInDate} onSelect={date => {
          if (date && isDateSelectable(date)) {
            setCheckInDate(date);
          }
        }} disabled={date => !isDateSelectable(date)} className="border rounded-md w-full mx-auto text-white border-border bg-[#6000B3]" classNames={{
          day: "h-9 w-9 p-0 font-bold text-white hover:bg-white/10",
          day_selected: "bg-[#C4F0FF] text-[#003366] hover:bg-[#C4F0FF] hover:text-[#003366] focus:bg-[#C4F0FF] focus:text-[#003366] font-bold",
          day_today: "bg-white/20 text-white font-bold",
          day_disabled: "text-white/30 opacity-50",
          head_cell: "text-white/70 rounded-md w-9 font-bold text-[0.8rem]",
          caption_label: "text-white font-bold",
          nav_button: "text-white hover:bg-white/10"
        }} />
        </div>

        {/* Check-out Date Display */}
        {checkInDate && checkoutDate && <div className="bg-[#6000B3]/30 rounded-lg p-4 border border-border">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">{t('yourStayDetails')}</h3>
              <div className="space-y-1 text-white/90">
                <p><strong>{t('checkIn')}:</strong> {format(checkInDate, "EEEE, MMMM do, yyyy")}</p>
                <p><strong>{t('checkOut')}:</strong> {format(checkoutDate, "EEEE, MMMM do, yyyy")}</p>
                <p className="bg-[#6000B3]"><strong>{t('duration')}:</strong> {selectedDuration} {selectedDuration === 1 ? t('day') : t('days')}</p>
                {selectedRoomType && <p><strong>{t('roomType')}:</strong> {selectedRoomType}</p>}
              </div>
            </div>
          </div>}

        {/* Price Display - Always show */}
        <div className="bg-gradient-to-br from-[#6000B3]/40 to-[#6000B3]/30 rounded-lg p-4 border border-border">
          <div className="text-center">
            {currentPrice !== null ? <>
                <p className="text-white/80 text-sm font-bold">
                  {isPricePerPerson ? t('pricePerPerson') : t('priceForRoom')}
                </p>
                <p className="text-2xl font-bold text-white">
                  {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency}{currentPrice.toLocaleString()}
                </p>
                <p className="text-white/70 text-xs font-bold">{t('for')} {selectedDuration} {selectedDuration === 1 ? t('day') : t('days')}</p>
                {isPricePerPerson && <p className="text-yellow-200/80 text-xs mt-1 font-bold">
                    {t('totalForTwoGuests')}: {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency}{(currentPrice * 2).toLocaleString()}
                  </p>}
              </> : <>
                <p className="text-white/80 text-sm font-bold">{t('pricingInformation')}</p>
                <p className="text-lg font-semibold text-white bg-[#6000B3]">{t('priceNotAvailable')}</p>
                <p className="text-white/70 text-xs font-bold">{t('contactForRates')}</p>
              </>}
          </div>
        </div>

        {/* Dynamic Pricing Promotional Message */}
        <div className="bg-gradient-to-r from-[#6000B3]/40 to-[#6000B3]/30 border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-white text-sm flex items-center justify-center gap-2 font-bold">
              🔔 <strong>{t('takeAdvantageOfPrice')}</strong>
            </p>
            <p className="text-white/80 text-xs mt-1 font-bold">
              {t('dynamicPricingMessage')}
            </p>
          </div>
        </div>

        {/* Booking Button */}
        <Button onClick={handleFinalBooking} disabled={!checkInDate || !selectedDuration || roomTypes.length > 0 && !selectedRoomType} className="w-full bg-[#6000B3] hover:bg-[#6000B3]/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
          {t('completeBooking')}
        </Button>
      </div>
    </Card>;
}