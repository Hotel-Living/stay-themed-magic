
import React from "react";

interface ValidationMessagesProps {
  error: string;
  showValidationError: boolean;
  hasInteracted: boolean;
}

export default function ValidationMessages({ 
  error, 
  showValidationError, 
  hasInteracted 
}: ValidationMessagesProps) {
  if (!error || (!showValidationError && !hasInteracted)) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg">
      <p className="text-red-300 text-sm">
        <strong>Error de validación:</strong> {error}
      </p>
      <p className="text-red-400 text-xs mt-1">
        Por favor, complete todos los campos requeridos antes de continuar.
      </p>
    </div>
  );
}
