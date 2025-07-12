// Hotel-Living Complete Knowledge Base
// This is the ONLY source of truth for all avatar responses
// Based on "EXPORTACIÓN COMPLETA DE CONTENIDO EN ESPAÑOL hotel-living.docx"

export const HOTEL_LIVING_KNOWLEDGE = {
  // Core Service Information
  core: {
    stayDurations: [8, 15, 22, 29], // ONLY valid durations
    paymentStructure: {
      bookingPayment: 15, // % paid when booking
      arrivalPayment: 85, // % paid directly to hotel on arrival
      description: "Solo pagas el 15% al reservar a través de Hotel-Living. El 85% restante se paga directamente al hotel al llegar."
    },
    serviceType: "Hospitalidad con propósito - estilo de vida hotelero",
    targetAudience: [
      "Mayores activos o semijubilados",
      "Nómadas digitales", 
      "Trabajadores hartos de alquileres, soledad y labores caseras",
      "Estudiantes",
      "Expatriados o retornados",
      "Viajeros solos y parejas",
      "Personas en transición",
      "Aquellos que desean rentabilizar su propiedad",
      "Todos cuantos buscan un entorno seguro"
    ]
  },

  // What's Included
  included: {
    services: [
      "Limpieza diaria",
      "Servicios de recepción 24h",
      "Desayuno incluido",
      "WiFi de alta velocidad",
      "Mantenimiento",
      "Seguridad",
      "Espacios comunes",
      "Actividades sociales organizadas"
    ],
    noExtraFees: "No hay tarifas por publicación, fotografía, incorporación o marketing. Solo la comisión del 10% sobre las reservas netas para hoteles.",
    flexibility: "Máxima flexibilidad con estadías renovables según disponibilidad"
  },

  // AFFINITIES - CORE FEATURE OF HOTEL-LIVING
  affinities: {
    definition: "Las Afinidades de Hotel-Living son un concepto registrado y único creado exclusivamente por hotel-living.com. Esta idea protegida por derechos de autor une a las personas en torno a intereses compartidos, facilitando conexiones humanas reales y rompiendo el aislamiento social.",
    purpose: "Mucho más que viajes - es una nueva forma para que la sociedad se conecte y las personas conozcan a otros afines",
    totalCategories: 17, // Main level-1 categories
    totalThemes: 239, // Total themes across all levels
    mainCategories: [
      "ART - Arte y cultura, desde pintura hasta arquitectura",
      "MUSIC - Géneros musicales, instrumentos y experiencias sonoras", 
      "FOOD & DRINKS - Gastronomía mundial, cocteles y experiencias culinarias",
      "HEALTH AND WELLNESS - Fitness, mindfulness, nutrición y bienestar integral",
      "EDUCATION - Aprendizaje académico y desarrollo intelectual",
      "SCIENCE AND KNOWLEDGE - Investigación, exploración científica y conocimiento",
      "BUSINESS - Emprendimiento, finanzas y desarrollo profesional",
      "LANGUAGES - Intercambio de idiomas, conversación y enseñanza",
      "HOBBIES - Artes manuales, coleccionismo, juegos y actividades al aire libre",
      "FANS - Admiradores de artistas, iconos musicales, leyendas del cine y figuras históricas",
      "ENTERTAINMENT - Entretenimiento en vivo y medios digitales",
      "LIFESTYLE - Viajes, movilidad y valores de bienestar",
      "NATURE - Entornos naturales, vida silvestre y biología",
      "PERSONAL DEVELOPMENT - Habilidades mentales y comunicación",
      "RELATIONSHIPS - Relaciones personales y habilidades sociales",
      "SCIENCE AND TECHNOLOGY - Innovación, futuro y exploración tecnológica",
      "SPORTS - Todas las disciplinas deportivas y actividades físicas"
    ],
    howTheyWork: {
      hotelSelection: "Los hoteles definen sus afinidades temáticas específicas",
      guestMatching: "Los huéspedes se agrupan según intereses compartidos",
      naturalConnections: "Las amistades surgen naturalmente cuando las personas se reúnen en torno a lo que aman",
      flexibleParticipation: "Sin presión - puedes participar tanto o tan poco como desees",
      organicActivities: "Las actividades pueden ser organizadas por el hotel o surgir espontáneamente entre huéspedes"
    },
    differentiators: [
      "Evita conversaciones incómodas - conexión real desde el primer día",
      "Encuentra tu tribu - personas que realmente te comprenden", 
      "Rompe el aislamiento social a través de pasiones compartidas",
      "Crea experiencias auténticas, no decorados temáticos",
      "Permite explorar diferentes pasiones en diferentes ubicaciones"
    ],
    examples: [
      "Jazz - músicos y amantes del jazz se reúnen para jam sessions",
      "Fotografía - expediciones fotográficas grupales y talleres",
      "Gastronomía - cenas temáticas y clases de cocina",
      "Astronomía - noches de observación estelar y charlas científicas",
      "Literatura - clubes de lectura y tertulias literarias",
      "Senderismo - excursiones grupales y conexión con la naturaleza",
      "Emprendimiento - networking y sesiones de mentoría",
      "Idiomas - intercambios lingüísticos y práctica conversacional"
    ],
    availability: "Las afinidades están disponibles selectivamente según cada hotel asociado - no todos los hoteles ofrecen todas las afinidades, pero todos los huéspedes buscan conexión y comunidad"
  },

  // Community & Social Life
  community: {
    affinityBased: "Comunidades basadas en afinidades compartidas - el corazón de Hotel-Living",
    socialActivities: [
      "Cenas de bienvenida para nuevas llegadas",
      "Mixers sociales temáticos según afinidades",
      "Salidas grupales a atracciones locales relacionadas con las afinidades", 
      "Eventos de celebración especial",
      "Sesiones de intercambio de habilidades entre huéspedes",
      "Grupos de discusión sobre temas de interés común",
      "Proyectos colaborativos y talleres prácticos",
      "Actividades espontáneas organizadas por los propios huéspedes"
    ],
    communitySize: "Entre 15-50 huéspedes concurrentes participando en los mismos programas de afinidad",
    privacy: "Equilibrio perfecto entre espacio privado y compromiso comunitario opcional",
    connection: "Facilita conocer personas, compartir comidas, conversar y crear amistades duraderas"
  },

  // Hotel Categories & Types
  hotelTypes: {
    propertyTypes: [
      "Hoteles tradicionales",
      "Aparthoteles", 
      "Residencias hoteleras",
      "Hoteles boutique",
      "Hoteles rurales"
    ],
    minimumRooms: "No hay requisito mínimo de habitaciones",
    locations: "Ubicaciones céntricas en ciudades principales",
    qualityStandards: "Estándares de calidad y servicio verificados"
  },

  // For Digital Nomads
  digitalNomads: {
    workFeatures: [
      "Áreas de trabajo dedicadas",
      "Internet de alta velocidad",
      "Muebles ergonómicos", 
      "Espacios de coworking",
      "Centros de negocios"
    ],
    community: "Comunidad de apoyo de trabajadores remotos y emprendedores",
    flexibility: "Flexibilidad para adaptar alojamiento a horario de trabajo y viaje"
  },

  // For Seniors
  seniors: {
    benefits: [
      "Servicios premium por fracción del coste de residencia de mayores",
      "Sin necesidad de personal médico ni licencias especiales",
      "Estancias más largas para mayores independientes", 
      "Entorno hotelero con servicios flexibles",
      "Comunidad de personas activas"
    ],
    notACareHome: "No es una residencia de mayores - es hospitalidad flexible para todas las edades",
    independence: "Para jubilados independientes que buscan servicios, confort y comunidad"
  },

  // Revenue & Pricing for Hotels
  hotelRevenue: {
    commission: "10% sobre las reservas netas",
    deposit: "7.5% del precio total como depósito no reembolsable para el hotel",
    revenueImpact: "Aporta base estable de reservas y ayuda a llenar periodos de baja demanda",
    priceControl: "Hotel mantiene control total sobre precios y disponibilidad",
    dynamicPricing: "Precios pueden ajustarse según temporada y demanda"
  },

  // Integration & Operations for Hotels
  hotelIntegration: {
    currentChannels: "Complementa distribución existente - hotel gestiona asignación de inventario",
    confirmationProcess: "Hotel notificado inmediatamente, recibe 7.5% como depósito",
    paymentFlow: "15% inicial través de plataforma; 85% directamente al hotel en check-in",
    specialRequests: "Sistema de mensajería con cuestionarios previos a llegada",
    reporting: [
      "Tendencias de reservas",
      "Demografía de huéspedes", 
      "Análisis de ingresos",
      "Participación en afinidades"
    ]
  },

  // Marketing & Promotion for Hotels
  hotelMarketing: {
    promotion: [
      "Exposición en plataforma global",
      "Campañas digitales dirigidas",
      "Alianzas basadas en afinidades", 
      "Marketing de contenidos y redes sociales"
    ],
    brandResources: "Recursos de marca, plantillas y directrices para promoción",
    targetedMarketing: "Dirigirse con precisión a comunidades de nicho para mejores conversiones"
  },

  // Booking & Practical Information
  booking: {
    process: "Reserva a través de plataforma Hotel-Living",
    cancellation: "Políticas de cancelación específicas por hotel",
    extensions: "Posibilidad de extender estancias según disponibilidad",
    consecutiveBookings: "Sistema permite planificar itinerarios en varias ciudades",
    minimumAge: "Generalmente 18+ años"
  },

  // What Hotel-Living IS NOT
  notIncluded: {
    notApartmentRental: "No es alquiler de apartamentos tradicional",
    notPermanent: "No es vivienda permanente ni institucional", 
    notStudentHousing: "No es vivienda específica para estudiantes",
    notCareHome: "No es residencia de mayores ni centro de cuidados",
    notShortTermRental: "No es plataforma de alquileres cortos como Airbnb"
  },

  // Strict Response Guidelines
  responseGuidelines: {
    onlyHotelLiving: "SOLO responder sobre Hotel-Living y experiencias personales",
    noExternalInfo: "PROHIBIDO usar conocimiento general de ChatGPT o internet",
    stayOnTopic: "Si pregunta está fuera del ámbito Hotel-Living, redirigir educadamente",
    personalExperience: "Siempre responder en primera persona como el personaje",
    shortResponses: "Mantener respuestas cortas (máximo 2-3 frases)",
    specificDetails: "Cuando mencionar duraciones: SIEMPRE especificar 8, 15, 22 y 29 días",
    paymentDetails: "Cuando hablar de pago: SIEMPRE mencionar 15% al reservar, 85% al llegar"
  }
};

