
// The Theme type interface
export interface Theme {
  id: string;
  name: string;
  category: string;
}

// Define a Hotel interface for the mock data
export interface Hotel {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  city: string;
  country: string;
  images: string[];
  stars: number;
  pricePerMonth: number;
  themes: Theme[];
  availableMonths: string[];
  amenities: string[];
}

export const allThemes: Theme[] = [
  { id: '1', name: 'Language Learning', category: 'Education' },
  { id: '2', name: 'Digital Nomad', category: 'Lifestyle' },
  { id: '3', name: 'Culinary', category: 'Food & Drink' },
  { id: '4', name: 'Wellness', category: 'Health' },
  { id: '5', name: 'Adventure', category: 'Outdoor' },
  { id: '6', name: 'Cultural', category: 'Experience' },
  { id: '7', name: 'Art & Design', category: 'Creative' },
  { id: '8', name: 'Eco-friendly', category: 'Sustainability' },
  { id: '9', name: 'Family', category: 'Community' },
  { id: '10', name: 'Luxury', category: 'Premium' }
];

export const themeCategories = [
  {
    category: 'Education',
    themes: allThemes.filter(theme => theme.category === 'Education')
  },
  {
    category: 'Lifestyle',
    themes: allThemes.filter(theme => theme.category === 'Lifestyle')
  },
  {
    category: 'Food & Drink',
    themes: allThemes.filter(theme => theme.category === 'Food & Drink')
  },
  {
    category: 'Health',
    themes: allThemes.filter(theme => theme.category === 'Health')
  },
  {
    category: 'Outdoor',
    themes: allThemes.filter(theme => theme.category === 'Outdoor')
  },
  {
    category: 'Experience',
    themes: allThemes.filter(theme => theme.category === 'Experience')
  },
  {
    category: 'Creative',
    themes: allThemes.filter(theme => theme.category === 'Creative')
  },
  {
    category: 'Sustainability',
    themes: allThemes.filter(theme => theme.category === 'Sustainability')
  },
  {
    category: 'Community',
    themes: allThemes.filter(theme => theme.category === 'Community')
  },
  {
    category: 'Premium',
    themes: allThemes.filter(theme => theme.category === 'Premium')
  }
];

export const countries = [
  { id: 'spain', name: 'Spain 🇪🇸' },
  { id: 'france', name: 'France 🇫🇷' },
  { id: 'italy', name: 'Italy 🇮🇹' },
  { id: 'usa', name: 'USA 🇺🇸' },
  { id: 'egypt', name: 'Egypt 🇪🇬' },
  { id: 'turkey', name: 'Turkey 🇹🇷' }
];

// Add durations export for booking form
export const durations = [
  { id: '1', name: '1 month', value: 1 },
  { id: '2', name: '2 months', value: 2 },
  { id: '3', name: '3 months', value: 3 },
  { id: '6', name: '6 months', value: 6 },
  { id: '12', name: '12 months', value: 12 }
];

