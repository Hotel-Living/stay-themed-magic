
import React, { useState, useEffect } from "react";
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
import { HotelNotFound } from "@/components/hotel-detail/HotelNotFound";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

// Field display name mapping
const fieldDisplayNames: { [key: string]: string } = {
  name: "Hotel Name",
  description: "Description",
  address: "Address",
  city: "City",
  country: "Country",
  postal_code: "Postal Code",
  category: "Star Rating",
  property_type: "Property Type",
  atmosphere: "Atmosphere",
  ideal_guests: "Ideal Guests",
  perfect_location: "Location Description",
  features_hotel: "Hotel Features",
  features_room: "Room Features",
  meal_plans: "Meal Plans",
  contact_name: "Contact Name",
  contact_email: "Contact Email",
  contact_phone: "Contact Phone",
  price_per_month: "Price Per Month",
  stay_lengths: "Stay Lengths",
  room_types: "Room Types",
  terms: "Terms & Conditions",
  faqs: "FAQs"
};

// Field type mapping
const fieldTypes: { [key: string]: 'text' | 'number' | 'boolean' | 'array' | 'object' } = {
  name: 'text',
  description: 'text',
  address: 'text',
  city: 'text',
  country: 'text',
  postal_code: 'text',
  category: 'number',
  property_type: 'text',
  atmosphere: 'text',
  ideal_guests: 'text',
  perfect_location: 'text',
  features_hotel: 'object',
  features_room: 'object',
  meal_plans: 'array',
  contact_name: 'text',
  contact_email: 'text',
  contact_phone: 'text',
  price_per_month: 'number',
  stay_lengths: 'array',
  room_types: 'array',
  terms: 'text',
  faqs: 'array'
};

export default function HotelDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { hotel, loading, themes, activities, images, refetch } = useHotelDetails(id);
  const [changes, setChanges] = useState<Array<{
    fieldName: string;
    displayName: string;
    previousValue: any;
    newValue: any;
    fieldType: 'text' | 'number' | 'boolean' | 'array' | 'object';
  }>>([]);
  
  useEffect(() => {
    if (hotel && hotel.pending_changes) {
      // Process pending changes
      const pendingChanges = [];
      for (const [key, value] of Object.entries(hotel.pending_changes)) {
        if (value !== null) {
          pendingChanges.push({
            fieldName: key,
            displayName: fieldDisplayNames[key] || key,
            previousValue: hotel[key as keyof typeof hotel],
            newValue: value,
            fieldType: fieldTypes[key] || 'text'
          });
        }
      }
      setChanges(pendingChanges);
    } else {
      setChanges([]);
    }
  }, [hotel]);
  
  const refreshData = async () => {
    await refetch();
  };
  
  const { handleApprove, handleReject, handleDelete } = useHotelActions(refreshData);
  
  const handleApproveAllChanges = async () => {
    if (!hotel || !changes.length) return;
    
    try {
      // Create an object with all updated fields
      const updates: Record<string, any> = {};
      
      // Add all fields to be updated
      changes.forEach(change => {
        updates[change.fieldName] = change.newValue;
      });
      
      // Clear pending_changes
      updates.pending_changes = null;
      
      // Update the hotel
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
      // Just clear all pending changes without updating any fields
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
            {/* Display changes at the top if there are pending changes */}
            {changes.length > 0 && (
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
