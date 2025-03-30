
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
    <div className={`glass-card filter-dropdown-container rounded-xl ${compactSpacing ? 'p-3 md:p-4' : 'p-4 md:p-5'} ${formWrapperBgColor}`}>
      <div className={`flex ${verticalLayout ? "flex-col space-y-3" : expandedLayout ? "flex-row gap-3 w-full" : "flex-wrap gap-3"} ${compactSpacing ? 'gap-2' : ''}`}>
        {children}
      </div>
    </div>
  );
};
