
export interface Hotel {
  id: string;
  name: string;
  stars: number;
  country: Country;
  city: string;
  pricePerMonth: number;
  description: string;
  longDescription: string;
  themes: Theme[];
  amenities: string[];
  images: string[];
  availableMonths: Month[];
}

export type Country = 'Spain' | 'Italy' | 'Egypt' | 'United States';

export type Month = 
  | 'January' | 'February' | 'March' | 'April' 
  | 'May' | 'June' | 'July' | 'August' 
  | 'September' | 'October' | 'November' | 'December';

export interface ThemeCategory {
  category: string;
  themes: Theme[];
}

export interface Theme {
  id: string;
  name: string;
  category: string;
}

// Theme categories and themes
export const themeCategories: ThemeCategory[] = [
  {
    category: 'Languages',
    themes: [
      { id: 'lang-learning', name: 'Languages Learning', category: 'Languages' },
      { id: 'lang-practice', name: 'Languages Practicing', category: 'Languages' },
      { id: 'lang-immersion', name: 'Language Immersion', category: 'Languages' },
    ]
  },
  {
    category: 'Culinary',
    themes: [
      { id: 'cooking-globe', name: 'Cooking Around the Globe', category: 'Culinary' },
      { id: 'intl-cooking', name: 'International Cooking Classes', category: 'Culinary' },
      { id: 'wine-tasting', name: 'Wine Tasting', category: 'Culinary' },
      { id: 'farm-to-table', name: 'Farm to Table', category: 'Culinary' },
    ]
  },
  {
    category: 'Arts & Crafts',
    themes: [
      { id: 'painting', name: 'Painting', category: 'Arts & Crafts' },
      { id: 'sculpture', name: 'Sculpture', category: 'Arts & Crafts' },
      { id: 'pottery', name: 'Pottery', category: 'Arts & Crafts' },
      { id: 'digital-art', name: 'Digital Art', category: 'Arts & Crafts' },
    ]
  },
  {
    category: 'Sports & Fitness',
    themes: [
      { id: 'yoga', name: 'Yoga Retreat', category: 'Sports & Fitness' },
      { id: 'surf', name: 'Surfing', category: 'Sports & Fitness' },
      { id: 'hiking', name: 'Hiking Adventures', category: 'Sports & Fitness' },
      { id: 'golf', name: 'Golf Mastery', category: 'Sports & Fitness' },
    ]
  },
  {
    category: 'Technology',
    themes: [
      { id: 'coding', name: 'Coding Bootcamp', category: 'Technology' },
      { id: 'robotics', name: 'Robotics Workshop', category: 'Technology' },
      { id: 'ai-learning', name: 'AI & Machine Learning', category: 'Technology' },
      { id: 'game-dev', name: 'Game Development', category: 'Technology' },
    ]
  },
  {
    category: 'Wellness',
    themes: [
      { id: 'meditation', name: 'Meditation', category: 'Wellness' },
      { id: 'spa', name: 'Spa & Wellness', category: 'Wellness' },
      { id: 'detox', name: 'Detox Programs', category: 'Wellness' },
      { id: 'mindfulness', name: 'Mindfulness', category: 'Wellness' },
    ]
  },
  {
    category: 'Games',
    themes: [
      { id: 'chess', name: 'Chess', category: 'Games' },
      { id: 'cards', name: 'Card Games', category: 'Games' },
      { id: 'board-games', name: 'Board Games', category: 'Games' },
      { id: 'strategy-games', name: 'Strategy Games', category: 'Games' },
    ]
  },
  {
    category: 'Music',
    themes: [
      { id: 'piano', name: 'Piano Learning', category: 'Music' },
      { id: 'guitar', name: 'Guitar Mastery', category: 'Music' },
      { id: 'music-production', name: 'Music Production', category: 'Music' },
      { id: 'voice-training', name: 'Voice Training', category: 'Music' },
    ]
  }
];

// Flatten all themes for easy access
export const allThemes: Theme[] = themeCategories.flatMap(category => category.themes);

