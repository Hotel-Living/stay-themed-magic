import { useState, useEffect } from "react";
import { X } from "lucide-react";
import ChatWindow from "./ChatWindow";
import { useAvatarManager } from "@/contexts/AvatarManager";

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
  const { activeAvatar, moveAvatarToActivePosition, dismissActiveAvatar } = useAvatarManager();

  const isActiveAvatar = activeAvatar?.id === avatarId;
  const isBottomRightPosition = position === 'bottom-right';

  const getDefaultMessage = () => {
    const lang = navigator.language;
    if (lang.startsWith("en")) return "I'm here if you need me.";
    if (lang.startsWith("pt")) return "Estou aqui se precisar de mim."; 
    if (lang.startsWith("ro")) return "Sunt aici dacă ai nevoie de mine.";
    return "Estoy aquí si me necesitas.";
  };

  const displayMessage = message || getDefaultMessage();

  const handleAvatarClick = () => {
    if (position === 'content') {
      // Move to bottom-right and activate
      moveAvatarToActivePosition(avatarId, gif);
      setShowChat(true);
    } else if (isActiveAvatar && showChat) {
      // If already active and chat is open, just ensure chat stays open
      setShowChat(true);
    } else {
      // Activate this avatar
      moveAvatarToActivePosition(avatarId, gif);
      setShowChat(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    if (isActiveAvatar) {
      dismissActiveAvatar();
    }
    onClose?.();
  };

  const handleChatClose = () => {
    setShowChat(false);
    if (position !== 'bottom-right') {
      dismissActiveAvatar();
    }
  };

  // If another avatar is active and this one is not in bottom-right position, hide it
  if (activeAvatar && activeAvatar.id !== avatarId && position !== 'bottom-right') {
    return null;
  }

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
      <div className={`${getPositionStyles()} animate-fade-in`}>
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
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-2 shadow-md text-xs whitespace-nowrap z-10 border border-fuchsia-200">
              <span className="text-gray-800">{displayMessage}</span>
              <button 
                onClick={handleDismiss}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X size={12} />
              </button>
              {/* Bubble tail */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window - only show when this avatar is active and chat is open */}
      {isActiveAvatar && showChat && (
        <ChatWindow activeAvatar={avatarId} onClose={handleChatClose} />
      )}
    </>
  );
}