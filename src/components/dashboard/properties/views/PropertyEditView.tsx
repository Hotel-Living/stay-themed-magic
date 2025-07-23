
import React from 'react';
import AddProperty2Content from "../../AddProperty2Content";

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
      <div className="text-amber-300 p-4 bg-amber-900/20 rounded mb-4">
        Hotel editing temporarily redirects to the property form. Complete hotel management will be available soon.
      </div>
      <AddProperty2Content />
    </div>
  );
};
