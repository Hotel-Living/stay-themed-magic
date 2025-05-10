
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewEditorProps {
  editText: string;
  isSubmitting: boolean;
  onEditChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
  originalText: string;
}

export const ReviewEditor: React.FC<ReviewEditorProps> = ({ 
  editText, 
  isSubmitting, 
  onEditChange, 
  onSave, 
  onCancel,
  originalText
}) => {
  return (
    <div className="mt-2">
      <Textarea 
        value={editText} 
        onChange={(e) => onEditChange(e.target.value)}
        className="min-h-[80px] mb-2"
      />
      <div className="flex gap-2 justify-end">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          size="sm" 
          onClick={onSave}
          disabled={isSubmitting || editText === originalText}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
