
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
import { HotelNotFound } from "@/components/hotel-detail/HotelNotFound";

export default function HotelDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hotel, loading, themes, activities, images, featuresHotel, featuresRoom } = useHotelDetails(id);

  console.log("Hotel in detail view:", hotel);
  console.log("Themes in detail view:", themes);
  console.log("Activities in detail view:", activities);
  console.log("Images in detail view:", images);

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
            <AmenitiesInfo features_hotel={featuresHotel} features_room={featuresRoom} />
            <ThemesInfo themes={hotel.hotel_themes || []} />
            <ActivitiesInfo activities={hotel.hotel_activities || []} />
            <AdminInfo hotel={hotel} />
          </div>
        ) : (
          <div className="rounded-xl p-6 bg-[#2A0F44] text-center">
            <h3 className="text-xl font-semibold mb-4 text-red-400">Hotel Not Found</h3>
            <p>The hotel with ID {id} could not be found or may have been deleted.</p>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
