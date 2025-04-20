
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function StepThree() {
  const themes = [
    "Beach", "Mountain", "City", "Countryside", "Desert",
    "Forest", "Lake", "River", "Island", "Ski Resort"
  ];

  const activities = [
    "Swimming", "Hiking", "Cycling", "Fishing", "Boating",
    "Skiing", "Snowboarding", "Golf", "Tennis", "Yoga"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">AFFINITIES & ACTIVITIES</h2>
      
      <div className="bg-fuchsia-900/10 rounded-lg p-4">
        <h3 className="text-sm font-medium mb-4 text-white uppercase">Select Affinities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {themes.map((theme) => (
            <div key={theme} className="flex items-center space-x-2">
              <Checkbox id={`theme-${theme}`} />
              <Label htmlFor={`theme-${theme}`} className="text-sm text-white">{theme}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-fuchsia-900/10 rounded-lg p-4">
        <h3 className="text-sm font-medium mb-4 text-white uppercase">Available Activities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {activities.map((activity) => (
            <div key={activity} className="flex items-center space-x-2">
              <Checkbox id={`activity-${activity}`} />
              <Label htmlFor={`activity-${activity}`} className="text-sm text-white">{activity}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
