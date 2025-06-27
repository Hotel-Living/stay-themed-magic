
// Complete filter data for simulation demo matching Step 2 "Add Property" form structure

export const mockThemes = [
  // ART Category
  { id: "art", name: "Art", level: 1 as const, category: "ART" },
  { id: "painting", name: "Painting", level: 3 as const, category: "ART" },
  { id: "sculpture", name: "Sculpture", level: 3 as const, category: "ART" },
  { id: "photography", name: "Photography", level: 3 as const, category: "ART" },
  { id: "architecture", name: "Architecture", level: 3 as const, category: "ART" },
  { id: "design", name: "Design", level: 3 as const, category: "ART" },
  
  // CULTURE Category
  { id: "culture", name: "Culture", level: 1 as const, category: "CULTURE" },
  { id: "history", name: "History", level: 3 as const, category: "CULTURE" },
  { id: "museums", name: "Museums", level: 3 as const, category: "CULTURE" },
  { id: "local-traditions", name: "Local Traditions", level: 3 as const, category: "CULTURE" },
  { id: "festivals", name: "Festivals", level: 3 as const, category: "CULTURE" },
  
  // MUSIC Category
  { id: "music", name: "Music", level: 1 as const, category: "MUSIC" },
  { id: "rock", name: "Rock", level: 3 as const, category: "MUSIC" },
  { id: "opera", name: "Opera", level: 3 as const, category: "MUSIC" },
  { id: "symphonic", name: "Symphonic", level: 3 as const, category: "MUSIC" },
  { id: "classical", name: "Classical", level: 3 as const, category: "MUSIC" },
  { id: "pop", name: "Pop", level: 3 as const, category: "MUSIC" },
  
  // SPORTS Category
  { id: "sports", name: "Sports", level: 1 as const, category: "SPORTS" },
  { id: "golf", name: "Golf", level: 3 as const, category: "SPORTS" },
  { id: "tennis", name: "Tennis", level: 3 as const, category: "SPORTS" },
  { id: "swimming", name: "Swimming", level: 3 as const, category: "SPORTS" },
  { id: "diving", name: "Diving", level: 3 as const, category: "SPORTS" },
  { id: "yoga", name: "Yoga", level: 3 as const, category: "SPORTS" },
  { id: "fitness", name: "Fitness", level: 3 as const, category: "SPORTS" },
  
  // WELLNESS Category
  { id: "wellness", name: "Wellness", level: 1 as const, category: "WELLNESS" },
  { id: "spa", name: "Spa", level: 3 as const, category: "WELLNESS" },
  { id: "meditation", name: "Meditation", level: 3 as const, category: "WELLNESS" },
  { id: "detox", name: "Detox", level: 3 as const, category: "WELLNESS" },
  
  // ADVENTURE Category
  { id: "adventure", name: "Adventure", level: 1 as const, category: "ADVENTURE" },
  { id: "hiking", name: "Hiking", level: 3 as const, category: "ADVENTURE" },
  { id: "climbing", name: "Climbing", level: 3 as const, category: "ADVENTURE" },
  { id: "skiing", name: "Skiing", level: 3 as const, category: "ADVENTURE" },
  { id: "mountain-sports", name: "Mountain Sports", level: 3 as const, category: "ADVENTURE" },
  
  // FOODS & DRINKS Category
  { id: "foods-drinks", name: "Foods & Drinks", level: 1 as const, category: "FOODS_DRINKS" },
  { id: "wine", name: "Wine", level: 3 as const, category: "FOODS_DRINKS" },
  { id: "beer", name: "Beer", level: 3 as const, category: "FOODS_DRINKS" },
  { id: "cocktails", name: "Cocktails", level: 3 as const, category: "FOODS_DRINKS" },
  { id: "world-cuisines", name: "World Cuisines", level: 3 as const, category: "FOODS_DRINKS" },
  
  // LANGUAGES Category
  { id: "languages", name: "Languages", level: 1 as const, category: "LANGUAGES" },
  { id: "english-practice", name: "English Practice", level: 3 as const, category: "LANGUAGES" },
  { id: "spanish-practice", name: "Spanish Practice", level: 3 as const, category: "LANGUAGES" },
  { id: "french-practice", name: "French Practice", level: 3 as const, category: "LANGUAGES" },
  
  // TECHNOLOGY Category
  { id: "technology", name: "Technology", level: 1 as const, category: "TECHNOLOGY" },
  { id: "digital", name: "Digital", level: 3 as const, category: "TECHNOLOGY" },
  { id: "innovation", name: "Innovation", level: 3 as const, category: "TECHNOLOGY" },
  { id: "smart-home", name: "Smart Home", level: 3 as const, category: "TECHNOLOGY" },
  
  // GAMES Category
  { id: "games", name: "Games", level: 1 as const, category: "GAMES" },
  { id: "board-games", name: "Board Games", level: 3 as const, category: "GAMES" },
  { id: "card-games", name: "Card Games", level: 3 as const, category: "GAMES" },
  { id: "chess", name: "Chess", level: 3 as const, category: "GAMES" },
  { id: "video-games", name: "Video Games", level: 3 as const, category: "GAMES" }
];

