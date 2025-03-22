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

export type Country = 'Spain' | 'Italy' | 'Egypt' | 'United States' | 'Greece' | 'Dominican Republic';

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

export interface LocationCategory {
  country: Country;
  cities: string[];
}

export interface Activity {
  id: string;
  name: string;
}

export interface HotelFeature {
  id: string;
  name: string;
}

export interface RoomFeature {
  id: string;
  name: string;
}

export type PropertyType = 'Camping' | 'Hotel' | 'Hotel Boutique' | 'Resort';

export type PropertyStyle = 'Classic' | 'Classic Elegant' | 'Design' | 'Modern' | 'Rural' | 'Urban';

export type MealPlan = 
  | 'Breakfast' 
  | 'Half Board (Breakfast & Dinner)' 
  | 'Full Board' 
  | 'Room Only' 
  | 'All Inclusive' 
  | 'All Inclusive Plus (With Laundry)';

export const themeCategories: ThemeCategory[] = [
  {
    category: 'Arts',
    themes: [
      { id: 'architecture', name: 'Architecture', category: 'Arts' },
      { id: 'ballet', name: 'Ballet', category: 'Arts' },
      { id: 'sculpture', name: 'Sculpture', category: 'Arts' },
      { id: 'painting', name: 'Painting', category: 'Arts' },
    ]
  },
  {
    category: 'Dance',
    themes: [
      { id: 'salsa', name: 'Salsa', category: 'Dance' },
      { id: 'tango', name: 'Tango', category: 'Dance' },
    ]
  },
  {
    category: 'Sciences',
    themes: [
      { id: 'astronomy', name: 'Astronomy', category: 'Sciences' },
      { id: 'biology', name: 'Biology', category: 'Sciences' },
      { id: 'philology', name: 'Philology', category: 'Sciences' },
      { id: 'philosophy', name: 'Philosophy', category: 'Sciences' },
      { id: 'physics', name: 'Physics', category: 'Sciences' },
      { id: 'geology', name: 'Geology', category: 'Sciences' },
      { id: 'mathematics', name: 'Mathematics', category: 'Sciences' },
      { id: 'medicine', name: 'Medicine', category: 'Sciences' },
      { id: 'journalism', name: 'Journalism', category: 'Sciences' },
      { id: 'chemistry', name: 'Chemistry', category: 'Sciences' },
    ]
  },
  {
    category: 'Cinema',
    themes: [
      { id: 'cinema', name: 'Cinema', category: 'Cinema' },
    ]
  },
  {
    category: 'Collecting',
    themes: [
      { id: 'classic-cars', name: 'Classic Cars', category: 'Collecting' },
      { id: 'philately', name: 'Philately', category: 'Collecting' },
      { id: 'numismatics', name: 'Numismatics', category: 'Collecting' },
    ]
  },
  {
    category: 'Food',
    themes: [
      { id: 'german-food', name: 'German', category: 'Food' },
      { id: 'argentinian-food', name: 'Argentinian', category: 'Food' },
      { id: 'brazilian-food', name: 'Brazilian', category: 'Food' },
      { id: 'chinese-food', name: 'Chinese', category: 'Food' },
      { id: 'chocolate', name: 'Chocolate', category: 'Food' },
      { id: 'egyptian-food', name: 'Egyptian', category: 'Food' },
      { id: 'spanish-food', name: 'Spanish', category: 'Food' },
      { id: 'andalusian-food', name: 'Andalusian', category: 'Food' },
      { id: 'castilian-food', name: 'Castilian', category: 'Food' },
      { id: 'catalan-food', name: 'Catalan', category: 'Food' },
      { id: 'extremaduran-food', name: 'Extremaduran', category: 'Food' },
      { id: 'galician-food', name: 'Galician', category: 'Food' },
      { id: 'riojan-food', name: 'Riojan', category: 'Food' },
      { id: 'basque-food', name: 'Basque', category: 'Food' },
      { id: 'french-food', name: 'French', category: 'Food' },
      { id: 'hungarian-food', name: 'Hungarian', category: 'Food' },
      { id: 'italian-food', name: 'Italian', category: 'Food' },
      { id: 'seafood', name: 'Seafood', category: 'Food' },
      { id: 'moroccan-food', name: 'Moroccan', category: 'Food' },
      { id: 'portuguese-food', name: 'Portuguese', category: 'Food' },
      { id: 'pastry', name: 'Pastry', category: 'Food' },
      { id: 'romanian-food', name: 'Romanian', category: 'Food' },
      { id: 'russian-food', name: 'Russian', category: 'Food' },
    ]
  },
  {
    category: 'Culture',
    themes: [
      { id: 'gaudi', name: 'Gaudi', category: 'Culture' },
      { id: 'history', name: 'History', category: 'Culture' },
      { id: 'museums', name: 'Museums', category: 'Culture' },
    ]
  },
  {
    category: 'Cooking Courses',
    themes: [
      { id: 'andalusian-cooking', name: 'Andalusian', category: 'Cooking Courses' },
      { id: 'castilian-cooking', name: 'Castilian', category: 'Cooking Courses' },
      { id: 'catalan-cooking', name: 'Catalan', category: 'Cooking Courses' },
      { id: 'spanish-cooking', name: 'Spanish', category: 'Cooking Courses' },
      { id: 'extremaduran-cooking', name: 'Extremaduran', category: 'Cooking Courses' },
      { id: 'french-cooking', name: 'French', category: 'Cooking Courses' },
      { id: 'galician-cooking', name: 'Galician', category: 'Cooking Courses' },
      { id: 'italian-cooking', name: 'Italian', category: 'Cooking Courses' },
      { id: 'seafood-cooking', name: 'Seafood', category: 'Cooking Courses' },
      { id: 'moroccan-cooking', name: 'Moroccan', category: 'Cooking Courses' },
      { id: 'pastry-cooking', name: 'Pastry', category: 'Cooking Courses' },
      { id: 'romanian-cooking', name: 'Romanian', category: 'Cooking Courses' },
      { id: 'basque-cooking', name: 'Basque', category: 'Cooking Courses' },
    ]
  },
  {
    category: 'Sports',
    themes: [
      { id: 'water-sports', name: 'Water Sports', category: 'Sports' },
      { id: 'aerobics', name: 'Aerobics', category: 'Sports' },
      { id: 'cycling', name: 'Cycling', category: 'Sports' },
      { id: 'hunting', name: 'Hunting', category: 'Sports' },
      { id: 'skiing', name: 'Skiing', category: 'Sports' },
      { id: 'gymnastics', name: 'Gymnastics', category: 'Sports' },
      { id: 'mountaineering', name: 'Mountaineering', category: 'Sports' },
      { id: 'navigation', name: 'Navigation', category: 'Sports' },
      { id: 'fishing', name: 'Fishing', category: 'Sports' },
      { id: 'hiking', name: 'Hiking', category: 'Sports' },
      { id: 'snorkeling', name: 'Snorkeling', category: 'Sports' },
    ]
  },
  {
    category: 'Esotericism',
    themes: [
      { id: 'esotericism', name: 'Esotericism', category: 'Esotericism' },
    ]
  },
  {
    category: 'Finance & Investments',
    themes: [
      { id: 'finance', name: 'Finance & Investments', category: 'Finance & Investments' },
    ]
  },
  {
    category: 'Gadgets',
    themes: [
      { id: 'gadgets', name: 'Gadgets', category: 'Gadgets' },
    ]
  },
  {
    category: 'Languages',
    themes: [
      { id: 'german', name: 'German', category: 'Languages' },
      { id: 'chinese', name: 'Chinese', category: 'Languages' },
      { id: 'spanish', name: 'Spanish', category: 'Languages' },
      { id: 'french', name: 'French', category: 'Languages' },
      { id: 'english', name: 'English', category: 'Languages' },
      { id: 'italian', name: 'Italian', category: 'Languages' },
      { id: 'japanese', name: 'Japanese', category: 'Languages' },
    ]
  },
  {
    category: 'Inventions',
    themes: [
      { id: 'inventions', name: 'Inventions', category: 'Inventions' },
    ]
  },
  {
    category: 'Games',
    themes: [
      { id: 'chess', name: 'Chess', category: 'Games' },
      { id: 'cards', name: 'Cards', category: 'Games' },
    ]
  },
  {
    category: 'Literature',
    themes: [
      { id: 'books-reading', name: 'Books & Reading', category: 'Literature' },
      { id: 'novel', name: 'Novel', category: 'Literature' },
      { id: 'poetry', name: 'Poetry', category: 'Literature' },
      { id: 'prose', name: 'Prose', category: 'Literature' },
    ]
  },
  {
    category: 'Pets',
    themes: [
      { id: 'cats', name: 'Cats', category: 'Pets' },
      { id: 'dogs', name: 'Dogs', category: 'Pets' },
    ]
  },
  {
    category: 'Fashion',
    themes: [
      { id: 'fashion', name: 'Fashion', category: 'Fashion' },
    ]
  },
  {
    category: 'Mountain',
    themes: [
      { id: 'mountain', name: 'Mountain', category: 'Mountain' },
    ]
  },
  {
    category: 'Music',
    themes: [
      { id: 'classical-music', name: 'Classical', category: 'Music' },
      { id: 'mozart', name: 'Mozart', category: 'Music' },
      { id: 'opera', name: 'Opera', category: 'Music' },
      { id: 'pop-music', name: 'Pop', category: 'Music' },
      { id: 'rock-music', name: 'Rock', category: 'Music' },
      { id: 'salsa-music', name: 'Salsa', category: 'Music' },
    ]
  },
  {
    category: 'Beach',
    themes: [
      { id: 'beach', name: 'Beach', category: 'Beach' },
    ]
  },
  {
    category: 'Positive Mind',
    themes: [
      { id: 'positive-mind', name: 'Positive Mind', category: 'Positive Mind' },
    ]
  },
  {
    category: 'Personal Relationships',
    themes: [
      { id: 'dating', name: 'Dating', category: 'Personal Relationships' },
    ]
  },
  {
    category: 'Health',
    themes: [
      { id: 'health', name: 'Health', category: 'Health' },
    ]
  },
  {
    category: 'UFOs',
    themes: [
      { id: 'ufos', name: 'UFOs', category: 'UFOs' },
    ]
  },
  {
    category: 'Miscellaneous',
    themes: [
      { id: 'good-manners', name: 'Good Manners', category: 'Miscellaneous' },
    ]
  },
  {
    category: 'Travel',
    themes: [
      { id: 'travel', name: 'Travel', category: 'Travel' },
    ]
  }
];

