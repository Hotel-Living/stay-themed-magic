import React, { useState, useEffect } from 'react';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';

interface IntroAnimationProps {
  onComplete: () => void;
}

const INTRO_MESSAGES = [
  "LA REVOLUCIÓN\nHA LLEGADO",
  "MULTIPLICA\nTU VIDA", 
  "VIVE EN\nHOTELES",
  "VIVE CON\nESTILO",
  "CONOCE\nAFINES",
  "DISFRUTA TUS\nPASIONES"
];

const VISIT_COUNT_KEY = 'hotel-living-intro-visits';
const MAX_INTRO_SHOWS = 5;

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(true);
  const [showAllText, setShowAllText] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'waiting' | 'approaching' | 'glowing' | 'dissolving'>('waiting');

  useEffect(() => {
    const startAnimation = () => {
      setTimeout(() => {
        setShowAllText(true);
        setTimeout(() => {
          startMessageSequence(0);
        }, 500);
      }, 1000);
    };

    const startMessageSequenc
