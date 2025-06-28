import React, { useState, useEffect } from 'react';
import { Starfield } from '@/components/Starfield';
import { useTranslation } from 'react-i18next';

interface IntroStarAnimationProps {
  onComplete: () => void;
}

export const IntroStarAnimation: React.FC<IntroStarAnimationProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1 for initial delay
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    t('intro.welcome'),
    t('intro.tagline'),
    t('intro.experience'),
    t('intro.style'),
    t('intro.community'),
    t('intro.passion')
  ];

  // Helper function to format text with line breaks
  const formatTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <div key={index}>{line.toUpperCase()}</div>
    ));
  };

  useEffect(() => {
    // Initial 1-second delay before starting
    if (currentStep === -1) {
      const timer = setTimeout(() => {
        setCurrentStep(0);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (currentStep >= messages.length) {
      const timer = setTimeout(() => {
        s
