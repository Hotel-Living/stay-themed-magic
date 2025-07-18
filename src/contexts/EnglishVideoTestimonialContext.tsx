
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnglishVideoTestimonialContextType {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  currentVideoIndex: number;
  setCurrentVideoIndex: (index: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const EnglishVideoTestimonialContext = createContext<EnglishVideoTestimonialContextType | undefined>(undefined);

export const useEnglishVideoTestimonial = () => {
  const context = useContext(EnglishVideoTestimonialContext);
  if (!context) {
    throw new Error('useEnglishVideoTestimonial must be used within EnglishVideoTestimonialProvider');
  }
  return context;
};

export const EnglishVideoTestimonialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <EnglishVideoTestimonialContext.Provider
      value={{
        isVisible,
        setIsVisible,
        currentVideoIndex,
        setCurrentVideoIndex,
        isMuted,
        setIsMuted,
      }}
    >
      {children}
    </EnglishVideoTestimonialContext.Provider>
  );
};
