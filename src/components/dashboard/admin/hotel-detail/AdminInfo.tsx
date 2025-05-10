
import React, { useState, useEffect } from "react";
import { Clock, Save } from "lucide-react";
import { AdminHotelDetail } from "@/types/hotel";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface AdminInfoProps {
  hotel: AdminHotelDetail;
  refetch?: () => Promise<void>; // Optional refetch function to update data
}

interface HotelOwner {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
}

export function AdminInfo({ hotel, refetch }: AdminInfoProps) {
  const [newOwnerId, setNewOwnerId] = useState<string | null>(hotel.owner_id || null);
  const [newStatus, setNewStatus] = useState<string>(hotel.status || "pending");
  const [hotelOwners, setHotelOwners] = useState<HotelOwner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStatusLoading, setIsStatusLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHotelOwners = async () => {
      // First query to get profiles
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .eq("is_hotel_owner", true)
        .order("first_name");

      if (profileError) {
        console.error("Error fetching hotel owners:", profileError);
        toast({
          title: "Error loading hotel owners",
          description: profileError.message,
          variant: "destructive"
        });
        return;
      }

      // Create owners array with profile data
      const ownersWithEmail: HotelOwner[] = profileData.map(profile => ({
        ...profile,
        email: null // Initialize with null, we don't have direct access to auth.users
      }));
      
      setHotelOwners(ownersWithEmail);
    };

    fetchHotelOwners();
  }, [toast]);

  const updateOwner = async () => {
    setIsLoading(true);
    
    const { error } = await supabase
      .from("hotels")
      .update({ owner_id: newOwnerId })
      .eq("id", hotel.id);

    setIsLoading(false);

    if (!error) {
      toast({
        title: "Success",
        description: "Hotel owner reassigned successfully",
      });
      
      // Refetch hotel data if refetch function is provided
      if (refetch) {
        await refetch();
      }
    } else {
      toast({
        title: "Error updating owner",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateStatus = async () => {
    setIsStatusLoading(true);
    
    const { error } = await supabase
      .from("hotels")
      .update({ status: newStatus })
      .eq("id", hotel.id);

    setIsStatusLoading(false);

    if (!error) {
      toast({
        title: "Success",
        description: "Hotel status updated successfully",
      });
      
      // Refetch hotel data if refetch function is provided
      if (refetch) {
        await refetch();
      }
    } else {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getOwnerDisplayName = (owner: HotelOwner | undefined) => {
    if (!owner) return "Not assigned";
    
    const name = [owner.first_name, owner.last_name].filter(Boolean).join(" ");
    
    return name || "Unnamed owner";
  };

  // Find the current owner in our list
  const currentOwner = hotelOwners.find(owner => owner.id === hotel.owner_id);

  return (
    <div className="rounded-xl p-6 bg-[#5d0083]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-400" />
        Administrative Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Hotel ID</p>
          <p className="font-medium font-mono text-xs">{hotel.id}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Owner</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-grow">
              <Select value={newOwnerId || ""} onValueChange={setNewOwnerId}>
                <SelectTrigger className="bg-[#4a006c] border-purple-700">
                  <SelectValue placeholder="Select an owner">
                    {newOwnerId ? getOwnerDisplayName(hotelOwners.find(o => o.id === newOwnerId)) : "Not assigned"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="">Not assigned</SelectItem>
                  {hotelOwners.map(owner => (
                    <SelectItem key={owner.id} value={owner.id}>
                      {getOwnerDisplayName(owner)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={updateOwner} 
              size="sm" 
              disabled={isLoading || newOwnerId === hotel.owner_id}
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Status</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-grow">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="bg-[#4a006c] border-purple-700">
                  <SelectValue placeholder="Select a status">
                    {newStatus ? newStatus.charAt(0).toUpperCase() + newStatus.slice(1) : "Pending"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={updateStatus} 
              size="sm" 
              disabled={isStatusLoading || newStatus === hotel.status}
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400">Published</p>
          <p className="font-medium">{hotel.status === 'approved' ? "Yes" : "No"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Created At</p>
          <p className="font-medium">{new Date(hotel.created_at).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Last Updated</p>
          <p className="font-medium">{new Date(hotel.updated_at).toLocaleString()}</p>
        </div>
        {hotel.rejection_reason && (
          <div className="md:col-span-2">
            <p className="text-sm text-gray-400">Rejection Reason</p>
            <p className="font-medium text-red-400">{hotel.rejection_reason}</p>
          </div>
        )}
      </div>
    </div>
  );
}
