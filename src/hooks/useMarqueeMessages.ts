import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getMarqueeLanguage, shuffleArray } from '@/utils/pageUtils';

interface MarqueeMessagesData {
  [key: string]: string[];
}

export const useMarqueeMessages = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setIsLoading(true);
        const language = getMarqueeLanguage(i18n.language);
        
        // Map language codes to file names
        const fileMap: Record<string, string> = {
          'en': 'hotel_living_messages_en.json',
          'es': 'hotel_living_messages_es.json', 
          'pt': 'hotel_living_messages_pt.json',
          'ro': 'hotel_living_us_messages_ro.json'
        };
        
        const fileName = fileMap[language] || fileMap['en'];
        const response = await fetch(`/locales/marquee/${fileName}`);
        
        if (!response.ok) {
          throw new Error(`Failed to load messages: ${response.status}`);
        }
        
        const textData = await response.text();
        
        // Parse text data - split by double line breaks to separate messages
        const messages = textData
          .split('\n\n')
          .map(msg => msg.trim())
          .filter(msg => msg.length > 0);
        
        if (messages.length > 0) {
          // Shuffle messages to prevent predictable order
          const shuffledMessages = shuffleArray(messages);
          setMessages(shuffledMessages);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error('Error loading marquee messages:', error);
        // Fallback to default messages if loading fails
        setMessages(['Welcome to Hotel Living - Live the Life You Love']);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [i18n.language]);

  const getNextMessage = (): string => {
    if (messages.length === 0) return '';
    
    const message = messages[currentIndex];
    setCurrentIndex((prev) => (prev + 1) % messages.length);
    
    return message;
  };

  const reshuffleMessages = () => {
    if (messages.length > 0) {
      const shuffled = shuffleArray(messages);
      setMessages(shuffled);
      setCurrentIndex(0);
    }
  };

  return {
    messages,
    getNextMessage,
    reshuffleMessages,
    isLoading,
    hasMessages: messages.length > 0
  };
};