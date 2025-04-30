
import React, { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface ActivityData {
  id: string;
  name: string;
  category?: string;
}

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
  const [activitiesData, setActivitiesData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('id, name, category')
          .order('name');

        if (error) {
          console.error("Error fetching activities:", error);
          return;
        }

        if (data) {
          console.log("StepFour - Fetched activities:", data);
          setActivitiesData(data);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Update parent form data when activities change
  useEffect(() => {
    if (updateFormData) {
      updateFormData('activities', selectedActivities);
    }
  }, [selectedActivities, updateFormData]);

  // Update validation based on selected activities
  useEffect(() => {
    // Consider the step valid if at least one activity is selected
    const isValid = selectedActivities.length > 0;
    onValidationChange(isValid);
  }, [selectedActivities, onValidationChange]);

  // Group activities by category
  const groupedActivities = activitiesData.reduce<Record<string, ActivityData[]>>((acc, activity) => {
    const category = activity.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(activity);
    return acc;
  }, {});

  const handleActivityChange = (activityId: string, isChecked: boolean) => {
    setSelectedActivities(prev => {
      if (isChecked) {
        return [...prev, activityId];
      }
      return prev.filter(a => a !== activityId);
    });
  };

  // Function to get activity name by id
  const getActivityName = (id: string) => {
    const activity = activitiesData.find(a => a.id === id);
    return activity?.name || id;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">ACTIVITIES</h2>
      
      <div className="space-y-6">
        {/* Activities Section */}
        <div className="bg-fuchsia-900/10 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 uppercase">Select Available Activities</h3>
          
          {loading ? (
            <p>Loading activities...</p>
          ) : activitiesData.length === 0 ? (
            <p>No activities available. Please contact an administrator.</p>
          ) : (
            Object.entries(groupedActivities).map(([category, activities]) => (
              <div key={category} className="mb-4">
                <h4 className="text-sm font-medium mb-2 text-fuchsia-200">{category}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ml-2">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-2">
                      <input 
                        type="checkbox"
                        id={`activity-${activity.id}`}
                        checked={selectedActivities.includes(activity.id)}
                        onChange={(e) => handleActivityChange(activity.id, e.target.checked)}
                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4"
                      />
                      <label 
                        htmlFor={`activity-${activity.id}`}
                        className="text-sm text-white"
                      >
                        {activity.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
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
