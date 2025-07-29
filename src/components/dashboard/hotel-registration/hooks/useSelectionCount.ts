import { useMemo } from 'react';

interface SelectionCountOptions {
  selectedItems: string[] | any[];
  minRequired?: number;
  maxAllowed?: number;
  showCount?: boolean;
  showRemaining?: boolean;
}

export const useSelectionCount = ({
  selectedItems,
  minRequired,
  maxAllowed,
  showCount = true,
  showRemaining = false
}: SelectionCountOptions) => {
  
  const selectionCount = useMemo(() => {
    return selectedItems ? selectedItems.length : 0;
  }, [selectedItems]);

  const isMinimumMet = useMemo(() => {
    if (!minRequired) return true;
    return selectionCount >= minRequired;
  }, [selectionCount, minRequired]);

  const isMaximumExceeded = useMemo(() => {
    if (!maxAllowed) return false;
    return selectionCount > maxAllowed;
  }, [selectionCount, maxAllowed]);

  const remainingSelections = useMemo(() => {
    if (!maxAllowed) return null;
    return maxAllowed - selectionCount;
  }, [selectionCount, maxAllowed]);

  const neededSelections = useMemo(() => {
    if (!minRequired) return null;
    return Math.max(0, minRequired - selectionCount);
  }, [selectionCount, minRequired]);

  const getCounterText = useMemo(() => {
    const parts: string[] = [];
    
    if (showCount) {
      parts.push(`${selectionCount} selected`);
    }
    
    if (minRequired && !isMinimumMet) {
      parts.push(`(${neededSelections} more required)`);
    }
    
    if (maxAllowed && showRemaining) {
      parts.push(`(${remainingSelections} remaining)`);
    } else if (maxAllowed) {
      parts.push(`/ ${maxAllowed} max`);
    } else if (minRequired) {
      parts.push(`/ ${minRequired} min`);
    }
    
    return parts.join(' ');
  }, [
    selectionCount, 
    minRequired, 
    maxAllowed, 
    isMinimumMet, 
    neededSelections, 
    remainingSelections, 
    showCount, 
    showRemaining
  ]);

  const getCounterClass = useMemo(() => {
    if (isMaximumExceeded) {
      return 'text-red-400';
    }
    if (minRequired && !isMinimumMet) {
      return 'text-yellow-400';
    }
    return 'text-green-400';
  }, [isMinimumMet, isMaximumExceeded, minRequired]);

  return {
    selectionCount,
    isMinimumMet,
    isMaximumExceeded,
    remainingSelections,
    neededSelections,
    counterText: getCounterText,
    counterClass: getCounterClass
  };
};