import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface ChatWindowProps {
  activeAvatar: string;
  onClose: () => void;
  avatarId: string;
}

export default function ChatWindow({ activeAvatar, onClose, avatarId }: ChatWindowProps) {
  const { t, i18n } = useTranslation();
  const chatRef = useRef<HTMLDivElement>(null);

  const currentLanguage = i18n.language || 'es';
  const cleanLanguage = currentLanguage.split('-')[0];

  const getInitialMessage = () => {
    switch (cleanLanguage) {
      case 'en': return "What would you like to talk about?";
      case 'pt': return "Sobre o que gostaria de conversar?";
      case 'ro': return "Despre ce ai vrea să vorbim?";
      default: return "¿Sobre qué quieres que hablemos?";
    }
  };

  const [messages, setMessages] = useState([{ from: "avatar", text: getInitialMessage() }]);
  const [input, setInput] = useState("");
  const [width, setWidth] = useState(280);
  const [height, setHeight] = useState(500);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startWidth, setStartWidth] = useState(280);
  const [startHeight, setStartHeight] = useState(500);

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
        body: JSON.stringify({ message: userMessage, avatarId: activeAvatar, persona, language: cleanLanguage })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { from: "avatar", text: data.response }]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat API error:', error);
      const getFallbackResponse = () => {
        switch (cleanLanguage) {
          case 'en': return "Sorry, I'm having trouble connecting right now. Let me share something about Hotel-Living that might interest you! I'd love to tell you about our flexible stays and amazing community.";
          case 'pt': return "Desculpe, estou com problemas de conexão agora. Deixe-me compartilhar algo sobre Hotel-Living que pode te interessar! Adoraria falar sobre nossas estadias flexíveis e comunidade incrível.";
          case 'ro': return "Îmi pare rău, am probleme de conexiune acum. Lasă-mă să îți spun ceva despre Hotel-Living care te-ar putea interesa! Mi-ar plăcea să îți vorbesc despre sejururile noastre flexibile și comunitatea minunată.";
          default: return "Disculpa, tengo problemas de conexión ahora. ¡Déjame compartir algo sobre Hotel-Living que te puede interesar! Me encantaría hablarte de nuestras estancias flexibles y comunidad increíble.";
        }
      };
      setMessages((prev) => [...prev, { from: "avatar", text: getFallbackResponse() }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleMouseDownResize = (e: React.MouseEvent) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setStartWidth(width);
    setStartHeight(height);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        setWidth(Math.max(250, startWidth + deltaX));
        setHeight(Math.max(300, startHeight + deltaY));
      }
    };
    const handleMouseUp = () => {
      if (isResizing) setIsResizing(false);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, startX, startY, startWidth, startHeight]);

  const getPlaceholderText = () => {
    switch (cleanLanguage) {
      case 'en': return "Type your question...";
      case 'pt': return "Digite sua pergunta...";
      case 'ro': return "Tastează întrebarea ta...";
      default: return "Escribe tu pregunta...";
    }
  };

  const getSendButtonText = () => {
    switch (cleanLanguage) {
      case 'en': return "Send";
      case 'pt': return "Enviar";
      case 'ro': return "Trimite";
      default: return "Enviar";
    }
  };

  return (
    <div
      ref={chatRef}
  className="fixed top-24 left-1/2 transform -translate-x-1/2 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border-2 border-fuchsia-400"
      style={{ backgroundColor: '#561C7B', width, height }}
    >
      <div className="px-4 py-3 font-semibold flex justify-between items-center border-b border-fuchsia-300" style={{ backgroundColor: '#561C7B' }}>
        <span className="text-white select-none capitalize">{activeAvatar}</span>
        <button onClick={onClose} className="text-white hover:text-fuchsia-200 transition-colors">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto text-sm" style={{ backgroundColor: '#561C7B' }}>
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.from === "avatar" ? "text-left" : "text-right"}`}>
            <span className={`inline-block px-3 py-2 rounded-lg max-w-[90%] shadow-sm ${m.from === "avatar" ? "bg-white text-gray-800" : "bg-fuchsia-500 text-white"}`}>{m.text}</span>
          </div>
        ))}
      </div>
      <div className="flex border-t border-fuchsia-300 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-2 text-sm outline-none text-gray-800 placeholder-gray-400 border-none"
          placeholder={getPlaceholderText()}
        />
        <button onClick={handleSend} className="px-4 text-sm text-fuchsia-600 hover:bg-fuchsia-50 transition-colors font-medium">
          {getSendButtonText()}
        </button>
      </div>
      <div
        className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize bg-fuchsia-400 opacity-10 hover:opacity-40"
        onMouseDown={handleMouseDownResize}
      />
    </div>
  );
}
