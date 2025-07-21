
import { useTranslation } from 'react-i18next';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';

export default function Press() {
  const { t } = useTranslation('press');

  return (
    <div className="min-h-screen relative">
      <HotelStarfield />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-4 md:p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              {t('header.line1')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-2">
              {t('header.line2')}
            </p>
            <p className="text-lg md:text-xl text-gray-200 italic">
              {t('header.line3')}
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              {t('video.title')}
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${t('video.placeholder')}`}
                title={t('video.title')}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Headlines Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t('headlines.title')}
            </h2>
            <ul className="space-y-2">
              {Array.isArray(t('headlines.items', { returnObjects: true })) && 
                (t('headlines.items', { returnObjects: true }) as string[]).map((headline, index) => (
                <li key={index} className="text-gray-200 text-sm">
                  • {headline}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Figures Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t('keyFigures.title')}
            </h2>
            <ul className="space-y-2">
              {Array.isArray(t('keyFigures.items', { returnObjects: true })) && 
                (t('keyFigures.items', { returnObjects: true }) as string[]).map((figure, index) => (
                <li key={index} className="text-gray-200 text-sm">
                  • {figure}
                </li>
              ))}
            </ul>
          </div>

          {/* Brands Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t('brands.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Major Brands</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(t('brands.major', { returnObjects: true })) && 
                    (t('brands.major', { returnObjects: true }) as string[]).map((brand, index) => (
                    <span key={index} className="bg-fuchsia-600/30 text-white px-3 py-1 rounded-full text-sm">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Specialized Brands</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(t('brands.specialized', { returnObjects: true })) && 
                    (t('brands.specialized', { returnObjects: true }) as string[]).map((brand, index) => (
                    <span key={index} className="bg-purple-600/30 text-white px-3 py-1 rounded-full text-sm">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Press Coverage Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t('pressCoverage.title')}
            </h2>
            <div className="grid gap-3">
              {Array.isArray(t('pressCoverage.items', { returnObjects: true })) && 
                (t('pressCoverage.items', { returnObjects: true }) as Array<{media: string; link: string}>).map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <span className="text-white font-medium">{item.media}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Closing Section */}
          <div className="text-center">
            <p className="text-lg text-gray-200 mb-2">
              {t('closing.line1')}
            </p>
            <p className="text-lg text-gray-200 italic">
              {t('closing.line2')}
            </p>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-8 pt-4 border-t border-white/20">
            <p className="text-xs text-gray-400 text-center">
              {t('legal.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
