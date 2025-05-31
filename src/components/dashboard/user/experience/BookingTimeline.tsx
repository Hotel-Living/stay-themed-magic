
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { ThemeTag } from "@/components/ThemeTag";
import { useBookingTimeline } from "./hooks/useBookingTimeline";
import { formatDate, calculateDaysBetween } from "../../utils/dateUtils";

export const BookingTimeline: React.FC = () => {
  const { bookings, loading } = useBookingTimeline();

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Timeline of Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading your booking timeline...</div>
        </CardContent>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Timeline of Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-foreground/60">
            Your booking history will appear here after your first stay.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Timeline of Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {bookings.map((booking) => {
            const duration = calculateDaysBetween(booking.check_in, booking.check_out);
            const checkInDate = new Date(booking.check_in);
            const monthYear = checkInDate.toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            });

            return (
              <div key={booking.id} className="flex items-start gap-4 p-4 bg-background/5 rounded-lg">
                <div className="flex-shrink-0 w-2 h-2 bg-fuchsia-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{monthYear}</span>
                    <span className="text-sm text-foreground/60 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {duration} day{duration > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    {booking.hotels?.name || 'Unknown Hotel'}
                  </div>
                  <div className="text-sm text-foreground/60 mb-2">
                    {booking.hotels ? `${booking.hotels.city}, ${booking.hotels.country}` : 'Unknown Location'}
                  </div>
                  <div className="text-sm text-foreground/60 mb-2">
                    {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                  </div>
                  {booking.hotels?.hotel_themes && booking.hotels.hotel_themes.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {booking.hotels.hotel_themes.slice(0, 3).map((theme, index) => (
                        <ThemeTag
                          key={index}
                          theme={theme.themes}
                          size="sm"
                        />
                      ))}
                      {booking.hotels.hotel_themes.length > 3 && (
                        <span className="text-xs text-foreground/60 self-center">
                          +{booking.hotels.hotel_themes.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
