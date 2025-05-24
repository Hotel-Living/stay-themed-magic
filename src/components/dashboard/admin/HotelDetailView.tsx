
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
import { ChangesHighlight } from "./hotel-detail/ChangesHighlight";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export default function HotelDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  console.log("HotelDetailView - Component rendering with ID:", id);
  
  const { hotel, loading, themes, activities, images, changes, refetch } = useHotelDetails(id);
  
  console.log("HotelDetailView - Current state:", { 
    hotel: hotel ? `Hotel: ${hotel.name}` : 'No hotel', 
    loading, 
    hasThemes: themes?.length > 0, 
    hasActivities: activities?.length > 0, 
    hasImages: images?.length > 0, 
    hasChanges: changes?.length > 0 
  });
  
  const refreshData = async () => {
    console.log("HotelDetailView - Refreshing data");
    await refetch();
  };
  
  const { handleApprove, handleReject, handleDelete } = useHotelActions(refreshData);
  
  const handleApproveAllChanges = async () => {
    if (!hotel || !changes.length) return;
    
    try {
      const updates: Record<string, any> = {};
      
      changes.forEach(change => {
        updates[change.fieldName] = change.newValue;
      });
      
      updates.pending_changes = null;
      
      const { error } = await supabase
        .from('hotels')
        .update(updates)
        .eq('id', hotel.id);
        
      if (error) throw error;
      
      toast({
        title: "All changes approved",
        description: "The changes have been approved and applied to the property."
      });
      
      await refreshData();
    } catch (error: any) {
      console.error("Error approving all changes:", error);
      toast({
        title: "Error",
        description: "Failed to approve changes",
        variant: "destructive"
      });
    }
  };
  
  const handleRejectAllChanges = async () => {
    if (!hotel) return;
    
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ pending_changes: null })
        .eq('id', hotel.id);
        
      if (error) throw error;
      
      toast({
        title: "All changes rejected",
        description: "All proposed changes have been rejected."
      });
      
      await refreshData();
    } catch (error: any) {
      console.error("Error rejecting all changes:", error);
      toast({
        title: "Error",
        description: "Failed to reject changes",
        variant: "destructive"
      });
    }
  };
  
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

  // Early return if no ID
  if (!id) {
    console.log("HotelDetailView - No ID provided, showing error");
    return (
      <AdminDashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/hotels')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Hotels
            </Button>
            <h2 className="text-2xl font-bold">Hotel Details</h2>
          </div>
          <Card className="p-6 bg-[#5C0869]">
            <p className="text-center text-red-400">No hotel ID provided</p>
          </Card>
        </div>
      </AdminDashboardLayout>
    );
  }

  console.log("HotelDetailView - Rendering main content, loading:", loading, "hotel:", !!hotel);

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 bg-[#5C0869] rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/hotels')}
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
          <Card className="p-6 bg-[#5C0869]">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <span className="ml-3">Loading hotel details...</span>
            </div>
          </Card>
        ) : hotel ? (
          <div className="space-y-6">
            {changes && changes.length > 0 && (
              <ChangesHighlight 
                hotelId={hotel.id}
                changes={changes}
                onApproveAll={handleApproveAllChanges}
                onRejectAll={handleRejectAllChanges}
                onRefresh={refreshData}
              />
            )}
            
            <BasicInfo hotel={hotel} />
            <ImageGallery images={images} hotel={hotel} />
            
            {(hotel.atmosphere || hotel.ideal_guests || hotel.perfect_location) && (
              <div className="space-y-4">
                {hotel.atmosphere && (
                  <Card className="p-4 bg-[#5A0080]">
                    <h4 className="text-lg font-medium text-fuchsia-200 mb-2">Atmosphere</h4>
                    <p className="text-gray-300">{hotel.atmosphere}</p>
                  </Card>
                )}
                {hotel.ideal_guests && (
                  <Card className="p-4 bg-[#5A0080]">
                    <h4 className="text-lg font-medium text-fuchsia-200 mb-2">Ideal For</h4>
                    <p className="text-gray-300">{hotel.ideal_guests}</p>
                  </Card>
                )}
                {hotel.perfect_location && (
                  <Card className="p-4 bg-[#5A0080]">
                    <h4 className="text-lg font-medium text-fuchsia-200 mb-2">Perfect Location</h4>
                    <p className="text-gray-300">{hotel.perfect_location}</p>
                  </Card>
                )}
              </div>
            )}
            
            <LocationInfo hotel={hotel} />
            <AvailabilityInfo hotel={hotel} />
            <RoomTypesInfo hotel={hotel} />
            <FeaturesInfo 
              hotelFeatures={hotel.features_hotel || {}} 
              roomFeatures={hotel.features_room || {}} 
            />
            <ThemesInfo themes={hotel.hotel_themes || []} />
            <ActivitiesInfo activities={hotel.hotel_activities || []} />
            <AdminInfo hotel={hotel} refetch={refreshData} />
            
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
          <Card className="p-6 bg-[#5C0869]">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-red-400 mb-2">Hotel Not Found</h3>
              <p className="text-gray-300 mb-4">The hotel with ID "{id}" could not be found.</p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin/hotels')}
                className="flex items-center gap-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Hotels List
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
