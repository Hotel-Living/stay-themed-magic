import React from "react";

interface AvailabilitySectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (valid: boolean) => void;
}

export default function AvailabilitySection({
  formData,
  updateFormData,
  onValidationChange = () => {}
}: AvailabilitySectionProps) {
  const handleMonthSelect = (month: string, isAvailable: boolean) => {
    let updatedMonths = [...(formData.available_months || [])];

    if (isAvailable) {
      updatedMonths = updatedMonths.filter((m) => m !== month);
    } else {
      updatedMonths = [...updatedMonths, month];
    }

    updateFormData("available_months", updatedMonths);
    onValidationChange(updatedMonths.length > 0);
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div>
      <p className="text-sm text-gray-300 mb-4">Select the months your property is available:</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        {months.map(month => {
          const isAvailable = formData.available_months?.includes(month);
          return (
            <button
              key={month}
              onClick={() => handleMonthSelect(month, isAvailable)}
              className={`px-3 py-2 rounded-full text-sm ${
                isAvailable
                  ? "bg-fuchsia-600 text-white"
                  : "bg-fuchsia-900/30 text-gray-300"
              }`}
            >
              {month}
            </button>
          );
        })}
      </div>
    </div>
  );
}
