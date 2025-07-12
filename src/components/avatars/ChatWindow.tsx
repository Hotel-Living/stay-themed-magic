import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
  avatarPosition: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  onClose: () => void;
}

export default function ChatWindow({ activeAvatar, avatarPosition, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState(() => {
    const lang = navigator.language;
    let initialMessage = "¿Sobre qué quieres que hablemos?";
    if (lang.startsWith("en")) initialMessage = "What would you like to talk about?";
    if (lang.startsWith("pt")) initialMessage = "Sobre o que gostaria de conversar?";
    if (lang.startsWith("ro")) initialMessage = "Despre ce ai vrea să vorbim?";
    return [{ from: "avatar", text: initialMessage }];
  });
  const [input, setInput] = useState("");
  const persona = avatarKnowledgeBase[activeAvatar] || "Responde como un experto en Hotel-Living.";

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    setTimeout(() => {
      // Generate more conversational response for Martín
      let response = "";
      if (activeAvatar === "martin") {
        if (userMessage.toLowerCase().includes("negocio") || userMessage.toLowerCase().includes("business")) {
          response = "Soy hotelero, tengo dos propiedades familiares. ¿Te interesa saber algo específico del sector?";
        } else if (userMessage.toLowerCase().includes("hotel-living") || userMessage.toLowerCase().includes("funciona")) {
          response = persona.split("Puntos clave")[1] || "Te explico cómo funciona Hotel-Living desde mi experiencia como hotelero.";
        } else {
          response = "Hola, soy Martín. Soy hotelero y trabajo con Hotel-Living. ¿En qué puedo ayudarte?";
        }
      } else {
        // For other avatars, use shorter persona intro + user question
        const shortPersona = persona.split("Puntos clave")[0].split(".")[0] + ".";
        response = `${shortPersona} Sobre tu pregunta: "${userMessage}"...`;
      }
      setMessages((prev) => [...prev, { from: "avatar", text: response }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const getPlaceholderText = () => {
    const lang = navigator.language;
    if (lang.startsWith("en")) return "Type your question...";
    if (lang.startsWith("pt")) return "Digite sua pergunta..."; 
    if (lang.startsWith("ro")) return "Tastează întrebarea ta...";
    return "Escribe tu pregunta...";
  };

  const getSendButtonText = () => {
    const lang = navigator.language;
    if (lang.startsWith("en")) return "Send";
    if (lang.startsWith("pt")) return "Enviar"; 
    if (lang.startsWith("ro")) return "Trimite";
    return "Enviar";
  };

  const getHeaderText = () => {
    const lang = navigator.language;
    if (lang.startsWith("en")) return "Hotel-Living Assistant";
    if (lang.startsWith("pt")) return "Assistente Hotel-Living"; 
    if (lang.startsWith("ro")) return "Asistent Hotel-Living";
    return "Asistente Hotel-Living";
  };

  // Dynamic positioning based on avatar position (40% smaller chat)
  const getPosition = () => {
    const chatWidth = 144; // w-36 in pixels (40% reduced from w-48)
    const avatarSize = 64; // Avatar size
    const gap = 8; // Gap between avatar and chat
    
    switch (avatarPosition) {
      case 'bottom-left':
        return { 
          bottom: '88px', // Above avatar 
          left: '16px', 
          right: 'auto',
          top: 'auto'
        };
      case 'bottom-right':
        return { 
          bottom: '88px', // Above avatar
          right: '16px', 
          left: 'auto',
          top: 'auto'
        };
      case 'top-left':
        return { 
          top: '88px', // Below avatar
          left: '16px', 
          right: 'auto',
          bottom: 'auto'
        };
      case 'top-right':
        return { 
          top: '88px', // Below avatar
          right: '16px', 
          left: 'auto',
          bottom: 'auto'
        };
      default:
        return { 
          bottom: '88px', 
          right: '16px', 
          left: 'auto',
          top: 'auto'
        };
    }
  };
  
  const position = getPosition();

  return (
    <div 
      className="fixed rounded-xl shadow-2xl w-36 max-h-[30vh] flex flex-col overflow-hidden z-50 border border-fuchsia-400/30"
      style={{ 
        backgroundColor: '#7B4194',
        bottom: position.bottom,
        right: position.right,
        left: position.left,
        top: position.top
      }}
    >
      <div className="px-4 py-3 font-semibold flex justify-between items-center border-b border-white/20">
        <span className="text-white">{getHeaderText()}</span>
        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto text-sm">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.from === "avatar" ? "text-left" : "text-right"}`}>
            <span 
              className={`inline-block px-3 py-2 rounded-lg max-w-[90%] shadow-sm ${
                m.from === "avatar" 
                  ? (i === 0 ? "bg-white text-gray-800" : "text-gray-800")
                  : "bg-white text-gray-800"
              }`}
              style={m.from === "avatar" && i > 0 ? { backgroundColor: '#8b5dc9' } : {}}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex border-t border-white/20">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-2 text-sm outline-none bg-white/10 text-white placeholder-white/60 border-none"
          placeholder={getPlaceholderText()}
        />
        <button 
          onClick={handleSend} 
          className="px-4 text-sm text-white hover:bg-white/10 transition-colors font-medium"
        >
          {getSendButtonText()}
        </button>
      </div>
    </div>
  );
}