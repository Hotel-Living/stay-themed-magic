import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HotelDetailProps } from "@/types/hotel";
import { HotelHeader } from "./HotelHeader";
import { HotelDescription } from "./HotelDescription";
import { HotelGallery } from "./HotelGallery";
import { HotelReviews } from "./HotelReviews";
import { HotelMainContentGrid } from "./HotelDetailContent/HotelMainContentGrid";
import { HotelAmenitiesSection } from "./HotelAmenitiesSection";
import { useDateCalculations } from "@/hooks/useDateCalculations";
import { useBookingHandler } from "@/hooks/useBookingHandler";
import { Calendar, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContent({ hotel, isLoading }: HotelDetailContentProps) {
  const { t } = useTranslation('hotels');
  const {
    checkInDate,
    setCheckInDate,
    selectedDuration,
    setSelectedDuration,
    stayDurations,
    checkInWeekday,
  } = useDateCalculations();

  const {
    preparedRates,
    handleBookClick,
    pricingMatrix,
    isHotelAvailable
  } = useBookingHandler({
    hotelId: hotel.id,
    pricePerMonth: hotel.price_per_month,
    enable_price_increase: hotel.enable_price_increase,
    price_increase_cap: hotel.price_increase_cap,
    preferredWeekday: hotel.check_in_weekday,
    availableMonths: hotel.available_months,
    stayLengths: hotel.stay_lengths,
    mealPlans: hotel.meal_plans,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hotel Header */}
      <HotelHeader
        name={hotel.name}
        stars={hotel.category || 0}
        city={hotel.city}
        country={hotel.country}
        themes={hotel.themes || []}
        isLoading={isLoading}
      />

      {/* Hotel Gallery */}
      <HotelGallery
        images={hotel.hotel_images?.map(img => img.image_url) || []}
        hotelName={hotel.name}
        isLoading={isLoading}
      />

      {/* Hotel Description */}
      <HotelDescription
        description={hotel.description || ""}
        idealGuests={hotel.ideal_guests}
        atmosphere={hotel.atmosphere}
        perfectLocation={hotel.perfect_location}
        isLoading={isLoading}
      />

      {/* New Amenities Section */}
      <HotelAmenitiesSection hotel={hotel} />

      {/* Main Content Grid */}
      <HotelMainContentGrid
        hotel={hotel}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        stayDurations={stayDurations}
        preparedRates={preparedRates}
        handleBookClick={handleBookClick}
        checkInWeekday={checkInWeekday}
        pricingMatrix={pricingMatrix}
        isHotelAvailable={isHotelAvailable}
      />

      {/* Reviews Section */}
      <HotelReviews
        hotelId={hotel.id}
        averageRating={hotel.average_rating}
        isLoading={isLoading}
      />

      {/* Laundry Service Information */}
      {hotel.laundry_service && (
        <Card className="bg-[#6000B3] border-border shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-center">
              {t('laundryService')}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <div className="space-y-4">
              {hotel.laundry_service.available && (
                <div className="flex items-center justify-center space-x-2">
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    {t('available')}
                  </Badge>
                </div>
              )}
              
              {hotel.laundry_service.self_service && (
                <div className="text-center">
                  <p className="text-sm">{t('selfServiceAvailable')}</p>
                </div>
              )}
              
              {hotel.laundry_service.full_service && (
                <div className="text-center">
                  <p className="text-sm">{t('fullServiceAvailable')}</p>
                </div>
              )}
              
              {hotel.laundry_service.external_redirect && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-[#6000B3]"
                    onClick={() => window.open(hotel.laundry_service?.external_redirect, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('laundryServiceProvider')}
                  </Button>
                </div>
              )}
              
              {hotel.laundry_service.pricing && (
                <div className="text-center">
                  <p className="text-sm font-medium">{t('pricing')}: {hotel.laundry_service.pricing}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Information */}
      {(hotel.check_in_instructions || hotel.local_recommendations || hotel.house_rules || hotel.cancellation_policy) && (
        <Card className="bg-[#6000B3] border-border shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-center">
              {t('additionalInformation')}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-4">
            {hotel.check_in_instructions && (
              <div>
                <h4 className="font-semibold mb-2">{t('checkInInstructions')}</h4>
                <p className="text-sm">{hotel.check_in_instructions}</p>
              </div>
            )}
            
            {hotel.local_recommendations && (
              <div>
                <h4 className="font-semibold mb-2">{t('localRecommendations')}</h4>
                <p className="text-sm">{hotel.local_recommendations}</p>
              </div>
            )}
            
            {hotel.house_rules && hotel.house_rules.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">{t('houseRules')}</h4>
                <ul className="text-sm space-y-1">
                  {hotel.house_rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {hotel.cancellation_policy && (
              <div>
                <h4 className="font-semibold mb-2">{t('cancellationPolicy')}</h4>
                <p className="text-sm">{hotel.cancellation_policy}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
