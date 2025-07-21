
import { useTranslation } from 'react-i18next';
import { Starfield } from '../components/Starfield';
import { VideoTestimonials } from '../components/VideoTestimonials';

export default function Press() {
  const { t } = useTranslation('press');

  return (
    <div className="min-h-screen relative">
      <Starfield />
      
      <main className="relative z-10">
        <div className="container mx-auto px-8 py-8 max-w-2xl">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="space-y-12">
                
                {/* Header Section */}
                <div className="text-center space-y-6">
                  <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                    {t('header.line1')}
                  </h1>
                  <h2 className="text-2xl md:text-4xl font-semibold text-white/90 leading-tight">
                    {t('header.line2')}
                  </h2>
                  <h3 className="text-xl md:text-3xl font-medium text-white/80 leading-tight">
                    {t('header.line3')}
                  </h3>
                </div>

                {/* Video Section */}
                <div className="space-y-8">
                  <VideoTestimonials />
                </div>

                {/* Main Content */}
                <div className="space-y-8 text-white/90">
                  {/* Introduction */}
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed">
                      {t('content.intro')}
                    </p>
                  </div>

                  {/* Benefits Section */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-white">
                      {t('content.benefits.title')}
                    </h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="glass-card p-4 rounded-lg">
                        <h5 className="font-semibold text-fuchsia-300 mb-2">
                          {t('content.benefits.flexibility.title')}
                        </h5>
                        <p className="text-sm text-white/80">
                          {t('content.benefits.flexibility.description')}
                        </p>
                      </div>
                      <div className="glass-card p-4 rounded-lg">
                        <h5 className="font-semibold text-fuchsia-300 mb-2">
                          {t('content.benefits.services.title')}
                        </h5>
                        <p className="text-sm text-white/80">
                          {t('content.benefits.services.description')}
                        </p>
                      </div>
                      <div className="glass-card p-4 rounded-lg">
                        <h5 className="font-semibold text-fuchsia-300 mb-2">
                          {t('content.benefits.community.title')}
                        </h5>
                        <p className="text-sm text-white/80">
                          {t('content.benefits.community.description')}
                        </p>
                      </div>
                      <div className="glass-card p-4 rounded-lg">
                        <h5 className="font-semibold text-fuchsia-300 mb-2">
                          {t('content.benefits.lifestyle.title')}
                        </h5>
                        <p className="text-sm text-white/80">
                          {t('content.benefits.lifestyle.description')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">
                      {t('content.audience.title')}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-fuchsia-400 rounded-full mt-2"></div>
                        <p className="text-white/80">{t('content.audience.professionals')}</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-fuchsia-400 rounded-full mt-2"></div>
                        <p className="text-white/80">{t('content.audience.nomads')}</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-fuchsia-400 rounded-full mt-2"></div>
                        <p className="text-white/80">{t('content.audience.relocators')}</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-fuchsia-400 rounded-full mt-2"></div>
                        <p className="text-white/80">{t('content.audience.travelers')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Future Vision */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">
                      {t('content.future.title')}
                    </h4>
                    <p className="text-white/80 leading-relaxed">
                      {t('content.future.description')}
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center pt-8">
                    <p className="text-lg text-fuchsia-300 font-medium">
                      {t('content.cta')}
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
