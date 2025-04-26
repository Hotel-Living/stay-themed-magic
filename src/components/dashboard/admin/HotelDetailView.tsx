
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { useHotelDetails } from "./hooks/useHotelDetails";
import { BasicInfo } from "./hotel-detail/BasicInfo";
import { ImageGallery } from "./hotel-detail/ImageGallery";
import { LocationInfo } from "./hotel-detail/LocationInfo";
import { AvailabilityInfo } from "./hotel-detail/AvailabilityInfo";
import { FeaturesInfo } from "./hotel-detail/FeaturesInfo";
import { ThemesInfo } from "./hotel-detail/ThemesInfo";
import { ActivitiesInfo } from "./hotel-detail/ActivitiesInfo";
import { AdminInfo } from "./hotel-detail/AdminInfo";
import { RoomTypesInfo } from "./hotel-detail/RoomTypesInfo";
import { HotelNotFound } from "@/components/hotel-detail/HotelNotFound";

export default function HotelDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hotel, loading, themes, activities, images } = useHotelDetails(id);

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Hotels
          </Button>
          <h2 className="text-2xl font-bold">Hotel Details</h2>
        </div>

        {loading ? (
          <div className="rounded-xl p-6 bg-[#2A0F44]">
            <p className="text-center">Loading hotel details...</p>
          </div>
        ) : hotel ? (
          <div className="space-y-6">
            <BasicInfo hotel={hotel} />
            <ImageGallery images={images} hotel={hotel} />
            <LocationInfo hotel={hotel} />
            <AvailabilityInfo hotel={hotel} />
            <RoomTypesInfo hotel={hotel} />
            <FeaturesInfo 
              hotelFeatures={hotel.features_hotel || {}} 
              roomFeatures={hotel.features_room || {}} 
            />
            <ThemesInfo themes={hotel.hotel_themes || []} />
            <ActivitiesInfo activities={hotel.hotel_activities || []} />
            <AdminInfo hotel={hotel} />
          </div>
        ) : (
          <HotelNotFound />
        )}
      </div>
    </AdminDashboardLayout>
  );
}
