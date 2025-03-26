
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentName?: string;
  agentAvatar?: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAgent = message.sender === 'agent';
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div 
      className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}
      aria-label={`Message from ${isAgent ? 'support agent' : 'you'}`}
    >
      <div className={`max-w-[75%] flex ${isAgent ? 'flex-row' : 'flex-row-reverse'} items-start gap-2`}>
        {isAgent && (
          <Avatar className="h-8 w-8">
            {message.agentAvatar ? (
              <AvatarImage src={message.agentAvatar} alt={message.agentName || 'Support Agent'} />
            ) : (
              <AvatarFallback className="bg-fuchsia-700 text-white">SA</AvatarFallback>
            )}
          </Avatar>
        )}
        
        <div>
          <div 
            className={`rounded-lg p-3 ${
              isAgent 
                ? 'bg-muted text-foreground rounded-tl-none' 
                : 'bg-fuchsia-600 text-white rounded-tr-none'
            }`}
          >
            {message.content}
          </div>
          <div className={`text-xs text-muted-foreground mt-1 ${isAgent ? 'text-left' : 'text-right'}`}>
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
}
