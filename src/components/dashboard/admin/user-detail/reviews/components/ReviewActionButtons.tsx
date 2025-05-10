
import React from "react";
import { Button } from "@/components/ui/button";

interface ReviewActionButtonsProps {
  isHidden: boolean;
  isFlagged: boolean;
  onEdit: () => void;
  onToggleVisibility: () => void;
  onToggleFlag: () => void;
}

export const ReviewActionButtons: React.FC<ReviewActionButtonsProps> = ({ 
  isHidden, 
  isFlagged, 
  onEdit, 
  onToggleVisibility, 
  onToggleFlag 
}) => {
  return (
    <div className="mt-2 flex gap-2">
      <Button size="sm" variant="outline" onClick={onEdit}>
        Edit
      </Button>
      <Button 
        size="sm" 
        variant={isHidden ? "default" : "secondary"}
        onClick={onToggleVisibility}
      >
        {isHidden ? "Publish" : "Hide"}
      </Button>
      <Button 
        size="sm" 
        variant={isFlagged ? "outline" : "destructive"}
        onClick={onToggleFlag}
      >
        {isFlagged ? "Remove Flag" : "Flag"}
      </Button>
    </div>
  );
};
