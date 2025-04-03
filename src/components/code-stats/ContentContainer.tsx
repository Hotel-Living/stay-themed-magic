
import React from "react";
import { TotalLinesCard } from "./TotalLinesCard";
import { StatsSummaryCards } from "./StatsSummaryCards";
import { FileBreakdownTable } from "./FileBreakdownTable";
import { FooterNote } from "./FooterNote";

type FileStats = {
  path: string;
  lineCount: number;
};

interface ContentContainerProps {
  totalLines: number;
  fileStats: FileStats[];
}

export const ContentContainer: React.FC<ContentContainerProps> = ({ totalLines, fileStats }) => {
  return (
    <div>
      <TotalLinesCard totalLines={totalLines} />
      
      <StatsSummaryCards 
        fileCount={fileStats.length} 
        averageLinesPerFile={totalLines / fileStats.length} 
      />
      
      <FileBreakdownTable fileStats={fileStats} />
      
      <FooterNote />
    </div>
  );
};
