
import React from 'react';
import { Edit } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";
import { BasicInformation } from './sections/BasicInformation';
import { LocationInformation } from './sections/LocationInformation';
import { ContactInformation } from './sections/ContactInformation';
import { FeaturesSection } from './sections/FeaturesSection';
import { AccommodationTerms } from './sections/AccommodationTerms';
import { ThemesActivities } from './sections/ThemesActivities';
import { ImageGallery } from './sections/ImageGallery';
import { FaqSection } from './sections/FaqSection';

interface PropertyDetailViewProps {
  hotel: Hotel;
  onEdit: () => void;
}

export const PropertyDetailView = ({ hotel, onEdit }: PropertyDetailViewProps) => {
  if (!hotel) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{hotel.name}</h2>
        <button
          onClick={onEdit}
          className="px-4 py-2 rounded bg-fuchsia-700 text-white flex items-center gap-2"
        >
          <Edit className="w-4 h-4" /> Edit Property
        </button>
      </div>

      <BasicInformation hotel={hotel} />
      <LocationInformation hotel={hotel} />
      <ContactInformation hotel={hotel} />
      <FeaturesSection hotel={hotel} />
      <AccommodationTerms hotel={hotel} />
      <ThemesActivities hotel={hotel} />
      <ImageGallery hotel={hotel} />
      <FaqSection hotel={hotel} />
    </div>
  );
};

export default PropertyDetailView;
