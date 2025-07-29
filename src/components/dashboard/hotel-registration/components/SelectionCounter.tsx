import React from 'react';
import { useSelectionCount } from '../hooks/useSelectionCount';

interface SelectionCounterProps {
  selectedItems: string[] | any[];
  minRequired?: number;
  maxAllowed?: number;
  showCount?: boolean;
  showRemaining?: boolean;
  className?: string;
}

export const SelectionCounter = ({
  selectedItems,
  minRequired,
  maxAllowed,
  showCount = true,
  showRemaining = false,
  className = ''
}: SelectionCounterProps) => {
  const {
    counterText,
    counterClass
  } = useSelectionCount({
    selectedItems,
    minRequired,
    maxAllowed,
    showCount,
    showRemaining
  });

  return (
    <div className={`text-xs ${counterClass} ${className}`}>
      {counterText}
    </div>
  );
};