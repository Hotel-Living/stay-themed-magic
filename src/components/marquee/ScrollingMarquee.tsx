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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only run effects if component should be visible
    if (!shouldShow) return;

    let messageIndex = 0;

    const updateMessage = () => {
      if (messages.length === 0) return;
      
      // Get current message in natural order (no shuffling)
      const message = messages[messageIndex];
      if (message) {
        // Add 30 spaces between messages for clear separation
        const spacedMessage = `${message}${' '.repeat(30)}`;
        setDisplayText(spacedMessage.repeat(3)); // Repeat for seamless loop
        setAnimationKey(prev => prev + 1);
        
        console.log(`Marquee: Message ${messageIndex + 1}/${messages.length}: "${message.substring(0, 50)}..."`);
        
        // Move to next message
        messageIndex = (messageIndex + 1) % messages.length;
        setCurrentIndex(messageIndex);
      }
    };

    // Initial message
    updateMessage();

    // Calculate animation duration based on text length
    const calculateDuration = () => {
      if (!marqueeRef.current || !containerRef.current) return 15; // Shorter duration for better cycling
      const textWidth = marqueeRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const totalDistance = textWidth + containerWidth;
      return Math.max(15, totalDistance / 100); // Minimum 15 seconds, faster speed
    };

    // Set up interval for message updates - use a fixed duration to ensure consistent cycling
    intervalRef.current = setInterval(() => {
      updateMessage();
    }, 15000); // Fixed 15 seconds per message

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
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