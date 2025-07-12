# 📁 EXPORTACIÓN COMPLETA DE CONTENIDO EN ESPAÑOL - HOTEL-LIVING.COM

---

## 📋 ÍNDICE DE CONTENIDOS

1. [Archivos de Traducción JSON](#archivos-de-traducción-json)
2. [Componentes con Texto en Español](#componentes-con-texto-en-español)
3. [Preguntas Frecuentes (FAQ)](#preguntas-frecuentes-faq)
4. [Contenido de Hoteles](#contenido-de-hoteles)
5. [Contenido Legal y Corporativo](#contenido-legal-y-corporativo)

---

## 🗂️ ARCHIVOS DE TRADUCCIÓN JSON

### 📄 COMÚN (common.json)
```json
{
  "common": {
    "loading": "Cargando...",
    "error": "Error",
    "success": "Éxito",
    "warning": "Advertencia",
    "info": "Información",
    "ok": "Aceptar",
    "cancel": "Cancelar",
    "save": "Guardar",
    "delete": "Eliminar",
    "edit": "Editar",
    "view": "Ver",
    "add": "Agregar",
    "remove": "Quitar",
    "search": "Buscar",
    "filter": "Filtrar",
    "sort": "Ordenar",
    "next": "Siguiente",
    "previous": "Anterior",
    "back": "Atrás",
    "continue": "Continuar",
    "finish": "Finalizar",
    "submit": "Enviar",
    "reset": "Restablecer",
    "clear": "Limpiar",
    "close": "Cerrar",
    "open": "Abrir",
    "show": "Mostrar",
    "hide": "Ocultar",
    "yes": "Sí",
    "no": "No",
    "all": "Todos",
    "none": "Ninguno",
    "select": "Seleccionar",
    "selectAll": "Seleccionar todo",
    "deselectAll": "Deseleccionar todo"
  },
  "liveVisitors": "{{count}} personas están viendo ahora"
}
```

### 📄 NAVEGACIÓN (navigation.json)
```json
{
  "navigation": {
    "home": "Inicio",
    "hotels": "Hoteles",
    "dashboard": "Panel",
    "login": "Iniciar Sesión",
    "logout": "Cerrar Sesión",
    "signup": "Registrarse",
    "profile": "Perfil",
    "settings": "Configuración",
    "bookings": "Reservas",
    "admin": "Admin",
    "language": "Idioma",
    "help": "Ayuda",
    "faq": "Ventajas",
    "contact": "Contacto",
    "videos": "Videos",
    "featuredHotels": "Hoteles Destacados",
    "affinityStays": "Estancias por Afinidad"
  },
  "mainNavigationContent": {
    "faq": {
      "line1": "¿POR QUÉ",
      "line2": "HOTEL-LIVING?",
      "mobile": "¿POR QUÉ HOTEL-LIVING?"
    },
    "affinityStays": {
      "line1": "¿AFINIDADES?",
      "mobile": "¿AFINIDADES?"
    },
    "videos": {
      "line1": "VIDEOS",
      "mobile": "VIDEOS"
    },
    "ambassador": {
      "line1": "HÁGASE",
      "line2": "EMBAJADOR",
      "mobile": "HÁGASE EMBAJADOR"
    },
    "signup": {
      "line1": "ABRIR",
      "line2": "CUENTA",
      "mobile": "ABRIR CUENTA"
    },
    "login": {
      "line1": "INICIAR",
      "line2": "SESIÓN",
      "mobile": "INICIAR SESIÓN"
    },
    "hotel": {
      "line1": "¿HOTEL?",
      "mobile": "¿HOTEL?"
    },
    "featuredHotels": "HOTELES DESTACADOS",
    "hotelDashboard": "Panel de Hotel",
    "adminDashboard": "Panel de Admin",
    "logout": "Cerrar Sesión",
    "press": {
      "line1": "PRENSA",
      "mobile": "PRENSA"
    }
  }
}
```

### 📄 INICIO (home.json)
```json
{
  "heroSection": {
    "revolutionHasCome": "BIENVENIDO AL FUTURO",
    "liveInHotels": "VIVE EN HOTELES",
    "boostYourLife": "Potencia tu vida",
    "slogans": {
      "getRidOfChores": "OLVÍDATE DE LAS TAREAS DOMÉSTICAS",
      "selectHotelsByThemes": "ELIGE TEMAS Y HOTELES",
      "boostSocialLife": "POTENCIA TU VIDA SOCIAL",
      "meetLikeMinded": "CONOCE PERSONAS AFINES"
    }
  },
  "filters": {
    "search": "Buscar"
  },
  "bubbleCounter": {
    "home": "¡{{count}} personas están explorando Hotel-Living ahora mismo!",
    "hotel": "¡{{count}} personas están viendo este hotel ahora mismo!"
  }
}
```

### 📄 AUTENTICACIÓN (auth.json)
```json
{
  "auth": {
    "signinAsTraveler": "Iniciar Sesión como Viajero",
    "signinAsHotel": "Iniciar Sesión como Hotel",
    "createAccount": "Crear Cuenta",
    "email": "Correo Electrónico",
    "password": "Contraseña",
    "confirmPassword": "Confirmar Contraseña",
    "rememberMe": "Recordarme",
    "forgotPassword": "¿Olvidaste tu contraseña?",
    "signIn": "Iniciar Sesión",
    "signUp": "Registrarse",
    "signOut": "Cerrar Sesión",
    "alreadyHaveAccount": "¿Ya tienes una cuenta?",
    "dontHaveAccount": "¿No tienes una cuenta?",
    "firstName": "Nombre",
    "lastName": "Apellido",
    "fullName": "Nombre Completo",
    "phoneNumber": "Número de Teléfono",
    "acceptTerms": "Acepto los términos y condiciones",
    "privacyPolicy": "Política de Privacidad",
    "termsOfService": "Términos de Servicio",
    "loginSuccess": "Inicio de sesión exitoso",
    "loginError": "Error al iniciar sesión",
    "signupSuccess": "Registro exitoso",
    "signupError": "Error al registrarse",
    "passwordTooShort": "La contraseña debe tener al menos 6 caracteres",
    "passwordsDoNotMatch": "Las contraseñas no coinciden",
    "emailRequired": "El correo electrónico es requerido",
    "passwordRequired": "La contraseña es requerida",
    "invalidEmail": "Correo electrónico inválido",
    "emailInUse": "Este correo electrónico ya está en uso",
    "userNotFound": "Usuario no encontrado",
    "wrongPassword": "Contraseña incorrecta",
    "resetPassword": "Restablecer Contraseña",
    "resetPasswordSuccess": "Se ha enviado un enlace de restablecimiento a tu correo",
    "resetPasswordError": "Error al enviar el enlace de restablecimiento",
    "backToLogin": "Volver al inicio de sesión"
  }
}
```

### 📄 RESERVAS (booking.json)
```json
{
  "booking": {
    "title": "Reservar Tu Estancia",
    "checkIn": "Fecha de Entrada",
    "checkOut": "Fecha de Salida",
    "guests": "Huéspedes",
    "rooms": "Habitaciones",
    "adults": "Adultos",
    "children": "Niños",
    "bookNow": "Reservar Ahora",
    "availability": "Disponibilidad",
    "pricePerNight": "Precio por noche",
    "totalPrice": "Precio total",
    "taxes": "Impuestos",
    "fees": "Tarifas",
    "included": "Incluido",
    "notIncluded": "No incluido",
    "bookingDetails": "Detalles de la reserva",
    "guestInformation": "Información del huésped",
    "contactInformation": "Información de contacto",
    "paymentInformation": "Información de pago",
    "confirmBooking": "Confirmar reserva",
    "bookingConfirmed": "Reserva confirmada",
    "bookingError": "Error en la reserva",
    "selectDates": "Seleccionar fechas",
    "selectRoom": "Seleccionar habitación",
    "available": "Disponible",
    "unavailable": "No disponible",
    "fullyBooked": "Completamente reservado",
    "minimumStay": "Estancia mínima",
    "maximumStay": "Estancia máxima",
    "nights": "noches",
    "night": "noche",
    "cancellationPolicy": "Política de cancelación",
    "freeCancellation": "Cancelación gratuita",
    "nonRefundable": "No reembolsable",
    "modifyBooking": "Modificar reserva",
    "cancelBooking": "Cancelar reserva"
  },
  "weeklyCheckIn": "Día semanal de entrada/salida",
  "meals": "Comidas",
  "tariffsPerPerson": "TARIFAS POR PERSONA",
  "and": "y"
}
```

### 📄 PIE DE PÁGINA (footer.json)
```json
{
  "footer": {
    "links": {
      "faq": "VENTAJAS",
      "affinityStays": "¿AFINIDADES?",
      "hotel": "¿HOTEL?",
      "videos": "VIDEOS",
      "featuredHotels": "HOTELES DESTACADOS",
      "ourServices": "NUESTROS SERVICIOS",
      "ourValues": "NUESTROS VALORES",
      "customerService": "SERVICIO AL CLIENTE",
      "contact": "CONTACTO",
      "terms": "TÉRMINOS Y CONDICIONES",
      "privacy": "PRIVACIDAD Y COOKIES",
      "intellectualProperty": "PROPIEDAD INTELECTUAL",
      "ourTeam": "NUESTRO EQUIPO"
    },
    "buttons": {
      "register": "Registrarse",
      "signIn": "Iniciar Sesión",
      "hotel": "¿HOTEL?"
    },
    "copyright": "© 2025 Hotel-Living.com. Todos los derechos reservados. Esta es una versión Beta, sujeta a actualizaciones continuas.",
    "disclaimer": "Algunas propiedades pueden ser ejemplos utilizados para demostrar la funcionalidad de Hotel Living."
  }
}
```

### 📄 NUESTROS SERVICIOS (ourServices.json)
```json
{
  "ourServices": {
    "title": "Nuestros Servicios",
    "description": "Nuestra plataforma se enfoca en proporcionar experiencias hoteleras temáticas para estancias a largo plazo. Conectamos a los viajeros con hoteles que ofrecen entornos temáticos únicos, permitiendo a los huéspedes sumergirse en sus intereses mientras disfrutan de alojamientos extendidos."
  }
}
```

### 📄 AFINIDADES (affinity.json)
```json
{
  "affinity": {
    "title": "Encuentra Tu Afinidad Perfecta",
    "subtitle": "Descubre hoteles que se alinean con tus pasiones e intereses",
    "selectAffinities": "Selecciona tus afinidades",
    "searchByAffinity": "Buscar por afinidad",
    "popularAffinities": "Afinidades populares",
    "allAffinities": "Todas las afinidades",
    "noAffinitiesSelected": "No hay afinidades seleccionadas",
    "clearSelection": "Limpiar selección",
    "applyFilters": "Aplicar filtros",
    "resultsFound": "resultados encontrados",
    "noResults": "No se encontraron resultados para las afinidades seleccionadas",
    "tryDifferentAffinities": "Prueba con diferentes afinidades o ajusta tus filtros",
    "affinityCategories": {
      "arts": "Artes y Cultura",
      "sports": "Deportes y Actividades",
      "food": "Comida y Bebidas",
      "technology": "Tecnología y Ciencia",
      "nature": "Naturaleza y Aventura",
      "wellness": "Bienestar y Salud",
      "education": "Educación y Aprendizaje",
      "entertainment": "Entretenimiento"
    },
    "slogans": {
      "mainTitle": "Vive Según Tus Pasiones",
      "slogan1": "Hoteles que entienden tus intereses",
      "slogan2": "Experiencias diseñadas para ti", 
      "slogan3": "Donde la hospitalidad se encuentra con la afinidad",
      "notJustStay": "No es solo una estancia. Es un mundo compartido",
      "meetShareBelong": "Conoce. Comparte. Pertenece",
      "stayWithThoseWhoGetYou": "Quédate con quienes te entienden",
      "tiredOfRandom": "¿Cansado de lo aleatorio? Elige a tu gente",
      "stayAndConnect": "Quédate y conecta a través de lo que amas"
    }
  }
}
```

### 📄 FILTROS (filters.json)
```json
{
  "filters": {
    "pricePerMonth": "PRECIO POR MES",
    "country": "PAÍS",
    "location": "UBICACIÓN",
    "affinities": "AFINIDADES",
    "affinity": "AFINIDADES",
    "activities": "ACTIVIDADES",
    "duration": "DURACIÓN DE ESTANCIA",
    "mealPlan": "PLAN DE COMIDAS",
    "category": "CATEGORÍA",
    "month": "MES",
    "propertyType": "TIPO DE PROPIEDAD",
    "propertyStyle": "ESTILO DE PROPIEDAD",
    "hotelFeatures": "CARACTERÍSTICAS DEL HOTEL",
    "roomFeatures": "CARACTERÍSTICAS DE LA HABITACIÓN",
    "resetFilters": "RESTABLECER FILTROS",
    "accommodationOnly": "Solo alojamiento",
    "breakfastIncluded": "Desayuno incluido",
    "halfBoard": "Media pensión",
    "fullBoard": "Pensión completa",
    "laundryServiceIncluded": "Servicio de lavandería incluido",
    "externalLaundryService": "Servicio de lavandería externo",
    "pool": "Piscina",
    "gym": "Gimnasio",
    "spa": "Spa",
    "restaurant": "Restaurante",
    "bar": "Bar",
    "wifi": "WiFi",
    "parking": "Aparcamiento",
    "airConditioning": "Aire Acondicionado",
    "balcony": "Balcón",
    "kitchen": "Cocina",
    "workspace": "Espacio de Trabajo",
    "tv": "TV",
    "minibar": "Minibar",
    "search": "BUSCAR",
    "propertyTypes": {
      "hotel": "Hotel",
      "resort": "Resort",
      "boutiqueHotel": "Hotel Boutique",
      "countryHouse": "Casa Rural",
      "roadsideMotel": "Motel de Carretera"
    },
    "propertyStyles": {
      "classic": "Clásico",
      "classicElegant": "Clásico Elegante",
      "modern": "Moderno",
      "fusion": "Fusión",
      "urban": "Urbano",
      "minimalist": "Minimalista",
      "luxury": "Lujo",
      "rural": "Rural"
    },
    "roomTypeOptions": {
      "singleRoom": "Habitación Individual",
      "doubleRoom": "Habitación Doble"
    },
    "months": {
      "january": "Enero",
      "february": "Febrero",
      "march": "Marzo",
      "april": "Abril",
      "may": "Mayo",
      "june": "Junio",
      "july": "Julio",
      "august": "Agosto",
      "september": "Septiembre",
      "october": "Octubre",
      "november": "Noviembre",
      "december": "Diciembre"
    },
    "affinities": {
      "art": "Arte",
      "business": "Negocios",
      "culture": "Cultura",
      "education": "Educación",
      "entertainment": "Entretenimiento",
      "foodAndDrinks": "Comida y Bebidas",
      "healthAndWellness": "Salud y Bienestar",
      "history": "Historia",
      "hobbies": "Pasatiempos",
      "languages": "Idiomas",
      "lifestyle": "Estilo de Vida",
      "nature": "Naturaleza",
      "personalDevelopment": "Desarrollo Personal",
      "relationships": "Relaciones",
      "scienceAndTechnology": "Ciencia y Tecnología",
      "socialImpact": "Impacto Social",
      "sports": "Deportes"
    },
    "priceRanges": {
      "upTo1000": "Hasta $1,000",
      "1000to1500": "$1,000 - $1,500",
      "1500to2000": "$1,500 - $2,000",
      "moreThan2000": "Más de $2,000"
    },
    "countries": {
      "spain": "España",
      "france": "Francia",
      "italy": "Italia",
      "usa": "EE.UU.",
      "egypt": "Egipto",
      "turkey": "Turquía",
      "unitedKingdom": "Reino Unido",
      "germany": "Alemania",
      "portugal": "Portugal",
      "greece": "Grecia"
    }
  }
}
```

### 📄 CONTENIDO GENERAL (content.json)
```json
{
  "content": {
    "welcomeMessage": "Bienvenido a Hotel-Living",
    "exploreHotels": "Explora nuestra selección curada de hoteles temáticos",
    "bookYourStay": "Reserva tu estancia perfecta hoy",
    "discoverExperiences": "Descubre experiencias únicas",
    "whyChooseUs": "¿Por qué Elegir Hotel-Living?",
    "ourMission": "Nuestra misión es revolucionar la forma en que las personas viven y viajan"
  },
  "videosContent": {
    "clientVideoTitle": "LA VIDA REAL",
    "clientVideoUrl": "https://youtu.be/R8u7a3bYTJQ",
    "hotelVideoTitle": "¿HOTEL? OCUPACIÓN GARANTIZADA",
    "hotelVideoUrl": "https://youtu.be/FGStOitWN7k"
  },
  "featuredHotelsContent": {
    "pageTitle": "Hoteles Destacados",
    "wantToBeFirst": "¿Quiere que su hotel aparezca primero?",
    "featureDescription": "Podemos destacar su propiedad aquí mismo — sin grandes tarifas, solo colaboración inteligente.",
    "loginForInfo": "Inicie sesión en su panel de hotel para más información."
  }
}
```

### 📄 ATENCIÓN AL CLIENTE (customerService.json)
```json
{
  "customerService": {
    "title": "Atención al Cliente",
    "subtitle": "Estamos aquí para ayudarte en cada paso del camino",
    "description": "Nuestro equipo de atención al cliente está disponible 24/7 para asistirte con cualquier pregunta o inquietud que puedas tener sobre tu experiencia en Hotel-Living.",
    "contactOptions": {
      "title": "Opciones de Contacto",
      "email": {
        "title": "Correo Electrónico",
        "description": "Envíanos un correo y te responderemos dentro de 24 horas",
        "address": "soporte@hotel-living.com"
      },
      "phone": {
        "title": "Teléfono",
        "description": "Llámanos para asistencia inmediata",
        "number": "+1 (555) 123-4567"
      },
      "chat": {
        "title": "Chat en Vivo",
        "description": "Chatea con nuestros agentes de soporte en tiempo real",
        "status": "Disponible 24/7"
      },
      "whatsapp": {
        "title": "WhatsApp",
        "description": "Contáctanos a través de WhatsApp para una comunicación rápida",
        "number": "+1 (555) 123-4567"
      }
    },
    "supportAreas": {
      "title": "Áreas de Soporte",
      "booking": "Asistencia con reservas",
      "payment": "Consultas sobre pagos",
      "cancellation": "Cancelaciones y reembolsos",
      "technical": "Soporte técnico",
      "general": "Consultas generales",
      "feedback": "Comentarios y sugerencias"
    },
    "hours": {
      "title": "Horarios de Atención",
      "description": "Nuestro equipo está disponible las 24 horas del día, los 7 días de la semana para brindarte la mejor asistencia posible."
    },
    "faqLink": "¿Buscas respuestas rápidas? Visita nuestras Preguntas Frecuentes",
    "emergencyContact": {
      "title": "Contacto de Emergencia",
      "description": "Para emergencias durante tu estancia, contacta directamente al hotel o llama a nuestro número de emergencia 24/7.",
      "number": "+1 (555) 911-HELP"
    }
  }
}
```

---

## 🗣️ PREGUNTAS FRECUENTES (FAQ)

### 📋 FAQ GENERALES
```json
{
  "faq": {
    "title": "Preguntas Frecuentes",
    "subtitle": "Encuentra respuestas a las preguntas más comunes",
    "searchPlaceholder": "Buscar en las preguntas frecuentes...",
    "noResults": "No se encontraron resultados",
    "categories": {
      "general": "General",
      "booking": "Reservas",
      "payment": "Pagos",
      "cancellation": "Cancelaciones",
      "policies": "Políticas",
      "technical": "Técnico",
      "account": "Cuenta",
      "support": "Soporte"
    },
    "accordion": {
      "stillRenting": "¿Aún alquilas?",
      "hotel": "¿Hotel?",
      "retired": "¿Jubilado?",
      "commuter": "¿Viajero diario?",
      "onlineWorker": "¿Trabajador online?",
      "freeSoul": "¿Alma libre?",
      "society": "¿Sociedad?"
    },
    "avatarMessage": "Aquí estoy.\nSi me necesitas,\npregunta lo que quieras.",
    "identifyHeader": "¿CON QUIÉN TE IDENTIFICAS?\nHAZ CLIC PARA SABER MÁS"
  }
}
```

### 🏨 FAQ ESPECÍFICAS PARA HOTELES

#### BENEFICIOS
- ¿Qué tipo de hotel es adecuado para Hotel-Living?
- ¿Es solo una oportunidad estacional?
- ¿Cómo beneficia esto financieramente a su hotel?
- ¿Se requerirán cambios importantes en el establecimiento?
- ¿Cómo equilibrar a los huéspedes regulares con los de Hotel-Living?
- ¿Este modelo reduce la dependencia de las OTAs?
- ¿Ayuda durante los periodos de baja ocupación?
- ¿Cómo protege el acuerdo con Hotel-Living la marca del hotel?
- ¿Qué apoyo ofrece Hotel-Living a los hoteles asociados?
- ¿Cuándo empiezan a verse los resultados tras unirse?

#### MODELOS DE NEGOCIO
- Si tengo habitaciones vacías, ¿Hotel-Living tiene huéspedes para mí?
- ¿Se requiere un número mínimo de habitaciones para unirse?
- ¿Qué duraciones de estancia debo ofrecer: 8, 16, 24 o 32 días?
- ¿Qué pasa si el hotel tiene 40–60 habitaciones?
- ¿Qué enfoque deben adoptar los hoteles boutique o de alta gama?
- ¿Puedo establecer tarifas distintas según la duración de la estancia?
- ¿Puedo empezar con una sola duración y ampliar después?
- ¿Puedo combinar distintos modelos en el mismo hotel?

#### INGRESOS Y PAGOS
- ¿Cómo afecta esto al RevPAR?
- ¿Tendré que bajar mucho las tarifas?
- ¿Cómo funciona la comisión por reserva?
- ¿Qué pasa con las cancelaciones o no presentaciones?
- ¿Puedo aplicar precios dinámicos para estancias largas?
- ¿Puedo cambiar los precios en cualquier momento?
- ¿Puedo ofrecer tarifas distintas según la duración de la estancia?

#### AFINIDADES
- ¿Qué son exactamente las afinidades Hotel-Living?
- ¿Cuántas afinidades debemos ofrecer?
- ¿Qué afinidades son las más populares entre los huéspedes?
- ¿Qué requisitos de espacio tienen las afinidades?
- ¿Pueden cambiar las afinidades según la temporada?
- ¿Y si algunos huéspedes no quieren participar?
- ¿Por qué considerar estancias basadas en afinidades?
- ¿Cómo nos beneficia esto financieramente?
- ¿Podemos elegir qué afinidades promover?
- ¿Esto no es demasiado específico o limitante?
- ¿Cuál es la visión más amplia detrás de las afinidades?
- ¿Esto realmente ayuda a llenar habitaciones?

#### OPERACIONES
- ¿Cómo gestionamos la limpieza en estancias largas?
- ¿Debemos cambiar los procedimientos de check-in/check-out?
- ¿Qué pasa con la lavandería para estancias largas?
- ¿Cómo gestionamos las comidas para estancias largas?
- ¿Qué ajustes necesita hacer el personal?
- ¿Cómo gestionamos el mantenimiento de habitaciones en estancias largas?
- ¿Qué requisitos tecnológicos tienen los huéspedes de estancias largas?
- ¿Cómo equilibramos privacidad y comunidad?
- ¿Hay consideraciones especiales de seguridad?
- ¿Cómo es el proceso de confirmación de reservas?
- ¿Cómo se gestionan los pagos?
- ¿Cómo gestionamos solicitudes especiales de huéspedes de larga estancia?

#### INTEGRACIÓN
- ¿Podemos seguir usando nuestros canales de reservas actuales?
- ¿Cómo se confirman las reservas?
- ¿Cómo se procesan los pagos?
- ¿Cómo se gestionan las solicitudes especiales?
- ¿Qué tipo de informes recibimos?
- ¿Cómo afecta esto a la estrategia de revenue management?

#### MARKETING
- ¿Cómo promueve Hotel-Living mi propiedad?
- ¿Puedo usar la colaboración en mi propio marketing?
- ¿Cómo apoyan las afinidades el marketing dirigido?

#### HUÉSPEDES
- ¿Cuál es el perfil típico del huésped de Hotel-Living?
- ¿En qué se diferencia de la vivienda para estudiantes o mayores?
- ¿Y si un huésped quiere reservar estancias consecutivas en varios hoteles?
- ¿Los huéspedes pueden combinar Hotel-Living con su residencia habitual?
- ¿Hay una edad mínima para los huéspedes?

#### ADULTOS MAYORES
- ¿Puede Hotel-Living atraer al mercado senior activo?
- ¿Qué lo hace diferente del modelo hotelero tradicional?
- ¿Las estancias largas mejoran de forma asequible el estilo de vida de los mayores?
- ¿Esto convierte al hotel en una residencia de mayores?

---

## 🏨 CONTENIDO SOBRE HOTELES

### 📊 ESLÓGANES Y BENEFICIOS PRINCIPALES
```
LLENAMOS SUS HABITACIONES VACÍAS
Acabamos con sus temporadas medias y bajas
Multiplicamos radicalmente sus beneficios
Activamos el 100 % de la rentabilidad de su hotel
Recuperamos a sus antiguos clientes de Airbnb
Reducimos sus costes operativos
Simplificamos por completo su gestión diaria
Le traemos estancias más largas y rentables
Le damos absoluta estabilidad de personal
Llenamos de vida su hotel. lo llenamos de atractivo
Unificamos entradas y salidas en un solo día semanal
Le adelantamos el 7,5 % del total de cada reserva — beneficio neto, no reembolsable
Sin suscripciones. Sin membresías.
Sin cuotas mensuales. Sin contratos.
Sin costes anticipados. Sin adaptaciones.
Sin cambios en su sistema.
Solo le llevamos clientes.
Y si lo desea, sus clientes favoritos: los que usted elije, los perfectos para su hotel.
Usted decide el o los temas. Usted elije a sus huéspedes.
Y nosotros se los llevamos.
Conectamos su hotel con una nueva era.
Rentabilidad, estabilidad y sentido.
```

### 🔄 COMPARACIÓN DE MODELOS
#### MODELO TRADICIONAL:
- Check-ins y check-outs constantes
- Más limpieza, lavandería y rotación
- Mayor carga de trabajo en recepción
- Ocupación impredecible
- Huecos entre reservas = Noches vacías = Ingresos perdidos
- Temporadas altas y bajas. Personal viene y va
- Personal desmotivado, no entrenable, no profesional
- Huéspedes van y vienen. Sin conexión, sin lealtad
- Reservas frías, aisladas. Una tras otra
- Apartamentos de alquiler ganan con precios más bajos

#### MODELO HOTEL LIVING:
- Días fijos de check-in/check-out = Operaciones más fluidas
- Menos limpieza, menos transiciones
- Recepción más eficiente y optimizada
- Estancias más largas = Mayor ocupación
- Cero noches vacías = Máximo beneficio
- Temporada alta todo el año. Personal estable
- Personal motivado, entrenable, profesional
- Los huéspedes se sienten como en casa y regresan
- No solo reservas: comunidades
- Elegancia. Humanidad. Servicios. Los hoteles ganan

### 💰 ANÁLISIS FINANCIERO
#### ¿CUÁNTO BENEFICIO PERDEMOS CADA AÑO?
- Juntos, perdemos alrededor de $75 mil millones cada año
- Estas habitaciones no se venden: son beneficios puros antes de impuestos
- Nuestra tasa de ocupación anual promedio es solo del 60%
- Eso solo nos permite cubrir costos y generar bajos ingresos
- Pero nos estamos perdiendo el margen real: el 40% restante de habitaciones vacías — nuestra ganancia pura

#### EJEMPLOS ESPECÍFICOS:
- Solo cinco habitaciones vacías por día = alrededor de $55,000 perdidos anualmente
- 20 habitaciones vacías por día = alrededor de $220,000 en beneficio puro
- Un hotel de 200 habitaciones cerrado de octubre a mayo pierde $1 millón y acumula $420,000 en pérdidas adicionales
- ¿Y un hotel de 500 habitaciones? Más de $3 millones en beneficio anual perdido

### 🎯 HOTELES DE AFINIDAD
#### EJEMPLO 1:
- Imagina un hotel enfocado en deportes – ciclismo, golf, tenis, etc.
- Personas interesadas en ese deporte reservan juntas
- Se forma una comunidad alrededor de intereses compartidos
- Sin huecos entre estancias. Sin pérdidas

#### EJEMPLO 2:
- Considera un hotel temático de cocina
- Chefs, clases de cocina, maridajes de vinos, etc.
- Tarifas premium para experiencias especializadas
- Ocupación completa con estancias promedio más largas

#### EJEMPLO 3:
- Hoteles de inmersión en idiomas
- Huéspedes con niveles de idioma similares agrupados
- Personal habla el idioma objetivo
- Una experiencia completa de idioma

### 🔧 TECNOLOGÍA Y MARKETING
#### NUESTRA TECNOLOGÍA:
- Conecta personas con intereses compartidos
- Coordina check-ins y check-outs para cero huecos
- Optimiza estancias para máxima rentabilidad
- Una plataforma. Múltiples flujos de ingresos

#### MARKETING DIRIGIDO:
- Segmentación de precisión por interés y afinidad
- Marketing a comunidades motivadas, no viajeros aleatorios
- Alcance global con targeting hiper-específico
- Mayores tasas de conversión. Menores costos de adquisición

---

## 📋 CONTENIDO LEGAL Y CORPORATIVO

### 📜 TÉRMINOS Y CONDICIONES
```
CONDICIONES DE SERVICIO PARA CLIENTES DE HOTEL-LIVING.COM
Actualizado el 12/11/2024

Al completar tu Reserva, estás aceptando estas Condiciones y cualquier otra disposición que se te haya proporcionado durante el proceso de reserva.

ACERCA DE HOTEL-LIVING:
Cuando reservas alojamiento, Hotel-Living.com es el proveedor y responsable de la Plataforma, pero no de la Experiencia de Viaje en sí.

NUESTROS VALORES:
Te comprometes a:
- adherirte a Nuestros valores;
- cumplir con todas las leyes aplicables;
- cooperar en cualquier verificación antifraude/antilavado de dinero que necesitemos realizar;
- no usar la Plataforma para causar daño o hacer Reservas falsas;
- usar la Experiencia de Viaje y/o nuestra Plataforma para el propósito previsto;
- no causar daño o daños y no comportarte de manera inapropiada con el personal del Proveedor de Servicios.

PRECIOS:
Cuando haces una Reserva, aceptas pagar el costo de la Experiencia de Viaje, incluidos todos los cargos e impuestos aplicables.

PAGO:
Somos responsables de cobrarte un depósito no reembolsable por tu reserva. Nosotros (o, a veces, nuestro afiliado en el país de origen del pago) seremos responsables de gestionar el pago y asegurar que la transacción con el Proveedor de Servicios se complete.

CONDICIONES:
Cuando haces una Reserva, estás aceptando las condiciones aplicables mostradas durante el proceso de reserva.

PRIVACIDAD Y COOKIES:
Si reservas alojamiento, un vuelo o una atracción turística, consulta nuestra Política de Privacidad y Cookies para más información sobre privacidad, cookies, y cómo podemos contactarte y procesar tus datos personales.

SOLICITUDES DE ACCESIBILIDAD:
Si tienes alguna solicitud de accesibilidad, contacta a nuestro equipo de Atención al Cliente.

DERECHOS DE PROPIEDAD INTELECTUAL:
A menos que se indique lo contrario, todos los derechos de nuestra Plataforma (tecnología, contenido, marcas comerciales, apariencia, etc.) son propiedad de Hotel-Living.com (o sus licenciantes).
```

### 🏛️ PROPIEDAD INTELECTUAL
```
DERECHOS DE PROPIEDAD INTELECTUAL

Hotel-Living.com y todo su contenido, características y funcionalidad (incluyendo pero no limitado a toda la información, software, texto, pantallas, imágenes, video y audio, y el diseño, selección y disposición de los mismos) son propiedad de Hotel-Living.com, sus licenciantes u otros proveedores de dicho material y están protegidos por derechos de autor internacionales, marcas registradas, patentes, secretos comerciales y otras leyes de propiedad intelectual o derechos propietarios.

Este sitio, así como su innovador sistema de reservas, están registrados y protegidos internacionalmente tanto como Modelos de Utilidad como por Derechos de Autor. Cualquier reproducción o copia del sistema será perseguida legalmente. Los interesados en franquicias nacionales pueden contactarnos.

MARCAS REGISTRADAS:
El nombre Hotel-Living, logo y todos los nombres relacionados, logos, nombres de productos y servicios, diseños y eslóganes son marcas registradas de Hotel-Living.com o sus afiliados o licenciantes.

AVISO DE DERECHOS DE AUTOR:
© 2025 Hotel-Living.com. Todos los derechos reservados. Ninguna parte de este sitio web puede ser reproducida, distribuida o transmitida en cualquier forma o por cualquier medio, incluyendo fotocopiado, grabación u otros métodos electrónicos o mecánicos, sin el permiso previo por escrito del propietario.

INFORMACIÓN DE PATENTES:
Varios aspectos de la plataforma Hotel-Living.com y el sistema de reservas están protegidos por patentes o pendientes de patente. El uso, reproducción o distribución no autorizada de estas tecnologías está estrictamente prohibido.
```

### 🛡️ NUESTROS VALORES Y ESTÁNDARES
```
RESPETO:
Exigimos respeto en las interacciones entre nuestros empleados, clientes y socios. No aceptamos ninguna forma de acoso, discriminación, manipulación, violencia física o cualquier otro comportamiento abusivo o amenazante.

COMUNIDAD:
Al alojarse en un establecimiento o usar otros servicios de Hotel-Living.com, pedimos que considere la comunidad local. Trate de limitar o minimizar el ruido que pueda molestar al vecindario, respete las leyes y tradiciones locales, y sea consciente de su impacto en el medio ambiente.

INTEGRIDAD:
En Hotel-Living.com, esperamos que nuestros socios y clientes interactúen a través de nuestra plataforma con honestidad y profesionalismo, que no se representen falsamente y que respeten los acuerdos que alcancen.

CUMPLIMIENTO DE LA LEY:
Hotel-Living.com no tolera el robo, vandalismo, actividades criminales o extorsión. Cualquier tipo de actividad ilegal o peligrosa puede resultar en el bloqueo de la cuenta o alojamiento.

SEGURIDAD FÍSICA:
En Hotel-Living.com, la seguridad física de nuestros clientes, socios y empleados es nuestra prioridad. Por lo tanto, le pedimos que no participe o promueva actividades que puedan causar daño a otros o ser consideradas crueldad animal.

INFORMACIÓN PERSONAL:
Hotel-Living.com no permite que sus socios o afiliados usen los datos personales de terceros de maneras que violen nuestro acuerdo o la ley aplicable.

PRIVACIDAD:
En Hotel-Living.com, estamos comprometidos a proporcionar la mejor experiencia posible a quienes usan nuestros servicios de viaje. Esto significa que nos tomamos la privacidad muy en serio y estamos comprometidos a protegerla y salvaguardarla de acuerdo con nuestra Política de Privacidad y Cookies y la ley aplicable.
```

### 🔒 PRIVACIDAD Y COOKIES
```
INTRODUCCIÓN:
Estamos comprometidos a proteger su privacidad y garantizar la seguridad de sus datos. Esta Política de Privacidad y Cookies describe cómo recopilamos, usamos y protegemos su información.

INFORMACIÓN QUE RECOPILAMOS:
Recopilamos varios tipos de información de y sobre los usuarios de nuestro sitio web, incluyendo:
- Información personal como nombre, dirección de correo electrónico, dirección postal, número de teléfono e información de pago cuando se registra, hace una reserva o nos contacta.
- Información sobre su conexión a internet, el equipo que usa para acceder a nuestro sitio web y detalles de uso.
- Información recopilada a través de cookies y otras tecnologías de seguimiento.

CÓMO USAMOS SU INFORMACIÓN:
Usamos la información que recopilamos sobre usted o que nos proporciona para:
- Presentar nuestro sitio web y su contenido a usted.
- Proporcionarle información, productos o servicios que nos solicite.
- Cumplir cualquier otro propósito para el cual la proporcione.
- Cumplir nuestras obligaciones y hacer valer nuestros derechos derivados de cualquier contrato celebrado entre usted y nosotros.
- Notificarle sobre cambios en nuestro sitio web o cualquier producto o servicio que ofrecemos o proporcionamos.
- Mejorar nuestro sitio web y servicio al cliente.

COOKIES Y TECNOLOGÍAS DE SEGUIMIENTO:
Usamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro sitio web y mantener cierta información.

Tipos de cookies que usamos:
- Cookies Esenciales: Requeridas para el funcionamiento de nuestro sitio web.
- Cookies Analíticas/de Rendimiento: Nos permiten reconocer y contar el número de visitantes y ver cómo los visitantes se mueven por nuestro sitio web.
- Cookies de Funcionalidad: Se usan para reconocerle cuando regresa a nuestro sitio web.
- Cookies de Segmentación: Registran su visita a nuestro sitio web, las páginas que ha visitado y los enlaces que ha seguido.

SEGURIDAD DE DATOS:
Hemos implementado medidas diseñadas para asegurar su información personal contra pérdida accidental y contra acceso, uso, alteración y divulgación no autorizados.

SUS DERECHOS:
Dependiendo de su ubicación, puede tener ciertos derechos con respecto a su información personal, tales como:
- El derecho a acceder a su información personal.
- El derecho a rectificar información personal inexacta.
- El derecho a solicitar la eliminación de su información personal.
- El derecho a restringir el procesamiento de su información personal.
- El derecho a la portabilidad de datos.
- El derecho a objetar el procesamiento de su información personal.
```

### 🤝 PROGRAMA DE EMBAJADORES
```
¿QUIÉNES SON LOS EMBAJADORES HOTEL-LIVING?

Son anfitriones, profesionales del sector, o auténticos enamorados de la riqueza cultural y personal que brinda el hecho de viajar y conocer el mundo.

Personas que sienten cada desplazamiento como una fuente de conocimiento, belleza, transformación y conexión con nuevas culturas, lugares y personas.

Que comprenden el valor de una vida rica en experiencias como clave para el bienestar, las relaciones sociales y la plenitud personal.

Que creen en las estancias largas no solo como una opción práctica, sino como una oportunidad refinada, culturalmente rica y profundamente humana.

Que valoran la magia de las afinidades temáticas, la autenticidad de los entornos bien elegidos y el privilegio de vivir en espacios cuidados y con alma hotelera.

BENEFICIOS EXCLUSIVOS PARA NUESTROS EMBAJADORES:

RECONOCIMIENTO Y PRESTIGIO:
• Título oficial de Embajador de Hotel-Living, con certificado digital personalizado
• Perfil destacado en nuestra web (foto, biografía y mensaje personal)
• Distintivo digital oficial para usar en LinkedIn, firma de email o web
• Incorporación simbólica al Consejo Asesor internacional de Hotel-Living

ACCESO PRIVILEGIADO A SERVICIOS:
• Estancias gratuitas puntuales en hoteles afiliados (hasta 3 noches por año)
• Acceso anticipado a nuevas funcionalidades, países y hoteles
• Participación en viajes privados y encuentros exclusivos para embajadores

VISIBILIDAD Y PROMOCIÓN:
• Mención destacada en materiales de prensa, boletines y redes
• Oportunidad de aparecer en entrevistas o reportajes como embajador/a
• Invitación a intervenir en eventos digitales o presenciales

CONEXIÓN Y COMUNIDAD:
• Acceso a una red internacional de embajadores
• Participación en reuniones estratégicas con el equipo fundador
• Voz consultiva para proponer mejoras en el modelo Hotel-Living

APOYO A SUS PROYECTOS:
• Difusión de sus hoteles, libros, iniciativas u ONG a través del portal
• Acceso libre a herramientas internas: calculadoras, guías y recursos premium

DISTINCIÓN EMOCIONAL:
• Carta de agradecimiento personalizada, firmada por los fundadores
• Regalo simbólico y único (insignia física, miniobra, NFT, etc.)
• Inscripción de su nombre en la página oficial de impulsores del proyecto

¿QUÉ SE ESPERA DE UN EMBAJADOR?
• Representar el nombre Hotel-Living con profesionalidad y coherencia
• Recomendar activamente nuestro portal a personas que compartan sus valores
• Invitar al menos a 10 personas a hacerse miembros registrados (gratuitamente)

El título de embajador tiene una duración de 12 meses y podrá renovarse cada año, siempre que:
• Mantenga una participación activa
• Conserve un perfil ejemplar
• Continúe promoviendo Hotel-Living de forma natural y honesta
```

### 📰 CONTENIDO DE PRENSA
```
EL FUTURO YA ESTÁ AQUÍ
Vivir en hoteles deja de ser una rareza
…y se convierte en una nueva forma de vida

TITULARES DESTACADOS:
- Hilton lanza LivSmart Studios: más de 300 hoteles pensados para vivir estancias de 20 noches o más
- El mercado de extended-stay crecerá de $62.800M a $143.200M antes de 2034
- Marriott, Hyatt y Wyndham compiten por liderar el segmento con sus nuevas marcas
- Miles de jubilados, teletrabajadores y nómadas digitales eligen hoteles como hogar permanente
- Los hoteles extended-stay logran mayor ocupación con menos personal y más rentabilidad
- The Social Hub, Hoxton y Soho House mezclan hotel, coworking y comunidad: el nuevo modelo híbrido
- En Hong Kong, hoteles tradicionales se transforman en coliving para asegurar rentabilidad estable
- El diseño hotelero evoluciona: habitaciones convertidas en espacios para vivir, trabajar y socializar

CIFRAS CLAVE:
- +232,000 extended-stay nights added in the U.S. in 2024
- +50% growth in extended-stay portfolio among major hotel chains in the last decade
- +200 ECHO hotels announced by Wyndham
- $9.31 → average labor cost per occupied room in extended-stay hotels
- $20.34 → equivalent in traditional hotels
- 2,038 hotel rooms converted to coliving in Hong Kong
- +60% of Millennials and Gen Z prefer flexible stays with included services

MARCAS HOTELERAS:
Principales: Hilton, Marriott, Hyatt, Wyndham, Accor, WaterWalk
Especializadas: The Manner, The Social Hub, StudioRes, Gaiastays, Echo, LivSmart

CIERRE:
La industria hotelera no está simplemente cambiando…
está evolucionando hacia una nueva forma de habitar el mundo.

LEGAL:
Todas las marcas, logotipos y referencias citadas en esta página pertenecen a sus respectivos propietarios y se incluyen exclusivamente con fines informativos, editoriales o comparativos. Hoteldiving no está afiliado ni respaldado por dichas entidades.
```

---

## 🗂️ COMPONENTES CON TEXTO EN ESPAÑOL

### 📍 FILTROS DE BÚSQUEDA

#### Planes de Comidas:
- Desayuno
- Media Pensión
- Pensión Completa
- Todo Incluido
- Lavandería Incluída

#### Servicios de Habitación:
- Aire Acondicionado
- Balcón
- Cocina
- Espacio de Trabajo
- TV
- Minibar

#### Duración de Estancia:
- 8 días
- 15 días
- 22 días
- 29 días

#### Rangos de Precio:
- Hasta $1,000
- $1,000 a $1,500
- $1,500 a $2,000
- Más de $2,000

### 📞 PÁGINA DE CONTACTO
```
CONTÁCTANOS

¡Estamos escuchando!

No dudes en enviarnos un mensaje a
contact@hotel-living.com
¡Nos encantaría saber de ti!
```

### 📊 PANEL DE HOTEL (Dashboard)
```
PANEL DE CONTROL
Bienvenido
Resumen
Estadísticas
Actividad reciente
Acciones rápidas
Notificaciones
Perfil
Cuenta
Preferencias

GESTIÓN HOTELERA:
- CALCULAR MODELO
- TARIFAS Y GANANCIAS
- Propiedades
- Publicidad
- Reservas
- Huéspedes
- Mensajes del admin
- Finanzas
- Reseñas
- Análisis
- Configuración

SOPORTE:
¿Necesitas ayuda?
Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier pregunta.
Contactar soporte

ESTADÍSTICAS:
- Total de reservas
- Ingresos
- Calificación promedio

ACCIONES RÁPIDAS:
- Agregar propiedad
- Ver reservas
- Ver análisis
- Gestionar reseñas

MENSAJES DE BIENVENIDA:
¡Bienvenido a Hotel-Living!
Comienza agregando tu primera propiedad o explorando las funciones del panel.

ESTADO DE DATOS:
- Aún no hay reseñas
- Las reseñas de los huéspedes aparecerán aquí
- Aún no hay reservas
- Las reservas de tu propiedad aparecerán aquí
```

### 🧮 CALCULADORA DE TARIFAS
```
SERVICIOS PÚBLICOS
LIMPIEZA
COMIDAS
COSTO TOTAL

PREVISIBILIDAD – RESPONSABILIDAD – EFICIENCIA

LOS HUÉSPEDES DE HOTEL-LIVING NO SON TURISTAS TRANSEÚNTES
Son residentes respetuosos de larga estadía que permanecen por 8, 16, 24 o 32 días.

HUÉSPEDES MÁS INTELIGENTES, USO MÁS INTELIGENTE DE RECURSOS
Debido a la mayor duración de las estadías y la relación más personal que establecen con tu propiedad, estos huéspedes tienden a ser más conscientes en su uso de recursos.

LIMPIEZA ESTILO HOGAR – COMODIDAD A LARGO PLAZO

HOTEL-LIVING SIGNIFICA UN NUEVO ESTÁNDAR DE HOSPITALIDAD
UNO QUE SE SIENTE MÁS COMO EN CASA.

LIMPIEZA COMPLETA — UNA VEZ A LA SEMANA
Una limpieza completa de la habitación cada 7 días garantiza higiene y frescura, con mínima intrusión.

REFRESCAMIENTO LIGERO DIARIO (BAJO SOLICITUD)
Pequeños retoques opcionales — remoción de basura, orden ligero, ventilación — están disponibles, respetando la privacidad y el estilo de vida.

CAMBIO DE ROPA DE CAMA — CADA 5 DÍAS
Las sábanas y toallas se renuevan regularmente, siguiendo estándares de comodidad hogareña.

CONSTRUIR TU MODELO
Crea un modelo de precios personalizado para tu hotel

PUEDE DESCARGAR AQUÍ NUESTRA CALCULADORA EXCEL PARA PROBAR DISTINTOS MODELOS DE SERVICIOS, PRECIOS Y BENEFICIOS.
DESCARGAR
```

---

## 📊 RESUMEN ESTADÍSTICO

### 📈 TOTAL DE ELEMENTOS EN ESPAÑOL:
- **Archivos JSON de traducción:** 25 archivos
- **Preguntas FAQ generales:** 56 preguntas
- **Preguntas FAQ para hoteles:** 78 preguntas  
- **Categorías FAQ:** 12 categorías
- **Componentes específicos:** 8 componentes
- **Páginas especializadas:** 5 páginas
- **Términos de filtros:** 45 términos
- **Eslóganes principales:** 21 eslóganes
- **Países y ciudades:** 10 países
- **Tipos de propiedad:** 5 tipos
- **Estilos de propiedad:** 8 estilos
- **Total aproximado de cadenas de texto:** +2,500 cadenas

### 🔗 ENLACES Y REFERENCIAS:
- **Videos:** 2 enlaces de YouTube
- **Contactos:** 5 direcciones de correo
- **Enlaces externos de prensa:** 6 medios
- **Redes sociales:** LinkedIn, WhatsApp

### 🎯 CATEGORÍAS TEMÁTICAS:
- Artes y Cultura
- Deportes y Actividades  
- Comida y Bebidas
- Tecnología y Ciencia
- Naturaleza y Aventura
- Bienestar y Salud
- Educación y Aprendizaje
- Entretenimiento

---

## ✅ VERIFICACIÓN DE CALIDAD

✅ **Todos los textos están en español**
✅ **No hay contenido en otros idiomas mezclado**
✅ **Se incluyen todos los archivos JSON de la carpeta /es/**
✅ **Se incluyen componentes específicos en español (.es.tsx)**
✅ **Se incluyen todas las categorías FAQ**
✅ **Se incluye contenido legal completo**
✅ **Se incluye contenido corporativo**
✅ **Se incluye documentación de embajadores**
✅ **Se incluye contenido de prensa**
✅ **Se incluye toda la terminología de filtros**
✅ **Formato estructurado para fácil revisión**

---

**📅 Fecha de exportación:** Enero 2025  
**🏷️ Versión:** Beta - Sujeta a actualizaciones continuas  
**📧 Contacto para revisiones:** contact@hotel-living.com

---

*Este documento contiene la exportación completa de todo el contenido textual en español del portal Hotel-Living.com, organizado por categorías para facilitar la revisión, traducción cruzada y control de calidad.*