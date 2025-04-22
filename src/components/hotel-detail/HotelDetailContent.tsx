
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { HotelHeader } from "./HotelHeader";
import { HotelGallery } from "./HotelGallery";
import { HotelDescription } from "./HotelDescription";
import { HotelAmenities } from "./HotelAmenities";
import { BookingForm } from "@/components/BookingForm";
import { HotelDetailContentProps, HotelTheme } from "@/types/hotel";

export function HotelDetailContent({ hotel, isLoading }: HotelDetailContentProps & { isLoading?: boolean }) {
  // Extract image URLs from hotel_images (real hotel images)
  const imageUrls = hotel?.hotel_images && hotel.hotel_images.length > 0
    ? hotel.hotel_images.map((img) => img.image_url)
    : (hotel?.main_image_url ? [hotel.main_image_url] : []);

  // Extract themes from hotel_themes and map to HotelTheme type
  const themes: HotelTheme[] = hotel?.hotel_themes
    ? hotel.hotel_themes.map((themeItem) => themeItem.themes)
    : [];

  // Extract activities if available (text only)
  const activities: string[] = hotel?.activities || [];

  // Use dynamic data from the API instead of static data
  const amenities = hotel?.amenities || [];

  const availableStayLengths = (
    hotel?.available_months && hotel.available_months.length > 0
      ? hotel.available_months.map(m => {
          const mNum = Number(m);
          return isNaN(mNum) ? null : mNum;
        }).filter(Boolean)
      : []
  ) as number[];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center gap-1 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to hotels
      </Link>
      
      {/* Hotel Header now includes address */}
      <HotelHeader 
        name={hotel?.name || ''}
        stars={hotel?.category || 0}
        city={hotel?.city || ''}
        country={hotel?.country || ''}
        address={hotel?.address || ''}
        themes={themes}
        activities={activities}
        isLoading={isLoading}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Gallery: real hotel images */}
          <HotelGallery 
            images={imageUrls} 
            hotelName={hotel?.name || ''}
            isLoading={isLoading}
          />

          {/* Description */}
          <HotelDescription 
            description={hotel?.description || "No description available."} 
            isLoading={isLoading}
          />

          {/* Amenities, renamed to "Hotel Amenities" */}
          <div data-section="hotel-amenities">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              Hotel Amenities
            </h2>
            <div>
              <HotelAmenities
                amenities={amenities}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Map Section (no change) */}
          {hotel?.latitude && hotel?.longitude && import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <div className="rounded-lg overflow-hidden">
                <iframe 
                  src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=${hotel.latitude},${hotel.longitude}&zoom=15`}
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map location for ${hotel?.name}`}
                  className="w-full"
                ></iframe>
              </div>
              <div className="mt-2 text-sm">
                <p>{hotel?.address}, {hotel?.city}, {hotel?.country}</p>
                <a 
                  href={`https://www.google.com/maps?q=${hotel?.latitude},${hotel?.longitude}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-fuchsia-400 hover:text-fuchsia-300 transition"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
        
        {/* Booking Form */}
        <div className="lg:col-span-1">
          <BookingForm 
            hotelId={hotel?.id || ''} 
            hotelName={hotel?.name || ''} 
            pricePerMonth={hotel?.price_per_month || 0} 
            availableStayLengths={availableStayLengths}
          />
        </div>
      </div>
    </div>
  );
}

