
import React from "react";
import BasicInfoStep from "./BasicInfoStep";
import LocationStep from "./LocationStep";
import PicturesStep from "./PicturesStep";

export default function StepOne() {
  return (
    <div className="space-y-8">
      <BasicInfoStep />
      <LocationStep />
      <PicturesStep />
    </div>
  );
}
