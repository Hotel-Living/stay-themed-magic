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

  // Animation duration calculation for proper full-width scrolling
  const animationDuration = React.useMemo(() => {
    if (!marqueeRef.current || !containerRef.current) return 15;
    const textWidth = marqueeRef.current.scrollWidth;
    const containerWidth = containerRef.current.offsetWidth;
    // Total distance: container width + text width for complete traversal
    const totalDistance = containerWidth + textWidth;
    return totalDistance / 96; // 20% faster than 80px per second
  }, [displayText]);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only run effects if component should be visible
    if (!shouldShow) return;

    // Start from a random message index for variety
    let messageIndex = Math.floor(Math.random() * messages.length);

    const updateMessage = () => {
      if (messages.length === 0) return;
      
      // Get current message in natural order
      const message = messages[messageIndex];
      if (message) {
        // Create display text with 30 spaces separation
        const spacedMessage = `${message}${' '.repeat(30)}`;
        setDisplayText(spacedMessage);
        setAnimationKey(prev => prev + 1);
        
        console.log(`Marquee: Message ${messageIndex + 1}/${messages.length}: "${message.substring(0, 50)}..."`);
        
        // Move to next message for next cycle
        messageIndex = (messageIndex + 1) % messages.length;
        setCurrentIndex(messageIndex);
      }
    };

    // Initial message
    updateMessage();

    // Set up interval for message updates - increased speed by 20% (12s -> 9.6s)
    intervalRef.current = setInterval(() => {
      updateMessage();
    }, 9600); // 20% faster than 12000ms

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
      className="fixed bottom-0 left-0 right-0 h-6 overflow-hidden z-40"
      style={{ 
        backgroundColor: '#FFFFFF',
        marginBottom: '0px'
      }}
      role="status"
      aria-live="polite"
      aria-label="Live updates from Hotel Living"
    >
      <div
        ref={marqueeRef}
        key={animationKey}
        className="whitespace-nowrap text-black font-semibold px-3 py-0.5 marquee-scroll"
        style={{
          fontSize: '11px',
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