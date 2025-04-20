
import React, { useEffect, useState } from "react";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function StepThree() {
  const { formData, setFieldValue } = usePropertyForm();
  const [themesInput, setThemesInput] = useState("");
  const [activitiesInput, setActivitiesInput] = useState("");

  useEffect(() => {
    if (formData.themes) {
      setThemesInput(formData.themes.join(", "));
    }
    if (formData.activities) {
      setActivitiesInput(formData.activities.join(", "));
    }
  }, [formData]);

  const handleThemesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setThemesInput(value);
    setFieldValue("themes", value.split(",").map((t) => t.trim()).filter(Boolean));
  };

  const handleActivitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setActivitiesInput(value);
    setFieldValue("activities", value.split(",").map((a) => a.trim()).filter(Boolean));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">AFFINITIES & ACTIVITIES</h2>

      <div>
        <Label htmlFor="themes" className="text-white mb-1 block">
          Affinities (comma-separated)
        </Label>
        <Input
          id="themes"
          value={themesInput}
          onChange={handleThemesChange}
          placeholder="e.g. Tango, Foodie, Yoga"
          className="bg-[#7a0486] text-white border-white"
        />
      </div>

      <div>
        <Label htmlFor="activities" className="text-white mb-1 block">
          Activities (comma-separated)
        </Label>
        <Input
          id="activities"
          value={activitiesInput}
          onChange={handleActivitiesChange}
          placeholder="e.g. Hiking, Cooking Class"
          className="bg-[#7a0486] text-white border-white"
        />
      </div>

      <div className="text-sm text-white opacity-80">
        You can list as many as you'd like. Separate them with commas.
      </div>
    </div>
  );
}
