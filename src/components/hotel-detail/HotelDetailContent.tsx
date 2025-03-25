
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { HotelHeader } from "./HotelHeader";
import { HotelGallery } from "./HotelGallery";
import { HotelDescription } from "./HotelDescription";
import { HotelAmenities } from "./HotelAmenities";
import { HotelAvailableMonths } from "./HotelAvailableMonths";
import { BookingForm } from "@/components/BookingForm";

interface HotelDetailContentProps {
  hotel: any;
}

export function HotelDetailContent({ hotel }: HotelDetailContentProps) {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center gap-1 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to hotels
      </Link>
      
      {/* Hotel Header */}
      <HotelHeader 
        name={hotel.name}
        stars={hotel.stars}
        city={hotel.city}
        country={hotel.country}
        availableMonthsCount={hotel.availableMonths.length}
        themes={hotel.themes}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Gallery */}
          <HotelGallery images={hotel.images} hotelName={hotel.name} />
          
          {/* Description */}
          <HotelDescription description={hotel.longDescription} />
          
          {/* Amenities */}
          <HotelAmenities amenities={hotel.amenities} />
          
          {/* Available months */}
          <HotelAvailableMonths months={hotel.availableMonths} />
        </div>
        
        {/* Booking Form */}
        <div className="lg:col-span-1">
          <BookingForm 
            hotelId={hotel.id} 
            hotelName={hotel.name} 
            pricePerMonth={hotel.pricePerMonth} 
          />
        </div>
      </div>
    </div>
  );
}
