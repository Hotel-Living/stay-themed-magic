
import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function SuccessMessage() {
  return (
    <div className="py-8 text-center space-y-4">
      <div className="flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-semibold text-white">Property Submitted!</h2>
      <p className="text-white">
        Thank you for submitting your property. It has been successfully received and is now awaiting review. 
        You'll receive a notification once the review is complete.
      </p>
    </div>
  );
}
