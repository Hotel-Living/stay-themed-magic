
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
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-fuchsia-200">
                  {t('videosContent.featuredTitle')}
                </h3>
                <HotelVideoPlayer />
                <p className="text-sm text-fuchsia-100/80 italic text-center mt-2">
                  {t('videosContent.featuredDescription')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="glass-card rounded-xl p-4 bg-[#5d0478]">
                  <h3 className="text-lg font-medium text-fuchsia-200 mb-3">
                    {t('videosContent.comingSoonOwnerStories')}
                  </h3>
                  <div className="aspect-video rounded-lg bg-[#460F54]/50 flex items-center justify-center">
                    <p className="text-fuchsia-300">
                      {t('videosContent.availableJune')}
                    </p>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-4 bg-[#5d0478]">
                  <h3 className="text-lg font-medium text-fuchsia-200 mb-3">
                    {t('videosContent.comingSoonGuestExperiences')}
                  </h3>
                  <div className="aspect-video rounded-lg bg-[#460F54]/50 flex items-center justify-center">
                    <p className="text-fuchsia-300">
                      {t('videosContent.availableJuly')}
                    </p>
                  </div>
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
