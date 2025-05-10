
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AdminNoteSectionProps {
  profileId: string;
  initialNote: string | null | undefined;
  onUpdateNote: (userId: string, note: string) => Promise<boolean>;
}

export const AdminNoteSection: React.FC<AdminNoteSectionProps> = ({ 
  profileId, 
  initialNote, 
  onUpdateNote 
}) => {
  const [note, setNote] = useState(initialNote || "");
  const [isSaving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setNote(initialNote || "");
  }, [initialNote]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!profileId) return;
    
    setSaving(true);
    try {
      const success = await onUpdateNote(profileId, note);
      if (success) {
        setIsDirty(false);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="admin-note" className="text-sm font-medium">
          Admin Note (Internal)
        </Label>
        {isDirty && (
          <Button 
            size="sm" 
            onClick={handleSave} 
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Note"}
          </Button>
        )}
      </div>
      <Textarea
        id="admin-note"
        value={note}
        onChange={handleChange}
        placeholder="This note is only visible to admins..."
        className="min-h-[120px] text-sm"
      />
      <p className="text-xs text-muted-foreground">
        This note is only visible to administrators and will not be shown to the user.
      </p>
    </div>
  );
};
