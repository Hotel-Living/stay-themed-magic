
import React from "react";
import FormField from "./FormField";
import CollapsibleSection from "./CollapsibleSection";
import { useTranslation } from "@/hooks/useTranslation";

interface ContactSectionProps {
  formData: {
    contactName: string;
    contactEmail: string; // Changed from email to contactEmail
    contactPhone: string; // Changed from phone to contactPhone
  };
  errors: Record<string, string>;
  touchedFields: Record<string, boolean>;
  handleChange: (field: string, value: string) => void;
  handleBlur: (field: string) => void;
}

export default function ContactSection({
  formData,
  errors,
  touchedFields,
  handleChange,
  handleBlur
}: ContactSectionProps) {
  const { t } = useTranslation();
  
  // Function to check if we should show error for a field
  const shouldShowError = (field: string) => {
    return touchedFields[field] && errors[field];
  };

  return (
    <CollapsibleSection title={t('dashboard.contactInformation')}>
      <div className="space-y-2">
        <FormField
          id="contact-name"
          label={t('dashboard.contactName')}
          value={formData.contactName}
          onChange={(value) => handleChange("contactName", value)}
          onBlur={() => handleBlur("contactName")}
          error={shouldShowError("contactName") ? errors.contactName : ""}
          required={true}
        />
        
        <FormField
          id="contact-email"
          label={t('dashboard.email')}
          type="email"
          value={formData.contactEmail}
          onChange={(value) => handleChange("contactEmail", value)}
          onBlur={() => handleBlur("contactEmail")}
          error={shouldShowError("contactEmail") ? errors.contactEmail : ""}
          required={true}
        />
        
        <FormField
          id="contact-phone"
          label={t('dashboard.phone')}
          value={formData.contactPhone}
          onChange={(value) => handleChange("contactPhone", value)}
          onBlur={() => handleBlur("contactPhone")}
          error={shouldShowError("contactPhone") ? errors.contactPhone : ""}
          required={true}
        />
      </div>
    </CollapsibleSection>
  );
}
