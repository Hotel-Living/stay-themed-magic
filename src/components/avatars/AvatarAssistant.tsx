import { useState, useEffect } from "react";
import { X } from "lucide-react";
import ChatWindow from "./ChatWindow";

interface AvatarAssistantProps {
  avatarId: string;
  gif: string;
  isVisible: boolean;
  onClose?: () => void;
}

const getMessage = () => {
  const lang = navigator.language;
  if (lang.startsWith("en")) return "I'll stay here in case you need me.";
  if (lang.startsWith("pt")) return "Fico por aqui caso precise de mim."; 
  if (lang.startsWith("ro")) return "Rămân aici în caz că ai nevoie de mine.";
  return "Me quedo por aquí por si me necesitas.";
};

export function AvatarAssistant({ avatarId, gif, isVisible, onClose }: AvatarAssistantProps) {
  const [showChat, setShowChat] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user already has an active avatar
    const activeAvatar = localStorage.getItem('activeAvatar');
    if (activeAvatar && activeAvatar !== avatarId) {
      setIsDismissed(true);
    }
  }, [avatarId]);

  const handleAvatarClick = () => {
    // Set as active avatar
    localStorage.setItem('activeAvatar', avatarId);
    setShowChat(true);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onClose?.();
  };

  const handleChatClose = () => {
    setShowChat(false);
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <>
      <div className="relative mb-4 flex justify-center animate-fade-in">
        <div className="relative">
          {/* Avatar */}
          <button
            onClick={handleAvatarClick}
            className="w-16 h-16 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <img 
              src={gif} 
              alt={`Avatar ${avatarId}`}
              className="w-full h-full object-cover"
            />
          </button>

          {/* Speech bubble */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-2 shadow-md text-xs whitespace-nowrap z-10">
            <span className="text-gray-800">{getMessage()}</span>
            <button 
              onClick={handleDismiss}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X size={12} />
            </button>
            {/* Bubble tail */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {showChat && (
        <ChatWindow activeAvatar={avatarId} avatarPosition="bottom-right" onClose={handleChatClose} />
      )}
    </>
  );
}