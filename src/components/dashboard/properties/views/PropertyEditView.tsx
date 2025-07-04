
import React from 'react';
import { NewAddPropertyForm } from "../../new-add-property/NewAddPropertyForm";

interface PropertyEditViewProps {
  hotelId: string;
  onBack: () => void;
}

export const PropertyEditView: React.FC<PropertyEditViewProps> = ({ hotelId, onBack }) => {
  return (
    <div>
      <button
        className="mb-3 px-4 py-2 rounded bg-fuchsia-700 text-white"
        onClick={onBack}
      >
        Back to My Properties
      </button>
      <NewAddPropertyForm editingHotelId={hotelId} onDoneEditing={onBack} />
    </div>
  );
};
