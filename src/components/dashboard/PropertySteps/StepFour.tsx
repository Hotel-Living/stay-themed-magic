
import React, { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HierarchicalActivitySelector } from "@/components/filters/HierarchicalActivitySelector";

interface StepFourProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function StepFour({ 
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: StepFourProps) {
  const [selectedActivities, setSelectedActivities] = useState<string[]>(formData.activities || []);

  // Initialize from form data
  useEffect(() => {
    if (formData.activities && Array.isArray(formData.activities)) {
      setSelectedActivities(formData.activities);
    }
  }, [formData.activities]);

  // Update parent form data when activities change
  useEffect(() => {
    if (updateFormData) {
      console.log("Updating activities in form data:", selectedActivities);
      updateFormData('activities', selectedActivities);
    }
    
    // Consider the step valid if at least one activity is selected
    const isValid = selectedActivities.length > 0;
    onValidationChange(isValid);
  }, [selectedActivities, updateFormData, onValidationChange]);

  const handleActivityChange = (activity: string, isChecked: boolean) => {
    setSelectedActivities(prev => {
      if (isChecked) {
        if (!prev.includes(activity)) {
          return [...prev, activity];
        }
        return prev;
      }
      return prev.filter(a => a !== activity);
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">ACTIVITIES</h2>
      
      <div className="space-y-6">
        {/* Hierarchical Activities Section */}
        <div className="bg-fuchsia-900/10 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 uppercase">Select Available Activities</h3>
          
          <HierarchicalActivitySelector
            selectedActivities={selectedActivities}
            onActivitySelect={handleActivityChange}
            allowMultiple={true}
            className="space-y-1"
          />
        </div>

        {selectedActivities.length === 0 && (
          <p className="text-sm text-red-400">
            Please select at least one activity to continue
          </p>
        )}

        {/* Custom Activities Section */}
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
