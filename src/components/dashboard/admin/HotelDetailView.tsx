
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
import { AmenitiesInfo } from "./hotel-detail/AmenitiesInfo";
import { ThemesInfo } from "./hotel-detail/ThemesInfo";
import { ActivitiesInfo } from "./hotel-detail/ActivitiesInfo";
import { AdminInfo } from "./hotel-detail/AdminInfo";

export default function HotelDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hotel, loading, themes, activities, images, amenities } = useHotelDetails(id);

  console.log("Hotel in detail view:", hotel);
  console.log("Themes in detail view:", themes);
  console.log("Activities in detail view:", activities);

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
            Loading hotel details...
          </div>
        ) : hotel ? (
          <div className="space-y-6">
            <BasicInfo hotel={hotel} />
            <ImageGallery images={images} hotel={hotel} />
            <LocationInfo hotel={hotel} />
            <AvailabilityInfo hotel={hotel} />
            <AmenitiesInfo amenities={amenities} />
            <ThemesInfo themes={themes} />
            <ActivitiesInfo activities={activities} />
            <AdminInfo hotel={hotel} />
          </div>
        ) : (
          <div className="rounded-xl p-6 bg-[#2A0F44]">
            <p className="text-center">Hotel not found.</p>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
