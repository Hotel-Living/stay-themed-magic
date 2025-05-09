
import React from "react";

interface SuccessMessageProps {
  isEditingMode?: boolean;
}

export default function SuccessMessage({ isEditingMode = false }: SuccessMessageProps) {
  return (
    <div className="p-6 border rounded-md bg-[#5d0083]/30 text-white mb-6">
      {isEditingMode ? (
        <>
          <h3 className="text-lg font-medium mb-2 text-white">Changes Submitted!</h3>
          <p className="text-white">Thank you for submitting your property changes. They have been successfully received and are now awaiting administrator review.</p>
          <p className="mt-2 text-white">You'll receive a notification once the review is complete. Please note that you cannot make additional changes until these are reviewed.</p>
        </>
      ) : (
        <>
          <h3 className="text-lg font-medium mb-2 text-white">Property Submitted!</h3>
          <p className="text-white">Thank you for submitting your property. It has been successfully received and is now awaiting administrator review.</p>
          <p className="mt-2 text-white">You'll receive a notification once the review is complete.</p>
        </>
      )}
    </div>
  );
}
