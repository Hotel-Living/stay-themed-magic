
import React from "react";
import AddPropertyForm from "./property/AddPropertyForm";

// New props for edit functionality
export default function AddProperty({
  editingHotelId,
  onDoneEditing
}: {
  editingHotelId?: string | null;
  onDoneEditing?: () => void;
} = {}) {
  return <AddPropertyForm editingHotelId={editingHotelId} onDoneEditing={onDoneEditing} />;
}
