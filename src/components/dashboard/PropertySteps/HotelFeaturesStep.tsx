
import React, { useState } from "react";
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

export default function HotelFeaturesStep() {
  const { toast } = useToast();
  const [showHotelFeatureInput, setShowHotelFeatureInput] = useState(false);
  const [showRoomFeatureInput, setShowRoomFeatureInput] = useState(false);
  const [newHotelFeature, setNewHotelFeature] = useState("");
  const [newRoomFeature, setNewRoomFeature] = useState("");
  const [selectedHotelFeatures, setSelectedHotelFeatures] = useState<string[]>([]);
  const [selectedRoomFeatures, setSelectedRoomFeatures] = useState<string[]>([]);

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

  return (
    <div className="space-y-6">
      <Collapsible className="w-full mb-6 border border-white rounded-lg overflow-hidden bg-fuchsia-900/10">
        <CollapsibleTrigger className="w-full flex items-center justify-between px-4 text-left border-b border-white py-[4px]">
          <h2 className="font-medium text-base text-white">Hotel Features</h2>
          <ChevronDown className="h-5 w-5 text-white" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <FeaturesList 
            features={hotelFeatures}
            onAddNewFeature={() => setShowHotelFeatureInput(true)}
            selectedFeatures={selectedHotelFeatures}
            onFeatureChange={(feature, isChecked) => {
              if (isChecked) {
                setSelectedHotelFeatures(prev => [...prev, feature]);
              } else {
                setSelectedHotelFeatures(prev => prev.filter(f => f !== feature));
              }
            }}
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

      <Collapsible className="w-full mb-6 border border-white rounded-lg overflow-hidden bg-fuchsia-900/10">
        <CollapsibleTrigger className="w-full flex items-center justify-between px-4 text-left border-b border-white py-[4px]">
          <h2 className="font-medium text-base text-white">Room Features</h2>
          <ChevronDown className="h-5 w-5 text-white" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <FeaturesList 
            features={roomFeatures}
            onAddNewFeature={() => setShowRoomFeatureInput(true)}
            selectedFeatures={selectedRoomFeatures}
            onFeatureChange={(feature, isChecked) => {
              if (isChecked) {
                setSelectedRoomFeatures(prev => [...prev, feature]);
              } else {
                setSelectedRoomFeatures(prev => prev.filter(f => f !== feature));
              }
            }}
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
