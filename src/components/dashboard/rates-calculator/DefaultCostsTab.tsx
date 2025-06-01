
import React from "react";

export const DefaultCostsTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="glass-card rounded-lg p-8 text-center text-white/80 border-fuchsia-500/20">
        <h3 className="text-lg font-medium mb-2 text-white">Default Costs</h3>
        <p>Default costs configuration will be added here.</p>
        
        {/* Total Estimated Cost Per Room Table */}
        <div className="mt-8 bg-white rounded-lg p-4">
          <img 
            src="/lovable-uploads/497b9ba7-0b8e-4891-beb5-2de2947149be.png" 
            alt="Total Estimated Cost Per Room Table"
            className="w-full h-auto rounded-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
};
