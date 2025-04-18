
import React, { useState, useEffect } from "react";
import RoomsAndPricingStep from "./RoomsAndPricingStep";
import RoomTypeForm from "./StepTwo/RoomTypeForm";
import RoomTypeList from "./StepTwo/RoomTypeList";
import ValidationMessages from "./StepTwo/ValidationMessages";
import { RoomType } from "./StepTwo/types";

interface StepTwoProps {
  onValidationChange?: (isValid: boolean, data?: any) => void;
  initialData?: any;
}

export default function StepTwo({
  onValidationChange = () => {},
  initialData = {}
}: StepTwoProps) {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>(initialData?.roomTypes || []);
  const [error, setError] = useState<string>("");
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isAvailableRoomsOpen, setIsAvailableRoomsOpen] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>(
    initialData?.stayLengths || []
  );
  const [selectedMealPlans, setSelectedMealPlans] = useState<string[]>(
    initialData?.mealPlans || []
  );

  console.log("StepTwo component rendered");

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
      <h2 className="text-xl font-bold mb-4 text-white">ACCOMMODATION DETAILS</h2>
      
      <RoomsAndPricingStep 
        onStayLengthsChange={handleStayLengthsUpdate}
        onMealPlansChange={handleMealPlansUpdate}
      />
      
      <div className="mt-8">
        <div className="glass-card rounded-xl p-4 bg-[#690695]/40">
          <h3 className="text-lg font-semibold text-white mb-4">Room Types</h3>
          
          <button
            onClick={() => setIsAddRoomOpen(true)}
            className="w-full py-2 px-4 mb-4 border border-dashed border-fuchsia-400 rounded-lg hover:bg-fuchsia-900/20 transition-colors text-fuchsia-100"
          >
            + Add New Room Type
          </button>
          
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
    </div>
  );
}