export const mockActivities = [
  { id: "art", name: "Art", count: 1 },
  { id: "culture", name: "Culture", count: 1 },
  { id: "museums", name: "Museums", count: 1 },
  { id: "yoga", name: "Yoga", count: 1 },
  { id: "swimming", name: "Swimming", count: 1 },
  { id: "wellness", name: "Wellness", count: 1 },
  { id: "hiking", name: "Hiking", count: 1 },
  { id: "skiing", name: "Skiing", count: 1 },
  { id: "mountain-sports", name: "Mountain Sports", count: 1 },
  { id: "golf", name: "Golf", count: 0 },
  { id: "tennis", name: "Tennis", count: 0 },
  { id: "diving", name: "Diving", count: 0 },
  { id: "fitness", name: "Fitness", count: 0 },
  { id: "spa", name: "Spa", count: 0 },
  { id: "meditation", name: "Meditation", count: 0 },
  { id: "wine", name: "Wine", count: 0 },
  { id: "cooking", name: "Cooking", count: 0 },
  { id: "photography", name: "Photography", count: 0 },
  { id: "painting", name: "Painting", count: 0 },
  { id: "music", name: "Music", count: 0 },
  { id: "dance", name: "Dance", count: 0 },
  { id: "languages", name: "Languages", count: 0 },
  { id: "technology", name: "Technology", count: 0 },
  { id: "games", name: "Games", count: 0 }
];

export const mockCountries = [
  { code: "Spain", name: "Spain", count: 1 },
  { code: "Portugal", name: "Portugal", count: 1 },
  { code: "Switzerland", name: "Switzerland", count: 1 },
  { code: "France", name: "France", count: 0 },
  { code: "Italy", name: "Italy", count: 0 },
  { code: "Germany", name: "Germany", count: 0 },
  { code: "Netherlands", name: "Netherlands", count: 0 },
  { code: "Austria", name: "Austria", count: 0 },
  { code: "Belgium", name: "Belgium", count: 0 },
  { code: "Greece", name: "Greece", count: 0 }
];

export const mockCities = [
  { name: "Barcelona", country: "Spain", count: 1 },
  { name: "Lisbon", country: "Portugal", count: 1 },
  { name: "Zermatt", country: "Switzerland", count: 1 },
  { name: "Madrid", country: "Spain", count: 0 },
  { name: "Porto", country: "Portugal", count: 0 },
  { name: "Zurich", country: "Switzerland", count: 0 }
];

export const mockPropertyTypes = [
  { type: "Hotel", count: 1 },
  { type: "Boutique Hotel", count: 1 },
  { type: "Lodge", count: 1 },
  { type: "Resort", count: 0 },
  { type: "Apartment", count: 0 },
  { type: "Villa", count: 0 },
  { type: "Hostel", count: 0 }
];

export const mockPropertyStyles = [
  { style: "Urban", count: 1 },
  { style: "Coastal", count: 1 },
  { style: "Mountain", count: 1 },
  { style: "Rural", count: 0 },
  { style: "Historic", count: 0 },
  { style: "Modern", count: 0 },
  { style: "Traditional", count: 0 }
];
