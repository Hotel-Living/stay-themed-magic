
import React from 'react';
import { Hotel } from "@/integrations/supabase/types-custom";
import DetailView from "../../property-view/PropertyDetailView";

interface PropertyDetailViewProps {
  hotel: Hotel;
  onBack: () => void;
  onEdit: () => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ hotel, onBack, onEdit }) => {
  return (
    <div>
      <button
        className="mb-3 px-4 py-2 rounded bg-fuchsia-700 text-white"
        onClick={onBack}
      >
        Back to My Properties
      </button>
      <DetailView hotel={hotel} onEdit={onEdit} />
    </div>
  );
};
