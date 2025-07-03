
import React, { useState, useEffect } from "react";
import RoomsAndPricingStep from "./RoomsAndPricingStep";
import RoomTypeForm from "./StepTwo/RoomTypeForm";
import RoomTypeList from "./StepTwo/RoomTypeList";
import ValidationMessages from "./StepTwo/ValidationMessages";
import { RoomType } from "./StepTwo/types";

interface StepTwoProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function StepTwo({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: StepTwoProps) {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [error, setError] = useState<string>("");
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isAvailableRoomsOpen, setIsAvailableRoomsOpen] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Load initial data from parent formData if available
  useEffect(() => {
    if (formData && formData.roomTypes && formData.roomTypes.length > 0) {
      setRoomTypes(formData.roomTypes);
    }
  }, [formData]);

  const checkValidation = () => {
    if (roomTypes.length === 0) {
      setError("Please add at least one room type");
      onValidationChange(false);
      return false;
    }
    setError("");
    onValidationChange(true);
    return true;
  };

  const handleAddRoomType = (newRoom: Omit<RoomType, 'id'>) => {
    setHasInteracted(true);
    if (newRoom.name.trim() && newRoom.basePrice > 0) {
      const newRoomType = {
        ...newRoom,
        id: Date.now().toString()
      };
      const updatedRoomTypes = [...roomTypes, newRoomType];
      setRoomTypes(updatedRoomTypes);
      if (updateFormData) {
        updateFormData('roomTypes', updatedRoomTypes);
      }
      setIsAddRoomOpen(false);
    }
  };

  const handleRemoveRoomType = (id: string) => {
    setHasInteracted(true);
    const updatedRoomTypes = roomTypes.filter(room => room.id !== id);
    setRoomTypes(updatedRoomTypes);
    if (updateFormData) {
      updateFormData('roomTypes', updatedRoomTypes);
    }
  };

  useEffect(() => {
    checkValidation();
  }, [roomTypes]);

  // Listen for navigation attempts from parent
  useEffect(() => {
    const handleNavigationAttempt = () => {
      setShowValidationError(true);
    };

    window.addEventListener('attemptStepNavigation', handleNavigationAttempt);
    
    return () => {
      window.removeEventListener('attemptStepNavigation', handleNavigationAttempt);
    };
  }, []);

  return (
    <div className="space-y-8">
      <RoomsAndPricingStep />
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4"></div>
        
        <RoomTypeForm 
          isOpen={isAddRoomOpen} 
          setIsOpen={(open) => {
            setHasInteracted(true);
            setIsAddRoomOpen(open);
          }}
          onAddRoomType={handleAddRoomType}
        />
        
        <RoomTypeList
          roomTypes={roomTypes}
          isOpen={isAvailableRoomsOpen}
          setIsOpen={(open) => {
            setHasInteracted(true);
            setIsAvailableRoomsOpen(open);
          }}
          onRemoveRoomType={handleRemoveRoomType}
        />
        
        <ValidationMessages
          error={error}
          showValidationError={showValidationError && hasInteracted}
          hasInteracted={hasInteracted}
        />
      </div>
    </div>
  );
}
