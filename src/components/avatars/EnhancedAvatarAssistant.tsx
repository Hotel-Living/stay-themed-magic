import { useState } from "react";
import { X } from "lucide-react";
import ChatWindow from "./ChatWindow";
import { useAvatarManager } from "@/contexts/AvatarManager";

interface EnhancedAvatarAssistantProps {
  avatarId: string;
  gif: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'content';
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
  const [isDismissed, setIsDismissed] = useState(false);
  const { activeAvatars, addActiveAvatar, removeActiveAvatar, toggleAvatarChat, isAvatarActive } = useAvatarManager();

  const activeAvatar = activeAvatars.find(avatar => avatar.id === avatarId);
  const isActive = isAvatarActive(avatarId);

  const getDefaultMessage = () => {
    const lang = navigator.language;
    if (lang.startsWith("en")) return "I'm here if you need me.";
    if (lang.startsWith("pt")) return "Estou aqui se precisar de mim."; 
    if (lang.startsWith("ro")) return "Sunt aici dacă ai nevoie de mine.";
    return "Estoy aquí si me necesitas.";
  };

  const displayMessage = message || getDefaultMessage();

  const handleAvatarClick = () => {
    if (isActive) {
      // If already active, toggle chat
      toggleAvatarChat(avatarId);
    } else {
      // If not active, add to active avatars
      addActiveAvatar(avatarId, gif);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    if (isActive) {
      removeActiveAvatar(avatarId);
    }
    onClose?.();
  };

  const handleChatClose = () => {
    toggleAvatarChat(avatarId);
  };

  // Determine effective position
  const effectivePosition = isActive && activeAvatar ? activeAvatar.position : position;

  if (isDismissed) {
    return null;
  }

  const getPositionStyles = () => {
    switch (effectivePosition) {
      case 'bottom-left':
        return 'fixed bottom-4 left-4 z-50';
      case 'bottom-right':
        return 'fixed bottom-4 right-4 z-50';
      case 'top-left':
        return 'fixed top-4 left-4 z-50';
      case 'top-right':
        return 'fixed top-4 right-4 z-50';
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

          {/* Speech bubble - only show if not active and has message */}
          {showMessage && !isActive && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-md text-[10px] max-w-[120px] z-10 border border-fuchsia-200">
              <span className="text-gray-800 leading-tight line-clamp-2">{displayMessage}</span>
              <button 
                onClick={handleDismiss}
                className="ml-1 text-gray-500 hover:text-gray-700 float-right"
              >
                <X size={10} />
              </button>
              {/* Bubble tail */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-white"></div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window - only show when this avatar is active and chat is open */}
      {isActive && activeAvatar?.showChat && (
        <ChatWindow 
          activeAvatar={avatarId} 
          avatarPosition={activeAvatar.position}
          onClose={handleChatClose} 
        />
      )}
    </>
  );
}