export const allThemes: Theme[] = themeCategories.flatMap(category => category.themes);

export const locationCategories: LocationCategory[] = [
  {
    country: 'Egypt',
    cities: ['Hurghada', 'Sharm El Sheikh']
  },
  {
    country: 'Spain',
    cities: ['Almeria', 'Barcelona', 'Granada', 'Lugo', 'Madrid', 'Santander', 'Sevilla']
  },
  {
    country: 'Greece',
    cities: ['Creta']
  },
  {
    country: 'Italy',
    cities: ['Catania', 'Napoles', 'Roma']
  },
  {
    country: 'Dominican Republic',
    cities: ['Cabarete', 'Santo Domingo']
  },
  {
    country: 'United States',
    cities: ['San Diego', 'Burlington']
  }
];

export const countries: Country[] = locationCategories.map(location => location.country);

export const activities: Activity[] = [
  { id: 'dance', name: 'Dance' },
  { id: 'concerts', name: 'Concerts' },
  { id: 'competitions', name: 'Competitions' },
  { id: 'conferences', name: 'Conferences' },
  { id: 'courses', name: 'Courses' },
  { id: 'on-location', name: 'On Location' },
  { id: 'nearby-location', name: 'Nearby Location' },
  { id: 'board-games', name: 'Board Games' },
  { id: 'opera', name: 'Opera' },
  { id: 'beach', name: 'Beach' },
  { id: 'hiking', name: 'Hiking' },
  { id: 'nearby-spa', name: 'Nearby Spa' },
  { id: 'own-spa', name: 'Own Spa' }
];

