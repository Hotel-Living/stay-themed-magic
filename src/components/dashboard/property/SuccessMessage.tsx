
import React from "react";

export default function SuccessMessage() {
  return (
    <div className="p-6 border rounded-md bg-[#5d0083]/30 text-white mb-6">
      <h3 className="text-lg font-medium mb-2 text-white">Property Submitted!</h3>
      <p className="text-white">Thank you for submitting your property. It has been successfully received and is now awaiting administrator review.</p>
      <p className="mt-2 text-white">You'll receive a notification once the review is complete.</p>
    </div>
  );
}
