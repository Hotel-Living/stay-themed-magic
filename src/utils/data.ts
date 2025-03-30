
// Theme types
export interface Theme {
  id: string;
  name: string;
  category?: string;
}

// Defining theme categories with updated structure for global use
export const themeCategories = [
  {
    category: "FOODS & DRINKS",
    themes: [
      { id: "spanish-cuisine", name: "Spanish Cuisine", category: "FOODS & DRINKS" },
      { id: "castilian-cuisine", name: "Castilian Cuisine", category: "FOODS & DRINKS" },
      { id: "andalusian-cuisine", name: "Andalusian Cuisine", category: "FOODS & DRINKS" },
      { id: "basque-cuisine", name: "Basque Cuisine", category: "FOODS & DRINKS" },
      { id: "galician-cuisine", name: "Galician Cuisine", category: "FOODS & DRINKS" },
      { id: "catalonian-cuisine", name: "Catalonian Cuisine", category: "FOODS & DRINKS" },
      { id: "french-cuisine", name: "French Cuisine", category: "FOODS & DRINKS" },
      { id: "italian-cuisine", name: "Italian Cuisine", category: "FOODS & DRINKS" },
      { id: "toscana-cuisine", name: "Toscana Cuisine", category: "FOODS & DRINKS" },
      { id: "meat-learning", name: "Meat Cooking", category: "FOODS & DRINKS" },
      { id: "fish-learning", name: "Fish Cooking", category: "FOODS & DRINKS" },
      { id: "seafood-learning", name: "Seafood Cooking", category: "FOODS & DRINKS" },
      { id: "wine", name: "Wine", category: "FOODS & DRINKS" },
      { id: "beer", name: "Beer", category: "FOODS & DRINKS" },
      { id: "cocktails", name: "Cocktails", category: "FOODS & DRINKS" },
      { id: "spirits", name: "Spirits", category: "FOODS & DRINKS" }
    ]
  },
  {
    category: "SPORTS",
    themes: [
      { id: "golf", name: "Golf", category: "SPORTS" },
      { id: "tennis", name: "Tennis", category: "SPORTS" },
      { id: "swimming", name: "Swimming", category: "SPORTS" },
      { id: "diving", name: "Diving", category: "SPORTS" },
      { id: "yoga", name: "Yoga", category: "SPORTS" },
      { id: "fitness", name: "Fitness", category: "SPORTS" }
    ]
  },
  {
    category: "ART",
    themes: [
      { id: "painting", name: "Painting", category: "ART" },
      { id: "sculpture", name: "Sculpture", category: "ART" },
      { id: "photography", name: "Photography", category: "ART" },
      { id: "architecture", name: "Architecture", category: "ART" },
      { id: "design", name: "Design", category: "ART" }
    ]
  },
  {
    category: "CULTURE",
    themes: [
      { id: "history", name: "History", category: "CULTURE" },
      { id: "museums", name: "Museums", category: "CULTURE" },
      { id: "local-traditions", name: "Local Traditions", category: "CULTURE" },
      { id: "festivals", name: "Festivals", category: "CULTURE" }
    ]
  },
  {
    category: "MUSIC",
    themes: [
      { id: "rock", name: "Rock", category: "MUSIC" },
      { id: "opera", name: "Opera", category: "MUSIC" },
      { id: "symphonic", name: "Symphonic", category: "MUSIC" },
      { id: "classical", name: "Classical", category: "MUSIC" },
      { id: "pop", name: "Pop", category: "MUSIC" }
    ]
  },
  {
    category: "LANGUAGES",
    themes: [
      { id: "english-practice", name: "English Practice", category: "LANGUAGES" },
      { id: "spanish-practice", name: "Spanish Practice", category: "LANGUAGES" },
      { id: "french-practice", name: "French Practice", category: "LANGUAGES" },
      { id: "german-practice", name: "German Practice", category: "LANGUAGES" },
      { id: "chinese-practice", name: "Chinese Practice", category: "LANGUAGES" },
      { id: "japanese-practice", name: "Japanese Practice", category: "LANGUAGES" },
      { id: "english-learning", name: "English Learning", category: "LANGUAGES" },
      { id: "spanish-learning", name: "Spanish Learning", category: "LANGUAGES" },
      { id: "french-learning", name: "French Learning", category: "LANGUAGES" },
      { id: "german-learning", name: "German Learning", category: "LANGUAGES" },
      { id: "chinese-learning", name: "Chinese Learning", category: "LANGUAGES" },
      { id: "japanese-learning", name: "Japanese Learning", category: "LANGUAGES" }
    ]
  },
  {
    category: "DANCE",
    themes: [
      { id: "ballroom", name: "Ballroom", category: "DANCE" },
      { id: "latin", name: "Latin", category: "DANCE" },
      { id: "contemporary", name: "Contemporary", category: "DANCE" },
      { id: "traditional", name: "Traditional", category: "DANCE" }
    ]
  },
  {
    category: "TECHNOLOGY",
    themes: [
      { id: "digital", name: "Digital", category: "TECHNOLOGY" },
      { id: "innovation", name: "Innovation", category: "TECHNOLOGY" },
      { id: "smart-home", name: "Smart Home", category: "TECHNOLOGY" }
    ]
  },
  {
    category: "SCIENCES",
    themes: [
      { id: "astronomy", name: "Astronomy", category: "SCIENCES" },
      { id: "biology", name: "Biology", category: "SCIENCES" },
      { id: "physics", name: "Physics", category: "SCIENCES" },
      { id: "chemistry", name: "Chemistry", category: "SCIENCES" }
    ]
  },
  {
    category: "LITERATURE",
    themes: [
      { id: "poetry", name: "Poetry", category: "LITERATURE" },
      { id: "novels", name: "Novels", category: "LITERATURE" },
      { id: "short-stories", name: "Short Stories", category: "LITERATURE" },
      { id: "book-clubs", name: "Book Clubs", category: "LITERATURE" }
    ]
  },
  {
    category: "GAMES",
    themes: [
      { id: "board-games", name: "Board Games", category: "GAMES" },
      { id: "card-games", name: "Card Games", category: "GAMES" },
      { id: "chess", name: "Chess", category: "GAMES" },
      { id: "video-games", name: "Video Games", category: "GAMES" }
    ]
  }
];

