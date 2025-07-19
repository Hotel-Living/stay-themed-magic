
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelVideoPlayer } from "@/components/hotels/HotelVideoPlayer";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { useTranslation } from "@/hooks/useTranslation";
import BubbleCounter from "@/components/common/BubbleCounter";

export default function Videos() {
  const { t } = useTranslation('content');

  return (
    <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      <BubbleCounter />
      
      <main className="flex-1 pt-8">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="glass-card rounded-2xl p-6 mb-8 bg-[#7E00B3]/90 shadow-[0_0_60px_rgba(0,200,255,0.8),0_0_120px_rgba(0,200,255,0.4),0_0_180px_rgba(0,200,255,0.2)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Video - For Clients */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-fuchsia-200 text-center">
                  {t('videosContent.clientVideoTitle')}
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden scale-75">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${t('videosContent.clientVideoUrl').split('/').pop()}`}
                    frameBorder="0" 
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </div>
              
              {/* Right Video - For Hotels */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-fuchsia-200 text-center">
                  {t('videosContent.hotelVideoTitle')}
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden scale-75">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${t('videosContent.hotelVideoUrl').split('/').pop()}`}
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
