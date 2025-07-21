
import { Navbar } from "@/components/Navbar";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { useTranslation } from "@/hooks/useTranslation";
import { ExternalLink } from "lucide-react";

export default function Press() {
  const { t } = useTranslation('press');

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-4 relative z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col items-center">
          {/* Header Section */}
          <div className="text-center mb-8 max-w-4xl backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60">
            <h1 className="text-2xl md:text-4xl font-bold text-fuchsia-200 mb-2">
              {t('header.line1')}
            </h1>
            <h2 className="text-lg md:text-2xl text-fuchsia-300 mb-2">
              {t('header.line2')}
            </h2>
            <h3 className="text-base md:text-xl text-fuchsia-400 italic">
              {t('header.line3')}
            </h3>
          </div>

          {/* Video Section */}
          <div className="mb-12 max-w-4xl w-full backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60">
            <h2 className="text-2xl font-bold text-fuchsia-200 mb-6 text-center">
              {t('video.title')}
            </h2>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${t('video.placeholder')}`}
                title={t('video.title')}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Headlines Section */}
          <div className="mb-12 max-w-4xl w-full backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60">
            <h2 className="text-2xl font-bold text-fuchsia-200 mb-6 text-center">
              {t('headlines.title')}
            </h2>
            <ul className="space-y-3">
              {t('headlines.items', { returnObjects: true }).map((headline: string, index: number) => (
                <li key={index} className="text-fuchsia-300 flex items-start">
                  <span className="text-fuchsia-400 mr-2">•</span>
                  <span>{headline}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Figures Section */}
          <div className="mb-12 max-w-4xl w-full backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60">
            <h2 className="text-2xl font-bold text-fuchsia-200 mb-6 text-center">
              {t('keyFigures.title')}
            </h2>
            <ul className="space-y-3">
              {t('keyFigures.items', { returnObjects: true }).map((figure: string, index: number) => (
                <li key={index} className="text-fuchsia-300 flex items-start">
                  <span className="text-fuchsia-400 mr-2">•</span>
                  <span>{figure}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands Section */}
          <div className="mb-12 max-w-4xl w-full backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60">
            <h2 className="text-2xl font-bold text-fuchsia-200 mb-6 text-center">
              {t('brands.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-fuchsia-300 mb-3">Major Chains</h3>
                <div className="flex flex-wrap gap-2">
                  {t('brands.major', { returnObjects: true }).map((brand: string, index: number) => (
                    <span key={index} className="bg-fuchsia-900/50 text-fuchsia-200 px-3 py-1 rounded-full text-sm">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fuchsia-300 mb-3">Specialized</h3>
                <div className="flex flex-wrap gap-2">
                  {t('brands.specialized', { returnObjects: true }).map((brand: string, index: number) => (
                    <span key={index} className="bg-fuchsia-900/50 text-fuchsia-200 px-3 py-1 rounded-full text-sm">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Press Coverage Section */}
          <div className="mb-12 max-w-4xl w-full backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60">
            <h2 className="text-2xl font-bold text-fuchsia-200 mb-6 text-center">
              {t('pressCoverage.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {t('pressCoverage.items', { returnObjects: true }).map((item: any, index: number) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-fuchsia-900/30 rounded-lg hover:bg-fuchsia-900/50 transition-colors border border-fuchsia-400/20"
                >
                  <span className="text-fuchsia-200 font-medium">{item.media}</span>
                  <ExternalLink className="w-4 h-4 text-fuchsia-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Closing Section */}
          <div className="text-center max-w-4xl backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60">
            <p className="text-lg md:text-xl text-fuchsia-300 mb-2">
              {t('closing.line1')}
            </p>
            <p className="text-lg md:text-xl text-fuchsia-200 font-semibold">
              {t('closing.line2')}
            </p>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-8 max-w-4xl w-full text-center">
            <p className="text-xs text-fuchsia-400/60">
              {t('legal.disclaimer')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