// Sample hotels data
export const hotels: Hotel[] = [
  // Spain Hotels
  {
    id: 'parador-granada',
    name: 'Parador de Granada',
    stars: 5,
    country: 'Spain',
    city: 'Granada',
    pricePerMonth: 2200,
    description: 'Luxury hotel with Spanish language immersion and Andalusian cooking programs.',
    longDescription: 'Located within the Alhambra complex, this prestigious hotel offers an unparalleled opportunity to immerse yourself in Spanish culture. The hotel features daily language classes with native speakers, complemented by Andalusian cooking workshops that guide you through traditional recipes using local ingredients. The stunning Moorish architecture and gardens provide an inspiring backdrop for cultural enthusiasts.',
    themes: [
      allThemes.find(t => t.id === 'lang-practice')!,
      allThemes.find(t => t.id === 'lang-immersion')!,
      allThemes.find(t => t.id === 'intl-cooking')!,
    ],
    amenities: ['Spa', 'Swimming Pool', 'Language Lab', 'Cooking Studio', 'Library', 'Garden Tours'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    availableMonths: ['March', 'April', 'May', 'June', 'September', 'October']
  },
  {
    id: 'tech-hub-barcelona',
    name: 'TechHub Barcelona',
    stars: 4,
    country: 'Spain',
    city: 'Barcelona',
    pricePerMonth: 1800,
    description: 'Modern hotel focused on technology learning and digital nomad lifestyle.',
    longDescription: 'TechHub Barcelona is a cutting-edge accommodation designed for the tech-savvy traveler. This hotel combines comfortable living with state-of-the-art facilities for coding, robotics, and AI learning. Daily workshops and networking events connect you with local tech professionals and fellow enthusiasts. Located in Barcelona\'s innovation district, it offers easy access to tech companies and startups.',
    themes: [
      allThemes.find(t => t.id === 'coding')!,
      allThemes.find(t => t.id === 'robotics')!,
      allThemes.find(t => t.id === 'ai-learning')!,
      allThemes.find(t => t.id === 'game-dev')!,
    ],
    amenities: ['High-speed Internet', 'Co-working Spaces', 'Tech Lab', '3D Printing Studio', 'Gaming Room', 'Rooftop Networking Area'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    availableMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  },
  
  // Italy Hotels
  {
    id: 'villa-toscana',
    name: 'Villa Toscana',
    stars: 5,
    country: 'Italy',
    city: 'Florence',
    pricePerMonth: 2500,
    description: 'Renaissance inspired hotel with art studios and Italian cooking classes.',
    longDescription: 'Nestled in the picturesque Tuscan hills outside Florence, Villa Toscana is a 16th-century estate converted into a luxury hotel. The property features dedicated art studios for painting and sculpture, overseen by local artists. The culinary program includes hands-on cooking classes in a professional kitchen, wine tasting tours of nearby vineyards, and farm-to-table experiences using produce from the villa\'s organic garden.',
    themes: [
      allThemes.find(t => t.id === 'painting')!,
      allThemes.find(t => t.id === 'sculpture')!,
      allThemes.find(t => t.id === 'intl-cooking')!,
      allThemes.find(t => t.id === 'wine-tasting')!,
    ],
    amenities: ['Art Studios', 'Professional Kitchen', 'Wine Cellar', 'Organic Garden', 'Swimming Pool', 'Vineyard Tours'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    availableMonths: ['April', 'May', 'June', 'July', 'August', 'September', 'October']
  },
  {
    id: 'melodia-milano',
    name: 'Melodia Milano',
    stars: 4,
    country: 'Italy',
    city: 'Milan',
    pricePerMonth: 1900,
    description: 'Music-themed hotel with sound studios and instrument lessons.',
    longDescription: 'In the heart of Milan\'s design district, Melodia Milano offers a unique stay centered around music. The hotel houses professional sound studios, practice rooms, and a collection of instruments available for guests. Daily lessons in piano, guitar, and voice training are provided by accomplished musicians. The hotel\'s location allows easy access to Milan\'s famous opera house and numerous music venues.',
    themes: [
      allThemes.find(t => t.id === 'piano')!,
      allThemes.find(t => t.id === 'guitar')!,
      allThemes.find(t => t.id === 'music-production')!,
      allThemes.find(t => t.id === 'voice-training')!,
    ],
    amenities: ['Sound Studios', 'Instrument Collection', 'Practice Rooms', 'Music Library', 'Concert Hall', 'Recording Facilities'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    availableMonths: ['January', 'February', 'March', 'April', 'May', 'September', 'October', 'November', 'December']
  },
  
  // Egypt Hotels
  {
    id: 'nile-serenity',
    name: 'Nile Serenity',
    stars: 5,
    country: 'Egypt',
    city: 'Luxor',
    pricePerMonth: 1700,
    description: 'Riverside retreat focusing on meditation, yoga, and ancient Egyptian wellness.',
    longDescription: 'With panoramic views of the Nile River and the Valley of the Kings, Nile Serenity offers a peaceful retreat dedicated to wellness practices. Daily meditation and yoga sessions take place in serene gardens and riverside pavilions. The hotel\'s wellness center incorporates ancient Egyptian healing traditions with modern spa treatments. Cultural excursions to nearby temples provide historical context to the wellness practices.',
    themes: [
      allThemes.find(t => t.id === 'meditation')!,
      allThemes.find(t => t.id === 'yoga')!,
      allThemes.find(t => t.id === 'mindfulness')!,
      allThemes.find(t => t.id === 'spa')!,
    ],
    amenities: ['Meditation Gardens', 'Yoga Pavilion', 'Wellness Center', 'Nile-view Terraces', 'Egyptian Spa', 'Temple Excursions'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    availableMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April']
  },
  {
    id: 'cairo-strategic',
    name: 'Cairo Strategic',
    stars: 4,
    country: 'Egypt',
    city: 'Cairo',
    pricePerMonth: 1500,
    description: 'Game-themed hotel with dedicated spaces for chess, cards, and strategy games.',
    longDescription: 'Located in a quiet district of Cairo, this unique hotel is designed for games enthusiasts. The property features multiple dedicated game rooms for chess, cards, and various board games. Regular tournaments, strategy sessions, and guest lectures by games masters are part of the experience. The hotel\'s design incorporates game motifs throughout its architecture and décor.',
    themes: [
      allThemes.find(t => t.id === 'chess')!,
      allThemes.find(t => t.id === 'cards')!,
      allThemes.find(t => t.id === 'board-games')!,
      allThemes.find(t => t.id === 'strategy-games')!,
    ],
    amenities: ['Chess Room', 'Cards Salon', 'Board Game Library', 'Strategy Room', 'Tournament Hall', 'Games Shop'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    availableMonths: ['January', 'February', 'March', 'September', 'October', 'November', 'December']
  },
  
  // United States Hotels
  {
    id: 'pacific-surf',
    name: 'Pacific Surf',
    stars: 4,
    country: 'United States',
    city: 'San Diego',
    pricePerMonth: 2100,
    description: 'Beachfront hotel with surf lessons, hiking programs, and outdoor activities.',
    longDescription: 'Situated directly on the Pacific coast, this active lifestyle hotel offers comprehensive programs for surfing and other outdoor pursuits. Professional surf instructors provide daily lessons for all skill levels, while guided hiking excursions explore the beautiful California coastline. The hotel\'s fitness center and recovery spa complement the active experiences.',
    themes: [
      allThemes.find(t => t.id === 'surf')!,
      allThemes.find(t => t.id === 'hiking')!,
      allThemes.find(t => t.id === 'yoga')!,
      allThemes.find(t => t.id === 'detox')!,
    ],
    amenities: ['Surf Equipment', 'Beachfront Access', 'Hiking Gear', 'Fitness Center', 'Recovery Spa', 'Outdoor Yoga Deck'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    availableMonths: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October']
  },
  {
    id: 'vermont-culinary',
    name: 'Vermont Culinary',
    stars: 5,
    country: 'United States',
    city: 'Burlington',
    pricePerMonth: 2300,
    description: 'Farm-to-table focused hotel with cooking studios and agricultural experiences.',
    longDescription: 'Set on a working farm in rural Vermont, this culinary-focused hotel offers an immersive experience in sustainable food production and preparation. The property features professional cooking studios, an organic farm, and partnerships with local food producers. Daily cooking classes, farm activities, and seasonal harvest events provide a comprehensive understanding of the farm-to-table movement.',
    themes: [
      allThemes.find(t => t.id === 'cooking-globe')!,
      allThemes.find(t => t.id === 'intl-cooking')!,
      allThemes.find(t => t.id === 'farm-to-table')!,
      allThemes.find(t => t.id === 'lang-learning')!,
    ],
    amenities: ['Cooking Studios', 'Organic Farm', 'Greenhouse', 'Farmers Market Tours', 'Orchard', 'Dairy'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    availableMonths: ['May', 'June', 'July', 'August', 'September', 'October']
  }
];

// Available months
export const allMonths: Month[] = [
  'January', 'February', 'March', 'April', 
  'May', 'June', 'July', 'August', 
  'September', 'October', 'November', 'December'
];

// Price ranges
export const priceRanges = [
  { label: 'Up to $1000', value: 1000 },
  { label: 'Up to $1500', value: 1500 },
  { label: 'Up to $2000', value: 2000 },
  { label: 'Over $2000', value: 2001 },
];

// Available countries
export const countries: Country[] = ['Spain', 'Italy', 'Egypt', 'United States'];

// Duration options
export const durations = [8, 16, 24, 32];
