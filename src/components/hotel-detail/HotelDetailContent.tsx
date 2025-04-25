
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { HotelHeader } from "./HotelHeader";
import { HotelGallery } from "./HotelGallery";
import { HotelDescription } from "./HotelDescription";
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

  // Use hotelFeatures from the API instead of amenities
  const hotelFeatures = hotel?.hotelFeatures || [];

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
        <div className="lg:col-span-2 space-y-7">
          <div className="bg-[#5C088F] rounded-lg p-6 text-white">
            <HotelGallery 
              images={imageUrls} 
              hotelName={hotel?.name || ''}
              isLoading={isLoading}
            />
          </div>
          
          <HotelDescription 
            description={hotel?.description || ""} 
            idealGuests={hotel?.idealGuests || ""}
            atmosphere={hotel?.atmosphere || ""}
            perfectLocation={hotel?.perfectLocation || ""}
            isLoading={isLoading}
          />
          
          {/* Updated to use hotelFeatures instead of amenities */}
          {hotelFeatures && hotelFeatures.length > 0 && (
            <div className="bg-[#5C088F] rounded-lg p-6 text-white" data-section="hotel-features">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                Hotel Features
              </h2>
              <div className="flex flex-wrap gap-2">
                {hotelFeatures.map((feature, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {hotel?.latitude && hotel?.longitude && import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
            <div className="mb-8 bg-[#5C088F] rounded-lg p-6 text-white">
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