export const hotelFeatures: HotelFeature[] = [
  { id: 'medical-service', name: '24/7 Medical Service' },
  { id: 'air-conditioning', name: 'Air Conditioning' },
  { id: 'parking', name: 'Parking' },
  { id: 'bathroom-amenities', name: 'Bathroom Amenities' },
  { id: 'balconies-with-views', name: 'Balconies With Views' },
  { id: 'bar', name: 'Bar' },
  { id: 'bathrobes', name: 'Bathrobes' },
  { id: 'library', name: 'Library' },
  { id: 'safe', name: 'Safe' },
  { id: 'wellness-center', name: 'Wellness Center' },
  { id: 'private-kitchen', name: 'Private Kitchen' },
  { id: 'room-equipment', name: 'Room Equipment' },
  { id: 'workspace', name: 'Workspace' },
  { id: 'coworking-space', name: 'Co-Working Space' },
  { id: 'gym', name: 'Gym' },
  { id: 'thematic-groups', name: 'Thematic Groups' },
  { id: 'luggage-storage', name: 'Luggage Storage' },
  { id: 'jacuzzi', name: 'Jacuzzi' },
  { id: 'coffee-kit', name: 'Coffee Kit' },
  { id: 'paid-laundry', name: 'Paid Laundry' },
  { id: 'included-laundry', name: 'Included Laundry' },
  { id: 'massages', name: 'Massages' }
];

