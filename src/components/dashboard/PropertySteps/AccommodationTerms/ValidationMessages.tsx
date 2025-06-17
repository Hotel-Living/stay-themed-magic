
import React from "react";

interface ValidationMessagesProps {
  validationState?: any;
  formData?: any;
  error?: string;
  showErrors?: boolean;
  isValid?: boolean;
}

const ValidationMessages: React.FC<ValidationMessagesProps> = ({
  validationState,
  formData,
  error,
  showErrors,
  isValid
}) => {
  // Use validationState if provided, otherwise use individual props
  const errorToShow = validationState?.error || error;
  const shouldShowErrors = validationState?.showValidationErrors || showErrors;
  const validationStatus = validationState?.isValid || isValid;

  if (!shouldShowErrors || !errorToShow) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
      <p className="text-red-300">{errorToShow}</p>
    </div>
  );
};

export default ValidationMessages;
