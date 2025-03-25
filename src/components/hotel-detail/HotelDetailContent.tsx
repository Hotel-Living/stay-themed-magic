
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { HotelHeader } from "./HotelHeader";
import { HotelGallery } from "./HotelGallery";
import { HotelDescription } from "./HotelDescription";
import { HotelAmenities } from "./HotelAmenities";
import { HotelAvailableMonths } from "./HotelAvailableMonths";
import { HotelReviews } from "./HotelReviews";
import { BookingForm } from "@/components/BookingForm";
import { HotelDetailContentProps, HotelTheme } from "@/types/hotel";
import { useHotelDetail } from "@/hooks/useHotelDetail";

export function HotelDetailContent({ hotel, isLoading }: HotelDetailContentProps & { isLoading?: boolean }) {
  // Extract image URLs from hotel_images
  const imageUrls = hotel?.hotel_images ? 
    hotel.hotel_images.map((img) => img.image_url) : 
    [];
  
  // Extract themes from hotel_themes and map to HotelTheme type
  const themes: HotelTheme[] = hotel?.hotel_themes ? 
    hotel.hotel_themes.map((themeItem) => themeItem.themes) : 
    [];
  
  // Use dynamic data from the API instead of static data
  const availableMonths = hotel?.available_months || [];
  const amenities = hotel?.amenities || [];
  
  // Use the average rating from the API
  const averageRating = hotel?.average_rating || 0;
  
  // Use the enhanced hotel detail hook to get reviews and add review functionality
  const { useHotelReviews, addReview } = useHotelDetail(hotel?.id, false);
  const { data: reviews = [], isLoading: isReviewsLoading } = useHotelReviews(hotel?.id, !isLoading && !!hotel?.id);
  
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
        name={hotel?.name || ''}
        stars={hotel?.category || 0}
        city={hotel?.city || ''}
        country={hotel?.country || ''}
        availableMonthsCount={availableMonths.length}
        themes={themes}
        isLoading={isLoading}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Gallery */}
          <HotelGallery 
            images={imageUrls.length > 0 ? imageUrls : [hotel?.main_image_url || '']} 
            hotelName={hotel?.name || ''}
            isLoading={isLoading}
          />
          
          {/* Description */}
          <HotelDescription 
            description={hotel?.description || "No description available."} 
            isLoading={isLoading}
          />
          
          {/* Reviews */}
          <HotelReviews 
            hotelId={hotel?.id || ''} 
            averageRating={averageRating}
            reviews={reviews}
            onAddReview={addReview}
            isLoading={isLoading || isReviewsLoading} 
          />
          
          {/* Amenities */}
          <HotelAmenities 
            amenities={amenities}
            isLoading={isLoading}
          />
          
          {/* Available months */}
          <HotelAvailableMonths 
            months={availableMonths}
            isLoading={isLoading}
          />
        </div>
        
        {/* Booking Form */}
        <div className="lg:col-span-1">
          <BookingForm 
            hotelId={hotel?.id || ''} 
            hotelName={hotel?.name || ''} 
            pricePerMonth={hotel?.price_per_month || 0} 
          />
        </div>
      </div>
    </div>
  );
}
