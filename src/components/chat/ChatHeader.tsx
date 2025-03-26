
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

type SupportAgentStatus = 'online' | 'away' | 'offline';

interface ChatHeaderProps {
  onClose: () => void;
  status: SupportAgentStatus;
}

export function ChatHeader({ onClose, status }: ChatHeaderProps) {
  const { t } = useLanguage();
  
  const getStatusLabel = () => {
    switch (status) {
      case 'online':
        return t('chat.agentOnline');
      case 'away':
        return t('chat.agentAway');
      case 'offline':
        return t('chat.agentOffline');
      default:
        return '';
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-fuchsia-800 p-3 text-white flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="font-semibold">{t('chat.supportChat')}</div>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
          <span className="text-xs">{getStatusLabel()}</span>
        </div>
      </div>
      <Button 
        size="icon" 
        variant="ghost" 
        onClick={onClose}
        className="text-white hover:bg-fuchsia-700"
        aria-label={t('chat.closeChat')}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