// Validation function to ensure avatar responses stay within knowledge boundaries
export function validateResponse(response: string): boolean {
  const forbiddenPhrases = [
    "no tengo información",
    "no puedo ayudar", 
    "consulta con",
    "busca en google",
    "según mi conocimiento general",
    "como IA",
    "en general"
  ];
  
  return !forbiddenPhrases.some(phrase => 
    response.toLowerCase().includes(phrase.toLowerCase())
  );
}

// Function to generate fallback responses when outside knowledge scope
export function getFallbackResponse(language: string): string {
  const fallbacks = {
    es: "Me encanta hablar sobre Hotel-Living y mi experiencia viviendo así. ¿Hay algo específico sobre nuestro estilo de vida hotelero que te gustaría saber?",
    en: "I love talking about Hotel-Living and my experience living this way. Is there something specific about our hotel lifestyle you'd like to know?",
    pt: "Adoro falar sobre Hotel-Living e minha experiência vivendo assim. Há algo específico sobre nosso estilo de vida hoteleiro que gostaria de saber?",
    ro: "Îmi place să vorbesc despre Hotel-Living și experiența mea de a trăi așa. Este ceva specific despre stilul nostru de viață hotelier pe care ai vrea să îl știi?"
  };
  
  return fallbacks[language as keyof typeof fallbacks] || fallbacks.es;
}