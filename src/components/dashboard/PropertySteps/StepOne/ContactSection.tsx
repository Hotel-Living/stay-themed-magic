
import React from "react";
import FormField from "./FormField";
import CollapsibleSection from "./CollapsibleSection";

interface ContactSectionProps {
  formData: {
    contactName: string;
    email: string;
    phone: string;
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
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          onBlur={() => handleBlur("email")}
          error={shouldShowError("email") ? errors.email : ""}
          required={true}
        />
        
        <FormField
          id="phone"
          label="Phone"
          value={formData.phone}
          onChange={(value) => handleChange("phone", value)}
          onBlur={() => handleBlur("phone")}
          error={shouldShowError("phone") ? errors.phone : ""}
          required={true}
        />
      </div>
    </CollapsibleSection>
  );
}
