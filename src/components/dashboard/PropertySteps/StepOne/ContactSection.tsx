
import React from "react";
import FormField from "./FormField";
import CollapsibleSection from "./CollapsibleSection";

interface ContactSectionProps {
  formData: {
    contactName: string;
    contactEmail: string; 
    contactPhone: string; 
    [key: string]: string;
  };
  errors: {
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    [key: string]: string | undefined;
  };
  touchedFields: {
    contactName: boolean;
    contactEmail: boolean;
    contactPhone: boolean;
    [key: string]: boolean;
  };
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
  // Function to check if we should show error for a field
  const shouldShowError = (field: string) => {
    return touchedFields[field] && errors[field];
  };

  return (
    <CollapsibleSection title="CONTACT INFORMATION">
      <div className="space-y-2">
        <FormField
          id="contact-name"
          label="Contact Name"
          value={formData.contactName}
          onChange={(value) => handleChange("contactName", value)}
          onBlur={() => handleBlur("contactName")}
          error={shouldShowError("contactName") ? errors.contactName : ""}
          required={true}
        />
        
        <FormField
          id="contact-email"
          label="Email"
          type="email"
          value={formData.contactEmail}
          onChange={(value) => handleChange("contactEmail", value)}
          onBlur={() => handleBlur("contactEmail")}
          error={shouldShowError("contactEmail") ? errors.contactEmail : ""}
          required={true}
        />
        
        <FormField
          id="contact-phone"
          label="Phone"
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
