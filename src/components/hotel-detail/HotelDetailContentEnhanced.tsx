import React, { useState, useEffect } from "react";
import { HotelDetailProps } from "@/types/hotel/detail";
import { HotelHeader } from "./HotelDetailContent/HotelHeader";
import { HotelGallery } from "./HotelGallery";
import { HotelAvailableMonths } from "./HotelAvailableMonths";
import { HotelReviews } from "./HotelReviews";
import { HotelDescriptionSection } from "./HotelDescription";
import { HotelFeaturesInfo } from "./HotelFeaturesInfo";
import { HotelAmenitiesSection } from "./HotelAmenitiesSection";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Share2, MapPin, Star, Sparkles } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContentEnhanced({ hotel, isLoading }: HotelDetailContentProps) {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [bookingStage, setBookingStage] = useState<'initial' | 'processing' | 'success'>('initial');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookingHovered, setIsBookingHovered] = useState(false);

  // Enhanced loading with skeleton
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 animate-pulse" style={{ animationDelay: `${i * 200}ms` }}>
                <div className="space-y-4">
                  <div className="h-6 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2"></div>
                  <div className="h-32 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 animate-pulse">
              <div className="space-y-6">
                <div className="h-12 bg-white/10 rounded w-2/3 mx-auto"></div>
                <div className="h-20 bg-white/10 rounded"></div>
                <div className="h-12 bg-white/10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Staggered section reveal
  useEffect(() => {
    if (!isLoading && hotel) {
      const sections = [0, 1, 2, 3, 4, 5];
      sections.forEach((section, index) => {
        setTimeout(() => {
          setVisibleSections(prev => [...prev, section]);
        }, index * 150);
      });
    }
  }, [isLoading, hotel]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const handleBooking = () => {
    setBookingStage('processing');
    setTimeout(() => {
      setBookingStage('success');
      setTimeout(() => setBookingStage('initial'), 2000);
    }, 1500);
  };

  const sectionVariants = (index: number) => ({
    opacity: visibleSections.includes(index) ? 1 : 0,
    transform: visibleSections.includes(index) ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.6s ease-out',
    transitionDelay: `${index * 100}ms`
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] relative">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-fuchsia-400 to-purple-400 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="container mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Header */}
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              style={sectionVariants(0)}
            >
              <div className="relative">
                {/* Floating action buttons */}
                <div className="absolute top-0 right-0 flex gap-2">
                  <Button size="sm" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <HotelHeader hotel={hotel} />
              </div>
            </div>

            {/* Hotel Gallery */}
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:shadow-2xl transition-all duration-500 group"
              style={sectionVariants(1)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <HotelGallery 
                  images={hotel.hotel_images?.map(img => img.image_url) || []} 
                  hotelName={hotel.name}
                />
              </div>
            </div>

            {/* Hotel Description */}
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-white/30 transition-all duration-300"
              style={sectionVariants(2)}
            >
              <HotelDescriptionSection
                description={hotel.description}
                idealGuests={hotel.ideal_guests}
                atmosphere={hotel.atmosphere}
                perfectLocation={hotel.perfect_location}
              />
            </div>

            {/* Hotel Features */}
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:scale-[1.01] transition-all duration-300"
              style={sectionVariants(3)}
            >
              <HotelFeaturesInfo
                hotelFeatures={hotel.hotelFeatures || []}
                roomFeatures={hotel.roomFeatures || []}
              />
            </div>

            {/* Hotel Amenities */}
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              style={sectionVariants(4)}
            >
              <HotelAmenitiesSection
                bankingInfo={hotel.banking_info}
                laundryService={hotel.laundry_service}
                additionalAmenities={hotel.additional_amenities}
                specialFeatures={hotel.special_features}
                accessibilityFeatures={hotel.accessibility_features}
                checkInInstructions={hotel.check_in_instructions}
                localRecommendations={hotel.local_recommendations}
                houseRules={hotel.house_rules}
                cancellationPolicy={hotel.cancellation_policy}
              />
            </div>

            {/* Hotel Reviews */}
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-500"
              style={sectionVariants(5)}
            >
              <HotelReviews hotelId={hotel.id} averageRating={hotel.average_rating} />
            </div>
          </div>

          {/* Right Column - Enhanced Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 sticky top-8 hover:bg-white/15 transition-all duration-300 group">
              <div className="space-y-6">
                {/* Enhanced Price Display */}
                <div className="text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                      ${hotel.price_per_month}
                    </div>
                    <div className="text-white/70">per month</div>
                  </div>
                </div>

                {/* Enhanced Available Months */}
                <div className="transform transition-all duration-300 hover:scale-105">
                  <HotelAvailableMonths months={hotel.available_months || []} />
                </div>

                {/* Enhanced Booking Button */}
                <Button 
                  onClick={handleBooking}
                  onMouseEnter={() => setIsBookingHovered(true)}
                  onMouseLeave={() => setIsBookingHovered(false)}
                  disabled={bookingStage === 'processing'}
                  className={`
                    w-full text-white transition-all duration-300 relative overflow-hidden
                    ${bookingStage === 'success' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-fuchsia-600 hover:bg-fuchsia-700'
                    }
                    ${isBookingHovered ? 'scale-105 shadow-lg' : 'scale-100'}
                  `}
                >
                  {/* Animated background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-transform duration-1000 ${isBookingHovered ? 'translate-x-full' : '-translate-x-full'}`} />
                  
                  <div className="relative flex items-center justify-center gap-2">
                    {bookingStage === 'processing' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : bookingStage === 'success' ? (
                      <>
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                        </div>
                        Booking Confirmed!
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        Book Now
                      </>
                    )}
                  </div>
                </Button>

                {/* Enhanced Hotel Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer">
                    <div className="text-lg font-semibold text-white flex items-center justify-center gap-1">
                      {hotel.category ? (
                        Array.from({ length: hotel.category }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))
                      ) : "N/A"}
                    </div>
                    <div className="text-sm text-white/70 group-hover:text-white transition-colors">Rating</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer">
                    <div className="text-lg font-semibold text-white">
                      {hotel.average_rating ? hotel.average_rating.toFixed(1) : "N/A"}
                    </div>
                    <div className="text-sm text-white/70 group-hover:text-white transition-colors">Reviews</div>
                  </div>
                </div>

                {/* Quick Info Pills */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/80 bg-white/5 rounded-full px-3 py-1 hover:bg-white/10 transition-colors">
                    <MapPin className="w-3 h-3" />
                    <span>{hotel.city}, {hotel.country}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating scroll hint */}
      {scrollProgress < 10 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 animate-bounce">
          <span className="text-sm">Scroll to explore</span>
        </div>
      )}
    </div>
  );
}