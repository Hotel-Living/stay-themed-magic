
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface GeneralInformationStep1Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export function GeneralInformationStep1({
  formData,
  updateFormData,
  onValidationChange = () => {}
}: GeneralInformationStep1Props) {
  const { t } = useTranslation();

  // Validate form when data changes
  useEffect(() => {
    const isValid = formData?.hotelName && 
                   formData?.country && 
                   formData?.city && 
                   formData?.description;
    onValidationChange(isValid);
  }, [formData, onValidationChange]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">GENERAL INFORMATION</h2>
        <p className="text-gray-300">Basic details about your property</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Hotel Name *</label>
          <input
            type="text"
            value={formData?.hotelName || ""}
            onChange={(e) => updateFormData("hotelName", e.target.value)}
            placeholder="Enter hotel name"
            className="w-full p-3 rounded bg-fuchsia-950/50 border border-fuchsia-800/30 text-white placeholder:text-gray-400"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Country *</label>
            <select
              value={formData?.country || ""}
              onChange={(e) => updateFormData("country", e.target.value)}
              className="w-full p-3 rounded bg-fuchsia-950/50 border border-fuchsia-800/30 text-white"
              required
            >
              <option value="">Select Country</option>
              <option value="Spain">Spain</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Portugal">Portugal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">City *</label>
            <input
              type="text"
              value={formData?.city || ""}
              onChange={(e) => updateFormData("city", e.target.value)}
              placeholder="Enter city"
              className="w-full p-3 rounded bg-fuchsia-950/50 border border-fuchsia-800/30 text-white placeholder:text-gray-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Category *</label>
          <select
            value={formData?.category || ""}
            onChange={(e) => updateFormData("category", e.target.value)}
            className="w-full p-3 rounded bg-fuchsia-950/50 border border-fuchsia-800/30 text-white"
            required
          >
            <option value="">Select hotel category</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Property Type *</label>
          <select
            value={formData?.propertyType || ""}
            onChange={(e) => updateFormData("propertyType", e.target.value)}
            className="w-full p-3 rounded bg-fuchsia-950/50 border border-fuchsia-800/30 text-white"
            required
          >
            <option value="">Select property type</option>
            <option value="Hotel">Hotel</option>
            <option value="Resort">Resort</option>
            <option value="Boutique Hotel">Boutique Hotel</option>
            <option value="Country House">Country House</option>
            <option value="Roadside Motel">Roadside Motel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Description *</label>
          <textarea
            value={formData?.description || ""}
            onChange={(e) => updateFormData("description", e.target.value)}
            placeholder="Describe your property"
            rows={4}
            className="w-full p-3 rounded bg-fuchsia-950/50 border border-fuchsia-800/30 text-white placeholder:text-gray-400 resize-none"
            required
          />
        </div>
      </div>
    </div>
  );
}
