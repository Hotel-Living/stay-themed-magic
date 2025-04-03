
import React from "react";

interface TotalLinesCardProps {
  totalLines: number;
}

export const TotalLinesCard: React.FC<TotalLinesCardProps> = ({ totalLines }) => {
  return (
    <div className="bg-fuchsia-100/10 p-6 rounded-xl mb-6 text-center border border-fuchsia-500/20">
      <p className="text-4xl font-bold text-fuchsia-400 mb-2">{totalLines.toLocaleString()}</p>
      <p className="text-foreground/70">Total lines of code</p>
    </div>
  );
};
