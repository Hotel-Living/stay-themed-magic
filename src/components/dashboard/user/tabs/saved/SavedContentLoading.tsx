
import React from "react";
import { Loader2 } from "lucide-react";

export default function SavedContentLoading() {
  return (
    <div className="flex items-center justify-center p-12">
      <Loader2 className="w-6 h-6 animate-spin text-fuchsia-500" />
      <span className="ml-2">Loading your saved hotels...</span>
    </div>
  );
}
