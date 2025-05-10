
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useUserEdit = (id: string | undefined, profile: any, setEditing: (editing: boolean) => void, toast: any) => {
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    is_hotel_owner: false,
    is_active: true
  });

  // Update edit form when profile changes
  useEffect(() => {
    if (profile) {
      setEditForm({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        is_hotel_owner: profile.is_hotel_owner || false,
        is_active: profile.is_active !== false // Default to true if field doesn't exist
      });
    }
  }, [profile]);

  const handleSaveUserDetails = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          phone: editForm.phone,
          is_hotel_owner: editForm.is_hotel_owner,
          is_active: editForm.is_active
        })
        .eq("id", id);

      if (error) throw error;

      // Update the local profile state with the edited data
      // This will be handled by the parent component
      
      setEditing(false);
      toast({
        title: "Success",
        description: "User information updated successfully",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast({
        title: "Error updating user",
        description: error.message || "Failed to update user information",
        variant: "destructive"
      });
      
      throw error;
    }
  };

  return { editForm, setEditForm, handleSaveUserDetails };
};
