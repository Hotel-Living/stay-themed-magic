
import React, { ReactNode } from "react";

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
  return (
    <div className={`glass-card filter-dropdown-container rounded-lg ${compactSpacing ? 'p-1' : 'p-3 md:p-4'} ${formWrapperBgColor}`}>
      <div className={`flex ${verticalLayout ? "flex-col space-y-1" : expandedLayout ? "flex-row gap-1 w-full" : "flex-wrap gap-1"}`}>
        {children}
      </div>
    </div>
  );
};
