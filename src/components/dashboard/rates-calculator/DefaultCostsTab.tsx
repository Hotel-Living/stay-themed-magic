import React from "react";
export const DefaultCostsTab: React.FC = () => {
  return <div className="space-y-4">
      <div className="glass-card rounded-lg p-8 text-center text-white/80 border-fuchsia-500/20 bg-[#5f098a]">
        
        <p className="font-bold">These figures represent average incremental costs per additional occupied room for a 3 - Star standard hotel model in Western markets. Actual costs may vary and should be adjusted based on each hotel's specific category, level of service, positioning, and operational model.</p>
        
        {/* Total Estimated Cost Per Room Table */}
        <div className="mt-8 rounded-lg p-4 bg-[#0807a0]">
          <img src="/lovable-uploads/3b6d517b-63a3-45e6-9203-f5b821753834.png" alt="Cost Per Additional Occupied Room Table" className="w-full h-auto rounded-lg mx-auto" />
        </div>
      </div>
    </div>;
};