// Sample hotel data
export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    description: 'A luxury hotel in the heart of Madrid.',
    longDescription: 'Experience the ultimate luxury in the heart of Madrid. This stunning hotel offers spacious rooms with city views, a rooftop pool, and easy access to major attractions. Perfect for digital nomads who want to immerse themselves in Spanish culture while enjoying premium amenities.\n\nOur property includes high-speed fiber internet throughout, dedicated workspaces in each room, and a coworking lounge with 24/7 access. After work, unwind at our wellness center or join our weekly networking events with other digital professionals.',
    city: 'Madrid',
    country: 'Spain',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074'
    ],
    stars: 5,
    pricePerMonth: 2000,
    themes: [
      allThemes.find(theme => theme.name === 'Digital Nomad')!,
      allThemes.find(theme => theme.name === 'Luxury')!
    ],
    availableMonths: ['January', 'February', 'March', 'April', 'May', 'November', 'December'],
    amenities: ['Free WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', '24/7 Reception', 'Room Service', 'Coworking Space']
  },
  {
    id: '2',
    name: 'Riviera Language Hotel',
    description: 'Immerse yourself in French culture and language.',
    longDescription: 'Nestled in the beautiful French Riviera, this boutique hotel offers the perfect setting for language immersion. All staff are bilingual, and we offer daily language workshops and cultural excursions. Perfect for travelers looking to improve their French while enjoying a relaxing Mediterranean getaway.\n\nOur language program includes morning classes, afternoon practice sessions with locals, and evening cultural activities. All rooms come with language learning materials and access to our extensive French library and media center.',
    city: 'Nice',
    country: 'France',
    images: [
      'https://images.unsplash.com/photo-1619631428091-7baa37cdcee1?q=80&w=2070',
      'https://images.unsplash.com/photo-1595877244574-e90ce41ce089?q=80&w=2070',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=2070'
    ],
    stars: 4,
    pricePerMonth: 1700,
    themes: [
      allThemes.find(theme => theme.name === 'Language Learning')!,
      allThemes.find(theme => theme.name === 'Cultural')!
    ],
    availableMonths: ['March', 'April', 'May', 'June', 'July', 'August', 'September'],
    amenities: ['Free WiFi', 'Language Classes', 'Cultural Tours', 'Restaurant', 'Garden', 'Library', 'Beach Access']
  },
  {
    id: '3',
    name: 'Wellness Retreat',
    description: 'Focus on your wellbeing at our health-centered hotel.',
    longDescription: 'Escape the stress of daily life at our wellness-focused retreat in the Italian countryside. We offer daily yoga and meditation sessions, nutritious organic meals, and a range of holistic treatments. Located among the rolling hills of Tuscany, this is the ideal place to rejuvenate your mind and body.\n\nOur property features a state-of-the-art wellness center, thermal baths, yoga pavilion, and meditation garden. Nutritionists and wellness coaches are available for personalized programs. All rooms are designed according to feng shui principles for optimal energy flow.',
    city: 'Florence',
    country: 'Italy',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070',
      'https://images.unsplash.com/photo-1540316487425-11ce3e45ebaa?q=80&w=1974',
      'https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=2071',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070'
    ],
    stars: 4,
    pricePerMonth: 1800,
    themes: [
      allThemes.find(theme => theme.name === 'Wellness')!,
      allThemes.find(theme => theme.name === 'Eco-friendly')!
    ],
    availableMonths: ['April', 'May', 'June', 'July', 'August', 'September', 'October'],
    amenities: ['Yoga Studio', 'Spa', 'Organic Restaurant', 'Meditation Garden', 'Thermal Pool', 'Massage Services', 'Hiking Trails']
  },
  {
    id: '4',
    name: 'Adventure Lodge',
    description: 'For outdoor enthusiasts seeking thrilling experiences.',
    longDescription: 'Located at the foot of the Rocky Mountains, our Adventure Lodge is the perfect base for outdoor enthusiasts. We offer guided hiking, rock climbing, kayaking, and mountain biking experiences for all skill levels. After a day of adventure, relax in our rustic-chic accommodations with stunning mountain views.\n\nOur experienced guides lead daily excursions, and all necessary equipment is available for rent. The lodge features a climbing wall, mountain bike trails, and direct access to national park hiking routes. Evening activities include outdoor cookouts and stargazing sessions.',
    city: 'Denver',
    country: 'USA',
    images: [
      'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=2070',
      'https://images.unsplash.com/photo-1505731110654-99d7f7f8e39c?q=80&w=1924',
      'https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=2070',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070'
    ],
    stars: 3,
    pricePerMonth: 1500,
    themes: [
      allThemes.find(theme => theme.name === 'Adventure')!,
      allThemes.find(theme => theme.name === 'Outdoor')!
    ],
    availableMonths: ['May', 'June', 'July', 'August', 'September'],
    amenities: ['Guided Tours', 'Equipment Rental', 'Restaurant', 'Bar', 'Campfire Area', 'Shuttle Service', 'Map Library']
  },
  {
    id: '5',
    name: 'Pharaoh\'s Palace',
    description: 'Experience ancient Egyptian culture in a luxurious setting.',
    longDescription: 'Step back in time at our historically-themed hotel located just minutes from the ancient pyramids. Our property combines modern luxury with authentic Egyptian design elements. Enjoy daily tours to historical sites, cultural workshops, and evenings of traditional entertainment.\n\nThe hotel features a museum with authentic artifacts, cultural performances in our courtyard, and expert Egyptologists who lead daily tours. Our rooms blend modern amenities with traditional Egyptian décor, and our restaurant offers authentic local cuisine.',
    city: 'Cairo',
    country: 'Egypt',
    images: [
      'https://images.unsplash.com/photo-1549875648-2f6a36da0ef2?q=80&w=2070',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
      'https://images.unsplash.com/photo-1556715371-bdb0d523c870?q=80&w=2074',
      'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?q=80&w=2074'
    ],
    stars: 5,
    pricePerMonth: 1600,
    themes: [
      allThemes.find(theme => theme.name === 'Cultural')!,
      allThemes.find(theme => theme.name === 'Luxury')!
    ],
    availableMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
    amenities: ['Historical Tours', 'Cultural Workshops', 'Pool', 'Spa', 'Restaurant', 'Museum', 'Evening Entertainment']
  },
  {
    id: '6',
    name: 'Culinary Haven',
    description: 'A gastronomic journey in the heart of Istanbul.',
    longDescription: 'Located in the vibrant spice market district of Istanbul, our hotel offers an immersive culinary experience. Daily cooking classes teach authentic Turkish recipes, market tours help you discover local ingredients, and our award-winning restaurant showcases the best of Turkish cuisine with a modern twist.\n\nOur kitchen is open to guests who want to observe or participate in meal preparation. We offer specialized courses in pastry, spices, and traditional cooking techniques. Each room features a small kitchenette for practicing your new skills, and our chef is available for private lessons.',
    city: 'Istanbul',
    country: 'Turkey',
    images: [
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=2067',
      'https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=2070',
      'https://images.unsplash.com/photo-1482275548304-a58859dc31b7?q=80&w=2070',
      'https://images.unsplash.com/photo-1560185008-b033106af5c3?q=80&w=2070'
    ],
    stars: 4,
    pricePerMonth: 1900,
    themes: [
      allThemes.find(theme => theme.name === 'Culinary')!,
      allThemes.find(theme => theme.name === 'Cultural')!
    ],
    availableMonths: ['March', 'April', 'May', 'June', 'September', 'October', 'November'],
    amenities: ['Cooking Classes', 'Market Tours', 'Gourmet Restaurant', 'Wine Tasting', 'Culinary Library', 'Kitchenette', 'Spice Workshop']
  }
];
