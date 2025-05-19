
import React from "react";

interface TeamLevelContentProps {
  id: string;
  name: string;
  tier: string;
  color: string;
  content: React.ReactNode;
}

export function TeamLevelContent({ id, name, tier, color, content }: TeamLevelContentProps) {
  return (
    <div className="bg-[#8017B0]/40 rounded-lg p-6 shadow-lg backdrop-blur-sm border border-[#FFF9B0]/30">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-center" style={{ color }}>
          {name} - {tier}
        </h2>
        <div className="w-20 h-1 mx-auto mt-2 rounded-full" style={{ backgroundColor: color }}></div>
      </div>
      
      <div className="text-white">
        {content}
      </div>
    </div>
  );
}
