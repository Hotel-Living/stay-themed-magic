
import React from "react";

interface ValidationMessagesProps {
  formData: any;
  validationState?: any;
  error?: string;
  showErrors?: boolean;
  isValid?: boolean;
}

const ValidationMessages: React.FC<ValidationMessagesProps> = ({ 
  formData,
  validationState,
  error,
  showErrors,
  isValid
}) => {
  return (
    <div className="hidden">
      {/* Validation messages handled elsewhere */}
    </div>
  );
};

export default ValidationMessages;
