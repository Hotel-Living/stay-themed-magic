import React, { useState, useEffect } from "react";
import { HotelDetailProps } from "@/types/hotel/detail";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Heart, Share2, MapPin, Star, Sparkles, Users, Wifi, Car, Coffee, Utensils, Clock, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslationWithFallback } from "@/hooks/useTranslationWithFallback";

interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContentEnhanced({ hotel, isLoading }: HotelDetailContentProps) {
  const { t } = useTranslationWithFallback('hotel');
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  // Staggered animation
  useEffect(() => {
    if (!isLoading && hotel) {
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((section, index) => {
        setTimeout(() => {
          setVisibleSections(prev => [...prev, section]);
        }, index * 150);
      });
    }
  }, [isLoading, hotel]);

  // Enhanced loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-purple-900/30 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="space-y-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-purple-800/30 backdrop-blur-sm rounded-2xl p-8 animate-pulse shadow-lg border border-purple-600/20">
                <div className="h-8 bg-purple-400/30 rounded-lg w-3/4 mb-4"></div>
                <div className="h-64 bg-purple-400/20 rounded-xl mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-purple-400/30 rounded w-full"></div>
                  <div className="h-4 bg-purple-400/30 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) return null;

  const sectionClass = (index: number) => `
    transform transition-all duration-700 ease-out
    ${visibleSections.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
  `;

  // Helper functions for dynamic content
  const getMainImage = () => {
    if (hotel.hotel_images?.length > 0) {
      return hotel.hotel_images[0].image_url;
    }
    return hotel.main_image_url || '/placeholder.svg';
  };

  const formatPropertyTypeStayText = () => {
    const propertyType = hotel.property_type || t('detail.hotel');
    const style = hotel.style || '';
    const stayLengths = hotel.stay_lengths || [];
    const mealPlans = hotel.meal_plans || [];
    const hasLaundryIncluded = hotel.laundry_service?.available || false;
    
    const lines = [];
    
    // First line
    let firstLine = `Este ${propertyType.toLowerCase()}`;
    if (style) {
      firstLine += ` es de estilo ${style.toLowerCase()}`;
    }
    lines.push(firstLine);
    
    // Second line
    if (stayLengths.length > 0) {
      const lengthsText = stayLengths.join(', ').replace(/, ([^,]*)$/, ' y $1');
      lines.push(`ofrece estancias de ${lengthsText} días`);
    }
    
    // Third line
    if (mealPlans.length > 0 && !mealPlans.some(plan => plan.toLowerCase().includes('solo alojamiento') || plan.toLowerCase().includes('accommodation only'))) {
      lines.push(`con ${mealPlans[0].toLowerCase()}`);
    } else {
      lines.push('con alojamiento');
    }
    
    // Fourth line
    if (hasLaundryIncluded) {
      lines.push('y servicio de lavandería incluido');
    } else {
      lines.push('y servicio de lavandería disponible');
    }
    
    return lines;
  };

  const formatAffinitiesActivitiesText = () => {
    const affinities = hotel.hotel_themes?.map(theme => theme.themes.name) || [];
    // Note: Activities would come from hotel_activities relation
    const activities = []; // This would be populated from the actual activities data
    
    if (affinities.length === 0 && activities.length === 0) return null;
    
    let text = 'Es ideal para aquellos a quienes les gusta ';
    
    if (affinities.length > 0) {
      text += affinities.join(', ').replace(/, ([^,]*)$/, ' y $1');
    }
    
    if (activities.length > 0) {
      if (affinities.length > 0) {
        text += ' y disfrutan de ';
      } else {
        text = 'Es ideal para aquellos que disfrutan de ';
      }
      text += activities.join(', ').replace(/, ([^,]*)$/, ' y $1');
    }
    
    return text + '.';
  };

  const getProportionalPriceText = () => {
    if (hotel.price_per_month && typeof hotel.price_per_month === 'number') {
      return `El precio mensual proporcional es de USD ${hotel.price_per_month.toLocaleString()}.`;
    }
    return null;
  };

  const getSelectedFeatures = (features: Record<string, boolean> | undefined) => {
    if (!features) return [];
    return Object.entries(features)
      .filter(([_, isSelected]) => isSelected)
      .map(([feature]) => feature.replace(/_/g, ' '));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-purple-900/30 relative">
      {/* Blue glow background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(147,51,234,0.1),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.1),transparent_40%)]" />
      
      <div className="container mx-auto px-4 py-8 relative z-10 space-y-6">
        
        {/* 1️⃣ IMAGE - Main hotel photo at top */}
        <div className={`${sectionClass(0)}`}>
          <div className="relative h-[50vh] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={getMainImage()}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* 2️⃣ THREE-COLUMN LAYOUT: Text block | Hotel name & address | Price */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 ${sectionClass(1)}`}>
          {/* Left: Property type, style, duration and services text */}
          <div className="bg-[#6C1395] backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_rgba(59,130,246,0.25)] border border-blue-400/20" style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)'}}>
            <div className="text-left space-y-1">
              {formatPropertyTypeStayText().map((line, index) => (
                <div key={index} className="text-sm text-white leading-relaxed">
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Center: Hotel name and address */}
          <div className="bg-[#6C1395] backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_rgba(59,130,246,0.25)] border border-blue-400/20" style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)'}}>
            <div className="text-center space-y-2">
              <h1 className="text-xl font-bold text-white drop-shadow-lg">
                {hotel.name}
              </h1>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <MapPin className="w-3 h-3" />
                <span className="text-sm">{hotel.address}, {hotel.city}, {hotel.country}</span>
              </div>
              {hotel.category && (
                <div className="flex items-center justify-center gap-1">
                  {Array.from({ length: hotel.category }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Proportional monthly price */}
          {getProportionalPriceText() && (
            <div className="bg-[#6C1395] backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_rgba(59,130,246,0.25)] border border-blue-400/20" style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)'}}>
              <p className="text-sm text-white leading-relaxed text-center font-semibold">
                {getProportionalPriceText()}
              </p>
            </div>
          )}
        </div>

        {/* 3️⃣ THREE-COLUMN LAYOUT: Hotel Features | Google Map | Room Features */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 ${sectionClass(2)}`}>
          {/* Left: Hotel Features */}
          {getSelectedFeatures(hotel.features_hotel).length > 0 && (
            <div className="bg-[#6C1395] backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_rgba(59,130,246,0.25)] border border-blue-400/20" style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)'}}>
              <h3 className="text-base font-bold text-white mb-3 text-center">
                Amenidades del Hotel
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {getSelectedFeatures(hotel.features_hotel).slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                    <span className="capitalize text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Center: Google Map */}
          {hotel.address && (
            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_25px_rgba(59,130,246,0.25)] border border-blue-400/20" style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)'}}>
              <h2 className="text-base font-bold text-gray-800 mb-3 text-center">Ubicación</h2>
              <div className="bg-gray-200 rounded-xl h-32 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Mapa de Google</p>
                  <p className="text-sm">{hotel.city}, {hotel.country}</p>
                </div>
              </div>
            </div>
          )}

          {/* Right: Room Features */}
          {getSelectedFeatures(hotel.features_room).length > 0 && (
            <div className="bg-[#6C1395] backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_rgba(59,130,246,0.25)] border border-blue-400/20" style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)'}}>
              <h3 className="text-base font-bold text-white mb-3 text-center">
                Amenidades de la Habitación
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {getSelectedFeatures(hotel.features_room).slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                    <span className="capitalize text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4️⃣ THREE DESCRIPTION BOXES */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${sectionClass(3)}`}>
          {hotel.ideal_guests && (
            <div className="bg-[#6C1395] backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_rgba(59,130,246,0.25)] border border-blue-400/20" style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)'}}>
              <h3 className="text-sm font-semibold text-purple-200 mb-2">
                Ideal para huéspedes que...
              </h3>
              <p className="text-sm text-white leading-relaxed">{hotel.ideal_guests}</p>
            </div>
          )}
          
          {hotel.atmosphere && (
            <div className="bg-[#6C1395] backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_rgba(59,130,246,0.25)] border border-blue-400/20" style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)'}}>
              <h3 className="text-sm font-semibold text-purple-200 mb-2">
                El ambiente es...
              </h3>
              <p className="text-sm text-white leading-relaxed">{hotel.atmosphere}</p>
            </div>
          )}
          
          {hotel.perfect_location && (
            <div className="bg-[#6C1395] backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_rgba(59,130,246,0.25)] border border-blue-400/20" style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)'}}>
              <h3 className="text-sm font-semibold text-purple-200 mb-2">
                Nuestra ubicación es perfecta para...
              </h3>
              <p className="text-sm text-white leading-relaxed">{hotel.perfect_location}</p>
            </div>
          )}
        </div>

        {/* 5️⃣ ABOUT OUR HOTEL DESCRIPTION */}
        {hotel.description && (
          <div className={`bg-[#6C1395] backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_rgba(59,130,246,0.25)] border border-blue-400/20 ${sectionClass(4)}`} style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)'}}>
            <h2 className="text-base font-bold text-white mb-3 text-center">
              Acerca de Nuestro Hotel
            </h2>
            <p className="text-sm text-white leading-relaxed">
              {hotel.description}
            </p>
          </div>
        )}

        {/* 6️⃣ AVAILABILITY PACKAGES */}
        <div className={`bg-[#6C1395] backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_rgba(59,130,246,0.25)] border border-blue-400/20 ${sectionClass(5)}`} style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)'}}>
          <h2 className="text-base font-bold text-white mb-3 text-center">Paquetes de Disponibilidad</h2>
          <div className="text-center text-white/70">
            <p className="text-sm">Los paquetes de disponibilidad aparecerán aquí cuando estén configurados.</p>
          </div>
        </div>

      </div>
    </div>
  );
}