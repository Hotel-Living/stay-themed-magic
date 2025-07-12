import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
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
}

export default function ChatWindow({ activeAvatar, onClose }: ChatWindowProps) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState(() => {
    const getInitialMessage = () => {
      switch (i18n.language) {
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
    return [{ from: "avatar", text: getInitialMessage() }];
  });
  const [input, setInput] = useState("");
  const [position, setPosition] = useState({ x: window.innerWidth - 320, y: window.innerHeight - 450 });
  const [size, setSize] = useState({ width: 280, height: 350 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);
  const persona = avatarKnowledgeBase[activeAvatar] || "Responde como un experto en Hotel-Living.";

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    setTimeout(() => {
      const response = `(${activeAvatar.toUpperCase()}) ${persona} Tú preguntaste: "${userMessage}".`;
      setMessages((prev) => [...prev, { from: "avatar", text: response }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const getPlaceholderText = () => {
    switch (i18n.language) {
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
    switch (i18n.language) {
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
    if (e.target === e.currentTarget) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResize = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    setIsResizing(true);
    
    const handleMouseMoveResize = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const rect = chatRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      let newWidth = size.width;
      let newHeight = size.height;
      let newX = position.x;
      let newY = position.y;
      
      if (direction.includes('right')) {
        newWidth = Math.max(200, e.clientX - rect.left);
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(250, e.clientY - rect.top);
      }
      if (direction.includes('left')) {
        const deltaX = rect.left - e.clientX;
        newWidth = Math.max(200, size.width + deltaX);
        newX = position.x - deltaX;
      }
      if (direction.includes('top')) {
        const deltaY = rect.top - e.clientY;
        newHeight = Math.max(250, size.height + deltaY);
        newY = position.y - deltaY;
      }
      
      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };
    
    document.addEventListener('mousemove', handleMouseMoveResize);
    document.addEventListener('mouseup', () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMoveResize);
    });
  };

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
      className="fixed rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200 bg-white"
      style={{ 
        left: position.x, 
        top: position.y, 
        width: size.width, 
        height: size.height,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Header - draggable area */}
      <div 
        className="px-4 py-3 font-semibold flex justify-between items-center border-b border-gray-200 bg-gray-50 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <span className="text-gray-800 select-none">{activeAvatar}</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
          <X size={16} />
        </button>
      </div>
      
      {/* Messages area with white background */}
      <div className="flex-1 p-3 overflow-y-auto text-sm bg-white">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.from === "avatar" ? "text-left" : "text-right"}`}>
            <span 
              className={`inline-block px-3 py-2 rounded-lg max-w-[90%] shadow-sm ${
                m.from === "avatar" 
                  ? "bg-gray-100 text-gray-800" 
                  : "bg-blue-500 text-white"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
      
      {/* Input area */}
      <div className="flex border-t border-gray-200 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-2 text-sm outline-none text-gray-800 placeholder-gray-400 border-none"
          placeholder={getPlaceholderText()}
        />
        <button 
          onClick={handleSend} 
          className="px-4 text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium"
        >
          {getSendButtonText()}
        </button>
      </div>

      {/* Resize handles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner handles */}
        <div 
          className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize pointer-events-auto"
          onMouseDown={(e) => handleResize(e, 'top-left')}
        />
        <div 
          className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize pointer-events-auto"
          onMouseDown={(e) => handleResize(e, 'top-right')}
        />
        <div 
          className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize pointer-events-auto"
          onMouseDown={(e) => handleResize(e, 'bottom-left')}
        />
        <div 
          className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize pointer-events-auto"
          onMouseDown={(e) => handleResize(e, 'bottom-right')}
        />
        
        {/* Edge handles */}
        <div 
          className="absolute top-0 left-3 right-3 h-1 cursor-n-resize pointer-events-auto"
          onMouseDown={(e) => handleResize(e, 'top')}
        />
        <div 
          className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize pointer-events-auto"
          onMouseDown={(e) => handleResize(e, 'bottom')}
        />
        <div 
          className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize pointer-events-auto"
          onMouseDown={(e) => handleResize(e, 'left')}
        />
        <div 
          className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize pointer-events-auto"
          onMouseDown={(e) => handleResize(e, 'right')}
        />
      </div>
    </div>
  );
}