
import React from "react";
import FormField from "./FormField";
import { useTranslation } from "@/hooks/useTranslation";

interface ContactSectionProps {
  formData: {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
  };
  errors: {
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
  };
  touchedFields: {
    contactName: boolean;
    contactEmail: boolean;
    contactPhone: boolean;
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
  const { t } = useTranslation();

  return (
    <div className="glass-card rounded-xl p-6 space-y-6 bg-[#690695]/40">
      <h3 className="text-lg font-semibold text-white uppercase">{t('contact.title')}</h3>
      
      <div className="grid gap-4">
        <FormField
          label={t('contact.contactName')}
          value={formData.contactName}
          onChange={value => handleChange("contactName", value)}
          onBlur={() => handleBlur("contactName")}
          hasError={touchedFields.contactName && !!errors.contactName}
          errorMessage={errors.contactName}
          required
        />
        
        <FormField
          label={t('contact.contactEmail')}
          type="email"
          value={formData.contactEmail}
          onChange={value => handleChange("contactEmail", value)}
          onBlur={() => handleBlur("contactEmail")}
          hasError={touchedFields.contactEmail && !!errors.contactEmail}
          errorMessage={errors.contactEmail}
          required
        />
        
        <FormField
          label={t('contact.contactPhone')}
          type="tel"
          value={formData.contactPhone}
          onChange={value => handleChange("contactPhone", value)}
          onBlur={() => handleBlur("contactPhone")}
          hasError={touchedFields.contactPhone && !!errors.contactPhone}
          errorMessage={errors.contactPhone}
          required
        />
      </div>
    </div>
  );
}
