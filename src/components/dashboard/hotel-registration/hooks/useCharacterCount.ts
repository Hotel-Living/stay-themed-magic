import { useMemo } from 'react';

interface CharacterCountOptions {
  value: string;
  minLength?: number;
  maxLength?: number;
  showCount?: boolean;
  showRemaining?: boolean;
}

export const useCharacterCount = ({
  value,
  minLength,
  maxLength,
  showCount = true,
  showRemaining = false
}: CharacterCountOptions) => {
  
  const characterCount = useMemo(() => {
    return value ? value.length : 0;
  }, [value]);

  const isMinimumMet = useMemo(() => {
    if (!minLength) return true;
    return characterCount >= minLength;
  }, [characterCount, minLength]);

  const isMaximumExceeded = useMemo(() => {
    if (!maxLength) return false;
    return characterCount > maxLength;
  }, [characterCount, maxLength]);

  const remainingCharacters = useMemo(() => {
    if (!maxLength) return null;
    return maxLength - characterCount;
  }, [characterCount, maxLength]);

  const neededCharacters = useMemo(() => {
    if (!minLength) return null;
    return Math.max(0, minLength - characterCount);
  }, [characterCount, minLength]);

  const getCounterText = useMemo(() => {
    const parts: string[] = [];
    
    if (showCount) {
      parts.push(`${characterCount}`);
    }
    
    if (minLength && !isMinimumMet) {
      parts.push(`(${neededCharacters} more needed)`);
    }
    
    if (maxLength && showRemaining) {
      parts.push(`(${remainingCharacters} remaining)`);
    } else if (maxLength) {
      parts.push(`/ ${maxLength}`);
    } else if (minLength) {
      parts.push(`/ ${minLength} min`);
    }
    
    return parts.join(' ');
  }, [
    characterCount, 
    minLength, 
    maxLength, 
    isMinimumMet, 
    neededCharacters, 
    remainingCharacters, 
    showCount, 
    showRemaining
  ]);

  const getCounterClass = useMemo(() => {
    if (isMaximumExceeded) {
      return 'text-red-400';
    }
    if (minLength && !isMinimumMet) {
      return 'text-yellow-400';
    }
    return 'text-white/60';
  }, [isMinimumMet, isMaximumExceeded, minLength]);

  return {
    characterCount,
    isMinimumMet,
    isMaximumExceeded,
    remainingCharacters,
    neededCharacters,
    counterText: getCounterText,
    counterClass: getCounterClass
  };
};