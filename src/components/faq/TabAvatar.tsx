import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface TabAvatarProps {
  avatarId: string;
  gif: string;
  message: string;
  onClose: () => void;
}

export function TabAvatar({ avatarId, gif, message, onClose }: TabAvatarProps) {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Hide message after 7 seconds but keep avatar visible
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Avatar Image */}
      <div className="relative">
        <img 
          src={gif} 
          alt={avatarId}
          className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-white"
          style={{ objectPosition: 'center' }}
        />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors duration-200"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Message bubble */}
      {showMessage && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-2 shadow-lg text-xs font-medium text-gray-800 text-center max-w-xs whitespace-nowrap border border-gray-200">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
          {message}
        </div>
      )}
    </div>
  );
}
