
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

interface AdminNoteSectionProps {
  profileId: string;
  initialNote: string | null;
  // Explicitly specify void return to ensure consistency
  onUpdateNote: (userId: string, note: string) => Promise<void>;
}

export const AdminNoteSection: React.FC<AdminNoteSectionProps> = ({
  profileId,
  initialNote,
  onUpdateNote
}) => {
  const [note, setNote] = useState(initialNote || "");
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveNote = async (): Promise<void> => {
    if (!profileId) return;
    
    setIsSaving(true);
    try {
      // Call without capturing return value
      await onUpdateNote(profileId, note);
    } catch (error) {
      console.error("Failed to save admin note:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="space-y-2">
      <Textarea
        id="admin-note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="This note is only visible to admins..."
        className="min-h-[100px]"
      />
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveNote} 
          disabled={isSaving} 
          size="sm"
          variant="outline"
          className="gap-1"
        >
          <SaveIcon className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Note"}
        </Button>
      </div>
    </div>
  );
}