export const roomFeatures: RoomFeature[] = [
  { id: 'pets-allowed', name: 'Pets Allowed' },
  { id: 'minibar', name: 'Minibar' },
  { id: 'live-music', name: 'Live Music' },
  { id: 'computer-available', name: 'Computer Available' },
  { id: 'indoor-pool', name: 'Indoor Pool' },
  { id: '24h-reception', name: '24h Reception' },
  { id: 'restaurant', name: 'Restaurant' },
  { id: 'conference-room', name: 'Conference Room' },
  { id: 'sauna', name: 'Sauna' },
  { id: 'hairdryer', name: 'Hairdryer' },
  { id: '24h-security', name: '24/7 Security' },
  { id: 'room-service', name: 'Room Service' },
  { id: 'hotel-services', name: 'Hotel Services' },
  { id: 'spa', name: 'Spa' },
  { id: 'nearby-spa', name: 'Nearby Spa' },
  { id: 'outdoor-terrace', name: 'Outdoor Terrace' },
  { id: 'tours-excursions', name: 'Tours & Excursions' },
  { id: 'paid-airport-transfer', name: 'Paid Airport Transfer' },
  { id: 'free-airport-transfer', name: 'Free Airport Transfer' },
  { id: 'tv', name: 'TV' },
  { id: 'wifi', name: 'WiFi' },
  { id: 'paid-wifi', name: 'Paid WiFi' },
  { id: 'free-wifi', name: 'Free WiFi' }
];

export const propertyTypes: PropertyType[] = ['Camping', 'Hotel', 'Hotel Boutique', 'Resort'];

export const propertyStyles: PropertyStyle[] = ['Classic', 'Classic Elegant', 'Design', 'Modern', 'Rural', 'Urban'];

export const starRatings = [1, 2, 3, 4, 5, 0]; // 0 for Not Rated

export const mealPlans: MealPlan[] = [
  'Breakfast',
  'Half Board (Breakfast & Dinner)',
  'Full Board',
  'Room Only',
  'All Inclusive',
  'All Inclusive Plus (With Laundry)'
];

export const allMonths: Month[] = [
  'January', 'February', 'March', 'April', 
  'May', 'June', 'July', 'August', 
  'September', 'October', 'November', 'December'
];

export const priceRanges = [
  { label: 'Up to $1000', value: 1000 },
  { label: '$1000 - $1500', value: 1500 },
  { label: '$1500 - $2000', value: 2000 },
  { label: 'Over $2000', value: 2001 },
];

export const durations = [8, 16, 24, 32];

export const hotels: Hotel[] = [
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
