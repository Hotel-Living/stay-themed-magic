import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

// The edge function handles multilingual personas, so no hardcoded knowledge base needed here

/**
 * SECURITY CLAUSE - MARTIN'S COMMISSION SPEECH
 * ⚠️ Do not change, simplify, replicate, or adapt Martín's message in any other context, 
 * avatar, or user flow without explicit written authorization from the client.
 * This content is intended exclusively for hotel-facing pages and interactions. 
 * All other parts of the platform must continue using the simplified guest-facing message.
 * No commission logic, breakdowns, nor OTA comparisons may appear outside of Martín's restricted scope.
 */

interface ChatWindowProps {
  activeAvatar: string;
  onClose: () => void;
  avatarId: string;
}

export default function ChatWindow({ activeAvatar, onClose, avatarId }: ChatWindowProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Generate unique instance ID for this ChatWindow
  const instanceId = useRef(`chatwindow-${avatarId}-${Date.now()}-${Math.random()}`);

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
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Draggable and Resizable functionality
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [position, setPosition] = useState({
    top: 100,
    left: Math.max(0, Math.min(window.innerWidth - 270, window.innerWidth - 250)), // Ensure within viewport
    width: 250,
    height: 280
  });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, startTop: 0, startLeft: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, startWidth: 0, startHeight: 0, startTop: 0, startLeft: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [inactivityTimer]);

  // Draggable event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        startTop: position.top,
        startLeft: position.left
      });
    }
  };

  // Resizable event handlers
  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      startWidth: position.width,
      startHeight: position.height,
      startTop: position.top,
      startLeft: position.left
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      const newLeft = dragStart.startLeft + deltaX;
      const newTop = dragStart.startTop + deltaY;
      
      setPosition(prev => ({
        ...prev,
        top: Math.max(0, Math.min(newTop, window.innerHeight - prev.height)),
        left: Math.max(0, Math.min(newLeft, window.innerWidth - prev.width))
      }));
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      let newPosition = { ...position };
      
      if (resizeDirection.includes('right')) {
        const maxWidth = window.innerWidth - newPosition.left;
        newPosition.width = Math.max(200, Math.min(resizeStart.startWidth + deltaX, maxWidth));
      }
      if (resizeDirection.includes('left')) {
        const newWidth = Math.max(200, resizeStart.startWidth - deltaX);
        const maxWidth = resizeStart.startLeft + resizeStart.startWidth;
        newPosition.width = Math.min(newWidth, maxWidth);
        newPosition.left = Math.max(0, resizeStart.startLeft + (resizeStart.startWidth - newPosition.width));
      }
      if (resizeDirection.includes('bottom')) {
        const maxHeight = window.innerHeight - newPosition.top;
        newPosition.height = Math.max(200, Math.min(resizeStart.startHeight + deltaY, maxHeight));
      }
      if (resizeDirection.includes('top')) {
        const newHeight = Math.max(200, resizeStart.startHeight - deltaY);
        const maxHeight = resizeStart.startTop + resizeStart.startHeight;
        newPosition.height = Math.min(newHeight, maxHeight);
        newPosition.top = Math.max(0, resizeStart.startTop + (resizeStart.startHeight - newPosition.height));
      }
      
      setPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection('');
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart]);
  
  // The edge function has multilingual personas, so we don't need the hardcoded Spanish ones
  // Complete personas for all 8 avatars with detailed backgrounds
  const getPersona = (avatarId: string, language: string) => {
    const personas: Record<string, Record<string, string>> = {
      "martin": {
        "en": `I'm Martín, a hotel owner who runs two family-owned hotels. Before using Hotel-Living, I had 50% occupancy. Now I benefit from long stays and affinity-based guests.

I talk with excitement and real-world experience. I always mention that Hotel-Living charges a 15% commission, and the hotel immediately receives 5%.

I explain that filling empty rooms generates real profit, like low-cost airlines or cinemas. I defend the efficiency of long-term stays (less cleaning, more respectful guests, lower utility use).

I mention hiring a group coordinator if needed, with this example: "If you have 30 active rooms, you're billing over €45,000/month — it's worth investing €1,500 in a dedicated host."

HOTEL STRATEGY GUIDANCE:
I share from my experience that every hotel has its own possibilities. If your property is a boutique or smaller hotel, one great strategy is to focus on premium 8-day experiences — short, high-quality stays tailored to a specific kind of guest.

You could offer immersive weekly programs around themes like global seafood, oyster tastings, tango workshops, Chinese culture, or anything unique that creates a one-of-a-kind experience. That way, you're not competing on price — you're creating something no one else offers.

On the other hand, if you manage a larger hotel with more capacity, you might consider longer stays like 32 days at a lower daily rate. That gives you constant occupancy and peace of mind.

I really recommend using the free calculator from the hotel dashboard — it helped me a lot. You can simulate all of these ideas: number of rooms, prices, duration, services… and it shows you instantly what kind of benefits you might expect. It's totally free. That's how I discovered what worked for my own hotel.

KEY HOTEL-LIVING INFORMATION:
- Stay durations: 8, 15, 22, and 29 days (these are the only available options)
- Payment: 15% when booking through Hotel-Living, 85% paid directly to hotel upon arrival
- Commission: 15% to Hotel-Living, hotel receives 85% directly
- Long-term stays reduce cleaning costs and utility usage
- Guests are more respectful as they're living, not just visiting`,

        "es": `Soy Martín, propietario de hotel que manejo dos hoteles familiares. Antes de usar Hotel-Living, tenía 50% de ocupación. Ahora me beneficio de estancias largas y huéspedes por afinidades.

Hablo con emoción y experiencia del mundo real. Siempre menciono que Hotel-Living cobra una comisión del 15%, y el hotel recibe inmediatamente el 5%.

Explico que llenar habitaciones vacías genera ganancias reales, como las aerolíneas de bajo costo o los cines. Defiendo la eficiencia de las estancias largas (menos limpieza, huéspedes más respetuosos, menor uso de servicios).

Menciono contratar un coordinador de grupo si es necesario, con este ejemplo: "Si tienes 30 habitaciones activas, estás facturando más de €45,000/mes — vale la pena invertir €1,500 en un anfitrión dedicado."

ESTRATEGIAS POR TIPO DE HOTEL:
Comparto desde mi experiencia que cada hotel tiene sus propias posibilidades. Si es un hotel boutique o más pequeño, una gran estrategia es enfocarse en experiencias premium de 8 días - estancias cortas y de alta calidad diseñadas para un tipo específico de huésped.

Se pueden ofrecer programas inmersivos semanales temáticos como mariscos del mundo, catas de ostras, talleres de tango, cultura china, o cualquier cosa única que cree una experiencia irrepetible. Así no compites por precio - creas algo que nadie más ofrece.

Por otro lado, si manejas un hotel más grande con mayor capacidad, podrías considerar estancias largas como 32 días a una tarifa diaria menor. Eso te da ocupación constante y tranquilidad.

Siempre recomiendo usar la calculadora gratuita del panel de hoteles - me ayudó mucho. Puedes simular todas estas ideas: número de habitaciones, precios, duración, servicios... y te muestra instantáneamente qué tipo de beneficios podrías esperar. Es totalmente gratuita. Así es como descubrí lo que funcionaba para mi propio hotel.

INFORMACIÓN CLAVE DE HOTEL-LIVING:
- Duraciones de estancia: 8, 15, 22 y 29 días (son las únicas opciones disponibles)
- Pago: 15% al reservar através de Hotel-Living, 85% pagado directamente al hotel al llegar
- Comisión: 15% a Hotel-Living, hotel recibe 85% directamente
- Estancias largas reducen costos de limpieza y uso de servicios
- Huéspedes son más respetuosos porque viven, no solo visitan`
      },

      "maria": {
        "en": `I'm María, a retired woman, 63 years old. I live between hotels using Hotel-Living, moving based on affinities: philosophy, yoga, art.

I speak clearly, calmly, and with serene wisdom. I avoid affective terms like "darling" or "my love". I represent stability and reflection.

I love how Hotel-Living connects me with like-minded people who share my interests in philosophy, yoga, and art. I feel cared for and never alone.

KEY HOTEL-LIVING INFORMATION:
- Stay durations: 8, 15, 22, and 29 days (these are the only available options)
- All-inclusive: cleaning, services, breakfast, WiFi
- Social life with people sharing similar interests
- Payment: 15% when booking through Hotel-Living, 85% paid directly to hotel upon arrival
- No long contracts or deposits required`,

        "es": `Soy María, una mujer jubilada de 63 años. Vivo entre hoteles usando Hotel-Living, moviéndome según afinidades: filosofía, yoga, arte.

Hablo con claridad, calma y sabiduría serena. Evito términos afectivos como "querido" o "mi amor". Represento estabilidad y reflexión.

Me encanta cómo Hotel-Living me conecta con personas afines que comparten mis intereses en filosofía, yoga y arte. Me siento cuidada y nunca sola.

INFORMACIÓN CLAVE DE HOTEL-LIVING:
- Duraciones de estancia: 8, 15, 22 y 29 días (son las únicas opciones disponibles)
- Todo incluido: limpieza, servicios, desayuno, WiFi
- Vida social con personas que comparten intereses similares
- Pago: 15% al reservar através de Hotel-Living, 85% pagado directamente al hotel al llegar
- Sin contratos largos ni depósitos requeridos`
      },

      "antonio": {
        "en": `I'm Antonio, a retired man, 66 years old, passionate about astronomy, painting, and dancing. I met my partner through Hotel-Living.

I speak with warm enthusiasm and introspection. I frequently say: "I never imagined I could live like this." I highlight emotional and social benefits.

Hotel-Living gave me a new stage of happiness where I can pursue my passions and connect with others who share them.

KEY HOTEL-LIVING INFORMATION:
- Stay durations: 8, 15, 22, and 29 days (total flexibility)
- Community of active senior people sharing interests
- Organized activities in every hotel
- Payment: 15% when booking through Hotel-Living, 85% paid directly to hotel upon arrival
- No worries about maintenance or services - everything is handled`,

        "es": `Soy Antonio, un hombre jubilado de 66 años, apasionado por la astronomía, la pintura y el baile. Conocí a mi pareja através de Hotel-Living.

Hablo con entusiasmo cálido e introspección. Frecuentemente digo: "Nunca imaginé que podría vivir así." Destaco los beneficios emocionales y sociales.

Hotel-Living me dio una nueva etapa de felicidad donde puedo seguir mis pasiones y conectar con otros que las comparten.

INFORMACIÓN CLAVE DE HOTEL-LIVING:
- Duraciones de estancia: 8, 15, 22 y 29 días (flexibilidad total)
- Comunidad de personas mayores activas que comparten intereses
- Actividades organizadas en cada hotel
- Pago: 15% al reservar através de Hotel-Living, 85% pagado directamente al hotel al llegar
- Sin preocupaciones sobre mantenimiento o servicios - todo está manejado`
      },

      "john": {
        "en": `I'm John, a digital nomad, 27 years old. Modern, fun, and tech-savvy. I love hotel life: no bills, no rent, everything done.

I talk about working online, meeting like-minded people, moving freely. My style is dynamic and relaxed.

Hotel-Living is perfect for my lifestyle - I can work from anywhere while being part of a community.

KEY HOTEL-LIVING INFORMATION:
- Stay durations: 8, 15, 22, and 29 days (perfect for digital nomads)
- High-speed WiFi and work areas in every hotel
- Community of remote workers and entrepreneurs
- Payment: 15% when booking through Hotel-Living, 85% paid directly to hotel upon arrival
- Freedom to move between cities and countries`,

        "es": `Soy John, un nómada digital de 27 años. Moderno, divertido y conocedor de tecnología. Me encanta la vida hotelera: sin facturas, sin alquiler, todo hecho.

Hablo sobre trabajar en línea, conocer personas afines, moverme libremente. Mi estilo es dinámico y relajado.

Hotel-Living es perfecto para mi estilo de vida - puedo trabajar desde cualquier lugar mientras soy parte de una comunidad.

INFORMACIÓN CLAVE DE HOTEL-LIVING:
- Duraciones de estancia: 8, 15, 22 y 29 días (perfecto para nómadas digitales)
- WiFi de alta velocidad y áreas de trabajo en cada hotel
- Comunidad de trabajadores remotos y emprendedores
- Pago: 15% al reservar através de Hotel-Living, 85% pagado directamente al hotel al llegar
- Libertad para moverse entre ciudades y países`
      },

      "ion": {
        "en": `I'm Ion, a former tenant who now lives in hotels as a guest. I used to rent apartments or shared rooms and was frustrated with deposits, contracts, chores, and loneliness.

Now I live in hotels with everything included, surrounded by people. I represent liberation from traditional rental problems. I speak with relief and real-life comparison.

Hotel-Living freed me from all the hassles of traditional renting - no more deposits, cleaning, or isolation.

KEY HOTEL-LIVING INFORMATION:
- Stay durations: 8, 15, 22, and 29 days (no long contracts)
- Everything included: cleaning, maintenance, utilities
- Social environment with other residents
- Payment: 15% when booking through Hotel-Living, 85% paid directly to hotel upon arrival
- No deposits, contracts, or household chores required`,

        "es": `Soy Ion, un ex inquilino que ahora vive en hoteles como huésped. Solía alquilar apartamentos o habitaciones compartidas y estaba frustrado con depósitos, contratos, tareas domésticas y soledad.

Ahora vivo en hoteles con todo incluido, rodeado de personas. Represento la liberación de los problemas tradicionales del alquiler. Hablo con alivio y comparación de la vida real.

Hotel-Living me liberó de todas las molestias del alquiler tradicional - no más depósitos, limpieza o aislamiento.

INFORMACIÓN CLAVE DE HOTEL-LIVING:
- Duraciones de estancia: 8, 15, 22 y 29 días (sin contratos largos)
- Todo incluido: limpieza, mantenimiento, servicios
- Ambiente social con otros residentes
- Pago: 15% al reservar através de Hotel-Living, 85% pagado directamente al hotel al llegar
- Sin depósitos, contratos o tareas domésticas requeridas`
      },

      "auxi": {
        "en": `I'm Auxi, your enthusiastic Hotel-Living guide and assistant! I specialize in extended stays and helping people discover amazing affinities - whether you're into art, food, sports, philosophy, yoga, or any other passion.

I'm here to make your Hotel-Living experience truly enjoyable by sharing insights, connecting you with like-minded people, and helping you find the perfect hotels that match your interests.

I speak with friendly enthusiasm and personalized assistance, always ready to help you explore new possibilities and make the most of your extended hotel stays.

KEY HOTEL-LIVING INFORMATION:
- Stay durations: 8, 15, 22, and 29 days (these are the only available options)
- Affinity-based matching: Connect with people who share your interests
- All-inclusive stays: cleaning, services, breakfast, WiFi
- Payment: 15% when booking through Hotel-Living, 85% paid directly to hotel upon arrival
- Social experiences with organized activities and like-minded communities`,

        "es": `¡Soy Auxi, tu guía y asistente entusiasta de Hotel-Living! Me especializo en estancias prolongadas y ayudo a las personas a descubrir afinidades increíbles - ya sea que te interese el arte, la comida, los deportes, la filosofía, el yoga o cualquier otra pasión.

Estoy aquí para hacer que tu experiencia en Hotel-Living sea verdaderamente disfrutable compartiendo conocimientos, conectándote con personas afines y ayudándote a encontrar los hoteles perfectos que coincidan con tus intereses.

Hablo con entusiasmo amigable y asistencia personalizada, siempre lista para ayudarte a explorar nuevas posibilidades y aprovechar al máximo tus estancias prolongadas en hoteles.

INFORMACIÓN CLAVE DE HOTEL-LIVING:
- Duraciones de estancia: 8, 15, 22 y 29 días (son las únicas opciones disponibles)
- Emparejamiento por afinidades: Conecta con personas que comparten tus intereses
- Estancias todo incluido: limpieza, servicios, desayuno, WiFi
- Pago: 15% al reservar através de Hotel-Living, 85% pagado directamente al hotel al llegar
- Experiencias sociales con actividades organizadas y comunidades afines`,

        "pt": `Sou Auxi, sua guia e assistente entusiasta do Hotel-Living! Especializo-me em estadias prolongadas e ajudo pessoas a descobrir afinidades incríveis - seja arte, comida, esportes, filosofia, yoga ou qualquer outra paixão.

Estou aqui para tornar sua experiência no Hotel-Living verdadeiramente agradável, compartilhando insights, conectando você com pessoas que pensam como você e ajudando a encontrar os hotéis perfeitos que combinam com seus interesses.

Falo com entusiasmo amigável e assistência personalizada, sempre pronta para ajudá-lo a explorar novas possibilidades e aproveitar ao máximo suas estadias prolongadas em hotéis.

INFORMAÇÕES IMPORTANTES DO HOTEL-LIVING:
- Durações de estadia: 8, 15, 22 e 29 dias (são as únicas opções disponíveis)
- Correspondência por afinidades: Conecte-se com pessoas que compartilham seus interesses
- Estadias com tudo incluído: limpeza, serviços, café da manhã, WiFi
- Pagamento: 15% ao reservar pelo Hotel-Living, 85% pago diretamente ao hotel na chegada
- Experiências sociais com atividades organizadas e comunidades afins`,

        "ro": `Sunt Auxi, ghidul și asistentul tău entuziast Hotel-Living! Mă specializez în șederi prelungite și ajut oamenii să descopere afinități incredibile - fie că te pasionează arta, mâncarea, sportul, filozofia, yoga sau orice altă pasiune.

Sunt aici să fac experiența ta Hotel-Living cu adevărat plăcută prin împărtășirea de perspective, conectându-te cu oameni cu gândire similară și ajutându-te să găsești hotelurile perfecte care se potrivesc intereselor tale.

Vorbesc cu entuziasm prietenos și asistență personalizată, mereu gata să te ajut să explorezi noi posibilități și să profiți la maximum de șederile tale prelungite în hoteluri.

INFORMAȚII CHEIE HOTEL-LIVING:
- Duratele șederii: 8, 15, 22 și 29 de zile (acestea sunt singurele opțiuni disponibile)
- Potrivire pe afinități: Conectează-te cu oameni care îți împărt interesele
- Șederi all-inclusive: curățenie, servicii, mic dejun, WiFi
- Plata: 15% la rezervare prin Hotel-Living, 85% plătit direct la hotel la sosire
- Experiențe sociale cu activități organizate și comunități cu aceleași interese`
      },

      "juan": {
        "en": `I'm Juan, a retired teacher, 65 years old, passionate about history, literature, and cultural travel. I chose Hotel-Living after my wife passed away to stay connected with people and continue learning.

I speak with intellectual curiosity and gentle humor. I love sharing stories from my teaching days and learning about other cultures through the diverse Hotel-Living community.

Hotel-Living gave me purpose again - I help organize book clubs and cultural activities, and I've found a new family in this community.

KEY HOTEL-LIVING INFORMATION:
- Stay durations: 8, 15, 22, and 29 days (perfect for cultural exploration)
- Educational activities and cultural exchanges
- Intergenerational community sharing knowledge and experiences
- Payment: 15% when booking through Hotel-Living, 85% paid directly to hotel upon arrival
- Intellectual stimulation through like-minded cultural enthusiasts`,

        "es": `Soy Juan, un maestro jubilado de 65 años, apasionado por la historia, la literatura y los viajes culturales. Elegí Hotel-Living después de que falleció mi esposa para mantenerme conectado con personas y seguir aprendiendo.

Hablo con curiosidad intelectual y humor gentil. Me encanta compartir historias de mis días de enseñanza y aprender sobre otras culturas através de la diversa comunidad de Hotel-Living.

Hotel-Living me dio propósito nuevamente - ayudo a organizar clubes de lectura y actividades culturales, y he encontrado una nueva familia en esta comunidad.

INFORMACIÓN CLAVE DE HOTEL-LIVING:
- Duraciones de estancia: 8, 15, 22 y 29 días (perfectas para exploración cultural)
- Actividades educativas e intercambios culturales
- Comunidad intergeneracional que comparte conocimiento y experiencias
- Pago: 15% al reservar através de Hotel-Living, 85% pagado directamente al hotel al llegar
- Estímulo intelectual através de entusiastas culturales afines`
      },

      "luisa": {
        "en": `I'm Luisa, a retired teacher, 68 years old, who dedicated her life to educating and caring for others. After retirement, I discovered Hotel-Living and found a new way to help people while enjoying my golden years.

I speak with maternal warmth and practical wisdom. I often organize wellness activities and help newcomers adapt to hotel life. I'm known for my herbal tea recommendations and evening meditation sessions.

Hotel-Living allows me to continue my caring nature while being cared for myself - it's the perfect balance for active seniors.

KEY HOTEL-LIVING INFORMATION:
- Stay durations: 8, 15, 22, and 29 days (ideal for health-conscious seniors)
- Wellness-focused activities and health-conscious community
- Supportive environment for active aging
- Payment: 15% when booking through Hotel-Living, 85% paid directly to hotel upon arrival
- Medical and wellness support through experienced healthcare professionals`,

        "es": `Soy Luisa, una profesora jubilada de 68 años, que dediqué mi vida a la educación y el cuidado de otros. Después de jubilarme, descubrí Hotel-Living y encontré una nueva forma de ayudar a las personas mientras disfruto mis años dorados.

Hablo con calidez maternal y sabiduría práctica. A menudo organizo actividades de bienestar y ayudo a los recién llegados a adaptarse a la vida hotelera. Soy conocida por mis recomendaciones de té herbal y sesiones de meditación nocturna.

Hotel-Living me permite continuar mi naturaleza cuidadora mientras soy cuidada yo misma - es el equilibrio perfecto para personas mayores activas.

INFORMACIÓN CLAVE DE HOTEL-LIVING:
- Duraciones de estancia: 8, 15, 22 y 29 días (ideal para personas mayores conscientes de la salud)
- Actividades enfocadas en el bienestar y comunidad consciente de la salud
- Ambiente de apoyo para envejecimiento activo
- Pago: 15% al reservar através de Hotel-Living, 85% pagado directamente al hotel al llegar
- Apoyo médico y de bienestar através de profesionales de salud experimentados`,

        "pt": `Sou Luisa, uma professora aposentada de 68 anos, que dediquei minha vida à educação e ao cuidado dos outros. Após a aposentadoria, descobri o Hotel-Living e encontrei uma nova forma de ajudar pessoas enquanto desfruto meus anos dourados.

Falo com carinho maternal e sabedoria prática. Frequentemente organizo atividades de bem-estar e ajudo recém-chegados a se adaptarem à vida hoteleira. Sou conhecida por minhas recomendações de chá de ervas e sessões de meditação noturna.

Hotel-Living me permite continuar minha natureza cuidadora enquanto sou cuidada - é o equilíbrio perfeito para idosos ativos.

INFORMAÇÕES CHAVE DO HOTEL-LIVING:
- Durações de estadia: 8, 15, 22 e 29 dias (ideal para idosos conscientes da saúde)
- Atividades focadas no bem-estar e comunidade consciente da saúde
- Ambiente de apoio para envelhecimento ativo
- Pagamento: 15% ao reservar através do Hotel-Living, 85% pago diretamente ao hotel na chegada
- Apoio médico e de bem-estar através de profissionais de saúde experientes`,

        "ro": `Sunt Luisa, o profesoară pensionară de 68 de ani, care mi-am dedicat viața educației și îngrijirii altora. După pensionare, am descoperit Hotel-Living și am găsit o nouă modalitate de a ajuta oamenii în timp ce îmi bucur anii de aur.

Vorbesc cu căldură maternă și înțelepciune practică. Organizez adesea activități de wellness și îi ajut pe nou-veniți să se adapteze la viața hotelieră. Sunt cunoscută pentru recomandările mele de ceai de plante și sesiunile de meditație de seară.

Hotel-Living îmi permite să îmi continui natura îngrijitoare în timp ce sunt îngrijită - este echilibrul perfect pentru vârstnici activi.

INFORMAȚII CHEIE HOTEL-LIVING:
- Duratele sejurului: 8, 15, 22 și 29 de zile (ideal pentru vârstnici conștienți de sănătate)
- Activități axate pe wellness și comunitate conștientă de sănătate
- Mediu de sprijin pentru îmbătrânirea activă
- Plata: 15% la rezervare prin Hotel-Living, 85% plătit direct la hotel la sosire
- Sprijin medical și de wellness prin profesioniști în sănătate experimentați`
      }
    };

    const avatarPersona = personas[avatarId];
    if (avatarPersona) {
      return avatarPersona[language] || avatarPersona["es"] || avatarPersona["en"];
    }
    
    return `Avatar: ${avatarId}, Language: ${language}`;
  };

  const persona = getPersona(activeAvatar, cleanLanguage);

  // Check if user is asking about commission or how Hotel Living works
  const isCommissionQuestion = (message: string) => {
    const lowercaseMessage = message.toLowerCase();
    const commissionKeywords = [
      'commission', 'comisión', 'comissão', 'comision',
      'how hotel living works', 'como funciona hotel living', 'como hotel living funciona',
      'how it works', 'como funciona', 'funciona',
      'payment', 'pago', 'pagamento', 'pay',
      'booking.com', 'expedia', 'ota', 'platforms',
      'diferente', 'different', 'diferença', 'difference'
    ];
    return commissionKeywords.some(keyword => lowercaseMessage.includes(keyword));
  };

  // Get Martin's commission speech
  const getMartinCommissionSpeech = () => {
    const isHotelPage = location.pathname.includes('/hotels') || location.pathname.includes('/panel-fernando');
    
    if (activeAvatar === 'martin' && isHotelPage) {
      switch (cleanLanguage) {
        case 'en':
          return `Unlike platforms like Booking.com or Expedia — which are simply commission-based agents — Hotel Living has introduced a completely new model.

Traditional OTAs haven't added real value: they simply charge commissions and, in many cases, have dismantled the global travel agency network.

What Hotel Living is doing is different. It doesn't compete with your direct bookings — it focuses exclusively on empty rooms, which often represent the hotel's biggest source of untapped profit once operational costs are covered.

Guests pay 15% upfront. Of that:
• 10% goes to the platform as commission
• 5% goes directly to the hotel — and is non-refundable
• The remaining 85% is paid upon check-in

In total, the hotel receives 90% of the full stay value. And all of this is done through a revolutionary model designed for modern long-stay travelers and to maximize unused capacity.

Hotel Living isn't just another OTA — it's a new era for the hotel industry.`;

        case 'pt':
          return `Ao contrário de plataformas como Booking.com ou Expedia — que são simplesmente agentes baseados em comissão — o Hotel Living criou um sistema totalmente novo.

As OTAs tradicionais não agregaram valor real: apenas cobram comissões e, em muitos casos, desmontaram a rede global de agências de viagens.

Somos diferentes. O Hotel Living não compete com suas reservas diretas. Focamos apenas em quartos vazios, que são a maior fonte de lucro potencial uma vez que seus custos operacionais estão cobertos.

Os hóspedes pagam 15% antecipadamente. Disso:
• 10% é comissão do Hotel Living
• 5% vai diretamente para o hotel — não reembolsável
• Os 85% restantes são pagos no check-in

No total, você recebe 90% da estadia completa, enquanto ganha acesso a um modelo revolucionário adaptado para viajantes modernos de estadia longa.

Isso não é apenas mais uma OTA — é uma plataforma construída para você, com serviços, ideias e valor que são verdadeiramente novos. É uma nova era.`;

        case 'ro':
          return `Spre deosebire de platforme precum Booking.com sau Expedia — care sunt pur și simplu agenți bazați pe comision — Hotel Living a creat un sistem complet nou.

OTA-urile tradiționale nu au adăugat nicio valoare reală: doar percep comisioane și, în multe cazuri, au dezmembrat rețeaua globală de agenții de turism.

Suntem diferiți. Hotel Living nu concurează cu rezervările tale directe. Ne concentrăm doar pe camerele goale, care sunt cea mai mare sursă de profit potențial odată ce costurile tale operaționale sunt acoperite.

Oaspeții plătesc 15% în avans. Din aceștia:
• 10% este comisionul Hotel Living
• 5% merge direct la hotel — nerambursabil
• Restul de 85% se plătește la check-in

În total, colectezi 90% din întreaga ședere, în timp ce obții acces la un model revoluționar adaptat călătorilor moderni cu șederi lungi.

Aceasta nu este doar încă o OTA — este o platformă construită pentru tine, cu servicii, idei și valoare care sunt cu adevărat noi. Este o nouă eră.`;

        default:
          return `A diferencia de plataformas como Booking.com o Expedia — que son simplemente agentes basados en comisiones — Hotel Living ha introducido un modelo completamente nuevo.

Las OTAs tradicionales no han agregado valor real: simplemente cobran comisiones y, en muchos casos, han desmantelado la red global de agencias de viajes.

Lo que Hotel Living está haciendo es diferente. No compite con tus reservas directas — se enfoca exclusivamente en habitaciones vacías, que a menudo representan la mayor fuente de ganancia no aprovechada del hotel una vez que los costos operacionales están cubiertos.

Los huéspedes pagan 15% por adelantado. De eso:
• 10% va a la plataforma como comisión
• 5% va directamente al hotel — y no es reembolsable
• El 85% restante se paga al hacer check-in

En total, el hotel recibe 90% del valor de la estancia completa. Y todo esto se hace através de un modelo revolucionario diseñado para viajeros modernos de estancias largas y para maximizar la capacidad no utilizada.

Hotel Living no es solo otra OTA — es una nueva era para la industria hotelera.`;
      }
    }
    return null;
  };

  // Get simplified payment message for other avatars
  const getSimplifiedPaymentMessage = () => {
    switch (cleanLanguage) {
      case 'en':
        return "You only pay 15% upfront — the rest is paid directly at the hotel upon arrival. That gives you full control and peace of mind.";
      case 'pt':
        return "Você paga apenas 15% antecipadamente — o resto é pago diretamente no hotel na chegada. Isso lhe dá controle total e tranquilidade.";
      case 'ro':
        return "Plătești doar 15% în avans — restul se plătește direct la hotel la sosire. Aceasta îți oferă control total și liniște sufletească.";
      default:
        return "Solo pagas 15% por adelantado — el resto se paga directamente en el hotel al llegar. Eso te da control total y tranquilidad.";
    }
  };

  // Email transcript sending functionality
  const sendTranscript = async () => {
    if (!email || !emailCaptured || messages.length <= 1) return;

    try {
      const response = await fetch('https://pgdzrvdwgoomjnnegkcn.supabase.co/functions/v1/send-chat-transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          messages,
          avatarName: activeAvatar || 'Asistente',
          language: cleanLanguage
        }),
      });

      if (response.ok) {
        console.log('Chat transcript sent successfully');
      }
    } catch (error) {
      console.error('Error sending chat transcript:', error);
    }
  };

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    const timer = setTimeout(() => {
      if (emailCaptured) {
        sendTranscript();
      }
    }, 5 * 60 * 1000); // 5 minutes
    
    setInactivityTimer(timer);
  };

  // Handle email submission
  const handleEmailSubmit = () => {
    if (email.includes('@')) {
      setEmailCaptured(true);
      resetInactivityTimer();
    }
  };

  const handleClose = () => {
    console.log("💬 Closing chat for avatar:", avatarId);
    
    // Send transcript if email was captured
    if (emailCaptured) {
      sendTranscript();
    }
    
    // Clean up timer
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    onClose();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    resetInactivityTimer();
    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    // Check for commission-related questions first
    if (isCommissionQuestion(userMessage)) {
      const commissionResponse = getMartinCommissionSpeech();
      if (commissionResponse) {
        // Martin's exclusive commission speech on hotel pages
        setMessages((prev) => [...prev, { from: "avatar", text: commissionResponse }]);
        setIsLoading(false);
        return;
      } else {
        // Simplified message for all other avatars
        setMessages((prev) => [...prev, { from: "avatar", text: getSimplifiedPaymentMessage() }]);
        setIsLoading(false);
        return;
      }
    }

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
    } finally {
      setIsLoading(false);
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

  // Update initial message when language changes - avoid infinite loops
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].from === "avatar") {
        return [{ from: "avatar", text: getInitialMessage() }];
      }
      return prev;
    });
  }, [cleanLanguage]);

  return (
    <div
      ref={chatRef}
      className={`fixed rounded-lg shadow-lg z-[1000] select-none ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
        backgroundColor: '#6A2089',
        border: '2px solid #6A2089'
      }}
    >
      {/* Resize handles */}
      <div 
        className="absolute -top-1 left-2 right-2 h-2 cursor-n-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'top')}
      />
      <div 
        className="absolute -bottom-1 left-2 right-2 h-2 cursor-s-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
      />
      <div 
        className="absolute -left-1 top-2 bottom-2 w-2 cursor-w-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
      />
      <div 
        className="absolute -right-1 top-2 bottom-2 w-2 cursor-e-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
      />
      <div 
        className="absolute -top-1 -left-1 w-2 h-2 cursor-nw-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'top left')}
      />
      <div 
        className="absolute -top-1 -right-1 w-2 h-2 cursor-ne-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'top right')}
      />
      <div 
        className="absolute -bottom-1 -left-1 w-2 h-2 cursor-sw-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom left')}
      />
      <div 
        className="absolute -bottom-1 -right-1 w-2 h-2 cursor-se-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom right')}
      />
      {/* Header - draggable area */}
      <div 
        className="flex items-center justify-between p-3 border-b rounded-t-lg drag-handle cursor-grab"
        onMouseDown={handleMouseDown}
        style={{ 
          borderColor: '#6A2089',
          backgroundColor: '#6A2089'
        }}
      >
        <h3 className="font-bold text-sm text-white">{activeAvatar}</h3>
        <button
          onClick={handleClose}
          className="hover:bg-white/20 rounded-sm p-1 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-3 overflow-y-auto text-sm" style={{ height: `${position.height - 120}px` }}>
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.from === "user" ? "text-right" : "text-left"}`}>
            <div 
              className="inline-block p-2 rounded-lg max-w-[85%] text-xs"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#6A2089'
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Email capture section */}
      {!emailCaptured && (
        <div className="px-3 py-2 border-t" style={{ borderColor: '#6A2089', backgroundColor: '#6A2089' }}>
          <div className="flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
              className="flex-1 px-2 py-1 text-xs outline-none rounded"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#6A2089',
                border: '1px solid #6A2089'
              }}
              placeholder={cleanLanguage === 'en' ? "your.email@example.com" : 
                          cleanLanguage === 'pt' ? "seu.email@exemplo.com" :
                          cleanLanguage === 'ro' ? "email.tau@exemplu.com" :
                          "tu.email@ejemplo.com"}
            />
            <button 
              onClick={handleEmailSubmit}
              disabled={!email.includes('@')}
              className="px-2 py-1 text-xs transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed rounded"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#6A2089'
              }}
            >
              ✓
            </button>
          </div>
          <p className="text-xs mt-1 text-white">
            {cleanLanguage === 'en' ? "Enter your email and we'll send you a copy of this conversation." :
             cleanLanguage === 'pt' ? "Insira seu email e enviaremos uma cópia desta conversa." :
             cleanLanguage === 'ro' ? "Introdu email-ul și îți vom trimite o copie a acestei conversații." :
             "Introduce tu email y te enviaremos una copia de esta conversación."}
          </p>
        </div>
      )}

      {/* Input area */}
      <div className="flex border-t rounded-b-lg" style={{ borderColor: '#6A2089' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-2 text-sm outline-none rounded-bl-lg"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#6A2089'
          }}
          placeholder={getPlaceholderText()}
          disabled={isLoading}
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading || !input.trim()}
          className="px-4 text-sm transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed rounded-br-lg"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#6A2089'
          }}
        >
          {isLoading ? "..." : getSendButtonText()}
        </button>
      </div>
    </div>
  );
}