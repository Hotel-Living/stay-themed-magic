import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HotelThemesDisplay } from "@/components/HotelThemes";
import { BookingForm } from "@/components/BookingForm";
import { hotels } from "@/utils/data";
import { ChevronLeft, Star, Calendar, MapPin, Check } from "lucide-react";

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState(hotels.find(h => h.id === id));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update hotel if id changes
    setHotel(hotels.find(h => h.id === id));
  }, [id]);
  
  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-4">
          <div className="container max-w-6xl mx-auto text-center py-20">
            <h1 className="text-3xl font-bold mb-6">Hotel not found</h1>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to hotels
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to hotels
          </Link>
          
          {/* Hotel Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              {hotel.name}
              <div className="flex items-center">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-fuchsia-400 text-fuchsia-400" />
                ))}
              </div>
            </h1>
            
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-fuchsia-400" />
                <span>{hotel.city}, {hotel.country}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-fuchsia-400" />
                <span>{hotel.availableMonths.length} available months</span>
              </div>
            </div>
            
            <HotelThemesDisplay themes={hotel.themes} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Gallery */}
              <div className="glass-card rounded-2xl overflow-hidden mb-8">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={hotel.images[activeImageIndex]} 
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {hotel.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                        index === activeImageIndex 
                          ? "ring-2 ring-fuchsia-500 opacity-100" 
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${hotel.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Description */}
              <div className="glass-card rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">About this hotel</h2>
                <p className="text-foreground/80 mb-6 whitespace-pre-line">
                  {hotel.longDescription}
                </p>
              </div>
              
              {/* Amenities */}
              <div className="glass-card rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-fuchsia-400" />
                      </span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Available months */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Available Months</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {hotel.availableMonths.map(month => (
                    <div 
                      key={month} 
                      className="text-center p-3 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20"
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </div>
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
      </main>
      
      <footer className="bg-secondary py-6 px-4 border-t border-fuchsia-900/20 mt-10">
        <div className="container max-w-6xl mx-auto text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
