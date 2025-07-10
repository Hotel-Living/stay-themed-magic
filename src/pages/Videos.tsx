
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelVideoPlayer } from "@/components/hotels/HotelVideoPlayer";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { useTranslation } from "@/hooks/useTranslation";

export default function Videos() {
  const { t } = useTranslation('content');

  return (
    <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-8">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="glass-card rounded-2xl p-6 mb-8 bg-[#6a1d72]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Video - For Clients */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-fuchsia-200 text-center">
                  {t('videosContent.clientVideoTitle')}
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/YOj4GGBdhEk" 
                    frameBorder="0" 
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </div>
              
              {/* Right Video - For Hotels */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-fuchsia-200 text-center">
                  {t('videosContent.hotelVideoTitle')}
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/bkFCQ0KPSPE" 
                    frameBorder="0" 
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
