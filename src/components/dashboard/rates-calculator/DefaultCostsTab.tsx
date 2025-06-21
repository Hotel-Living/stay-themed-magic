
import React from "react";
import { DisclaimerText } from "./components/DisclaimerText";
import { CostTableImage } from "./components/CostTableImage";

export const DefaultCostsTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="glass-card rounded-lg p-8 text-center text-white/80 border-fuchsia-500/20 bg-[#5f098a]">
        <DisclaimerText />
        <CostTableImage 
          src="/lovable-uploads/589c396e-8094-48ec-956c-aeb87a21450a.png"
          alt="Cost Per Additional Occupied Room Table"
        />
      </div>
    </div>
  );
};
