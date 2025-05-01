// RUTA: src/components/hotel-detail/HotelThemesSection.tsx

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface HotelThemesSectionProps {
  themes: { themes: { name: string } }[];
  isLoading?: boolean;
}

export const HotelThemesSection: React.FC<HotelThemesSectionProps> = ({ themes, isLoading }) => {
  if (isLoading) {
    return <Skeleton className="h-24 w-full rounded" />;
  }

  const visibleThemes = themes.map(t => t.themes?.name).filter(Boolean);

  if (visibleThemes.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Affinity Themes</h3>
      <ul className="flex flex-wrap gap-2">
        {visibleThemes.map((name, idx) => (
          <li
            key={idx}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
