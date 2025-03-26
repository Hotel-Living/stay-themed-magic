
import React from "react";

export const VerificationNotice: React.FC = () => {
  return (
    <div className="bg-blue-500/15 text-blue-500 p-3 rounded-lg text-sm">
      <p className="font-medium">Important:</p>
      <p>You'll need to verify your email address before you can sign in. We'll send you a verification link after registration.</p>
    </div>
  );
};
