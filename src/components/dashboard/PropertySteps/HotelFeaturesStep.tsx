
import React, { useState } from "react";
import { PlusCircle, ChevronUp, ChevronDown, ChevronRight, Send } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FeaturesList } from "./features/FeaturesList";

// Moving data to separate files for better maintainability
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

  const handleFeatureChange = (feature: string, isChecked: boolean, type: "hotel" | "room") => {
    if (type === "hotel") {
      setSelectedHotelFeatures(prev => 
        isChecked 
          ? [...prev, feature] 
          : prev.filter(f => f !== feature)
      );
    } else {
      setSelectedRoomFeatures(prev => 
        isChecked 
          ? [...prev, feature] 
          : prev.filter(f => f !== feature)
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Hotel Features Section */}
      <Collapsible className="w-full mb-6 border border-white rounded-lg overflow-hidden bg-fuchsia-900/10">
        <CollapsibleTrigger className="w-full flex items-center justify-between px-4 text-left border-b border-white py-[4px]">
          <h2 className="font-medium text-base text-white">Hotel Features</h2>
          {showHotelFeatureInput ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <FeatureCollapsible 
            title="Hotel Features" 
            features={hotelFeatures}
            showInput={showHotelFeatureInput}
            setShowInput={setShowHotelFeatureInput}
            newFeature={newHotelFeature}
            setNewFeature={setNewHotelFeature}
            onSubmit={() => handleSubmitFeature("hotel", newHotelFeature)}
            selectedFeatures={selectedHotelFeatures}
            onFeatureChange={(feature, isChecked) => handleFeatureChange(feature, isChecked, "hotel")}
          />
        </CollapsibleContent>
      </Collapsible>
      
      {/* Room Features Section */}
      <Collapsible className="w-full mb-6 border border-white rounded-lg overflow-hidden bg-fuchsia-900/10">
        <CollapsibleTrigger className="w-full flex items-center justify-between px-4 text-left border-b border-white py-[4px]">
          <h2 className="font-medium text-base text-white">Room Features</h2>
          {showRoomFeatureInput ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <FeatureCollapsible 
            title="Room Features" 
            features={roomFeatures}
            showInput={showRoomFeatureInput}
            setShowInput={setShowRoomFeatureInput}
            newFeature={newRoomFeature}
            setNewFeature={setNewRoomFeature}
            onSubmit={() => handleSubmitFeature("room", newRoomFeature)}
            selectedFeatures={selectedRoomFeatures}
            onFeatureChange={(feature, isChecked) => handleFeatureChange(feature, isChecked, "room")}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

interface FeatureCollapsibleProps {
  title: string;
  features: string[];
  showInput: boolean;
  setShowInput: (show: boolean) => void;
  newFeature: string;
  setNewFeature: (feature: string) => void;
  onSubmit: () => void;
  selectedFeatures: string[];
  onFeatureChange: (feature: string, isChecked: boolean) => void;
}

function FeatureCollapsible({ 
  title, 
  features,
  showInput,
  setShowInput,
  newFeature,
  setNewFeature,
  onSubmit,
  selectedFeatures,
  onFeatureChange
}: FeatureCollapsibleProps) {
  return (
    <div>
      <Collapsible className="w-full" defaultOpen={false}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
          <label className="block text-sm font-medium text-foreground/90 mb-2 uppercase">
            {title} <span className="text-red-500">*</span>
          </label>
          <ChevronRight className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature) => (
                <label key={feature} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                    checked={selectedFeatures.includes(feature)}
                    onChange={(e) => onFeatureChange(feature, e.target.checked)}
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
              <div className="flex items-center cursor-pointer" onClick={() => setShowInput(true)}>
                <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                <span className="text-sm text-fuchsia-400">Add new feature</span>
              </div>
            </div>

            {showInput && (
              <div className="mt-2 flex items-center gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Enter new feature suggestion"
                  className="bg-fuchsia-950/30 border-fuchsia-500/30"
                />
                <Button 
                  size="sm"
                  onClick={onSubmit}
                  className="bg-fuchsia-600 hover:bg-fuchsia-700"
                >
                  <Send className="w-4 h-4 mr-1" /> Send
                </Button>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
