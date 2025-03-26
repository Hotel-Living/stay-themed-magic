
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from './ChatMessage';
import { ChatHeader } from './ChatHeader';
import { useLanguage } from '@/context/LanguageContext';
import { useChatSupport } from '@/hooks/useChatSupport';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const {
    messages,
    isLoading,
    sendMessage,
    isRecording,
    toggleRecording,
    supportAgentStatus
  } = useChatSupport();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    sendMessage(message);
    setMessage('');
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        size="icon"
        className={`rounded-full shadow-lg ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-fuchsia-600 hover:bg-fuchsia-700'
        } w-14 h-14 flex items-center justify-center transition-all duration-300`}
        aria-label={isOpen ? t('chat.close') : t('chat.open')}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Chat widget */}
      {isOpen && (
        <div 
          className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] rounded-lg shadow-xl bg-card border border-border flex flex-col overflow-hidden transition-all duration-300"
          aria-live="polite"
        >
          <ChatHeader 
            onClose={toggleChat} 
            status={supportAgentStatus} 
          />

          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <ChatMessage 
                  key={index}
                  message={msg}
                />
              ))}
              {isLoading && (
                <div className="flex justify-center">
                  <div className="loader"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={toggleRecording}
                className={`${isRecording ? 'text-red-500' : 'text-muted-foreground'}`}
                aria-label={isRecording ? t('chat.stopRecording') : t('chat.startRecording')}
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('chat.typeMessage')}
                className="flex-1 px-3 py-2 bg-background rounded-md border border-input text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                aria-label={t('chat.messageInput')}
              />
              
              <Button 
                type="submit" 
                size="icon" 
                disabled={message.trim() === ''}
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
                aria-label={t('chat.sendMessage')}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
