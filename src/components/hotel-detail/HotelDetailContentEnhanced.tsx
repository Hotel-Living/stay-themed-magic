import React, { useState, useEffect } from "react";
import { HotelDetailProps } from "@/types/hotel/detail";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Heart, Share2, MapPin, Star, Sparkles, Users, Wifi, Car, Coffee, Utensils, Clock, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContentEnhanced({ hotel, isLoading }: HotelDetailContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [bookingStage, setBookingStage] = useState<'initial' | 'processing' | 'success'>('initial');
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  // Generate realistic availability packages
  const availabilityPackages = [
    {
      id: "package-1",
      duration: "7 nights",
      startDate: "2024-03-15",
      endDate: "2024-03-22", 
      price: 980,
      available: 3,
      popular: false
    },
    {
      id: "package-2", 
      duration: "14 nights",
      startDate: "2024-03-20",
      endDate: "2024-04-03",
      price: 1850,
      available: 2,
      popular: true
    },
    {
      id: "package-3",
      duration: "30 days",
      startDate: "2024-04-01", 
      endDate: "2024-05-01",
      price: 3900,
      available: 1,
      popular: false
    }
  ];

  // Staggered animation
  useEffect(() => {
    if (!isLoading) {
      [0, 1, 2, 3, 4, 5].forEach((section, index) => {
        setTimeout(() => {
          setVisibleSections(prev => [...prev, section]);
        }, index * 200);
      });
    }
  }, [isLoading]);

  // Enhanced loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main content skeleton */}
            <div className="lg:col-span-8 space-y-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 animate-pulse">
                  <div className="h-8 bg-white/10 rounded-lg w-3/4 mb-4"></div>
                  <div className="h-64 bg-white/10 rounded-xl mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-white/10 rounded w-full"></div>
                    <div className="h-4 bg-white/10 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
            {/* Sidebar skeleton */}
            <div className="lg:col-span-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 animate-pulse sticky top-8">
                <div className="h-12 bg-white/10 rounded-lg mb-6"></div>
                <div className="h-32 bg-white/10 rounded-lg mb-6"></div>
                <div className="h-12 bg-white/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === hotel.hotel_images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? hotel.hotel_images.length - 1 : prev - 1
    );
  };

  const handleBooking = () => {
    setBookingStage('processing');
    setTimeout(() => {
      setBookingStage('success');
      setTimeout(() => setBookingStage('initial'), 3000);
    }, 2000);
  };

  const sectionClass = (index: number) => `
    transform transition-all duration-700 ease-out
    ${visibleSections.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Hero Section */}
      <div className={`relative ${sectionClass(0)}`}>
        <div className="h-[70vh] relative overflow-hidden">
          {/* Image Gallery */}
          <div className="absolute inset-0">
            <img 
              src={hotel.hotel_images[currentImageIndex]?.image_url}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>

          {/* Navigation arrows */}
          {hotel.hotel_images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Image dots */}
          {hotel.hotel_images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {hotel.hotel_images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Hotel Header Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h1 className="text-4xl lg:text-6xl font-bold text-white">
                      {hotel.name}
                    </h1>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-white/90">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: hotel.category }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">{hotel.address}, {hotel.city}, {hotel.country}</span>
                    </div>
                  </div>

                  {/* Hotel themes */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {hotel.hotel_themes?.map((theme, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-purple-600/30 backdrop-blur-sm text-purple-200 rounded-full text-sm border border-purple-400/30"
                      >
                        {theme.themes.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                    ${hotel.price_per_month.toLocaleString()}
                  </div>
                  <div className="text-white/70 text-lg">per month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Description Section */}
            <Card className={`bg-white/5 backdrop-blur-sm border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-500 ${sectionClass(1)}`}>
              <h2 className="text-3xl font-bold text-white mb-6">About The Aurora Palace</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  {hotel.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-purple-300">Perfect For</h3>
                    <p className="text-gray-300">{hotel.ideal_guests}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-purple-300">Atmosphere</h3>
                    <p className="text-gray-300">{hotel.atmosphere}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-purple-300">Location</h3>
                    <p className="text-gray-300">{hotel.perfect_location}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Availability Packages */}
            <Card className={`bg-white/5 backdrop-blur-sm border-white/10 p-8 rounded-2xl ${sectionClass(2)}`}>
              <h2 className="text-3xl font-bold text-white mb-8">Availability & Packages</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {availabilityPackages.map((pkg, index) => (
                  <div 
                    key={pkg.id}
                    className={`
                      relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 group
                      ${selectedPackage?.id === pkg.id 
                        ? 'border-purple-400 bg-purple-600/20' 
                        : 'border-white/20 bg-white/5 hover:border-purple-400/50 hover:bg-white/10'
                      }
                      ${pkg.popular ? 'ring-2 ring-yellow-400/50' : ''}
                    `}
                    onClick={() => setSelectedPackage(selectedPackage?.id === pkg.id ? null : pkg)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center space-y-4">
                      <div className="text-2xl font-bold text-white">{pkg.duration}</div>
                      <div className="text-gray-300">
                        {new Date(pkg.startDate).toLocaleDateString()} - {new Date(pkg.endDate).toLocaleDateString()}
                      </div>
                      <div className="text-3xl font-bold text-purple-300">${pkg.price}</div>
                      <div className="flex items-center justify-center gap-2 text-green-400">
                        <Users className="w-4 h-4" />
                        <span>{pkg.available} rooms left</span>
                      </div>
                      {selectedPackage?.id === pkg.id && (
                        <div className="mt-4 p-3 bg-purple-600/30 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                          <p className="text-sm text-green-400">Package Selected</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedPackage && (
                <div className="mt-8 p-6 bg-purple-600/20 rounded-xl border border-purple-400/30">
                  <h3 className="text-xl font-semibold text-white mb-4">Package Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Duration:</span>
                        <span className="text-white font-semibold">{selectedPackage.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Check-in:</span>
                        <span className="text-white font-semibold">{new Date(selectedPackage.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Check-out:</span>
                        <span className="text-white font-semibold">{new Date(selectedPackage.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Price:</span>
                        <span className="text-white font-bold text-xl">${selectedPackage.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Availability:</span>
                        <span className="text-green-400 font-semibold">{selectedPackage.available} rooms</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Features Grid */}
            <Card className={`bg-white/5 backdrop-blur-sm border-white/10 p-8 rounded-2xl ${sectionClass(3)}`}>
              <h2 className="text-3xl font-bold text-white mb-8">Amenities & Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                    <Coffee className="w-5 h-5" />
                    Hotel Features
                  </h3>
                  <ul className="space-y-3">
                    {hotel.hotelFeatures?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                    <Wifi className="w-5 h-5" />
                    Room Features
                  </h3>
                  <ul className="space-y-3">
                    {hotel.roomFeatures?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className={`bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl p-6 sticky top-8 ${sectionClass(4)}`}>
              <div className="space-y-6">
                
                {/* Available Months */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    Available Months
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {hotel.available_months?.map((month, index) => (
                      <div 
                        key={index}
                        className="bg-purple-600/30 text-purple-200 px-3 py-2 rounded-lg text-center text-sm border border-purple-400/30 hover:bg-purple-600/50 transition-colors cursor-pointer"
                      >
                        {month.slice(0, 3)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <Button 
                  onClick={handleBooking}
                  disabled={bookingStage === 'processing'}
                  className={`
                    w-full h-14 text-lg font-semibold transition-all duration-300 relative overflow-hidden
                    ${bookingStage === 'success' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700'
                    }
                    ${!selectedPackage ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {bookingStage === 'processing' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Booking...
                    </div>
                  ) : bookingStage === 'success' ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Booking Confirmed!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {selectedPackage ? 'Book Selected Package' : 'Select a Package'}
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                    <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                      {Array.from({ length: hotel.category }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Hotel Rating</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                    <div className="text-2xl font-bold text-white">
                      {hotel.average_rating?.toFixed(1) || "N/A"}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Guest Reviews</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 border border-purple-400/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Need Help?</h4>
                  <p className="text-gray-300 text-sm mb-3">Our concierge team is available 24/7</p>
                  <Button variant="outline" size="sm" className="w-full border-purple-400/30 text-purple-300 hover:bg-purple-600/20">
                    Contact Concierge
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}