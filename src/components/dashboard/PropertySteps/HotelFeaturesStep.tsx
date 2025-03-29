
import React from "react";
import { PlusCircle, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { FeaturesList } from "./features/FeaturesList";

// Moving data to separate files for better maintainability
import { hotelFeatures, roomFeatures } from "./features/featuresData";

export default function HotelFeaturesStep() {
  return (
    <div className="space-y-6">
      {/* Hotel Features Section */}
      <FeatureCollapsible 
        title="HOTEL FEATURES" 
        features={hotelFeatures} 
      />
      
      {/* Room Features Section */}
      <FeatureCollapsible 
        title="ROOM FEATURES" 
        features={roomFeatures} 
      />
    </div>
  );
}

interface FeatureCollapsibleProps {
  title: string;
  features: string[];
}

function FeatureCollapsible({ title, features }: FeatureCollapsibleProps) {
  return (
    <div>
      <Collapsible className="w-full" defaultOpen={false}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
          <label className="block text-sm font-medium text-foreground/90 mb-2 uppercase">
            {title}
          </label>
          <ChevronRight className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <FeaturesList features={features} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
