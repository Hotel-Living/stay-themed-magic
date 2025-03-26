
import React from 'react';
import { useRecommendations } from '@/hooks/useRecommendations';
import { RecommendationCard } from './RecommendationCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export function RecommendationsSection() {
  const { data: recommendations = [], isLoading, error } = useRecommendations();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  if (!user) {
    return (
      <div className="py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="bg-fuchsia-900/40 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <Sparkles className="h-10 w-10 mb-4 text-fuchsia-500" />
            <h2 className="text-2xl font-bold mb-2">{t("recommendations.signInTitle")}</h2>
            <p className="text-muted-foreground max-w-lg mb-4">
              {t("recommendations.signInDescription")}
            </p>
            <Button asChild>
              <Link to="/login">{t("nav.login")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="bg-red-900/30 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">{t("recommendations.errorTitle")}</h2>
            <p className="text-muted-foreground">{t("recommendations.errorDescription")}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <section className="py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-6 w-6 text-fuchsia-500" />
          <h2 className="text-2xl font-bold">
            {t("recommendations.title")}
          </h2>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-36 w-full rounded-md" />
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3 rounded-md" />
                  <Skeleton className="h-4 w-1/4 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {recommendations.map((recommendation) => (
              <RecommendationCard 
                key={recommendation.hotel.id} 
                recommendation={recommendation} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-background/20 backdrop-blur-sm rounded-xl p-8 text-center">
            <h3 className="text-xl font-medium mb-2">{t("recommendations.emptyTitle")}</h3>
            <p className="text-muted-foreground max-w-lg mx-auto mb-4">
              {t("recommendations.emptyDescription")}
            </p>
            <Button asChild>
              <Link to="/search">{t("recommendations.exploreCta")}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
