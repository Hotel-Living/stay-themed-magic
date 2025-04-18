
import React, { useState, useEffect } from "react";
import RoomsAndPricingStep from "./RoomsAndPricingStep";
import RoomTypeForm from "./StepTwo/RoomTypeForm";
import RoomTypeList from "./StepTwo/RoomTypeList";
import ValidationMessages from "./StepTwo/ValidationMessages";
import { RoomType } from "./StepTwo/types";

interface StepTwoProps {
  onValidationChange?: (isValid: boolean, data?: any) => void;
}

export default function StepTwo({
  onValidationChange = () => {}
}: StepTwoProps) {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [error, setError] = useState<string>("");
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isAvailableRoomsOpen, setIsAvailableRoomsOpen] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>([]);
  const [selectedMealPlans, setSelectedMealPlans] = useState<string[]>([]);

  const checkValidation = () => {
    if (roomTypes.length === 0) {
      setError("Please add at least one room type");
      onValidationChange(false);
      return false;
    }
    
    if (selectedStayLengths.length === 0) {
      setError("Please select at least one stay length");
      onValidationChange(false);
      return false;
    }
    
    if (selectedMealPlans.length === 0) {
      setError("Please select at least one meal plan");
      onValidationChange(false);
      return false;
    }
    
    setError("");
    onValidationChange(true, {
      roomTypes: roomTypes,
      stayLengths: selectedStayLengths,
      mealPlans: selectedMealPlans
    });
    return true;
  };

  const handleAddRoomType = (newRoom: Omit<RoomType, 'id'>) => {
    if (newRoom.name.trim() && newRoom.basePrice > 0) {
      const newRoomType = {
        ...newRoom,
        id: Date.now().toString()
      };
      setRoomTypes([...roomTypes, newRoomType]);
      setIsAddRoomOpen(false);
    }
  };

  const handleRemoveRoomType = (id: string) => {
    setRoomTypes(roomTypes.filter(room => room.id !== id));
  };
  
  // Handle stay lengths updates
  const handleStayLengthsUpdate = (lengths: number[]) => {
    setSelectedStayLengths(lengths);
  };
  
  // Handle meal plans updates
  const handleMealPlansUpdate = (plans: string[]) => {
    setSelectedMealPlans(plans);
  };

  useEffect(() => {
    checkValidation();
  }, [roomTypes, selectedStayLengths, selectedMealPlans]);

  return (
    <div className="space-y-8">
      <RoomsAndPricingStep 
        onStayLengthsChange={handleStayLengthsUpdate}
        onMealPlansChange={handleMealPlansUpdate}
      />
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4"></div>
        
        <RoomTypeForm 
          isOpen={isAddRoomOpen} 
          setIsOpen={setIsAddRoomOpen}
          onAddRoomType={handleAddRoomType}
        />
        
        <RoomTypeList
          roomTypes={roomTypes}
          isOpen={isAvailableRoomsOpen}
          setIsOpen={setIsAvailableRoomsOpen}
          onRemoveRoomType={handleRemoveRoomType}
        />
        
        <ValidationMessages
          error={error}
          showValidationError={showValidationError}
          roomTypesCount={roomTypes.length}
        />
      </div>
    </div>
  );
}
