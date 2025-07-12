import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

// The edge function handles multilingual personas, so no hardcoded knowledge base needed here

interface ChatWindowProps {
  activeAvatar: string;
  onClose: () => void;
  avatarId: string;
}

export default function ChatWindow({ activeAvatar, onClose, avatarId }: ChatWindowProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Use i18n.language as the primary source of truth for language detection
  const currentLanguage = i18n.language || 'es';
  
  // Clean language code (remove country code if present)
  const cleanLanguage = currentLanguage.split('-')[0];

  const getInitialMessage = () => {
    switch (cleanLanguage) {
      case 'en':
        return "What would you like to talk about?";
      case 'pt':
        return "Sobre o que gostaria de conversar?";
      case 'ro':
        return "Despre ce ai vrea să vorbim?";
      default:
        return "¿Sobre qué quieres que hablemos?";
    }
  };

  const [messages, setMessages] = useState([{ from: "avatar", text: getInitialMessage() }]);
  const [input, setInput] = useState("");
  const [position, setPosition] = useState({ x: 200, y: 100 });

  // Calculate position immediately when component mounts
  useEffect(() => {
    const calculatePosition = () => {
      const avatarElement = document.getElementById(`avatar-${avatarId}`);
      if (avatarElement) {
        const rect = avatarElement.getBoundingClientRect();
        const newX = Math.min(rect.right + 10, window.innerWidth - 270); // Ensure chat stays on screen
        const newY = Math.max(10, Math.min(rect.top, window.innerHeight - 300));
        setPosition({ x: newX, y: newY });
      }
    };

    // Try immediately and with small delay for DOM rendering
    calculatePosition();
    const timer = setTimeout(calculatePosition, 50);
    
    return () => clearTimeout(timer);
  }, [avatarId]);
  const [size, setSize] = useState({ width: 250, height: 280 }); // Smaller default size
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);
  
  // The edge function has multilingual personas, so we don't need the hardcoded Spanish ones
  const persona = `Avatar: ${activeAvatar}, Language: ${cleanLanguage}`;

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    try {
      const response = await fetch('https://pgdzrvdwgoomjnnegkcn.supabase.co/functions/v1/chat-with-avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          avatarId: activeAvatar,
          persona: persona,
          language: cleanLanguage 
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { from: "avatar", text: data.response }]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat API error:', error);
      // Contextual fallback responses without repeating the question
      const getFallbackResponse = () => {
        switch (cleanLanguage) {
          case 'en':
            return `Sorry, I'm having trouble connecting right now. Let me share something about Hotel-Living that might interest you! I'd love to tell you about our flexible stays and amazing community.`;
          case 'pt':
            return `Desculpe, estou com problemas de conexão agora. Deixe-me compartilhar algo sobre Hotel-Living que pode te interessar! Adoraria falar sobre nossas estadias flexíveis e comunidade incrível.`;
          case 'ro':
            return `Îmi pare rău, am probleme de conexiune acum. Lasă-mă să îți spun ceva despre Hotel-Living care te-ar putea interesa! Mi-ar plăcea să îți vorbesc despre sejururile noastre flexibile și comunitatea minunată.`;
          default:
            return `Disculpa, tengo problemas de conexión ahora. ¡Déjame compartir algo sobre Hotel-Living que te puede interesar! Me encantaría hablarte de nuestras estancias flexibles y comunidad increíble.`;
        }
      };
      setMessages((prev) => [...prev, { from: "avatar", text: getFallbackResponse() }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const getPlaceholderText = () => {
    switch (cleanLanguage) {
      case 'en':
        return "Type your question...";
      case 'pt':
        return "Digite sua pergunta...";
      case 'ro':
        return "Tastează întrebarea ta...";
      default:
        return "Escribe tu pregunta...";
    }
  };

  const getSendButtonText = () => {
    switch (cleanLanguage) {
      case 'en':
        return "Send";
      case 'pt':
        return "Enviar";
      case 'ro':
        return "Trimite";
      default:
        return "Enviar";
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if clicking on the header itself, not buttons
    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'SPAN') {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      // Allow free movement across the entire screen without restrictions
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResize = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startPosX = position.x;
    const startPosY = position.y;
    
    const handleMouseMoveResize = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;
      
      if (direction.includes('right')) {
        newWidth = Math.max(200, startWidth + deltaX);
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(200, startHeight + deltaY);
      }
      if (direction.includes('left')) {
        newWidth = Math.max(200, startWidth - deltaX);
        newX = startPosX + deltaX;
      }
      if (direction.includes('top')) {
        newHeight = Math.max(200, startHeight - deltaY);
        newY = startPosY + deltaY;
      }
      
      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };
    
    const handleMouseUpResize = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMoveResize);
      document.removeEventListener('mouseup', handleMouseUpResize);
    };
    
    document.addEventListener('mousemove', handleMouseMoveResize);
    document.addEventListener('mouseup', handleMouseUpResize);
  };

  // Update initial message when language changes - avoid infinite loops
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].from === "avatar") {
        return [{ from: "avatar", text: getInitialMessage() }];
      }
      return prev;
    });
  }, [cleanLanguage]);

  // Remove redundant i18n synchronization to prevent infinite loops
  // Language changes are now managed centrally by LanguageSwitcher

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div 
      ref={chatRef}
      className="fixed rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border-2 border-fuchsia-400"
      style={{ 
        backgroundColor: '#561C7B',
        left: position.x, 
        top: position.y, 
        width: size.width, 
        height: size.height,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Header - draggable area */}
      <div 
        className="px-4 py-3 font-semibold flex justify-between items-center border-b border-fuchsia-300 cursor-grab active:cursor-grabbing"
        style={{ backgroundColor: '#561C7B' }}
        onMouseDown={handleMouseDown}
      >
        <span className="text-white select-none capitalize">{activeAvatar}</span>
        <button onClick={onClose} className="text-white hover:text-fuchsia-200 transition-colors">
          <X size={16} />
        </button>
      </div>
      
      {/* Messages area - smaller by default */}
      <div className="flex-1 p-3 overflow-y-auto text-sm" style={{ backgroundColor: '#561C7B' }}>
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.from === "avatar" ? "text-left" : "text-right"}`}>
            <span 
              className={`inline-block px-3 py-2 rounded-lg max-w-[90%] shadow-sm ${
                m.from === "avatar" 
                  ? "bg-white text-gray-800" 
                  : "bg-fuchsia-500 text-white"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
      
      {/* Input area */}
      <div className="flex border-t border-fuchsia-300 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-2 text-sm outline-none text-gray-800 placeholder-gray-400 border-none"
          placeholder={getPlaceholderText()}
        />
        <button 
          onClick={handleSend} 
          className="px-4 text-sm text-fuchsia-600 hover:bg-fuchsia-50 transition-colors font-medium"
        >
          {getSendButtonText()}
        </button>
      </div>

      {/* Resize handles - improved */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner handles */}
        <div 
          className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize pointer-events-auto bg-fuchsia-400 opacity-20 hover:opacity-40"
          onMouseDown={(e) => handleResize(e, 'top-left')}
        />
        <div 
          className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize pointer-events-auto bg-fuchsia-400 opacity-20 hover:opacity-40"
          onMouseDown={(e) => handleResize(e, 'top-right')}
        />
        <div 
          className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize pointer-events-auto bg-fuchsia-400 opacity-20 hover:opacity-40"
          onMouseDown={(e) => handleResize(e, 'bottom-left')}
        />
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize pointer-events-auto bg-fuchsia-400 opacity-20 hover:opacity-40"
          onMouseDown={(e) => handleResize(e, 'bottom-right')}
        />
        
        {/* Edge handles */}
        <div 
          className="absolute top-0 left-4 right-4 h-2 cursor-n-resize pointer-events-auto bg-fuchsia-400 opacity-10 hover:opacity-30"
          onMouseDown={(e) => handleResize(e, 'top')}
        />
        <div 
          className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize pointer-events-auto bg-fuchsia-400 opacity-10 hover:opacity-30"
          onMouseDown={(e) => handleResize(e, 'bottom')}
        />
        <div 
          className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize pointer-events-auto bg-fuchsia-400 opacity-10 hover:opacity-30"
          onMouseDown={(e) => handleResize(e, 'left')}
        />
        <div 
          className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize pointer-events-auto bg-fuchsia-400 opacity-10 hover:opacity-30"
          onMouseDown={(e) => handleResize(e, 'right')}
        />
      </div>
    </div>
  );
}