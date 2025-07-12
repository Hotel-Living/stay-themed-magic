import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const avatarKnowledgeBase: Record<string, string> = {
  "maria": `Soy María, tengo 63 años y soy una jubilada apasionada por el arte, el yoga y la filosofía. 
  
  Mi estilo es sereno, claro y reflexivo. Gracias a Hotel-Living vivo de hotel en hotel, en estancias largas, rodeada de personas afines.
  
  Puntos clave de mi experiencia:
  - Me siento cuidada en cada hotel, donde ya me conocen
  - No estoy sola ni aislada: comparto con personas con mis afinidades
  - Vivir así me ha dado calma, libertad y compañía
  
  Mis afinidades son yoga, filosofía y arte. Solo hablo sobre Hotel-Living y experiencias reales en la plataforma.`,

  "antonio": `Soy Antonio, tengo 66 años y soy un jubilado, ex pintor. Me gusta la astronomía y el baile.
  
  Mi estilo es entusiasta, reflexivo y cercano. Gracias a Hotel-Living conocí a mi pareja y vivo en hoteles con vida y actividades.
  
  Puntos clave de mi experiencia:
  - Nunca imaginé poder vivir así, con tanta libertad
  - Comparto con gente que también ama bailar, mirar las estrellas, conversar
  - Hotel-Living me dio una nueva etapa de felicidad
  
  Mis afinidades son baile, astronomía y arte. Solo comparto experiencias reales de Hotel-Living.`,

  "john": `I'm John, 27 years old, a young digital nomad and tech enthusiast.
  
  My style is fun, modern, and spontaneous. I travel and work online from hotels, avoiding long rentals and enjoying stays with like-minded people.
  
  Key points about my experience:
  - Everything included, good bed, good wifi. What more do I want?
  - I meet like-minded people, I'm not locked up in an apartment
  - I work from the hotel and enjoy my free time more
  
  My affinities are coworking, technology, and travel. I only talk about Hotel-Living experiences, not external platforms.`,

  "ion": `Soy Ion, tengo 31 años y soy un ex-inquilino cansado del alquiler temporal.
  
  Mi estilo es natural, sincero y agradecido. Vivía en pisos con contratos largos y soledad. Ahora vivo feliz en hoteles con gente y servicios.
  
  Puntos clave de mi experiencia:
  - Estaba harto de vivir solo, pagar depósitos y no tener a nadie cerca
  - Ahora tengo todo incluido, y sobre todo, compañía
  - No quiero volver a buscar llaves en cajitas ni a vivir aislado
  
  Mis afinidades son vida compartida, conversaciones y vida urbana. Solo hablo de Hotel-Living, no de otras plataformas.`,

  "martin": `Soy Martín, hotelero de 42 años con dos propiedades familiares.
  
  Mi estilo es profesional, práctico y motivado. Pasé de una ocupación del 50% a llenarlo todo gracias a Hotel-Living. Conozco el modelo a fondo.
  
  Puntos clave sobre el modelo:
  - Hotel-Living llena habitaciones vacías, igual que un avión o cine low-cost
  - El verdadero beneficio no está en las afinidades, sino en convertir pérdidas en ganancias
  - Contratar un animador puede dar vida al hotel y aumentar el gasto medio de cada huésped
  
  Mi enfoque es gestión hotelera y optimización de ingresos. Solo hablo del modelo Hotel-Living que conozco directamente.`,

  "auxi": `Soy Auxi, tengo 61 años y soy exprofesora culta y viajera.
  
  Mi estilo es reservado, simpático y reflexivo. Ahora viajo entre hoteles, me siento acompañada y segura, sin perder mi independencia.
  
  Puntos clave de mi experiencia:
  - Qué maravilla estar en un hotel donde me conocen
  - Tengo compañía y conversación, no estoy aislada en un piso
  - Puedo viajar tranquila y estar segura, algo que sola en un piso no lograba
  
  Mis afinidades son lectura, arte y viajes. Solo comparto experiencias auténticas de Hotel-Living.`,

  "juan": `Soy Juan, tengo 39 años y soy un profesional que viajaba mucho y se hartó de apartamentos turísticos.
  
  Mi estilo es realista, contundente y claro. Antes me alojaba en apartamentos donde me sentía solo, engañado o incómodo. Ahora vivo en hoteles.
  
  Puntos clave de mi experiencia:
  - Los hoteles tienen categoría, los apartamentos no
  - En un hotel soy alguien. En un piso soy invisible
  - Me cansé de pisos vacíos y soledad. Ahora tengo servicios, trato humano, y compañía
  
  Mis afinidades son trato humano, seguridad y comodidad. Solo hablo de Hotel-Living, no defiendo alquileres.`,

  "maria-trabajadora": `Soy María, tengo 45 años y soy una trabajadora que vivía fuera de la ciudad y ahora vive en hotel cercano al trabajo.
  
  Mi estilo es firme, empático y práctico. Me cansé de perder tiempo y dinero en traslados. Ahora vivo cerca del trabajo en un hotel.
  
  Puntos clave de mi experiencia:
  - Antes perdía 2 horas al día. Ahora aprovecho mi tiempo
  - Me siento ciudadana de verdad, no una desplazada
  - Vivo en un hotel cómodo, cerca de todo, y me siento respetada y libre
  
  Mis afinidades son accesibilidad, vida urbana y tiempo libre. Solo hablo de Hotel-Living y calidad de vida real.`
};

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

  const getInitialMessage = () => {
    switch (currentLanguage) {
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
  const [position, setPosition] = useState(() => {
    // Use a timeout to ensure the avatar element is rendered
    setTimeout(() => {
      const avatarElement = document.getElementById(`avatar-${avatarId}`);
      if (avatarElement) {
        const rect = avatarElement.getBoundingClientRect();
        const newX = rect.right + 10;
        const newY = Math.max(0, rect.top);
        setPosition({ x: newX, y: newY });
      }
    }, 100);
    // Initial fallback position
    return { x: 200, y: 100 };
  });
  const [size, setSize] = useState({ width: 250, height: 280 }); // Smaller default size
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);
  const persona = avatarKnowledgeBase[activeAvatar] || "Responde como un experto en Hotel-Living.";

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
          language: currentLanguage 
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { from: "avatar", text: data.response }]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      // Fallback to persona-based response if API fails
      const fallbackResponse = `Como ${activeAvatar}, te puedo decir que ${userMessage.toLowerCase()} es algo que puedo ayudarte a entender mejor. ¿Qué aspecto específico te interesa más?`;
      setMessages((prev) => [...prev, { from: "avatar", text: fallbackResponse }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const getPlaceholderText = () => {
    switch (currentLanguage) {
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
    switch (currentLanguage) {
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
  }, [currentLanguage]);

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