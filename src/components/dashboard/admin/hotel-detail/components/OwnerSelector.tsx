
import React, { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HotelOwner } from "../hooks/useHotelOwners";

interface OwnerSelectorProps {
  hotelId: string;
  currentOwnerId: string | null;
  hotelOwners: HotelOwner[];
  onSuccess?: () => Promise<void>;
}

export function OwnerSelector({ hotelId, currentOwnerId, hotelOwners, onSuccess }: OwnerSelectorProps) {
  const [newOwnerId, setNewOwnerId] = useState<string | null>(currentOwnerId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const updateOwner = async () => {
    setIsLoading(true);
    
    const { error } = await supabase
      .from("hotels")
      .update({ owner_id: newOwnerId })
      .eq("id", hotelId);

    setIsLoading(false);

    if (!error) {
      toast({
        title: "Success",
        description: "Hotel owner reassigned successfully",
      });
      
      // Refetch hotel data if onSuccess function is provided
      if (onSuccess) {
        await onSuccess();
      }
    } else {
      toast({
        title: "Error updating owner",
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

  return (
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
        disabled={isLoading || newOwnerId === currentOwnerId}
      >
        <Save className="w-4 h-4 mr-1" />
        Save
      </Button>
    </div>
  );
}
