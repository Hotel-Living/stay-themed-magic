
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface DeleteConfirmDialogProps {
  handleDelete: () => void;
  closeDialog: () => void;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  handleDelete,
  closeDialog
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Deletion</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        Are you sure you want to delete this item? This action cannot be undone.
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={closeDialog}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
