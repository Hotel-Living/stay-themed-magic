import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import StayLengthSection from './StayLengthSection';
import PreferredWeekdaySection from './PreferredWeekdaySection';
import ValidationMessages from './ValidationMessages';
import { useValidationState } from './hooks/useValidationState';
import { useSectionsState } from './hooks/useSectionsState';

interface AccommodationTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

const AccommodationTermsStep: React.FC<AccommodationTermsStepProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();
  const [showValidation, setShowValidation] = useState(false);
  
  const { sectionsState, toggleSection } = useSectionsState();

  const { 
    error, 
    setError, 
    showValidationErrors, 
    setShowValidationErrors, 
    hasInteracted, 
    setHasInteracted, 
    isValid 
  } = useValidationState({
    selectedStayLengths: formData.stayLengths || [],
    selectedMealPlans: formData.mealPlans || [],
    roomTypes: formData.roomTypes || [],
    onValidationChange
  });
