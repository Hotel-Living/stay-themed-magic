
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { HotelHeader } from "./HotelHeader";
import { HotelGallery } from "./HotelGallery";
import { HotelDescription } from "./HotelDescription";
import { HotelAmenities } from "./HotelAmenities";
import { HotelAvailableMonths } from "./HotelAvailableMonths";
import { HotelReviews } from "./reviews/HotelReviews";
import { BookingForm } from "@/components/BookingForm";
import { HotelDetailContentProps, HotelTheme } from "@/types/hotel";
import { useHotelDetail } from "@/hooks/useHotelDetail";
import { FavoriteButton } from "@/components/FavoriteButton";
import { RatingDisplay } from "./reviews/RatingDisplay";
import { CompareButton } from "@/components/comparison/CompareButton";

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
  
  // Add detailed rating section above the reviews
  const showDetailedRating = !isLoading && !isReviewsLoading && reviews.length > 0;
  
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to hotels
        </Link>
        
        <div className="flex items-center gap-2">
          {!isLoading && hotel?.id && (
            <>
              <CompareButton 
                hotelId={hotel.id} 
                hotelName={hotel.name} 
                variant="button" 
              />
              <FavoriteButton 
                hotelId={hotel.id} 
                variant="button" 
              />
            </>
          )}
        </div>
      </div>
      
      {/* Hotel Header */}
      <HotelHeader 
        name={hotel?.name || ''}
        stars={hotel?.category || 0}
        city={hotel?.city || ''}
        country={hotel?.country || ''}
        availableMonthsCount={hotel?.available_months?.length || 0}
        themes={hotel?.hotel_themes?.map(themeItem => themeItem.themes) || []}
        isLoading={isLoading}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Gallery */}
          <HotelGallery 
            images={hotel?.hotel_images?.length > 0 ? 
              hotel.hotel_images.map(img => img.image_url) : 
              [hotel?.main_image_url || '']} 
            hotelName={hotel?.name || ''}
            isLoading={isLoading}
          />
          
          {/* Description */}
          <HotelDescription 
            description={hotel?.description || "No description available."} 
            isLoading={isLoading}
          />
          
          {/* Detailed Rating Display */}
          {showDetailedRating && (
            <div className="glass-card rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Rating Summary</h2>
              <RatingDisplay 
                rating={hotel?.average_rating || 0} 
                reviewCount={reviews.length} 
                showDetails={true} 
              />
            </div>
          )}
          
          {/* Reviews */}
          <HotelReviews 
            hotelId={hotel?.id || ''} 
            averageRating={hotel?.average_rating || 0}
            reviews={reviews}
            onAddReview={addReview}
            isLoading={isLoading || isReviewsLoading} 
          />
          
          {/* Amenities */}
          <HotelAmenities 
            amenities={hotel?.amenities || []}
            isLoading={isLoading}
          />
          
          {/* Available months */}
          <HotelAvailableMonths 
            months={hotel?.available_months || []}
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
