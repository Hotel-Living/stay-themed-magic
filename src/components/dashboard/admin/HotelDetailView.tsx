
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { useHotelDetails } from "./hooks/useHotelDetails";
import { useHotelActions } from "./hooks/useHotelActions";
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
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export default function HotelDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { hotel, loading, themes, activities, images } = useHotelDetails(id);
  
  const refreshData = async () => {
    navigate('/admin/hotels');
  };
  
  const { handleApprove, handleReject, handleDelete } = useHotelActions(refreshData);
  
  const onApprove = async () => {
    if (hotel) {
      await handleApprove(hotel.id);
      toast({
        title: "Hotel approved",
        description: "The hotel has been approved and is now visible to users."
      });
      navigate('/admin/hotels');
    }
  };
  
  const onReject = async () => {
    if (hotel) {
      const reason = prompt("Please enter a reason for rejection:");
      if (reason) {
        await handleReject(hotel.id, reason);
        toast({
          title: "Hotel rejected",
          description: "The hotel has been rejected."
        });
        navigate('/admin/hotels');
      }
    }
  };
  
  const onDelete = async () => {
    if (hotel) {
      if (confirm("Are you sure you want to delete this hotel? This action cannot be undone.")) {
        await handleDelete(hotel.id);
        toast({
          title: "Hotel deleted",
          description: "The hotel has been permanently deleted."
        });
        navigate('/admin/hotels');
      }
    }
  };

  // Helper function to render descriptive content
  const renderDescriptionCard = (title: string, content: string | null | undefined) => {
    if (!content) return null;
    
    return (
      <Card className="p-4 bg-[#2A0F44]">
        <h4 className="text-lg font-medium text-fuchsia-200 mb-2">{title}</h4>
        <p className="text-gray-300">{content}</p>
      </Card>
    );
  };

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
          
          {hotel && hotel.status === 'pending' && (
            <div className="flex items-center space-x-2">
              <Button 
                onClick={onApprove}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Approve
              </Button>
              <Button 
                variant="outline"
                onClick={onReject}
                className="border-red-400 text-red-400 hover:bg-red-50"
              >
                Reject
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="rounded-xl p-6 bg-[#2A0F44]">
            <p className="text-center">Loading hotel details...</p>
          </div>
        ) : hotel ? (
          <div className="space-y-6">
            <BasicInfo hotel={hotel} />
            <ImageGallery images={images} hotel={hotel} />
            
            {/* Descriptive content section */}
            <div className="space-y-4">
              {renderDescriptionCard("Atmosphere", hotel.atmosphere)}
              {renderDescriptionCard("Ideal For", hotel.ideal_guests)}
              {renderDescriptionCard("Perfect Location", hotel.perfect_location)}
            </div>
            
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
            
            {hotel.status !== 'pending' && (
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  variant="destructive" 
                  onClick={onDelete}
                >
                  Delete Hotel
                </Button>
              </div>
            )}
          </div>
        ) : (
          <HotelNotFound />
        )}
      </div>
    </AdminDashboardLayout>
  );
}
