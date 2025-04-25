
import React, { useState, useEffect } from "react";
import { PlusCircle, ChevronUp, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FeaturesList } from "./features/FeaturesList";
import { hotelFeatures, roomFeatures } from "./features/featuresData";

interface HotelFeaturesStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function HotelFeaturesStep({ 
  onValidationChange = () => {}, 
  formData = {}, 
  updateFormData = () => {}
}: HotelFeaturesStepProps) {
  const { toast } = useToast();
  const [showHotelFeatureInput, setShowHotelFeatureInput] = useState(false);
  const [showRoomFeatureInput, setShowRoomFeatureInput] = useState(false);
  const [newHotelFeature, setNewHotelFeature] = useState("");
  const [newRoomFeature, setNewRoomFeature] = useState("");
  const [selectedHotelFeatures, setSelectedHotelFeatures] = useState<string[]>([]);
  const [selectedRoomFeatures, setSelectedRoomFeatures] = useState<string[]>([]);
  const [featuresHotel, setFeaturesHotel] = useState<Record<string, boolean>>(formData.featuresHotel || {});
  const [featuresRoom, setFeaturesRoom] = useState<Record<string, boolean>>(formData.featuresRoom || {});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRoom, setIsOpenRoom] = useState(false);

  // Initialize state from formData
  useEffect(() => {
    if (formData.featuresHotel && typeof formData.featuresHotel === 'object') {
      setFeaturesHotel(formData.featuresHotel);
      
      // Update selected features list for UI
      const selectedFeatures: string[] = [];
      Object.entries(formData.featuresHotel).forEach(([key, value]) => {
        if (value === true) {
          selectedFeatures.push(key);
        }
      });
      setSelectedHotelFeatures(selectedFeatures);
    }
    
    if (formData.featuresRoom && typeof formData.featuresRoom === 'object') {
      setFeaturesRoom(formData.featuresRoom);
      
      // Update selected features list for UI
      const selectedFeatures: string[] = [];
      Object.entries(formData.featuresRoom).forEach(([key, value]) => {
        if (value === true) {
          selectedFeatures.push(key);
        }
      });
      setSelectedRoomFeatures(selectedFeatures);
    }
  }, [formData.featuresHotel, formData.featuresRoom]);

  // Update form data when selections change
  useEffect(() => {
    updateFormData('featuresHotel', featuresHotel);
    updateFormData('featuresRoom', featuresRoom);
    
    // This step is valid if at least one feature is selected (either hotel or room)
    const hasSelectedFeatures = 
      Object.values(featuresHotel).some(v => v === true) || 
      Object.values(featuresRoom).some(v => v === true);
    
    onValidationChange(hasSelectedFeatures);
  }, [featuresHotel, featuresRoom, updateFormData, onValidationChange]);

  const handleSubmitFeature = (type: "hotel" | "room", feature: string) => {
    if (!feature.trim()) return;
    
    toast({
      title: "Feature suggestion submitted",
      description: `Your "${feature}" feature suggestion has been sent to the administrators for approval.`,
    });

    if (type === "hotel") {
      setNewHotelFeature("");
      setShowHotelFeatureInput(false);
    } else {
      setNewRoomFeature("");
      setShowRoomFeatureInput(false);
    }
  };

  const handleHotelFeatureChange = (feature: string, isChecked: boolean) => {
    const updatedFeatures = { ...featuresHotel, [feature]: isChecked };
    setFeaturesHotel(updatedFeatures);
    
    if (isChecked) {
      setSelectedHotelFeatures(prev => [...prev, feature]);
    } else {
      setSelectedHotelFeatures(prev => prev.filter(f => f !== feature));
    }
  };

  const handleRoomFeatureChange = (feature: string, isChecked: boolean) => {
    const updatedFeatures = { ...featuresRoom, [feature]: isChecked };
    setFeaturesRoom(updatedFeatures);
    
    if (isChecked) {
      setSelectedRoomFeatures(prev => [...prev, feature]);
    } else {
      setSelectedRoomFeatures(prev => prev.filter(f => f !== feature));
    }
  };

  return (
    <div className="space-y-6">
      <Collapsible className="w-full border border-white rounded-lg overflow-hidden bg-fuchsia-900/10" open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-[4px] text-left bg-fuchsia-900/20 border-b border-white">
          <h2 className="font-medium text-base text-white">Hotel Features</h2>
          {isOpen ? 
            <ChevronUp className="h-5 w-5 text-white" /> : 
            <ChevronDown className="h-5 w-5 text-white" />
          }
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <FeaturesList 
            features={hotelFeatures}
            onAddNewFeature={() => setShowHotelFeatureInput(true)}
            selectedFeatures={selectedHotelFeatures}
            onFeatureChange={handleHotelFeatureChange}
          />
          {showHotelFeatureInput && (
            <div className="mt-2 flex items-center gap-2">
              <Input
                value={newHotelFeature}
                onChange={(e) => setNewHotelFeature(e.target.value)}
                placeholder="Enter new feature suggestion"
                className="bg-fuchsia-950/30 border-fuchsia-500/30"
              />
              <Button 
                size="sm"
                onClick={() => handleSubmitFeature("hotel", newHotelFeature)}
                className="bg-fuchsia-600 hover:bg-fuchsia-700"
              >
                Submit
              </Button>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="w-full border border-white rounded-lg overflow-hidden bg-fuchsia-900/10" open={isOpenRoom} onOpenChange={setIsOpenRoom}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-[4px] text-left bg-fuchsia-900/20 border-b border-white">
          <h2 className="font-medium text-base text-white">Room Features</h2>
          {isOpenRoom ? 
            <ChevronUp className="h-5 w-5 text-white" /> : 
            <ChevronDown className="h-5 w-5 text-white" />
          }
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <FeaturesList 
            features={roomFeatures}
            onAddNewFeature={() => setShowRoomFeatureInput(true)}
            selectedFeatures={selectedRoomFeatures}
            onFeatureChange={handleRoomFeatureChange}
          />
          {showRoomFeatureInput && (
            <div className="mt-2 flex items-center gap-2">
              <Input
                value={newRoomFeature}
                onChange={(e) => setNewRoomFeature(e.target.value)}
                placeholder="Enter new feature suggestion"
                className="bg-fuchsia-950/30 border-fuchsia-500/30"
              />
              <Button 
                size="sm"
                onClick={() => handleSubmitFeature("room", newRoomFeature)}
                className="bg-fuchsia-600 hover:bg-fuchsia-700"
              >
                Submit
              </Button>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
