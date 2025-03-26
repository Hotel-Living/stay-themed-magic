
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecommendationResult } from '@/hooks/useRecommendations';
import { ThemeTag } from '@/components/ThemeTag';
import { FavoriteButton } from '@/components/FavoriteButton';
import { Star } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: RecommendationResult;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const { hotel, confidence } = recommendation;
  const navigate = useNavigate();
  
  // Convert confidence to percentage
  const confidencePercentage = Math.round(confidence * 100);
  
  // Determine badge color based on confidence
  const getBadgeVariant = () => {
    if (confidencePercentage >= 85) return 'success';
    if (confidencePercentage >= 70) return 'default';
    return 'secondary';
  };
  
  // Get the main image URL or fallback
  const mainImage = hotel.hotel_images.find(img => img.is_main)?.image_url || 
                    hotel.hotel_images[0]?.image_url || 
                    hotel.main_image_url || 
                    '/placeholder.svg';
  
  // Get up to 2 themes to display
  const displayThemes = hotel.hotel_themes
    .slice(0, 2)
    .map(theme => theme.themes);
  
  const handleClick = () => {
    navigate(`/hotel/${hotel.id}`);
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 overflow-hidden bg-background/50 border-white/10">
      <div className="relative h-36 overflow-hidden">
        {/* Image */}
        <img 
          src={mainImage} 
          alt={hotel.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        
        {/* Match badge */}
        <div className="absolute top-2 right-2">
          <Badge variant={getBadgeVariant()} className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>{confidencePercentage}% Match</span>
          </Badge>
        </div>
        
        {/* Favorite button */}
        <div className="absolute top-2 left-2">
          <FavoriteButton hotelId={hotel.id} />
        </div>
      </div>
      
      <CardContent className="p-3">
        <div onClick={handleClick} className="cursor-pointer">
          <h3 className="font-semibold text-base line-clamp-1 mb-1">{hotel.name}</h3>
          
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <span className="line-clamp-1">{hotel.city}, {hotel.country}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {displayThemes.map(theme => (
                <ThemeTag 
                  key={theme.id} 
                  theme={theme} 
                  size="sm" 
                />
              ))}
            </div>
            
            <div className="font-bold text-fuchsia-500">
              ${hotel.price_per_month}/mo
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
