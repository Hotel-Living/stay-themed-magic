
import React from 'react';
import AddProperty from "../../AddProperty";
import { useTranslation } from "@/hooks/useTranslation";

interface PropertyEditViewProps {
  hotelId: string;
  onBack: () => void;
}

export const PropertyEditView: React.FC<PropertyEditViewProps> = ({ hotelId, onBack }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <button
        className="mb-3 px-4 py-2 rounded bg-fuchsia-700 text-white"
        onClick={onBack}
      >
        {t('properties.backToProperties')}
      </button>
      <AddProperty editingHotelId={hotelId} onDoneEditing={onBack} />
    </div>
  );
};
