
// Theme types and data
export interface Theme {
  id: string;
  name: string;
  category?: string;
}

// Theme categories with subcategories, submenus, and options
export const themeCategories = [
  {
    category: "FOODS & DRINKS",
    subcategories: [
      {
        name: "Culinary",
        submenus: [
          {
            name: "World Cuisines",
            options: [
              { 
                id: "spain", 
                name: "Spain", 
                suboptions: ["Spanish", "Castilian", "Andalusian", "Basque", "Galician", "Catalonian"] 
              },
              { 
                id: "france", 
                name: "France", 
                suboptions: ["French"] 
              },
              { 
                id: "italy", 
                name: "Italian", 
                suboptions: ["Toscana"] 
              },
              { 
                id: "add-other", 
                name: "Add other", 
                isAddOption: true 
              }
            ]
          },
          {
            name: "Cuisine Learning",
            options: [
              { id: "meat", name: "Meat" },
              { id: "fish", name: "Fish" },
              { id: "seafood", name: "Seafood" },
              { id: "add-other", name: "Add other", isAddOption: true }
            ]
          }
        ]
      },
      {
        name: "Drinks",
        themes: [
          { id: "wine", name: "Wine" },
          { id: "beer", name: "Beer" },
          { id: "cocktails", name: "Cocktails" },
          { id: "spirits", name: "Spirits" },
          { id: "add-other", name: "Add other", isAddOption: true }
        ]
      }
    ]
  },
  {
    category: "SPORTS",
    themes: [
      { id: "golf", name: "Golf" },
      { id: "tennis", name: "Tennis" },
      { id: "swimming", name: "Swimming" },
      { id: "diving", name: "Diving" },
      { id: "yoga", name: "Yoga" },
      { id: "fitness", name: "Fitness" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "ART",
    themes: [
      { id: "painting", name: "Painting" },
      { id: "sculpture", name: "Sculpture" },
      { id: "photography", name: "Photography" },
      { id: "architecture", name: "Architecture" },
      { id: "design", name: "Design" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "CULTURE",
    themes: [
      { id: "history", name: "History" },
      { id: "museums", name: "Museums" },
      { id: "local-traditions", name: "Local Traditions" },
      { id: "festivals", name: "Festivals" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "MUSIC",
    themes: [
      { id: "rock", name: "Rock" },
      { id: "opera", name: "Opera" },
      { id: "symphonic", name: "Symphonic" },
      { id: "classical", name: "Classical" },
      { id: "pop", name: "Pop" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "LANGUAGES",
    subcategories: [
      {
        name: "Practice",
        themes: [
          { id: "english-practice", name: "English" },
          { id: "spanish-practice", name: "Spanish" },
          { id: "french-practice", name: "French" },
          { id: "german-practice", name: "German" },
          { id: "chinese-practice", name: "Chinese" },
          { id: "japanese-practice", name: "Japanese" },
          { id: "add-other-practice", name: "Add other", isAddOption: true }
        ]
      },
      {
        name: "Learning",
        themes: [
          { id: "english-learning", name: "English" },
          { id: "spanish-learning", name: "Spanish" },
          { id: "french-learning", name: "French" },
          { id: "german-learning", name: "German" },
          { id: "chinese-learning", name: "Chinese" },
          { id: "japanese-learning", name: "Japanese" },
          { id: "add-other-learning", name: "Add other", isAddOption: true }
        ]
      }
    ]
  },
  {
    category: "DANCE",
    themes: [
      { id: "ballroom", name: "Ballroom" },
      { id: "latin", name: "Latin" },
      { id: "contemporary", name: "Contemporary" },
      { id: "traditional", name: "Traditional" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "TECHNOLOGY",
    themes: [
      { id: "digital", name: "Digital" },
      { id: "innovation", name: "Innovation" },
      { id: "smart-home", name: "Smart Home" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "SCIENCES",
    themes: [
      { id: "astronomy", name: "Astronomy" },
      { id: "biology", name: "Biology" },
      { id: "physics", name: "Physics" },
      { id: "chemistry", name: "Chemistry" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "LITERATURE",
    themes: [
      { id: "poetry", name: "Poetry" },
      { id: "novels", name: "Novels" },
      { id: "short-stories", name: "Short Stories" },
      { id: "book-clubs", name: "Book Clubs" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "GAMES",
    themes: [
      { id: "board-games", name: "Board Games" },
      { id: "card-games", name: "Card Games" },
      { id: "chess", name: "Chess" },
      { id: "video-games", name: "Video Games" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  }
];

// Create a flat list of all themes for easier access
export const allThemes: Theme[] = [
  // Food & Drinks
  { id: "spanish-cuisine", name: "Spanish Cuisine", category: "FOODS & DRINKS" },
  { id: "castilian-cuisine", name: "Castilian Cuisine", category: "FOODS & DRINKS" },
  { id: "andalusian-cuisine", name: "Andalusian Cuisine", category: "FOODS & DRINKS" },
  { id: "basque-cuisine", name: "Basque Cuisine", category: "FOODS & DRINKS" },
  { id: "galician-cuisine", name: "Galician Cuisine", category: "FOODS & DRINKS" },
  { id: "catalonian-cuisine", name: "Catalonian Cuisine", category: "FOODS & DRINKS" },
  { id: "french-cuisine", name: "French Cuisine", category: "FOODS & DRINKS" },
  { id: "italian-cuisine", name: "Italian Cuisine", category: "FOODS & DRINKS" },
  { id: "toscana-cuisine", name: "Toscana Cuisine", category: "FOODS & DRINKS" },
  { id: "meat", name: "Meat Cooking", category: "FOODS & DRINKS" },
  { id: "fish", name: "Fish Cooking", category: "FOODS & DRINKS" },
  { id: "seafood", name: "Seafood Cooking", category: "FOODS & DRINKS" },
  { id: "wine", name: "Wine", category: "FOODS & DRINKS" },
  { id: "beer", name: "Beer", category: "FOODS & DRINKS" },
  { id: "cocktails", name: "Cocktails", category: "FOODS & DRINKS" },
  { id: "spirits", name: "Spirits", category: "FOODS & DRINKS" },
  
  // Sports
  { id: "golf", name: "Golf", category: "SPORTS" },
  { id: "tennis", name: "Tennis", category: "SPORTS" },
  { id: "swimming", name: "Swimming", category: "SPORTS" },
  { id: "diving", name: "Diving", category: "SPORTS" },
  { id: "yoga", name: "Yoga", category: "SPORTS" },
  { id: "fitness", name: "Fitness", category: "SPORTS" },
  
  // Art
  { id: "painting", name: "Painting", category: "ART" },
  { id: "sculpture", name: "Sculpture", category: "ART" },
  { id: "photography", name: "Photography", category: "ART" },
  { id: "architecture", name: "Architecture", category: "ART" },
  { id: "design", name: "Design", category: "ART" },
  
  // Culture
  { id: "history", name: "History", category: "CULTURE" },
  { id: "museums", name: "Museums", category: "CULTURE" },
  { id: "local-traditions", name: "Local Traditions", category: "CULTURE" },
  { id: "festivals", name: "Festivals", category: "CULTURE" },
  
  // Music
  { id: "rock", name: "Rock", category: "MUSIC" },
  { id: "opera", name: "Opera", category: "MUSIC" },
  { id: "symphonic", name: "Symphonic", category: "MUSIC" },
  { id: "classical", name: "Classical", category: "MUSIC" },
  { id: "pop", name: "Pop", category: "MUSIC" },
  
  // Languages
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
  { id: "japanese-learning", name: "Japanese Learning", category: "LANGUAGES" },
  
  // Dance
  { id: "ballroom", name: "Ballroom", category: "DANCE" },
  { id: "latin", name: "Latin", category: "DANCE" },
  { id: "contemporary", name: "Contemporary", category: "DANCE" },
  { id: "traditional", name: "Traditional", category: "DANCE" },
  
  // Technology
  { id: "digital", name: "Digital", category: "TECHNOLOGY" },
  { id: "innovation", name: "Innovation", category: "TECHNOLOGY" },
  { id: "smart-home", name: "Smart Home", category: "TECHNOLOGY" },
  
  // Sciences
  { id: "astronomy", name: "Astronomy", category: "SCIENCES" },
  { id: "biology", name: "Biology", category: "SCIENCES" },
  { id: "physics", name: "Physics", category: "SCIENCES" },
  { id: "chemistry", name: "Chemistry", category: "SCIENCES" },
  
  // Literature
  { id: "poetry", name: "Poetry", category: "LITERATURE" },
  { id: "novels", name: "Novels", category: "LITERATURE" },
  { id: "short-stories", name: "Short Stories", category: "LITERATURE" },
  { id: "book-clubs", name: "Book Clubs", category: "LITERATURE" },
  
  // Games
  { id: "board-games", name: "Board Games", category: "GAMES" },
  { id: "card-games", name: "Card Games", category: "GAMES" },
  { id: "chess", name: "Chess", category: "GAMES" },
  { id: "video-games", name: "Video Games", category: "GAMES" }
];
