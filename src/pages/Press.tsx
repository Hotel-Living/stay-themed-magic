import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const Press = () => {
  console.log("Press component: Starting to render");
  
  const { t, ready: isReady } = useTranslation('press');

  useEffect(() => {
    console.log("Press component: useEffect triggered", { isReady });
  }, [isReady]);

  console.log("Press component: Translation state", { isReady, language: t ? 'loaded' : 'not loaded' });

  if (!isReady) {
    console.log("Press component: Translations not ready, showing loading");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  console.log("Press component: Rendering full content");

  try {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-background">
          <Navbar />
          
          <main className="pt-16">
            {/* Header Section */}
            <section className="py-20 px-4">
              <div className="container max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient glow">
                  {t('header.line1', 'The future is already here')}
                </h1>
                <h2 className="text-2xl md:text-3xl mb-4 text-foreground/90">
                  {t('header.line2', 'Living in hotels is no longer a rarity')}
                </h2>
                <h3 className="text-xl md:text-2xl text-foreground/70">
                  {t('header.line3', '...and becomes a new way of life')}
                </h3>
              </div>
            </section>

            {/* Video Section */}
            <section className="py-16 px-4 bg-card/50">
              <div className="container max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">
                  {t('video.title', 'Press Release Video')}
                </h2>
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${t('video.placeholder', 'MV6uoOWM4Oo')}`}
                    title={t('video.title', 'Press Release Video')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </section>

            {/* Headlines Section */}
            <section className="py-16 px-4">
              <div className="container max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  {t('headlines.title', 'Featured Headlines')}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {(() => {
                    const headlines = t('headlines.items', { returnObjects: true, defaultValue: [] });
                    return Array.isArray(headlines) ? headlines.map((headline: string, index: number) => (
                      <div key={index} className="p-6 bg-card rounded-lg border">
                        <p className="text-lg leading-relaxed">{headline}</p>
                      </div>
                    )) : null;
                  })()}
                </div>
              </div>
            </section>

            {/* Key Figures Section */}
            <section className="py-16 px-4 bg-card/50">
              <div className="container max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  {t('keyFigures.title', 'Key Figures')}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(() => {
                    const figures = t('keyFigures.items', { returnObjects: true, defaultValue: [] });
                    return Array.isArray(figures) ? figures.map((figure: string, index: number) => (
                      <div key={index} className="p-6 bg-card rounded-lg border">
                        <p className="text-lg leading-relaxed">{figure}</p>
                      </div>
                    )) : null;
                  })()}
                </div>
              </div>
            </section>

            {/* Hotel Brands Section */}
            <section className="py-16 px-4">
              <div className="container max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">
                  {t('brands.title', 'Hotel Brands')}
                </h2>
                
                {/* Major Brands */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">Major Brands</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {(() => {
                      const brands = t('brands.major', { returnObjects: true, defaultValue: [] });
                      return Array.isArray(brands) ? brands.map((brand: string, index: number) => (
                        <span key={index} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">{brand}</span>
                      )) : null;
                    })()}
                  </div>
                </div>

                {/* Specialized Brands */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-center">Specialized Brands</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {(() => {
                      const brands = t('brands.specialized', { returnObjects: true, defaultValue: [] });
                      return Array.isArray(brands) ? brands.map((brand: string, index: number) => (
                        <span key={index} className="px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium">{brand}</span>
                      )) : null;
                    })()}
                  </div>
                </div>
              </div>
            </section>

            {/* Press Coverage Section */}
            <section className="py-16 px-4 bg-card/50">
              <div className="container max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">
                  {t('pressCoverage.title', 'Press Coverage')}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {(() => {
                    const items = t('pressCoverage.items', { returnObjects: true, defaultValue: [] });
                    return Array.isArray(items) ? items.map((item: any, index: number) => (
                      <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="block p-6 bg-card rounded-lg border hover:bg-card/80 transition-colors">
                        <h3 className="text-xl font-semibold mb-2">{item.media}</h3>
                        <p className="text-foreground/80">Read more...</p>
                      </a>
                    )) : null;
                  })()}
                </div>
              </div>
            </section>

            {/* Closing Section */}
            <section className="py-20 px-4">
              <div className="container max-w-4xl mx-auto text-center">
                <p className="text-2xl md:text-3xl font-medium mb-4 text-foreground/90">
                  {t('closing.line1', 'The hotel industry is not simply changing...')}
                </p>
                <p className="text-3xl md:text-4xl font-bold text-gradient glow">
                  {t('closing.line2', 'it\'s evolving into a new way of inhabiting the world.')}
                </p>
              </div>
            </section>

            {/* Legal Disclaimer Section */}
            <section className="py-12 px-4 bg-background/50">
              <div className="container max-w-4xl mx-auto text-center">
                <p className="text-sm text-foreground/60">
                  {t('legal.disclaimer', 'All brands, logos and references cited on this page belong to their respective owners and are included exclusively for informational, editorial or comparative purposes. Hoteldiving is not affiliated with or endorsed by such entities.')}
                </p>
              </div>
            </section>
          </main>
          
          <Footer />
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("Press component: Render error", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-xl font-bold text-red-600 mb-4">Press Page Error</h1>
          <p className="text-gray-600">Unable to load press page content.</p>
        </div>
      </div>
    );
  }
};

export default Press;
