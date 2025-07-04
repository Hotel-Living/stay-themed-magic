
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from '@/hooks/useTranslation';

interface NewStep2PropertyDetailsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const NewStep2PropertyDetails: React.FC<NewStep2PropertyDetailsProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();
  
  // Mock data for demonstration - in production, these would come from API/database
  const mockAffinities = [
    'Adventure Sports', 'Art & Culture', 'Beach & Water Sports', 'Business Travel',
    'Culinary Experiences', 'Eco-Tourism', 'Family Friendly', 'Hiking & Nature',
    'Historical Sites', 'Luxury & Spa', 'Nightlife', 'Photography',
    'Romantic Getaways', 'Shopping', 'Wine & Gastronomy', 'Wellness & Yoga'
  ];

  const mockActivities = [
    'Beach Activities', 'City Tours', 'Cooking Classes', 'Cultural Visits',
    'Cycling', 'Diving & Snorkeling', 'Golf', 'Hiking Trails',
    'Museum Visits', 'Nature Walks', 'Photography Tours', 'Shopping Tours',
    'Spa & Wellness', 'Water Sports', 'Wine Tasting', 'Yoga Classes'
  ];

  const mockHotelFeatures = [
    '24/7 Reception', 'Air Conditioning', 'Airport Shuttle', 'Bar & Lounge',
    'Business Center', 'Concierge Service', 'Fitness Center', 'Free WiFi',
    'Laundry Service', 'Parking', 'Pet Friendly', 'Pool',
    'Restaurant', 'Room Service', 'Spa Services', 'Tour Desk'
  ];

  const mockRoomFeatures = [
    'Air Conditioning', 'Balcony/Terrace', 'Coffee/Tea Maker', 'Hair Dryer',
    'Internet Access', 'Mini Bar', 'Private Bathroom', 'Safe',
    'Satellite/Cable TV', 'Telephone', 'Wake-up Service', 'Work Desk'
  ];

  // Validation logic
  useEffect(() => {
    const hasAffinities = formData.selectedAffinities && formData.selectedAffinities.length > 0;
    const hasActivities = formData.selectedActivities && formData.selectedActivities.length > 0;
    const hasHotelFeatures = formData.selectedHotelFeatures && formData.selectedHotelFeatures.length > 0;
    const hasRoomFeatures = formData.selectedRoomFeatures && formData.selectedRoomFeatures.length > 0;

    const isValid = hasAffinities && hasActivities && hasHotelFeatures && hasRoomFeatures;
    onValidationChange(isValid);
  }, [formData.selectedAffinities, formData.selectedActivities, formData.selectedHotelFeatures, formData.selectedRoomFeatures, onValidationChange]);

  const toggleSelection = (field: string, item: string) => {
    const currentSelection = formData[field] || [];
    const newSelection = currentSelection.includes(item)
      ? currentSelection.filter((i: string) => i !== item)
      : [...currentSelection, item];
    
    updateFormData(field, newSelection);
  };

  const selectAll = (field: string, items: string[]) => {
    updateFormData(field, [...items]);
  };

  const deselectAll = (field: string) => {
    updateFormData(field, []);
  };

  const renderSection = (title: string, field: string, items: string[]) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-white text-lg font-semibold">
          {title} <span className="text-red-500">*</span>
        </Label>
        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => selectAll(field, items)}
            className="bg-purple-800/50 border-purple-600 text-white hover:bg-purple-700"
          >
            {t('dashboard.selectAll')}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => deselectAll(field)}
            className="bg-purple-800/50 border-purple-600 text-white hover:bg-purple-700"
          >
            {t('dashboard.deselectAll')}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggleSelection(field, item)}
            className={`p-3 rounded-lg text-sm font-medium border transition-all ${
              (formData[field] || []).includes(item)
                ? 'bg-purple-600 border-purple-400 text-white'
                : 'bg-purple-800/50 border-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{t('dashboard.propertyForm.features')}</h2>
        <p className="text-white/80">{t('dashboard.affinitiesDescription')}</p>
      </div>

      {renderSection(t('dashboard.affinities'), 'selectedAffinities', mockAffinities)}
      {renderSection(t('dashboard.activities'), 'selectedActivities', mockActivities)}
      {renderSection(t('dashboard.hotelFeatures'), 'selectedHotelFeatures', mockHotelFeatures)}
      {renderSection(t('dashboard.roomFeatures'), 'selectedRoomFeatures', mockRoomFeatures)}
    </div>
  );
};
