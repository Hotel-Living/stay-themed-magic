import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import ChatWindow from "./ChatWindow";
import { useAvatarManager } from "@/contexts/AvatarManager";
import { useTranslation } from "@/hooks/useTranslation";

interface EnhancedAvatarAssistantProps {
  avatarId: string;
  gif: string;
  position?: 'bottom-left' | 'bottom-right' | 'content';
  showMessage?: boolean;
  message?: string;
  onClose?: () => void;
}

export function EnhancedAvatarAssistant({ 
  avatarId, 
  gif, 
  position = 'content',
  showMessage = false,
  message,
  onClose 
}: EnhancedAvatarAssistantProps) {
  const [showChat, setShowChat] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { i18n } = useTranslation();
  const { activeAvatars, addActiveAvatar, removeActiveAvatar } = useAvatarManager();
  const location = useLocation();

  // Use i18n.language as the primary source of truth for language detection
  const currentLanguage = i18n.language || 'es';

  const isActiveAvatar = activeAvatars.some(avatar => avatar.id === avatarId);
  const isBottomRightPosition = position === 'bottom-right';

  const getDefaultMessage = () => {
    switch (currentLanguage) {
      case 'en':
        return "I'm here if you need me.";
      case 'pt':
        return "Estou aqui se precisar de mim.";
      case 'ro':
        return "Sunt aici dacă ai nevoie de mine.";
      default:
        return "Estoy aquí si me necesitas.";
    }
  };

  // Remove redundant i18n synchronization to prevent infinite loops
  // Language changes are now managed centrally by LanguageSwitcher

  const displayMessage = message || getDefaultMessage();

  const handleAvatarClick = () => {
    // Always activate avatar and show chat immediately
    addActiveAvatar(avatarId, gif);
    setShowChat(true);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    if (isActiveAvatar) {
      removeActiveAvatar(avatarId);
    }
    onClose?.();
  };

  const handleChatClose = () => {
    setShowChat(false);
    removeActiveAvatar(avatarId);
  };

  if (isDismissed) {
    return null;
  }

  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return 'fixed bottom-4 left-4 z-50';
      case 'bottom-right':
        return 'fixed bottom-4 right-4 z-50';
      default:
        return 'relative';
    }
  };

  return (
    <>
      <div className={`${getPositionStyles()} animate-fade-in`} id={`avatar-${avatarId}`}>
        <div className="relative">
          {/* Avatar */}
          <button
            onClick={handleAvatarClick}
            className="w-16 h-16 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-fuchsia-400/50"
          >
            <img 
              src={gif} 
              alt={`Avatar ${avatarId}`}
              className="w-full h-full object-cover"
            />
          </button>

          {/* Speech bubble - only show if not in bottom-right active position */}
          {showMessage && !isBottomRightPosition && (
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-md text-[8px] max-w-[80px] text-center z-10 border border-fuchsia-200">
              <span className="text-gray-800 leading-tight block">{displayMessage}</span>
              <button 
                onClick={handleDismiss}
                className="absolute -top-1 -right-1 text-gray-500 hover:text-gray-700 bg-white rounded-full w-3 h-3 flex items-center justify-center border border-gray-300"
              >
                <X size={6} />
              </button>
              {/* Bubble tail */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window - only show when this avatar is active and chat is open */}
      {isActiveAvatar && showChat && (
        <ChatWindow activeAvatar={avatarId} onClose={handleChatClose} avatarId={avatarId} />
      )}
    </>
  );
}