// Create a flat list of all themes for easier access
export const allThemes = themeCategories.flatMap(category => category.themes);

// Mock country data
export const countries = [
  { id: "spain", name: "Spain", flag: "🇪🇸" },
  { id: "france", name: "France", flag: "🇫🇷" },
  { id: "italy", name: "Italy", flag: "🇮🇹" },
  { id: "usa", name: "USA", flag: "🇺🇸" },
  { id: "egypt", name: "Egypt", flag: "🇪🇬" },
  { id: "turkey", name: "Turkey", flag: "🇹🇷" }
];

// Mock hotel data for testing
export interface Hotel {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  description: string;
  mainImage: string;
  images: string[];
  pricePerMonth: number;
  rating: number;
  reviews: number;
  themes: Theme[];
  availableMonths: string[];
  features: string[];
  amenities: string[];
}

export const hotels: Hotel[] = [
  {
    id: "1",
    name: "Culinary Palace",
    country: "Spain",
    city: "Barcelona",
    address: "123 Gaudi Street",
    description: "Immerse yourself in Spanish culinary traditions with daily cooking classes and wine tastings. Our expert chefs will guide you through the art of paella, tapas, and regional specialties.",
    mainImage: "https://placehold.co/600x400/33021f/ffffff.webp?text=Spanish+Cuisine+Hotel",
    images: [
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+1",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+2",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+3"
    ],
    pricePerMonth: 1200,
    rating: 4.7,
    reviews: 128,
    themes: [
      { id: "spanish-cuisine", name: "Spanish Cuisine", category: "FOODS & DRINKS" },
      { id: "wine", name: "Wine", category: "FOODS & DRINKS" }
    ],
    availableMonths: ["January", "February", "March", "April", "May", "June"],
    features: ["Kitchen", "Pool", "WiFi", "Restaurant"],
    amenities: ["Cooking Classes", "Wine Cellar", "Guided Food Tours"]
  },
  {
    id: "2",
    name: "Language Retreat",
    country: "France",
    city: "Paris",
    address: "45 Champs-Élysées",
    description: "Learn French in the heart of Paris. Daily language classes, conversation practice with locals, and cultural immersion activities make this the perfect place to master a new language.",
    mainImage: "https://placehold.co/600x400/33021f/ffffff.webp?text=Language+Hotel",
    images: [
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+1",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+2",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+3"
    ],
    pricePerMonth: 1500,
    rating: 4.5,
    reviews: 92,
    themes: [
      { id: "french-learning", name: "French Learning", category: "LANGUAGES" }
    ],
    availableMonths: ["March", "April", "May", "June", "July", "August"],
    features: ["Library", "Study Rooms", "WiFi", "Café"],
    amenities: ["Language Classes", "Cultural Excursions", "Conversation Partners"]
  },
  {
    id: "3",
    name: "Digital Nomad Haven",
    country: "Italy",
    city: "Florence",
    address: "78 Renaissance Avenue",
    description: "A perfect blend of historic charm and modern technology. Work from our high-speed connected spaces while enjoying the inspiration of Renaissance art and architecture just outside your door.",
    mainImage: "https://placehold.co/600x400/33021f/ffffff.webp?text=Tech+Digital+Hotel",
    images: [
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+1",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+2",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+3"
    ],
    pricePerMonth: 1800,
    rating: 4.8,
    reviews: 154,
    themes: [
      { id: "digital", name: "Digital", category: "TECHNOLOGY" },
      { id: "innovation", name: "Innovation", category: "TECHNOLOGY" }
    ],
    availableMonths: ["January", "February", "September", "October", "November", "December"],
    features: ["Co-working Space", "High-speed Internet", "Meeting Rooms", "Tech Support"],
    amenities: ["Networking Events", "Tech Workshops", "Innovation Labs"]
  },
  {
    id: "4",
    name: "Yoga & Wellness Center",
    country: "USA",
    city: "San Diego",
    address: "500 Ocean Drive",
    description: "Rejuvenate your mind and body with our comprehensive wellness program. Daily yoga sessions, meditation, spa treatments, and healthy cuisine created by our nutritionist-guided chefs.",
    mainImage: "https://placehold.co/600x400/33021f/ffffff.webp?text=Yoga+Hotel",
    images: [
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+1",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+2",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+3"
    ],
    pricePerMonth: 2200,
    rating: 4.9,
    reviews: 201,
    themes: [
      { id: "yoga", name: "Yoga", category: "SPORTS" },
      { id: "fitness", name: "Fitness", category: "SPORTS" }
    ],
    availableMonths: ["April", "May", "June", "July", "August", "September"],
    features: ["Yoga Studio", "Fitness Center", "Spa", "Organic Restaurant"],
    amenities: ["Daily Classes", "Personal Trainers", "Nutrition Consultation"]
  }
];
