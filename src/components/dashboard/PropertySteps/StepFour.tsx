
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StepFourProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepFour({ onValidationChange = () => {} }: StepFourProps) {
  // Simulating validation after component mounts
  React.useEffect(() => {
    onValidationChange(true);
  }, [onValidationChange]);

  const themes = [
    "Beach", "Mountain", "City", "Countryside", "Desert", 
    "Forest", "Lake", "River", "Island", "Ski Resort"
  ];

  const activities = [
    "Swimming", "Hiking", "Cycling", "Fishing", "Boating",
    "Skiing", "Snowboarding", "Golf", "Tennis", "Yoga",
    "Spa", "Cooking Classes", "Wine Tasting", "Sightseeing"
  ];

  return (
    <div className="space-y-6">
      {/* Add bold title */}
      <h2 className="text-xl font-bold mb-4">THEMES</h2>
      
      <div className="space-y-6">
        {/* Themes Section */}
        <div className="bg-fuchsia-900/10 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 uppercase">Select Property Themes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {themes.map((theme) => (
              <div key={theme} className="flex items-center space-x-2">
                <Checkbox id={`theme-${theme}`} />
                <Label htmlFor={`theme-${theme}`} className="text-sm">{theme}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Activities Section */}
        <div className="bg-fuchsia-900/10 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 uppercase">Available Activities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {activities.map((activity) => (
              <div key={activity} className="flex items-center space-x-2">
                <Checkbox id={`activity-${activity}`} />
                <Label htmlFor={`activity-${activity}`} className="text-sm">{activity}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Custom Activities */}
        <div className="bg-fuchsia-900/10 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 uppercase">Add Custom Activities</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="activity-name">Activity Name</Label>
              <Input id="activity-name" placeholder="e.g. Local Pottery Workshop" className="bg-fuchsia-950/30" />
            </div>
            <div>
              <Label htmlFor="activity-description">Description</Label>
              <Textarea id="activity-description" placeholder="Describe the activity..." className="bg-fuchsia-950/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="activity-duration">Duration (hours)</Label>
                <Input id="activity-duration" type="number" min="0.5" step="0.5" placeholder="2" className="bg-fuchsia-950/30" />
              </div>
              <div>
                <Label htmlFor="activity-price">Price ($)</Label>
                <Input id="activity-price" type="number" min="0" placeholder="25" className="bg-fuchsia-950/30" />
              </div>
            </div>
            <button className="w-full py-2 text-sm bg-fuchsia-900/30 hover:bg-fuchsia-900/50 border border-fuchsia-500/30 rounded-lg uppercase">
              Add Custom Activity
            </button>
          </div>
        </div>
        
        {/* Accessibility Features */}
        <div className="bg-fuchsia-900/10 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 uppercase">Accessibility Features</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="wheelchair" />
              <Label htmlFor="wheelchair" className="text-sm">Wheelchair Accessible</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="elevator" />
              <Label htmlFor="elevator" className="text-sm">Elevator</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="accessible-bathroom" />
              <Label htmlFor="accessible-bathroom" className="text-sm">Accessible Bathroom</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="accessible-parking" />
              <Label htmlFor="accessible-parking" className="text-sm">Accessible Parking</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
