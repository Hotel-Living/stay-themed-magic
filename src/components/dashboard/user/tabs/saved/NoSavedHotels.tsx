
import React from "react";
import { Building } from "lucide-react";

export default function NoSavedHotels() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fuchsia-950/30 flex items-center justify-center">
        <Building className="w-8 h-8 text-fuchsia-400" />
      </div>
      <h3 className="text-lg font-bold mb-2">No saved hotels</h3>
      <p className="text-muted-foreground mb-6">You haven't saved any hotels yet.</p>
      <a href="/" className="inline-block py-2 px-4 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
        Browse Hotels
      </a>
    </div>
  );
}
