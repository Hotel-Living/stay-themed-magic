import { Navbar } from "@/components/Navbar";
import { useTranslation } from "@/hooks/useTranslation";
import { HotelVideoPlayer } from "@/components/hotels/HotelVideoPlayer";

export default function Press() {
  const { t } = useTranslation('press');

  return (
    <div className="min-h-screen bg-[#170B3B] relative">
      <div className="starfield absolute inset-0 w-full h-full opacity-50"></div>
      
      <div className="relative z-10">
        <Navbar />
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-purple-900/80 backdrop-blur-sm rounded-lg p-8 text-white">
              <div className="space-y-8">
                
                {/* Title Section */}
                <div className="text-center space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-white">
                    {t('title')}
                  </h1>
                  <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                    {t('subtitle')}
                  </p>
                </div>

                {/* Video Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center text-white">
                    {t('videoTitle')}
                  </h2>
                  <div className="flex justify-center">
                    <HotelVideoPlayer />
                  </div>
                </div>

                {/* Content Area - Placeholder for future press materials */}
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <p className="text-lg text-white/80 text-center">
                      {t('content.placeholder')}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}