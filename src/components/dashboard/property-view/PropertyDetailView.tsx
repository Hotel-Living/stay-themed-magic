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
import { useLocation, useNavigate } from "react-router-dom";

export default function PropertyDetailView({ hotel }: { hotel: any }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith("/admin");

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

      {isAdmin && (
        <div className="mt-6">
          <button
            onClick={() => navigate(`/add-property?edit=${hotel.id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit this property
          </button>
        </div>
      )}
    </div>
  );
}
