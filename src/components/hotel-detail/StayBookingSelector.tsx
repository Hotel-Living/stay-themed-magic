// RUTA: src/components/hotel-detail/StayBookingSelector.tsx

import React, { useState } from "react";
import { HotelDetailProps } from "@/types/hotel";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface Props {
  hotel: HotelDetailProps;
}

export const StayBookingSelector: React.FC<Props> = ({ hotel }) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [duration, setDuration] = useState<number | null>(null);

  const availableDurations = [8, 16, 24, 32].filter(d => hotel[`stay${d}`]);

  const endDate = startDate && duration ? addDays(startDate, duration) : null;
  const pricePerPerson = hotel.price_per_person || 0;
  const totalPrice = duration && pricePerPerson ? duration * pricePerPerson : 0;

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-semibold">Select your stay</h3>

      <div>
        <label className="text-sm font-medium text-gray-700">Start Date</label>
        <Calendar mode="single" selected={startDate} onSelect={setStartDate} className="mt-2" />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Stay Duration</label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {availableDurations.map(d => (
            <Button
              key={d}
              variant={duration === d ? "default" : "outline"}
              onClick={() => setDuration(d)}
              className="text-sm"
            >
              {d} nights
            </Button>
          ))}
        </div>
      </div>

      {startDate && duration && (
        <div className="text-sm text-gray-700">
          Check-out: <strong>{format(addDays(startDate, duration), "MMM d, yyyy")}</strong>
        </div>
      )}

      {startDate && duration && (
        <div className="text-base font-medium text-gray-800">
          Total: ${totalPrice.toFixed(2)} <span className="text-sm font-normal">per person</span>
        </div>
      )}

      <p className="text-xs text-gray-500 leading-snug">
        Prices may increase depending on availability. Book early to secure the best rate.
      </p>

      <Button disabled={!startDate || !duration} className="w-full">
        Book Now
      </Button>
    </div>
  );
};
