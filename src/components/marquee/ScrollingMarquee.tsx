import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { isPublicPage } from '@/utils/pageUtils';
import { useMarqueeMessages } from '@/hooks/useMarqueeMessages';

export const ScrollingMarquee: React.FC = () => {
  const location = useLocation();
  const { messages, isLoading } = useMarqueeMessages();
  const [displayText, setDisplayText] = useState('');
  const [animationKey, setAnimationKey] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine if component should be visible
  const shouldShow = isPublicPage(location.pathname) && !isLoading && messages.length > 0;

  // Animation duration calculation
  const animationDuration = React.useMemo(() => {
    if (!marqueeRef.current || !containerRef.current) return 30;
    const textWidth = marqueeRef.current.scrollWidth;
    const containerWidth = containerRef.current.offsetWidth;
    const totalDistance = textWidth + containerWidth;
    return totalDistance / 80; // 80px per second
  }, [displayText]);

  useEffect(() => {
    // Only run effects if component should be visible
    if (!shouldShow) return;

    const updateMessage = () => {
      if (messages.length === 0) return;
      
      // Get current message in natural order
      const message = messages[currentIndex];
      if (message) {
        // Add 30 spaces between messages for clear separation
        const spacedMessage = `${message}${' '.repeat(30)}`;
        setDisplayText(spacedMessage.repeat(3)); // Repeat for seamless loop
        setAnimationKey(prev => prev + 1);
        
        // Move to next message
        setCurrentIndex(prev => (prev + 1) % messages.length);
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

    return () => {
      clearInterval(messageInterval);
    };
  }, [shouldShow, messages]); // Only depend on shouldShow and messages

  // Don't render anything if component shouldn't show
  if (!shouldShow) {
    return null;
  }

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
          fontSize: '12px',
          fontWeight: 600,
          lineHeight: '14px',
          animation: `scroll-left ${animationDuration}s linear infinite`,
          willChange: 'transform'
        }}
      >
        {displayText}
      </div>
    </div>
  );
};