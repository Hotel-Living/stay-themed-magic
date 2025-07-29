import React from 'react';
import { useCharacterCount } from '../hooks/useCharacterCount';

interface CharacterCounterProps {
  value: string;
  minLength?: number;
  maxLength?: number;
  showCount?: boolean;
  showRemaining?: boolean;
  className?: string;
}

export const CharacterCounter = ({
  value,
  minLength,
  maxLength,
  showCount = true,
  showRemaining = false,
  className = ''
}: CharacterCounterProps) => {
  const {
    counterText,
    counterClass
  } = useCharacterCount({
    value,
    minLength,
    maxLength,
    showCount,
    showRemaining
  });

  return (
    <div className={`text-xs ${counterClass} ${className}`}>
      {counterText}
    </div>
  );
};