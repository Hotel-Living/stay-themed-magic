
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeletePropertyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hotelName: string;
  refetch: () => void;
}

export const DeletePropertyDialog: React.FC<DeletePropertyDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  hotelName
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-purple-900 border-purple-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Delete Property
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            Are you sure you want to delete "{hotelName}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onClose}
            className="bg-gray-600 text-white hover:bg-gray-700"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
