import { Navbar } from "@/components/Navbar";
import { useTranslation } from "@/hooks/useTranslation";
import { ExternalLink } from "lucide-react";

export default function Press() {
  const { t } = useTranslation('press');

  return (
    <div className="min-h-screen bg-[#170B3B] relative">
      <div className="starfield absolute inset-0 w-full h-full opacity-50"></div>
      
      <div className="relative z-10">
        <Navbar />
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="bg-purple-900/80 backdrop-blur-sm rounded-lg p-8 text-white">
              <div className="space-y-12">
                
                {/* Header Section */}
                <div className="text-center space-y-6">
                  <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    {t('header.line1')}
                  </h1>
                  <h2 className="text-2xl md:text-4xl font-semibold text-white/90 leading-tight">
                    {t('header.line2')}
                  </h2>
                  <h3 className="text-xl md:text-3xl font-medium text-white/80 leading-relaxed">
                    {t('header.line3')}
                  </h3>
                </div>

                {/* Video Section */}
                <div className="space-y-6">
                  <div className="w-full">
                    <iframe 
                      width="100%" 
                      height="400" 
                      src={`https://www.youtube.com/embed/${t('video.placeholder')}`}
                      title={t('video.title')}
                      frameBorder="0" 
                      allowFullScreen
                      className="rounded-lg shadow-xl"
                    ></iframe>
                  </div>
                </div>

                {/* Headlines Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center text-white mb-8">
                    {t('headlines.title')}
                  </h2>
                  <div className="space-y-4">
                    {(t('headlines.items', { returnObjects: true }) as string[]).map((headline, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-l-4 border-fuchsia-400">
                        <p className="text-lg text-white/90 leading-relaxed">
                          "{headline}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Figures Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center text-white mb-8">
                    {t('keyFigures.title')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(t('keyFigures.items', { returnObjects: true }) as string[]).map((figure, index) => (
                      <div key={index} className="bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
                        <p className="text-white font-semibold text-lg leading-relaxed">
                          {figure}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotel Brands Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center text-white mb-8">
                    {t('brands.title')}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    {(t('brands.major', { returnObjects: true }) as string[]).map((brand, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                        <p className="text-white font-semibold text-sm">{brand}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {(t('brands.specialized', { returnObjects: true }) as string[]).map((brand, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                        <p className="text-white font-semibold text-sm">{brand}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Press Coverage Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center text-white mb-8">
                    {t('pressCoverage.title')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(t('pressCoverage.items', { returnObjects: true }) as Array<{media: string, link: string}>).map((item, index) => (
                      <a 
                        key={index} 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-fuchsia-400/50 group"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <p className="text-white font-semibold text-lg">{item.media}</p>
                          <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-fuchsia-400 transition-colors" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Inspirational Closing */}
                <div className="space-y-4 text-center py-8">
                  <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                    {t('closing.line1')}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-fuchsia-300 leading-relaxed">
                    {t('closing.line2')}
                  </p>
                </div>

                {/* Legal Disclaimer */}
                <div className="border-t border-white/20 pt-8">
                  <p className="text-sm text-white/60 text-center leading-relaxed">
                    {t('legal.disclaimer')}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}