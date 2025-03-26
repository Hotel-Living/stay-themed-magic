
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { Message } from '@/components/chat/ChatMessage';
import { useAuth } from '@/context/AuthContext';

// This would normally be handled by a real backend
const CANNED_RESPONSES = [
  "Thank you for your message. How can I help you today?",
  "I understand your question. Let me look into that for you.",
  "That's a great question. Here's what you need to know...",
  "I'm checking our system for that information now.",
  "I can definitely help you with your booking.",
  "Could you please provide more details about your reservation?",
  "Our hotels offer various amenities including free WiFi, swimming pools, and 24-hour room service.",
  "The best way to modify your reservation is through your account dashboard.",
  "I apologize for any inconvenience this may have caused.",
  "Is there anything else I can assist you with today?"
];

export type SupportAgentStatus = 'online' | 'away' | 'offline';

export function useChatSupport() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [supportAgentStatus, setSupportAgentStatus] = useState<SupportAgentStatus>('online');
  const { toast } = useToast();
  const { user } = useAuth();

  const toggleRecording = () => {
    if (!isRecording) {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        setIsRecording(true);
        toast({
          title: "Speech recognition started",
          description: "Start speaking and your message will be transcribed."
        });
        
        // This would be actual speech recognition implementation
        // For now, we'll simulate it with a timeout
        setTimeout(() => {
          setIsRecording(false);
          toast({
            title: "Speech recognition ended",
            description: "Speech recognition is not fully implemented in this demo."
          });
        }, 3000);
      } else {
        toast({
          title: "Speech recognition not supported",
          description: "Your browser doesn't support speech recognition.",
          variant: "destructive"
        });
      }
    } else {
      setIsRecording(false);
      toast({
        title: "Speech recognition stopped",
        description: "Speech recording has been stopped."
      });
    }
  };

  // Add initial welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: uuidv4(),
      content: "Welcome to our chat support! How can I help you today?",
      sender: 'agent',
      timestamp: new Date(),
      agentName: "Support Team",
    };
    
    setMessages([welcomeMessage]);
    
    // Simulate changing agent status periodically
    const statusInterval = setInterval(() => {
      const statuses: SupportAgentStatus[] = ['online', 'away', 'online'];
      const randomIndex = Math.floor(Math.random() * 3);
      setSupportAgentStatus(statuses[randomIndex]);
    }, 60000); // Change every minute
    
    return () => clearInterval(statusInterval);
  }, []);

  const sendMessage = useCallback((content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const randomResponse = CANNED_RESPONSES[Math.floor(Math.random() * CANNED_RESPONSES.length)];
      
      const agentMessage: Message = {
        id: uuidv4(),
        content: randomResponse,
        sender: 'agent',
        timestamp: new Date(),
        agentName: "Support Agent",
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    isRecording,
    toggleRecording,
    supportAgentStatus
  };
}
