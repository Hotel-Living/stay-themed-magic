
import { FaqCategory, FaqItem } from "./types";

export const hotelFaqCategories: FaqCategory[] = [
  { id: "benefits", name: "BENEFITS" },
  { id: "models", name: "MODELS" },
  { id: "revenue", name: "REVENUE" },
  { id: "guests", name: "GUESTS" },
  { id: "seniors", name: "SENIORS" },
  { id: "affinities", name: "AFFINITIES" },
  { id: "operation", name: "OPERATION" },
  { id: "integration", name: "INTEGRATION" },
  { id: "marketing", name: "MARKETING" },
  { id: "payment", name: "PAYMENT" }
];

export const hotelFaqsByCategory: Record<string, FaqItem[]> = {
  benefits: [
    {
      question: "What type of hotel is suitable for Hotel-Living?",
      answer: "Any kind of hotel can benefit from our program — whether it's a boutique hotel, a business hotel, a resort, or a city hotel. The only requirements are: availability for long stays, a willingness to foster community, and the ability to provide consistent service for extended stays.",
      questionEs: "¿Qué tipo de hotel es adecuado para Hotel-Living?",
      answerEs: "Cualquier tipo de hotel puede beneficiarse de nuestro programa, ya sea un hotel boutique, un hotel de negocios, un resort o un hotel urbano. Los únicos requisitos son: disponer de disponibilidad para estancias prolongadas, voluntad de fomentar la comunidad, y capacidad para ofrecer un servicio fiable en estancias largas."
    },
    {
      question: "How does this benefit your hotel financially?",
      answer: "The Hotel-Living program significantly increases occupancy rates, generates steady revenue through longer stays, and reduces operational costs associated with frequent guest turnover. Properties often see substantial improvements in their RevPAR and profit margins, especially during traditionally low seasons.",
      questionEs: "¿Cómo beneficia esto financieramente a su hotel?",
      answerEs: "El programa Hotel-Living incrementa notablemente las tasas de ocupación, genera ingresos constantes mediante estancias más largas y reduce los costes operativos derivados de la rotación frecuente de huéspedes. Las propiedades suelen experimentar mejoras significativas en su RevPAR y márgenes de beneficio, especialmente en temporadas tradicionalmente bajas."
    },
    {
      question: "Will major changes be required to the property?",
      answer: "No. Most hotels already have what's needed to implement the Hotel-Living concept. Small adjustments such as enhancing Wi-Fi, creating common areas, or adapting room services may be helpful, but no major renovations are required.",
      questionEs: "¿Será necesario realizar cambios importantes en la propiedad?",
      answerEs: "No. La mayoría de los hoteles ya disponen de lo necesario para implementar el concepto Hotel-Living. Pueden realizarse pequeños ajustes como mejorar el wifi, crear espacios comunes o adaptar los servicios de habitación, pero no se requieren reformas importantes."
    },
    {
      question: "Does this model reduce dependency on OTAs?",
      answer: "Absolutely. Hotel-Living drives direct bookings through our platform, substantially reducing OTA commissions. Our guests book directly and often return, creating loyal customers and brand ambassadors for your hotel.",
      questionEs: "¿Ayuda este modelo a reducir la dependencia de las OTAs?",
      answerEs: "Absolutamente. Hotel-Living aporta reservas directas a través de nuestra plataforma, reduciendo sustancialmente las comisiones de las OTAs. Nuestros clientes reservan directamente y tienden a repetir, generando clientela fiel y embajadores de su hotel."
    },
    {
      question: "Does it help during low occupancy periods?",
      answer: "This is one of the biggest advantages. Hotel-Living specifically targets low occupancy periods, helping to fill rooms that would otherwise remain empty. Our pricing model adapts to your hotel's seasonality, allowing you to maintain high annual occupancy.",
      questionEs: "¿Ayuda en los períodos de baja ocupación?",
      answerEs: "Este es uno de los mayores beneficios. Hotel-Living se dirige específicamente a los períodos de baja ocupación, ayudando a llenar habitaciones que de otro modo permanecerían vacías. Nuestro modelo de precios se adapta a la estacionalidad de su hotel, permitiéndole mantener una alta ocupación anual."
    },
    {
      question: "What support does Hotel-Living offer to partner hotels?",
      answer: "Our partners receive full support: Dedicated account manager, Staff training, Operational manuals, Marketing materials, Professional photography services, Access to the property management dashboard. Our goal is to ensure your success in the long-stay market.",
      questionEs: "¿Qué soporte ofrece Hotel-Living a los hoteles asociados?",
      answerEs: "Nuestros socios reciben asistencia completa: • Gestor de cuentas asignado • Formación de personal • Manuales operativos • Material de marketing • Servicios de fotografía profesional • Acceso al panel de gestión de propiedades Nuestro objetivo es asegurar su éxito en el mercado de estancias prolongadas."
    },
    {
      question: "When do results start appearing after joining?",
      answer: "Most hotels start receiving bookings within the first month of onboarding. Full occupancy impact is typically seen between 3 and 6 months, as your property builds reputation and receives reviews within the long-stay community.",
      questionEs: "¿Cuándo comienzan a verse resultados tras unirse?",
      answerEs: "La mayoría de los hoteles comienza a recibir reservas en el primer mes tras el alta. El impacto completo sobre la ocupación suele verse entre los 3 y 6 meses, a medida que su propiedad gana reputación y opiniones en la comunidad de estancias largas."
    }
  ],
  models: [
    {
      question: "Is this just a seasonal opportunity?",
      answer: "Not at all. Active retirees travel year-round. Many are digital nomads, solo travelers, or couples seeking a lifestyle change. Hotel-Living generates consistent demand, not just a seasonal peak.",
      questionEs: "¿Es simplemente una oportunidad estacional?",
      answerEs: "En absoluto. Los jubilados activos viajan todo el año. Muchos son nómadas digitales, viajeros solitarios o parejas que buscan un cambio de estilo de vida. Hotel-Living genera una demanda permanente, no un simple pico estacional."
    },
    {
      question: "How can you balance your regular guests with Hotel-Living guests?",
      answer: "Our platform allows you to assign specific rooms to the Hotel-Living model and adjust availability in real time. This flexibility lets you serve your traditional clientele while building long-stay business. Many hotels start by allocating just 10%–20% of their inventory to extended stays and scale up as demand grows.",
      questionEs: "¿Cómo puede compaginar a sus huéspedes habituales con los de Hotel-Living?",
      answerEs: "Nuestra plataforma le permite asignar habitaciones específicas al modelo Hotel-Living y ajustar la disponibilidad en tiempo real. Esta flexibilidad le permite mantener su clientela tradicional mientras desarrolla las estancias largas. Muchos hoteles comienzan dedicando sólo el 10%–20% de su inventario a estancias prolongadas, ampliándolo progresivamente según crece la demanda."
    },
    {
      question: "Is this truly a new revenue strategy, not just a different type of guest?",
      answer: "Exactly. It's not just about filling rooms — it's about extracting more value per stay: Longer durations, Fewer gaps between bookings, Higher guest loyalty, Greater perceived value = More revenue per room.",
      questionEs: "¿Es realmente una estrategia de ingresos adicional, no solo un nuevo tipo de público?",
      answerEs: "Exactamente. No se trata únicamente de llenar habitaciones, sino de extraer un mayor valor por estancia: • Duraciones más largas • Menos huecos entre reservas • Mayor fidelización • Mayor percepción de valor = Más ingresos por habitación."
    },
    {
      question: "Is there a minimum number of rooms required to join?",
      answer: "No. Even with just 3 or 5 available rooms, you can join the system. You may not run themed programs in such cases, but you can offer 8-day stays with: Full board, Half board, Accommodation only. Depending on your structure. The model is flexible, and there is demand for all service levels — from basic to luxury.",
      questionEs: "¿Existe un mínimo de habitaciones requerido para incorporarse?",
      answerEs: "No. Incluso con 3 o 5 habitaciones disponibles, usted puede incorporarse al sistema. En esos casos, tal vez no implemente programas temáticos, pero sí puede ofrecer estancias de 8 días con: • Pensión completa • Media pensión • Solo alojamiento Según su estructura. El modelo es flexible y existe demanda para todos los niveles de servicio, desde opciones sencillas hasta lujosas."
    },
    {
      question: "What stay durations should I offer: 8, 16, 24, or 32 days?",
      answer: "It depends on your hotel's size, category, and operational capacity: Larger hotels with sufficient infrastructure often offer all four durations: 8, 16, 24, and 32 days. Smaller hotels (e.g., up to 20 rooms) often start with 8-day stays for smoother operations. Longer stays are ideal if you have the space and volume of guests to support them.",
      questionEs: "¿Qué duraciones de estancia debería ofrecer: 8, 16, 24 o 32 días?",
      answerEs: "Depende del tamaño, categoría y capacidad operativa de su hotel: • Hoteles grandes, con estructura suficiente, suelen ofrecer las cuatro modalidades: 8, 16, 24 y 32 días. • Hoteles más pequeños (por ejemplo, hasta 20 habitaciones) a menudo comienzan ofreciendo estancias de 8 días, manteniendo una operativa ágil y fluida. • Las estancias largas son ideales cuando dispone del espacio y volumen de huéspedes suficientes."
    },
    {
      question: "What if the hotel has between 40 and 60 rooms?",
      answer: "That's a perfect mid-range. You can start by offering 8- and 16-day stays and expand to 24 or 32 days as operations and demand grow.",
      questionEs: "¿Qué ocurre si el hotel dispone de entre 40 y 60 habitaciones?",
      answerEs: "Ese es un rango óptimo intermedio. Puede comenzar fácilmente ofreciendo estancias de 8 y 16 días, y ampliar a 24 o 32 días conforme crezca su operativa y la demanda."
    },
    {
      question: "What approach should boutique or high-end hotels take?",
      answer: "Boutique hotels thrive on quality and uniqueness. You can offer 8-day themed programs like: Culinary weeks with guest chefs, Wellness retreats, Cultural or language immersions. These programs can repeat weekly, building consistency, reputation, and a rotating experience for guests.",
      questionEs: "¿Qué enfoque deben tener los hoteles boutique o de alta gama?",
      answerEs: "En hoteles boutique, su punto fuerte es la calidad y el carácter único. Puede desarrollar programas temáticos de 8 días como: • Semanas gastronómicas con chefs invitados • Retiros de bienestar • Inmersiones culturales o lingüísticas Estos programas pueden repetirse semanalmente, creando consistencia, reputación y una experiencia rotativa para los huéspedes."
    },
    {
      question: "Can I set different rates depending on the length of stay?",
      answer: "Yes, and it's highly recommended. Offering progressive discounts based on the duration encourages: Longer bookings (16, 24, or 32 days), Lower operational costs per guest, Greater guest loyalty and stability. Guests naturally prefer longer and more affordable stays — a win for your profitability.",
      questionEs: "¿Puedo establecer tarifas diferentes según la duración de la estancia?",
      answerEs: "Sí, y es altamente recomendable. Ofrecer descuentos progresivos según la duración de la reserva le permite: • Atraer estancias más largas (16, 24 o 32 días) • Reducir los costes operativos por huésped • Aumentar la fidelización y estabilidad Los huéspedes, de forma natural, prefieren estancias más largas y económicas, lo cual maximiza su rentabilidad."
    },
    {
      question: "Can I start with just one stay duration and expand later?",
      answer: "Absolutely. Many hotels begin with 8-day stays to test the model and gradually add longer options as operations evolve and guest behavior becomes clearer. You control the pace of growth.",
      questionEs: "¿Puedo comenzar con un solo tipo de duración y ampliar después?",
      answerEs: "Por supuesto. Muchos hoteles empiezan con estancias de 8 días para probar el modelo y, gradualmente, añaden opciones más largas conforme evoluciona la operativa y se establecen los hábitos de los huéspedes. Usted controla el ritmo de crecimiento."
    },
    {
      question: "Can I combine different models within the same hotel?",
      answer: "Yes — and this is often the smartest choice. For example: Assign some rooms to 8-day themed cycles, Others to long stays (ideal for digital nomads or semi-retirees). This combination maximizes occupancy and attracts a more diverse clientele.",
      questionEs: "¿Puedo combinar diferentes modelos en el mismo hotel?",
      answerEs: "Sí, y suele ser la opción más inteligente. Por ejemplo: • Dedique algunas habitaciones a ciclos temáticos de 8 días • Otras habitaciones a estancias largas (perfectas para nómadas digitales o semi jubilados) Esta combinación maximiza la ocupación y atrae a una clientela más variada."
    }
  ],
  revenue: [
    {
      question: "What are the financial benefits for your hotel?",
      answer: "In addition to filling rooms that would otherwise sit empty, you benefit from: Longer stays, Lower turnover, More satisfied guests, A steady revenue stream from low-maintenance, grateful, and likely repeat clients.",
      questionEs: "¿Cuáles son los beneficios financieros para su hotel?",
      answerEs: "Además de llenar habitaciones que de otro modo permanecerían vacías, usted obtiene: • Estancias más largas • Menor rotación • Huéspedes más satisfechos • Un flujo de ingresos estable, con clientes agradecidos, de bajo mantenimiento y con altas probabilidades de repetir."
    },
    {
      question: "If I have empty rooms, does Hotel-Living have guests for me?",
      answer: "There's always a market. The potential guest base is massive — people of all ages, backgrounds, and preferences looking for flexible, comfortable, and affordable alternatives to traditional housing. Regardless of your hotel's size, there's a way to benefit from the Hotel-Living model by adapting it to your specific offering.",
      questionEs: "Si tengo habitaciones vacías, ¿Hotel-Living tiene clientes para mí?",
      answerEs: "Siempre existe mercado. El potencial de clientes es enorme, con personas de todas las edades, orígenes y preferencias que buscan alternativas flexibles, cómodas y accesibles frente a la vivienda tradicional. Independientemente del tamaño de su hotel, existe una vía para beneficiarse del modelo Hotel-Living, adaptando la oferta según lo que mejor encaje en su propiedad."
    },
    {
      question: "How does the agreement with Hotel-Living protect your brand?",
      answer: "We position your property as a premium residential-style option — not a low-cost accommodation. Our platform attracts high-quality guests seeking authentic experiences and community, strengthening your brand and reputation.",
      questionEs: "¿Cómo protege la marca el acuerdo con Hotel-Living?",
      answerEs: "Posicionamos su propiedad como una opción residencial de alto nivel — no como alojamiento de bajo coste. Nuestra plataforma atrae huéspedes de calidad que buscan experiencias auténticas y comunidad, reforzando su marca y reputación."
    },
    {
      question: "How does this impact our existing revenue management strategy?",
      answer: "Hotel-Living enhances your revenue management by creating a reliable baseline of long-stay bookings, which can be factored into forecasting. Many properties use our platform to strategically fill low-demand periods — allowing more aggressive pricing during high-demand windows through conventional channels.",
      questionEs: "¿Cómo afecta esto a nuestra estrategia de gestión de ingresos existente?",
      answerEs: "Hotel-Living mejora sus capacidades de gestión de ingresos creando una línea base confiable de reservas de estancia prolongada que puede factorizarse en sus pronósticos. Muchas propiedades usan nuestra plataforma para llenar estratégicamente períodos tradicionalmente de baja demanda, permitiendo precios más agresivos durante períodos de alta demanda en canales convencionales."
    }
  ],
  guests: [
    {
      question: "What happens if a guest wants to book consecutive stays at different hotels?",
      answer: "The system allows full itinerary management: Guests can plan multiple stages in different cities or countries, The platform coordinates check-in and check-out dates across hotels, You receive the booking for your property within the overall itinerary.",
      questionEs: "¿Qué ocurre si un huésped desea reservar estancias consecutivas en varios hoteles?",
      answerEs: "El sistema permite gestionar itinerarios completos: • El cliente puede planificar varias etapas en distintas ciudades o países. • La plataforma coordina las fechas de entrada y salida en cada hotel. • Usted recibe la reserva correspondiente a su propiedad dentro del itinerario global."
    },
    {
      question: "Can guests combine Hotel-Living with their usual residence?",
      answer: "Yes. Many guests use Hotel-Living as: A part-time second home during the year, A temporary transition while reorganizing their personal or professional life, An alternative to traditional housing during specific life stages.",
      questionEs: "¿Pueden los clientes combinar Hotel-Living con su lugar de residencia habitual?",
      answerEs: "Sí. Muchos clientes utilizan Hotel-Living: • Como segunda residencia parcial durante el año. • Como transición temporal mientras reorganizan su vida laboral o familiar. • Como alternativa a la vivienda tradicional durante etapas específicas de su vida."
    },
    {
      question: "Is there a minimum age required for guests?",
      answer: "Hotel-Living is designed for adults (18+), especially targeting: Active professionals, Retirees, Remote workers, Digital nomads, Couples or solo travelers, People transitioning residences. In some cases, families may also be accepted depending on hotel policy and affinities.",
      questionEs: "¿Se requiere un mínimo de edad para los huéspedes?",
      answerEs: "En principio, Hotel-Living está diseñado para adultos (+18 años), especialmente enfocado a: • Profesionales activos • Jubilados • Trabajadores remotos • Nómadas digitales • Parejas o viajeros individuales • Personas en transición de residencia En algunos casos pueden aceptarse familias, dependiendo de la afinidad y la política de cada hotel."
    }
  ],
  seniors: [
    {
      question: "Can Hotel-Living help us attract the active senior market?",
      answer: "Absolutely. Hotel-Living opens your doors to a large, growing segment: independent retirees seeking comfort, services, and social life — without entering senior housing. It's a market hotels rarely target... until now.",
      questionEs: "¿Puede Hotel-Living ayudarnos a atraer el mercado de mayores activos?",
      answerEs: "Absolutamente. Hotel-Living abre las puertas a un segmento masivo y creciente: jubilados independientes que quieren comodidad, servicios y vida social — sin entrar en una residencia geriátrica. Es un mercado que los hoteles raramente han objetivo... hasta ahora."
    },
    {
      question: "What makes this different from traditional hospitality?",
      answer: "It's hospitality with purpose. It's not just a room — it's a lifestyle. And that emotional connection leads to long-term loyalty, word-of-mouth referrals, and a whole new identity for your hotel.",
      questionEs: "¿Qué hace que esto sea tan diferente de la hostelería tradicional?",
      answerEs: "Es hostelería con propósito. No solo ofrece una habitación — ofrece un estilo de vida. Y esa conexión emocional crea lealtad a largo plazo, recomendaciones boca a boca y una identidad completamente nueva para su hotel."
    },
    {
      question: "So can long stays really offer retirees a unique lifestyle upgrade?",
      answer: "Exactly — and that's the beauty of it. You offer a premium experience at a fraction of the cost of senior living, making it attractive for guests and still highly profitable for you.",
      questionEs: "Entonces, ¿muchos jubilados activos encontrarán en estas estancias largas una posibilidad única de mejorar su estilo de vida?",
      answerEs: "Correcto — y esa es la belleza del asunto. Usted ofrece una experiencia premium a una fracción del precio de una residencia geriátrica, haciéndola atractiva para los huéspedes y aún altamente rentable para usted."
    },
    {
      question: "Does this turn the hotel into a senior residence?",
      answer: "Not at all. We don't become care facilities — we simply offer a desirable lifestyle for active seniors who want freedom, comfort, and services — without the high costs or limitations of traditional senior housing. No medical staff, no special licenses. Just the same hotel, now serving guests who enjoy long stays and consistent service.",
      questionEs: "¿No convierte esto el hotel en una residencia de mayores?",
      answerEs: "En absoluto. No nos convertimos en centros de cuidados — simplemente ofrecemos un estilo de vida atractivo a mayores activos que quieren libertad, comodidad y servicios — sin los altos costes o limitaciones de las residencias geriátricas tradicionales. Sin personal médico, sin licencias especiales. Solo el mismo hotel, ahora sirviendo a huéspedes que aprecian estancias largas y servicios consistentes."
    }
  ],
  affinities: [
    {
      question: "What exactly are hotel affinities?",
      answer: "Affinities are specialized areas of interest that define the focus and community of a hotel. These can include activities (yoga, cooking, languages), lifestyles (digital nomad, wellness), or special interests (art, music, literature). Think of them as your hotel's personality and purpose — what makes it special beyond rooms and services.",
      questionEs: "¿Qué son exactamente las afinidades hoteleras?",
      answerEs: "Las afinidades son áreas de interés especializadas que definen el enfoque y la comunidad de un hotel. Pueden abarcar desde actividades (yoga, cocina, idiomas) hasta estilos de vida (nómada digital, bienestar) o intereses especiales (arte, música, literatura). Piense en ellas como la personalidad y el propósito del hotel — lo que lo hace especial más allá de las habitaciones y servicios."
    },
    {
      question: "How many affinities should my hotel offer?",
      answer: "Most successful properties start with one core affinity that aligns naturally with their location, facilities, or staff expertise. As the program grows, you may add 1–2 complementary affinities. Too many dilutes your identity and stretches your resources — while a focused approach creates stronger communities and clearer marketing.",
      questionEs: "¿Cuántas afinidades debería ofrecer mi hotel?",
      answerEs: "La mayoría de las propiedades exitosas comienzan con una afinidad principal que se alinee naturalmente con su ubicación, instalaciones o experiencia del personal. Conforme se desarrolle su programa, podría añadir 1-2 afinidades complementarias. Tener demasiadas diluye su identidad y estira los recursos, mientras que enfocarse en unas pocas crea una comunidad más fuerte y un mensaje de marketing más claro."
    },
    {
      question: "Which affinities are most popular with guests?",
      answer: "It varies by region and hotel type, but platform data shows strong performance in: Wellness, Culinary, Creative arts, Nature/outdoors, Digital nomad themes. The most successful affinity isn't necessarily the most globally popular — it's the one that best aligns with your property's authentic strengths and local setting.",
      questionEs: "¿Qué afinidades son más populares entre los huéspedes?",
      answerEs: "Aunque esto varía según la región y tipo de propiedad, nuestros datos de plataforma muestran un buen rendimiento para bienestar, culinario, artes creativas, naturaleza/aire libre, y afinidades de nómadas digitales. La afinidad más exitosa no es necesariamente la más popular globalmente, sino la que mejor coincide con las fortalezas auténticas de su propiedad y el entorno local."
    },
    {
      question: "What space requirements do affinities need?",
      answer: "Space needs vary by affinity, but most don't require major renovations. Multi-use areas that can be reconfigured are ideal. Essentials include: A dedicated community space (often part of an existing lounge), Reliable technology, Appropriate storage, Clear programming schedules. You can also partner with nearby restaurants, salons, or other businesses.",
      questionEs: "¿Qué requisitos de espacio físico necesitan las afinidades?",
      answerEs: "Las necesidades de espacio varían según el tipo de afinidad, pero la mayoría pueden implementarse sin renovaciones importantes. Las áreas multiuso que pueden reconfigurarse para diferentes actividades son ideales. Los elementos esenciales son un espacio comunitario dedicado (que podría ser parte de un salón existente), tecnología confiable, almacenamiento apropiado y programación clara para maximizar el uso del espacio. Por supuesto, siempre es una opción colaborar con restaurantes, salones o cualquier otro negocio relacionado."
    },
    {
      question: "Can affinities change seasonally?",
      answer: "Yes, seasonal variation works well — especially for properties in locations with distinct seasons. For example, a mountain property may focus on hiking in summer and shift to wellness or creative arts in winter. The key is maintaining a sense of community while rotating specific activities.",
      questionEs: "¿Pueden las afinidades cambiar estacionalmente?",
      answerEs: "Sí, la variación estacional funciona bien para muchas propiedades, especialmente aquellas en destinos con estaciones distintas. Por ejemplo, una propiedad de montaña podría enfatizar senderismo y actividades al aire libre en verano, luego cambiar a bienestar y artes creativas en invierno. La clave es mantener cierta continuidad en el sentimiento comunitario mientras se adaptan actividades específicas."
    },
    {
      question: "What if regular guests don't want to participate?",
      answer: "Participation is always optional. While affinities create a thematic atmosphere, guests are free to join as much or as little as they wish. Many hotels offer a mix of scheduled activities and always-available resources so guests can tailor their experience.",
      questionEs: "¿Qué pasa si algunos huéspedes regulares no quieren participar?",
      answerEs: "La participación siempre es opcional. Aunque la afinidad crea un ambiente temático, los huéspedes son libres de participar tanto o tan poco como deseen. Muchos hoteles proporcionan una mezcla de actividades programadas y recursos siempre disponibles, permitiendo a los huéspedes personalizar su nivel de participación."
    },
    {
      question: "Why should our hotel consider offering affinity-based stays?",
      answer: "Because shared interests and passions create powerful guest connections. When people stay with others who share their tastes, their experience becomes deeper, warmer, and more memorable. It's not just a room — it's a shared environment.",
      questionEs: "¿Por qué debería nuestro hotel considerar ofrecer estancias basadas en afinidades?",
      answerEs: "Porque las afinidades — intereses y pasiones compartidas — crean conexiones poderosas entre huéspedes. Cuando las personas se alojan con otras que comparten sus gustos, su experiencia se vuelve más profunda, cálida y memorable. No es solo una habitación — es un ambiente compartido."
    },
    {
      question: "How does this benefit us financially?",
      answer: "Guests who feel a strong sense of belonging often extend their stays and spend more. They dine together, book extra services, and frequently return. Social interaction boosts satisfaction — and satisfaction boosts revenue.",
      questionEs: "¿Cómo nos beneficia financieramente?",
      answerEs: "Los huéspedes que sienten un fuerte sentido de pertenencia a menudo extienden sus estancias y gastan más. Cenan juntos, reservan servicios extra y a menudo regresan. La interacción social impulsa la satisfacción — y la satisfacción impulsa los ingresos."
    },
    {
      question: "Can we choose which affinities to promote?",
      answer: "Absolutely. You can attract your ideal guests — whether they're food lovers, music fans, language learners, or creative minds. Especially in smaller hotels, owners can build communities around their own passions and turn their space into something truly personal and powerful.",
      questionEs: "¿Podemos elegir qué afinidades promover?",
      answerEs: "Absolutamente. Puede atraer a sus huéspedes ideales — ya sean amantes de la comida, fanáticos de la música, estudiantes de idiomas o almas creativas. Especialmente en hoteles más pequeños, los propietarios pueden construir comunidades alrededor de sus propias pasiones y convertir su espacio en algo verdaderamente personal y poderoso."
    },
    {
      question: "Isn't this too niche or restrictive?",
      answer: "Not at all. There's a massive range of interests, and many guests are looking for connection. Plus, it's flexible: you can rotate themes, test new ones, or run multiple at once. There's no single formula — you shape your own identity.",
      questionEs: "¿No es esto demasiado específico o limitante?",
      answerEs: "En absoluto. Hay una variedad masiva de intereses y muchos huéspedes buscando conexión. Además, es flexible: puede rotar temas, probar nuevos, o ejecutar múltiples a la vez. No hay una solución única — usted forma su propia identidad."
    },
    {
      question: "What's the broader vision behind affinities?",
      answer: "Affinities allow hotels to play a new social role — not just hosting travelers, but creating micro-communities. It's a way to reorganize hospitality — even society — around shared meaning. In a world full of isolation, that's a rare and valuable gift.",
      questionEs: "¿Cuál es la visión más amplia detrás de las afinidades?",
      answerEs: "Las afinidades permiten a los hoteles jugar un nuevo papel social: no solo hospedar viajeros, sino crear micro-comunidades. Es una forma de reorganizar la hostelería — e incluso la sociedad — alrededor del significado compartido. En un mundo lleno de aislamiento, eso es un regalo raro y valioso."
    },
    {
      question: "Does this really help fill rooms?",
      answer: "Yes. People are more likely to stay longer when they find something meaningful. Instead of a quick trip, they may join a 16- or 32-day stay — not just for the location, but for the people they'll meet.",
      questionEs: "¿Realmente ayuda a llenar habitaciones?",
      answerEs: "Sí. Las personas son más propensas a quedarse más tiempo cuando encuentran algo significativo. En lugar de solo un viaje corto, podrían unirse a una estancia de 16 o 32 días — no solo por el lugar, sino por las personas que conocerán."
    }
  ],
  operation: [
    {
      question: "How do we manage cleaning for long-stay guests?",
      answer: "Most properties adjust their cleaning schedules for extended stays, offering full service 1–2 times per week with simplified daily touch-ups (towel changes, trash removal). This balanced approach keeps things clean, reduces costs, and respects guest privacy. Our operational manual includes detailed guidance for efficient cleaning protocols by stay duration.",
      questionEs: "¿Cómo gestionamos la limpieza para huéspedes de larga estancia?",
      answerEs: "La mayoría de las propiedades adaptan su horario de limpieza para estancias prolongadas, ofreciendo servicio completo 1-2 veces por semana con retoques diarios simplificados (cambio de toallas, retirada de basura). Este enfoque equilibrado mantiene la limpieza mientras reduce costes y respeta la privacidad del huésped. Nuestro manual operativo proporciona orientación detallada sobre la creación de protocolos de limpieza eficientes para diferentes duraciones de estancia."
    },
    {
      question: "Do we need to change our check-in/check-out procedures?",
      answer: "While the basic process remains the same, we recommend offering a more complete orientation for long-stay guests, including property tours, staff introductions, and a clear explanation of amenities and activities.",
      questionEs: "¿Necesitamos cambiar nuestros procedimientos de entrada/salida?",
      answerEs: "Aunque el proceso básico permanece igual, recomendamos crear una orientación más completa para huéspedes de estancia prolongada, incluyendo tours de la propiedad, presentación al personal y explicación de amenidades y actividades."
    },
    {
      question: "What about laundry services for long-stay guests?",
      answer: "Options vary depending on the property: Some hotels include weekly laundry in the rate, Others offer self-service facilities, Some provide paid laundry services. The key is to have clear, consistent policies that meet guest needs while remaining operationally efficient. You can also partner with an external laundry service or recommend a trusted provider to your guests.",
      questionEs: "¿Qué pasa con los servicios de lavandería para huéspedes de larga estancia?",
      answerEs: "Las opciones varían según el tipo de propiedad. Algunos hoteles ofrecen servicio de lavandería semanal incluido en la tarifa, otros proporcionan instalaciones de autoservicio, y algunos ofrecen servicio de lavandería de pago. La clave es crear políticas claras y consistentes que satisfagan las necesidades del huésped mientras permanecen operativamente eficientes. Como opción final, siempre es posible asociarse con un servicio de lavandería externo — o simplemente recomendar un proveedor de confianza a sus huéspedes."
    },
    {
      question: "How do we manage meals for long-stay guests?",
      answer: "Most hotels offer flexible meal plans that guests can customize by preference and stay duration. Common options include breakfast-only, half-board (breakfast and dinner), or meal credit systems. Properties without restaurants often partner with local delivery services or offer kitchenettes for self-catering.",
      questionEs: "¿Cómo gestionamos las comidas para huéspedes de estancia prolongada?",
      answerEs: "La mayoría de los hoteles ofrecen planes de comidas flexibles que los huéspedes pueden personalizar según sus preferencias y duración de estancia. Las opciones populares incluyen planes solo de desayuno, media pensión (desayuno y cena), y sistemas de créditos de comida. Las propiedades sin restaurantes a menudo crean asociaciones con servicios de entrega locales o proporcionan kitchenettes para autoservicio."
    },
    {
      question: "What adjustments does our staff need to make?",
      answer: "The main shift is building deeper relationships with guests and understanding the different service rhythm of long stays: Front desk becomes a community facilitator, Housekeeping learns personal room preferences, Management focuses on creating a residential feeling. We provide full staff training modules to guide this transition.",
      questionEs: "¿Qué adaptaciones necesita hacer nuestro personal?",
      answerEs: "El ajuste principal es construir relaciones más profundas con los huéspedes y entender los diferentes ritmos de servicio de las estancias largas. El personal de recepción se convierte en facilitadores de comunidad, el personal de limpieza desarrolla preferencias personalizadas de habitación, y la gerencia se enfoca en crear un sentimiento residencial. Proporcionamos módulos de entrenamiento integral del personal para esta transición."
    },
    {
      question: "How do we handle room maintenance during long stays?",
      answer: "Preventive maintenance becomes even more important. We recommend mid-stay maintenance checks (with guest permission) and clear communication about any needed work. Many properties also schedule short maintenance blocks between long stays for deep cleaning and repairs.",
      questionEs: "¿Cómo gestionamos el mantenimiento de habitaciones durante estancias prolongadas?",
      answerEs: "El mantenimiento preventivo se vuelve aún más importante con huéspedes de larga estancia. Recomendamos controles de mantenimiento programados a mitad de estancia (con permiso del huésped) y comunicación transparente sobre cualquier trabajo requerido. Muchas propiedades bloquean ventanas cortas de mantenimiento entre estancias prolongadas para limpieza profunda y reparaciones."
    },
    {
      question: "What internet and tech requirements do long-stay guests have?",
      answer: "Reliable, high-speed internet is essential — many guests work remotely or stream content frequently. We recommend: Dedicated bandwidth management, Multiple access points for consistent coverage, Basic tech support options. Some properties also offer enhanced workspaces with business amenities.",
      questionEs: "¿Qué requisitos de internet y tecnología tienen los huéspedes de larga estancia?",
      answerEs: "Internet confiable y de alta velocidad es esencial, ya que muchos huéspedes de estancia prolongada trabajan remotamente o usan servicios de streaming extensivamente. Recomendamos gestión de ancho de banda dedicada, múltiples puntos de acceso para cobertura consistente, y opciones básicas de soporte técnico. Algunas propiedades también ofrecen espacios de trabajo mejorados con amenidades de negocio."
    },
    {
      question: "How do we balance privacy and community for these guests?",
      answer: "Successful properties define clear boundaries between private spaces (guest rooms) and community areas (lounges, dining spaces). A mix of structured activities and spontaneous gathering spaces allows guests to choose their level of engagement. Staff training emphasizes how to read and respect individual social preferences.",
      questionEs: "¿Cómo equilibramos la privacidad con la comunidad para estos huéspedes?",
      answerEs: "Las propiedades exitosas crean delimitaciones claras entre espacios privados (habitaciones de huéspedes) y áreas comunitarias (salones, espacios de comedor). Ofrecer una mezcla de actividades estructuradas y oportunidades de reunión espontáneas permite a los huéspedes controlar su nivel de participación. El entrenamiento del personal enfatiza reconocer y respetar las preferencias sociales individuales de los huéspedes."
    },
    {
      question: "Are there special safety considerations for long stays?",
      answer: "Yes. Long-stay guests may accumulate more belongings and care more about room security. Consider: Enhanced in-room safes, Secure storage for valuables, Clear policies for room access during housekeeping. Many properties also implement extra identity verification during the booking process for long stays.",
      questionEs: "¿Qué consideraciones especiales de seguridad hay para estancias largas?",
      answerEs: "Los huéspedes de estancia prolongada a menudo acumulan más posesiones durante su estancia y pueden estar más preocupados por la seguridad de la habitación. Considere cajas fuertes mejoradas en habitación, opciones de almacenamiento seguro para objetos de valor, y políticas claras sobre acceso a habitaciones durante la limpieza. Muchas propiedades también implementan pasos de verificación adicionales durante el proceso de reserva para estancias prolongadas."
    }
  ],
  integration: [
    {
      question: "What is the reservation confirmation process like?",
      answer: "When a guest books through Hotel-Living, you receive instant email notification. For standard reservations, confirmation is automatic. All guest communication occurs via our messaging system until check-in.",
      questionEs: "¿Cómo es el proceso de confirmación de reservas?",
      answerEs: "Cuando un huésped reserva a través de Hotel-Living, usted recibe una notificación instantánea por correo electrónico. Para reservas estándar, la confirmación es automática. Toda la comunicación con huéspedes ocurre a través de nuestro sistema de mensajería hasta el check-in."
    },
    {
      question: "How are payments handled for long stays?",
      answer: "Guests pay their remaining balance directly to the hotel upon check-in, following your standard payment procedures. This gives properties immediate access to funds without third-party delays.",
      questionEs: "¿Cómo se procesan los pagos para estas estancias prolongadas?",
      answerEs: "Los huéspedes pagan su saldo restante directamente al hotel en el check-in, siguiendo procedimientos de pago estándar. Esto le da a las propiedades acceso inmediato a los fondos sin esperar el procesamiento de terceros."
    },
    {
      question: "How do we manage special requests from long-stay guests?",
      answer: "Create a clear system to track and fulfill guest requests — through your existing processes or via our platform's messaging system. Many properties assign specific staff as long-stay guest liaisons.",
      questionEs: "¿Cómo manejamos solicitudes especiales de huéspedes de larga estancia?",
      answerEs: "Cree un sistema claro para rastrear y cumplir solicitudes de huéspedes, ya sea a través de sus procesos existentes o el sistema de mensajería de nuestra plataforma. Muchas propiedades designan miembros específicos del personal como enlaces de huéspedes de larga estancia."
    },
    {
      question: "Can we continue using our existing booking channels?",
      answer: "Absolutely. Hotel-Living complements your current distribution strategy. You retain full control over inventory allocation, allowing you to balance traditional bookings and long stays based on your occupancy patterns and business needs.",
      questionEs: "¿Podemos seguir usando nuestros canales de reserva existentes?",
      answerEs: "Absolutamente. Hotel-Living trabaja junto a su estrategia de distribución existente. Usted mantiene control total sobre la asignación de inventario, permitiéndole equilibrar reservas tradicionales con estancias prolongadas según sus patrones de ocupación y necesidades de negocio."
    },
    {
      question: "How are reservations confirmed?",
      answer: "When a guest books through Hotel-Living, they receive instant confirmation. You get immediate notification by email. All communication is managed through our internal messaging system until check-in.",
      questionEs: "¿Cómo es el proceso de confirmación de reservas?",
      answerEs: "Cuando un huésped reserva a través de Hotel-Living, usted recibe una notificación instantánea por correo electrónico. Para reservas estándar, la confirmación es automática. Toda la comunicación con huéspedes ocurre a través de nuestro sistema de mensajería hasta el check-in."
    },
    {
      question: "How are payments processed for these bookings?",
      answer: "Guests pay a 10% deposit at the time of booking, with the remaining 90% paid directly to the hotel upon arrival. This reduces payment processing fees for hotels and minimizes cancellation risks.",
      questionEs: "¿Cómo se procesan los pagos para estas reservas?",
      answerEs: "Los huéspedes pagan un depósito del 10% al reservar, con el saldo debido directamente al hotel en el check-in. Este modelo reduce las tarifas de procesamiento de pagos para hoteles y minimiza los riesgos de cancelación."
    },
    {
      question: "How do we manage special guest requests for long stays?",
      answer: "All special requests are communicated through our messaging system, providing a documented record. Our pre-arrival questionnaire helps identify common needs ahead of check-in.",
      questionEs: "¿Cómo manejamos solicitudes especiales de huéspedes de larga estancia?",
      answerEs: "Todas las solicitudes especiales se comunican a través del sistema de mensajería de nuestra plataforma, creando un registro documentado. Nuestro cuestionario previo a la llegada ayuda a identificar necesidades comunes antes del check-in."
    },
    {
      question: "What kind of reports do we receive for Hotel-Living bookings?",
      answer: "Our analytics dashboard provides detailed reports on: Booking patterns, Guest demographics, Revenue metrics, Affinity program participation. You can compare channel performance, track review sentiment, and monitor repeat booking rates. Custom reports can also be scheduled for automatic delivery to key stakeholders.",
      questionEs: "¿Qué tipo de informes recibimos para las reservas de Hotel-Living?",
      answerEs: "Nuestro panel de análisis integral proporciona informes detallados sobre patrones de reserva, demografía de huéspedes, métricas de ingresos y participación en programas de afinidades. Puede comparar el rendimiento entre canales, monitorear el sentimiento de reseñas y rastrear tasas de reservas repetidas. Los informes personalizados pueden programarse para entrega automática a las partes interesadas clave."
    }
  ],
  marketing: [
    {
      question: "How does Hotel-Living promote my property?",
      answer: "We promote partner properties through multiple channels: Our global platform, Digital campaigns targeting affinity communities, Partnerships with interest-based organizations, Content marketing and social media. Your property is exposed to audiences specifically looking for the affinities you offer.",
      questionEs: "¿Cómo comercializa Hotel-Living mi propiedad?",
      answerEs: "Comercializamos las propiedades asociadas a través de múltiples canales: nuestra plataforma global, campañas digitales dirigidas a comunidades de afinidades, asociaciones con organizaciones basadas en intereses, marketing de contenidos y redes sociales. Su propiedad gana exposición a audiencias específicamente interesadas en las afinidades que ofrece."
    },
    {
      question: "Can I use the Hotel-Living partnership in my own marketing?",
      answer: "Absolutely! We encourage partners to highlight their affiliation with Hotel-Living in their own marketing materials. We provide brand assets, content templates, and marketing guidelines to help you leverage the partnership effectively.",
      questionEs: "¿Puedo usar la asociación Hotel-Living en mi propio marketing?",
      answerEs: "¡Absolutamente! Alentamos a los socios a destacar su afiliación con Hotel-Living en sus propios materiales de marketing. Proporcionamos activos de marca, plantillas de contenido y pautas de marketing para ayudarle a aprovechar la asociación de manera efectiva."
    },
    {
      question: "How do affinities support targeted marketing?",
      answer: "Affinities allow for precision marketing that traditional hotels can't match. Instead of reaching general travelers, we connect you directly with communities actively seeking the exact experiences your property offers. This targeted approach results in higher conversion rates and lower customer acquisition costs.",
      questionEs: "¿Cómo ayudan las afinidades con el marketing dirigido?",
      answerEs: "Las afinidades permiten un marketing de precisión que los hoteles tradicionales no pueden igualar. En lugar de comercializar a viajeros generales, lo conectamos directamente con comunidades e individuos que buscan activamente las experiencias exactas que su propiedad ofrece. Este enfoque dirigido resulta en tasas de conversión más altas y costos de adquisición de clientes más bajos."
    }
  ],
  payment: [
    {
      question: "How are bookings confirmed and processed?",
      answer: "When a guest books through Hotel-Living, they pay a 10% deposit to secure the reservation. The hotel receives an immediate notification and the reservation is confirmed in your system. The remaining 90% is paid directly to the hotel upon arrival. From the deposit, you receive 2%–3% along with the booking notice.",
      questionEs: "¿Cómo se confirman y procesan las reservas?",
      answerEs: "Cuando un huésped reserva a través de Hotel-Living, paga un depósito del 10% para asegurar la reserva. El hotel recibe notificación inmediata y la reserva se confirma en su sistema. El 90% restante es pagado por el huésped directamente al hotel a la llegada, eliminando tiempos de espera para el procesamiento de pagos. Del depósito del 10% pagado por el cliente durante el proceso de reserva, usted recibirá un 2%-3% junto con la comunicación de reserva."
    },
    {
      question: "What payment methods can guests use?",
      answer: "Guests can pay the initial deposit using all major credit cards, PayPal, or bank transfer. For the remaining balance paid directly to the hotel, properties set their own accepted payment methods — though we recommend offering several options to accommodate international guests.",
      questionEs: "¿Qué métodos de pago pueden usar los huéspedes?",
      answerEs: "Los huéspedes pueden pagar su depósito inicial usando todas las principales tarjetas de crédito, PayPal o transferencia bancaria. Para el saldo restante pagado directamente a los hoteles, las propiedades establecen sus propios métodos de pago aceptados, aunque recomendamos ofrecer múltiples opciones para acomodar huéspedes internacionales."
    },
    {
      question: "Are there any additional fees beyond the commission?",
      answer: "No. Unlike many booking platforms, we don't charge listing fees, photography fees, onboarding costs, or marketing fees. Commission is our only charge — making the partnership risk-free and directly tied to successful bookings.",
      questionEs: "¿Hay tarifas adicionales más allá de la comisión?",
      answerEs: "No. A diferencia de muchas plataformas de reservas, no cobramos tarifas de listado, tarifas de fotógrafo, costos de incorporación o tarifas de marketing. La comisión es nuestro único cargo, haciendo la asociación libre de riesgo y directamente vinculada a reservas exitosas."
    }
  ]
};
