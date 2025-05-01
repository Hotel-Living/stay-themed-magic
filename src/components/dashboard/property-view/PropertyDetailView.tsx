// RUTA: src/components/dashboard/property-view/PropertyDetailView.tsx

import React from "react";
import BasicInformation from "./sections/BasicInformation";
import ContactInformation from "./sections/ContactInformation";
import LocationInformation from "./sections/LocationInformation";
import ThemesActivities from "./sections/ThemesActivities";
import FeaturesSection from "./sections/FeaturesSection";
import RoomTypesSection from "./sections/RoomTypesSection";
import ImageGallery from "./sections/ImageGallery";
import FaqSection from "./sections/FaqSection";

export default function PropertyDetailView({ hotel }: { hotel: any }) {
  return (
    <div className="space-y-6">
      <BasicInformation hotel={hotel} />
      <ContactInformation hotel={hotel} />
      <LocationInformation hotel={hotel} />
      <ThemesActivities hotel={hotel} />
      <FeaturesSection hotel={hotel} />
      <RoomTypesSection hotel={hotel} />
      <ImageGallery hotel={hotel} />
      <FaqSection hotel={hotel} />
    </div>
  );
}
