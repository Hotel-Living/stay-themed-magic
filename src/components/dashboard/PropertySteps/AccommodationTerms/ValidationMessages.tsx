
import React from "react";

interface ValidationMessagesProps {
  formData: any;
}

const ValidationMessages: React.FC<ValidationMessagesProps> = ({ formData }) => {
  return (
    <div className="hidden">
      {/* Validation messages handled elsewhere */}
    </div>
  );
};

export default ValidationMessages;
