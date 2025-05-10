
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

interface StatusSelectorProps {
  hotelId: string;
  currentStatus: string;
  onSuccess?: () => Promise<void>;
}

export function StatusSelector({ hotelId, currentStatus, onSuccess }: StatusSelectorProps) {
  const [newStatus, setNewStatus] = useState<string>(currentStatus || "pending");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const updateStatus = async () => {
    setIsLoading(true);
    
    const { error } = await supabase
      .from("hotels")
      .update({ status: newStatus })
      .eq("id", hotelId);

    setIsLoading(false);

    if (!error) {
      toast({
        title: "Success",
        description: "Hotel status updated successfully",
      });
      
      // Refetch hotel data if onSuccess function is provided
      if (onSuccess) {
        await onSuccess();
      }
    } else {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
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
        disabled={isLoading || newStatus === currentStatus}
      >
        <Save className="w-4 h-4 mr-1" />
        Save
      </Button>
    </div>
  );
}
