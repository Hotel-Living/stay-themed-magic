
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecommendedHotels } from '@/hooks/useRecommendedHotels';
import { useNavigate } from 'react-router-dom';
import { ThemeTag } from '@/components/ThemeTag';
import { Badge } from '@/components/ui/badge';

export const RecommendedHotels: React.FC = () => {
  const { recommendedHotels, loading } = useRecommendedHotels();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-4">Hotels You May Like</h2>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-300"></div>
        </div>
      </div>
    );
  }

  if (recommendedHotels.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-4">Hotels You May Like</h2>
        <div className="text-center py-8 text-foreground/60">
          <p>Add affinities to your profile to see personalized hotel recommendations!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
      <h2 className="text-xl font-semibold mb-4">Hotels You May Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedHotels.map((hotel) => {
          const mainImage = hotel.hotel_images?.find(img => img.is_main)?.image_url || 
                           hotel.hotel_images?.[0]?.image_url || 
                           hotel.main_image_url;

          return (
            <div
              key={hotel.id}
              onClick={() => navigate(`/hotel/${hotel.id}`)}
              className="bg-[#9939f9] rounded-lg overflow-hidden cursor-pointer hover:bg-[#a54afe] transition-colors"
            >
              <div className="aspect-video relative overflow-hidden">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                    <span className="text-white text-sm">No image</span>
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1 truncate">{hotel.name}</h3>
                <p className="text-xs text-foreground/70 mb-2">
                  {hotel.city}, {hotel.country}
                </p>
                
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="secondary" className="text-xs">
                    ${hotel.price_per_month}/month
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {hotel.hotel_themes?.slice(0, 2).map((theme, index) => (
                    <ThemeTag
                      key={index}
                      theme={theme.themes}
                      size="sm"
                      className="text-xs"
                    />
                  ))}
                  {hotel.hotel_themes?.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{hotel.hotel_themes.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
