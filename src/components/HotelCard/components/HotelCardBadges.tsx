
import React from "react";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/ui/FavoriteButton";

interface HotelCardBadgesProps {
  themes: Array<{ id: string; name: string }>;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const HotelCardBadges: React.FC<HotelCardBadgesProps> = ({
  themes,
  isFavorite,
  onToggleFavorite
}) => {
  return (
    <>
      {themes.length > 0 && (
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-white/70 backdrop-blur-sm text-purple-900 hover:bg-white/80">
            {themes[0].name}
          </Badge>
        </div>
      )}
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={onToggleFavorite}
          size="sm"
        />
      </div>
    </>
  );
};
