import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { MapPin, Star, Calendar, Users, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HotelLocation } from '@/components/hotel-detail/HotelLocation';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelNotFound } from "@/components/hotel-detail/HotelNotFound";
import { useHotelDetailWithTranslations } from "@/hooks/useHotelDetailWithTranslations";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import BubbleCounter from "@/components/common/BubbleCounter";
import { HotelPageAvatar } from "@/components/avatars/HotelPageAvatar";

// Helper function to convert features to array format
const convertFeaturesToArray = (features: any): string[] => {
  if (!features) return [];
  if (Array.isArray(features)) return features;
  if (typeof features === 'object') {
    return Object.entries(features).filter(([_, value]) => value === true).map(([key, _]) => key);
  }
  return [];
};
export default function HotelDetail() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    toast
  } = useToast();
  const {
    language,
    t
  } = useTranslation('hotel');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const {
    data: hotel,
    isLoading,
    error,
    hasTranslation
  } = useHotelDetailWithTranslations(id);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      toast({
        title: "Error loading hotel",
        description: "There was a problem loading the hotel details. Please try again.",
        variant: "destructive"
      });
      console.error("Error fetching hotel data:", error);
    }
  }, [error, toast]);

  // Debug logging to verify translation is working
  useEffect(() => {
    if (hotel && language !== 'en') {
      console.log('Current language:', language);
      console.log('Has translation:', hasTranslation);
      console.log('Hotel name (possibly translated):', hotel.name);
    }
  }, [hotel, language, hasTranslation]);
  if (isLoading) {
    return <div className="min-h-screen flex flex-col bg-[#B3B3FF]">
        <Navbar />
        <BubbleCounter />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">{t('detail.loadingHotelDetails')}</div>
        </main>
        <Footer />
        <HotelPageAvatar />
      </div>;
  }
  if (!hotel) {
    return <div className="min-h-screen flex flex-col bg-[#B3B3FF]">
        <Navbar />
        <BubbleCounter />
        <main className="flex-1">
          <HotelNotFound />
        </main>
        <Footer />
        <HotelPageAvatar />
      </div>;
  }

  // Convert features to arrays
  const hotelFeaturesArray = convertFeaturesToArray(hotel.hotelFeatures || hotel.features_hotel);
  const roomFeaturesArray = convertFeaturesToArray(hotel.roomFeatures || hotel.features_room);

  // Get hotel images
  const hotelImages = hotel.hotel_images && hotel.hotel_images.length > 0 ? hotel.hotel_images.map(img => img.image_url) : ['https://images.unsplash.com/photo-1721322800607-8c38375eef04'];

  // Generate availability packages from hotel data
  const availabilityPackages = hotel.stay_lengths?.map((duration, index) => ({
    startDate: new Date(Date.now() + index * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + (index * 7 + duration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    duration: duration,
    available: Math.floor(Math.random() * 5) + 1
  })) || [];
  const renderStars = (count: number) => {
    return Array.from({
      length: count
    }, (_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
  };
  const renderTag = (tag: string, type: string) => <span key={tag} className={`px-3 py-1 rounded-full text-sm font-medium ${type === 'affinity' ? 'bg-purple-900/30 text-purple-300 border border-purple-600/50' : 'bg-blue-900/30 text-blue-300 border border-blue-600/50'}`}>
      {tag}
    </span>;
  const handlePackageClick = (pkg: any) => {
    setSelectedPackage(selectedPackage?.startDate === pkg.startDate ? null : pkg);
  };
  return <div className="min-h-screen flex flex-col bg-[#B3B3FF]">
      <Navbar />
      <BubbleCounter />
      
      <main className="flex-1">
        <div style={{
        backgroundImage: `radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)`,
        backgroundSize: '50px 50px, 30px 30px',
        backgroundPosition: '0 0, 25px 25px',
        backgroundColor: '#996515'
      }} className="min-h-screen relative overflow-hidden">
          
          <div className="relative z-10 container mx-auto px-4 py-8 space-y-8 bg-[#5a067e]">
            
            {/* Top Section */}
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold text-white glow-text">
                  {hotel.name}
                </h1>
                {/* Star Rating - Hotel Classification */}
                {hotel.category && <div className="flex justify-center items-center space-x-2">
                    {renderStars(hotel.category)}
                  </div>}
                
                {/* Property Type + Property Style */}
                {(hotel.property_type || hotel.style) && <div className="text-white text-xl font-semibold">
                    {t('detail.propertyTypeStyle', { type: (hotel.property_type || 'HOTEL').toUpperCase(), style: (hotel.style || 'CLÁSICO').toUpperCase() })}
                  </div>}
              </div>
              
              {/* Address Block */}
              <div className="flex items-center justify-center space-x-2 text-purple-200">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">
                  {hotel.address && `${hotel.address}, `}{hotel.city}, {hotel.country}
                </span>
              </div>

              {/* Client Affinities */}
              {hotel.hotel_themes && hotel.hotel_themes.length > 0 && <div className="text-xl font-semibold text-yellow-300">
                  {t('detail.affinitiesText')} {hotel.hotel_themes.map(theme => theme.themes.name).join(', ').replace(/, ([^,]*)$/, ` ${t('detail.and')} $1`)}.
                </div>}

              {/* Activities */}
              {hotel.activities && hotel.activities.length > 0 && <div className="text-xl font-semibold text-yellow-300">
                  {t('detail.activitiesText')} {hotel.activities.join(', ').replace(/, ([^,]*)$/, ` ${t('detail.and')} $1`)}.
                </div>}

              {/* Meal Plans */}
              {hotel.meal_plans && hotel.meal_plans.length > 0}
            </div>

            {/* Stay Duration and Pricing */}
            {(hotel.stay_lengths || hotel.price_per_month) && <div className="space-y-2 text-purple-100 max-w-4xl mx-auto text-center">
                {hotel.stay_lengths && (() => {
                  const validLengths = hotel.stay_lengths.filter(length => [8, 15, 22, 29].includes(length));
                  if (validLengths.length > 0) {
                    if (validLengths.length === 1) {
                      return <p className="text-lg">
                        {t('detail.hotelOffersStays')} {validLengths[0] === 29 ? t('detail.monthlyStays') : `${validLengths[0]} ${t('detail.days')}`}.
                      </p>;
                    } else {
                      const formattedLengths = validLengths.join(', ').replace(/,([^,]*)$/, ` ${t('detail.and')}$1`);
                      return <p className="text-lg">
                        {t('detail.hotelOffersStays')} {formattedLengths} {t('detail.days')}.
                      </p>;
                    }
                  }
                  return null;
                })()}
                 {hotel.price_per_month && <p className="text-xl font-semibold text-yellow-300">
                    {t('detail.proportionalPrice')} USD ${hotel.price_per_month}.
                  </p>}
              </div>}

            {/* Visual Block */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Photo Carousel */}
              <Card className="p-6 bg-purple-900/30 border-purple-700/50 glow-border">
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img src={hotelImages[currentImageIndex]} alt={`${hotel.name} - Image ${currentImageIndex + 1}`} className="w-full h-full object-cover" />
                  </div>
                  {hotelImages.length > 1 && <div className="flex space-x-2 justify-center">
                      {hotelImages.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-purple-400' : 'bg-purple-700'}`} />)}
                    </div>}
                </div>
              </Card>

              {/* Google Map */}
              <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg overflow-hidden glow-border">
                <HotelLocation hotelId={hotel.id} latitude={Number(hotel.latitude)} longitude={Number(hotel.longitude)} hotelName={hotel.name} address={hotel.address || ""} city={hotel.city || ""} country={hotel.country || ""} />
              </div>
            </div>

            {/* Descriptive Section */}
            {(hotel.description || hotel.ideal_guests || hotel.atmosphere || hotel.perfect_location) && <Card className="p-8 bg-purple-900/30 border-purple-700/50 glow-border">
                <div className="space-y-6">
                  {hotel.description && <div>
                      <h2 className="text-2xl font-bold text-white mb-4 glow-text">{t('detail.aboutOurHotel')}</h2>
                      <p className="text-purple-100 text-lg leading-relaxed">{hotel.description}</p>
                    </div>}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {hotel.ideal_guests && <div>
                        <h3 className="text-xl font-semibold text-purple-300 mb-3">{t('detail.idealForGuests')}</h3>
                        <p className="text-purple-100">{hotel.ideal_guests}</p>
                      </div>}
                    
                    {hotel.atmosphere && <div>
                        <h3 className="text-xl font-semibold text-purple-300 mb-3">{t('detail.atmosphere')}</h3>
                        <p className="text-purple-100">{hotel.atmosphere}</p>
                      </div>}
                    
                    {hotel.perfect_location && <div>
                        <h3 className="text-xl font-semibold text-purple-300 mb-3">{t('detail.locationPerfectFor')}</h3>
                        <p className="text-purple-100">{hotel.perfect_location}</p>
                      </div>}
                  </div>
                </div>
              </Card>}

            {/* Availability Calendar Section */}
            {availabilityPackages.length > 0 && <Card className="p-8 bg-purple-900/30 border-purple-700/50 glow-border">
                <h2 className="text-2xl font-bold text-white mb-6 glow-text text-center">{t('detail.availabilityPricing')}</h2>
                
                {/* Duration Display */}
                {availabilityPackages[0] && <div className="mb-4 text-center">
                    <p className="text-white text-xl font-semibold">
                      {availabilityPackages[0].duration} {t('detail.days')}
                    </p>
                  </div>}
                
                {/* Meal Plan Display */}
                {hotel.meal_plans && hotel.meal_plans.length > 0 && <div className="mb-6 text-center">
                    <p className="text-white text-xl font-semibold">
                      {t('detail.mealPlanIncluded')}: {hotel.meal_plans.join(', ')}
                    </p>
                  </div>}
                
                {/* Pricing per person for room types */}
                {hotel.price_per_month && <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="text-center bg-purple-800/30 p-4 rounded-lg">
                      <p className="text-white text-lg font-semibold mb-2">{t('detail.doubleRoom')}</p>
                      <p className="text-yellow-300 text-xl font-bold">
                        USD ${Math.round(hotel.price_per_month / 30)} {t('detail.perPerson')}
                      </p>
                    </div>
                    <div className="text-center bg-purple-800/30 p-4 rounded-lg">
                      <p className="text-white text-lg font-semibold mb-2">{t('detail.singleRoom')}</p>
                      <p className="text-yellow-300 text-xl font-bold">
                        USD ${Math.round(hotel.price_per_month / 30 * 1.2)} {t('detail.perPerson')}
                      </p>
                    </div>
                  </div>}
                
                {/* Available Dates Display */}
                <div className="mb-6 text-center">
                  <p className="text-white text-xl font-semibold">
                    {t('detail.availableDates')}: {availabilityPackages.filter(pkg => pkg.startDate && pkg.endDate) // Filter out packages with invalid dates
                .map(pkg => {
                  const startDate = new Date(pkg.startDate);
                  const endDate = new Date(pkg.endDate);
                  // Check if dates are valid before formatting
                  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    return null;
                  }
                  return `${format(startDate, 'MM/dd/yyyy')} - ${format(endDate, 'MM/dd/yyyy')}`;
                }).filter(Boolean) // Remove null values
                .join(', ') || 'No valid dates available'}
                  </p>
                </div>
                
                <div className="space-y-6">
                  {/* Calendar visualization */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {availabilityPackages.map((pkg, index) => <div key={index} className={`p-4 rounded-lg cursor-pointer transition-all ${selectedPackage?.startDate === pkg.startDate ? 'bg-purple-600/50 border-2 border-purple-400' : 'bg-purple-800/30 border border-purple-600/50 hover:bg-purple-700/40'}`} onClick={() => handlePackageClick(pkg)}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-5 h-5 text-purple-300" />
                          <span className="text-white font-medium">{pkg.duration} {t('detail.days')}</span>
                        </div>
                        <p className="text-purple-200 text-sm">
                          {new Date(pkg.startDate).toLocaleDateString()} - {new Date(pkg.endDate).toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Users className="w-4 h-4 text-purple-300" />
                          <span className="text-purple-200 text-sm">{pkg.available} {t('detail.roomsLeft')}</span>
                        </div>
                      </div>)}
                  </div>

                  {/* Selected Package Details */}
                  {selectedPackage && hotel.price_per_month && <Card className="p-6 bg-purple-800/40 border-purple-600/50">
                      <h3 className="text-xl font-bold text-white mb-4">{t('detail.packageDetails')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-purple-200 mb-2">
                            <strong>{t('detail.dates')}:</strong> {new Date(selectedPackage.startDate).toLocaleDateString()} - {new Date(selectedPackage.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-purple-200 mb-2">
                            <strong>{t('detail.duration')}:</strong> {selectedPackage.duration} {t('detail.days')}
                          </p>
                          <p className="text-purple-200 mb-2">
                            <strong>{t('detail.availability')}:</strong> {selectedPackage.available} {t('detail.roomsRemaining')}
                          </p>
                          {hotel.meal_plans && hotel.meal_plans.length > 0 && <div className="mb-4">
                              <p className="text-purple-200 mb-2">
                                <strong>{t('detail.availableMealPlans')}:</strong>
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {hotel.meal_plans.map(plan => <span key={plan} className="px-2 py-1 bg-purple-600/50 text-purple-100 rounded text-xs">
                                    {plan.toUpperCase()}
                                  </span>)}
                              </div>
                            </div>}
                           <div className="text-yellow-300 font-semibold">
                             <p>{t('detail.doubleOccupancy')}: {hotel.currency || '€'}{Math.round(hotel.price_per_month * (selectedPackage.duration / 30))}</p>
                             <p>{t('detail.singleOccupancy')}: {hotel.currency || '€'}{Math.round(hotel.price_per_month * (selectedPackage.duration / 30) * 0.8)}</p>
                           </div>
                        </div>
                        <div className="space-y-3">
                          <div className="p-4 bg-yellow-900/30 rounded-lg border border-yellow-600/50">
                            <p className="text-yellow-200 text-sm">
                              <strong>{t('detail.dynamicPricing')}</strong> – {t('detail.dynamicPricingText')}
                            </p>
                          </div>
                          {selectedPackage.available <= 2 && <div className="p-3 bg-red-900/30 rounded-lg border border-red-600/50">
                              <p className="text-red-200 text-sm font-medium">
                                ⚠️ {t('detail.onlyRoomsLeft', { count: selectedPackage.available })}
                              </p>
                            </div>}
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                            {t('detail.reserveNow')}
                          </Button>
                        </div>
                      </div>
                    </Card>}
                </div>
              </Card>}

            {/* Hotel Features Section */}
            {(roomFeaturesArray.length > 0 || hotelFeaturesArray.length > 0) && <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Room Features */}
                {roomFeaturesArray.length > 0 && <Card className="p-6 bg-purple-900/30 border-purple-700/50 glow-border">
                    <h3 className="text-xl font-bold text-white mb-4 glow-text">{t('detail.roomFeatures')}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {roomFeaturesArray.map(feature => <div key={feature} className="flex items-center space-x-2">
                          <Wifi className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-100 text-sm">{feature}</span>
                        </div>)}
                    </div>
                  </Card>}

                {/* Hotel Features */}
                {hotelFeaturesArray.length > 0 && <Card className="p-6 bg-purple-900/30 border-purple-700/50 glow-border">
                    <h3 className="text-xl font-bold text-white mb-4 glow-text">{t('detail.hotelFeatures')}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {hotelFeaturesArray.map(feature => <div key={feature} className="flex items-center space-x-2">
                          <Coffee className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-100 text-sm">{feature}</span>
                        </div>)}
                    </div>
                  </Card>}
              </div>}

            {/* Reviews Placeholder */}
            <Card className="p-8 bg-purple-900/30 border-purple-700/50 glow-border">
              <h2 className="text-2xl font-bold text-white mb-6 glow-text">{t('detail.guestReviews')}</h2>
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-200 text-lg">{t('detail.guestReviewsPlaceholder')}</p>
                <p className="text-purple-300 text-sm mt-2">{t('detail.beFirstToShare')}</p>
              </div>
            </Card>

          </div>
        </div>
      </main>
      
      <Footer />
      <HotelPageAvatar />
    </div>;
}