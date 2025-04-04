import React from "react";
import { AlertCircle } from "lucide-react";
export default function ImportantNotice() {
  return <div className="border border-amber-500/30 p-3 rounded-lg mb-6 flex items-start bg-[#a005af]">
      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm font-medium uppercase">IMPORTANT</p>
        <p className="text-xs text-slate-50">All fields marked as required must be completed before proceeding. If you add any new items, your property submission will require administrator approval before being published.</p>
      </div>
    </div>;
}