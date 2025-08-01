import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { isPublicPage } from '@/utils/pageUtils';
import { useMarqueeMessages } from '@/hooks/useMarqueeMessages';

export const ScrollingMarquee: React.FC = () => {
  const location = useLocation();
  const { getNextMessage, reshuffleMessages, isLoading, hasMessages } = useMarqueeMessages();
  const [displayText, setDisplayText] = useState('');
  const [animationKey, setAnimationKey] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Don't render on non-public pages
  if (!isPublicPage(location.pathname) || isLoading || !hasMessages) {
    return null;
  }

  useEffect(() => {
    const updateMessage = () => {
      const message = getNextMessage();
      if (message) {
        // Add spacing between messages for continuous scroll
        const spacedMessage = `${message}${' '.repeat(25)}`;
        setDisplayText(spacedMessage.repeat(3)); // Repeat for seamless loop
        setAnimationKey(prev => prev + 1);
      }
    };

    // Initial message
    updateMessage();

    // Calculate animation duration based on text length
    const calculateDuration = () => {
      if (!marqueeRef.current || !containerRef.current) return 30;
      const textWidth = marqueeRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const totalDistance = textWidth + containerWidth;
      return totalDistance / 80; // 80px per second
    };

    // Set up interval for message updates
    const messageInterval = setInterval(() => {
      updateMessage();
    }, calculateDuration() * 1000);

    // Reshuffle messages every 10 cycles to prevent repetition
    const reshuffleInterval = setInterval(() => {
      reshuffleMessages();
    }, calculateDuration() * 1000 * 10);

    return () => {
      clearInterval(messageInterval);
      clearInterval(reshuffleInterval);
    };
  }, [getNextMessage, reshuffleMessages]);

  const animationDuration = React.useMemo(() => {
    if (!marqueeRef.current || !containerRef.current) return 30;
    const textWidth = marqueeRef.current.scrollWidth;
    const containerWidth = containerRef.current.offsetWidth;
    const totalDistance = textWidth + containerWidth;
    return totalDistance / 80; // 80px per second
  }, [displayText]);

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 h-8 overflow-hidden z-40"
      style={{ backgroundColor: '#7E26A6' }}
      role="status"
      aria-live="polite"
      aria-label="Live updates from Hotel Living"
    >
      <div
        ref={marqueeRef}
        key={animationKey}
        className="whitespace-nowrap text-white font-semibold px-3 py-1.5 marquee-scroll"
        style={{
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: '20px',
          animation: `scroll-left ${animationDuration}s linear infinite`,
          willChange: 'transform'
        }}
      >
        {displayText}
      </div>
    </div>
  );
};