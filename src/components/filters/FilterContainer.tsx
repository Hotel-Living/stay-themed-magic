
import React, { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterContainerProps {
  children: ReactNode;
  verticalLayout: boolean;
  expandedLayout: boolean;
  compactSpacing: boolean;
  formWrapperBgColor: string;
}

export const FilterContainer: React.FC<FilterContainerProps> = ({
  children,
  verticalLayout,
  expandedLayout,
  compactSpacing,
  formWrapperBgColor,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`neo-blur filter-dropdown-container rounded-lg ${compactSpacing ? 'p-0.5' : 'p-2 md:p-3'} ${formWrapperBgColor} shadow-md max-w-2xl mx-auto ${isMobile ? "w-[90%]" : "w-[80%]"}`}>
      <div className={`flex ${verticalLayout ? "flex-col space-y-1" : expandedLayout ? "flex-row gap-1 w-full" : "flex-wrap gap-1"}`}>
        {children}
      </div>
    </div>
  );
};
