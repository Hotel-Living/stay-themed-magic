
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdminNoteSectionProps {
  reviewId: string;
  initialNote: string | null;
  onUpdate: (note: string) => void;
}

export const AdminNoteSection: React.FC<AdminNoteSectionProps> = ({ 
  reviewId, 
  initialNote,
  onUpdate
}) => {
  const [adminNote, setAdminNote] = useState(initialNote || "");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const { toast } = useToast();

  const saveAdminNote = async () => {
    setIsSavingNote(true);
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ admin_note: adminNote })
        .eq("id", reviewId);

      if (error) throw error;
      
      toast({
        title: "Admin note saved",
        description: "The admin note has been successfully saved",
      });
      
      // Update parent component
      onUpdate(adminNote);
    } catch (error) {
      console.error("Error saving admin note:", error);
      toast({
        title: "Save failed",
        description: "Failed to save admin note. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSavingNote(false);
    }
  };

  return (
    <div className="mt-3 border-t pt-3">
      <Label htmlFor={`admin-note-${reviewId}`} className="text-sm font-medium">
        Admin Note
      </Label>
      <div className="mt-1 flex gap-2">
        <Textarea
          id={`admin-note-${reviewId}`}
          value={adminNote}
          onChange={(e) => setAdminNote(e.target.value)}
          placeholder="Private note visible only to admins"
          className="min-h-[60px] text-sm"
        />
      </div>
      <div className="flex justify-end mt-1">
        <Button
          size="sm"
          variant="outline"
          onClick={saveAdminNote}
          disabled={isSavingNote || adminNote === initialNote}
        >
          {isSavingNote ? "Saving..." : "Save Note"}
        </Button>
      </div>
    </div>
  );
};
