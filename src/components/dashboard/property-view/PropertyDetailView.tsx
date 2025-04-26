
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { BasicInformation } from "./sections/BasicInformation";
import { LocationInformation } from "./sections/LocationInformation";
import { AccommodationTerms } from "./sections/AccommodationTerms";
import { ThemesActivities } from "./sections/ThemesActivities";
import { FeaturesSection } from "./sections/FeaturesSection";
import { ContactInformation } from "./sections/ContactInformation";
import { FaqSection } from "./sections/FaqSection";
import { ImageGallery } from "./sections/ImageGallery";

interface PropertyDetailViewProps {
  hotel: any;
  onEdit?: () => void;
}

export default function PropertyDetailView({ hotel, onEdit }: PropertyDetailViewProps) {
  console.log("PropertyDetailView hotel data:", hotel);
  
  return (
    <div className="relative bg-fuchsia-950/30 p-4 sm:p-6 rounded-xl">
      {/* Edit Button */}
      <div className="absolute top-4 right-4">
        <Button variant="outline" onClick={onEdit} className="flex items-center gap-2">
          <Edit className="w-4 h-4" /> Edit Property
        </Button>
      </div>

      {/* Property Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 pr-24">{hotel.name}</h2>
      
      <div className="space-y-8">
        <ImageGallery hotel={hotel} />
        <BasicInformation hotel={hotel} />
        <LocationInformation hotel={hotel} />
        <AccommodationTerms hotel={hotel} />
        <FeaturesSection hotel={hotel} />
        <ThemesActivities hotel={hotel} />
        <ContactInformation hotel={hotel} />
        <FaqSection hotel={hotel} />
      </div>
    </div>
  );
}
