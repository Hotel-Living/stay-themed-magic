
import React, { useState } from "react";
import { PlusCircle, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

// Defining new theme categories
const themeCategories = [
  {
    category: "FOODS & DRINKS",
    subcategories: [
      {
        name: "Culinary",
        themes: [
          { id: "world-cuisines", name: "World Cuisines" },
          { id: "cuisine-learning", name: "Cuisine Learning" }
        ]
      },
      {
        name: "Drinks",
        themes: [
          { id: "wine", name: "Wine" },
          { id: "beer", name: "Beer" },
          { id: "cocktails", name: "Cocktails" },
          { id: "spirits", name: "Spirits" }
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
      { id: "fitness", name: "Fitness" }
    ]
  },
  {
    category: "ART",
    themes: [
      { id: "painting", name: "Painting" },
      { id: "sculpture", name: "Sculpture" },
      { id: "photography", name: "Photography" },
      { id: "architecture", name: "Architecture" },
      { id: "design", name: "Design" }
    ]
  },
  {
    category: "CULTURE",
    themes: [
      { id: "history", name: "History" },
      { id: "museums", name: "Museums" },
      { id: "local-traditions", name: "Local Traditions" },
      { id: "festivals", name: "Festivals" }
    ]
  },
  {
    category: "LANGUAGES",
    themes: [
      { id: "english", name: "English" },
      { id: "spanish", name: "Spanish" },
      { id: "french", name: "French" },
      { id: "german", name: "German" },
      { id: "chinese", name: "Chinese" },
      { id: "japanese", name: "Japanese" }
    ]
  },
  {
    category: "DANCE",
    themes: [
      { id: "ballroom", name: "Ballroom" },
      { id: "latin", name: "Latin" },
      { id: "contemporary", name: "Contemporary" },
      { id: "traditional", name: "Traditional" }
    ]
  },
  {
    category: "TECHNOLOGY",
    themes: [
      { id: "digital", name: "Digital" },
      { id: "innovation", name: "Innovation" },
      { id: "smart-home", name: "Smart Home" }
    ]
  },
  {
    category: "SCIENCES",
    themes: [
      { id: "astronomy", name: "Astronomy" },
      { id: "biology", name: "Biology" },
      { id: "physics", name: "Physics" },
      { id: "chemistry", name: "Chemistry" }
    ]
  },
  {
    category: "LITERATURE",
    themes: [
      { id: "poetry", name: "Poetry" },
      { id: "novels", name: "Novels" },
      { id: "short-stories", name: "Short Stories" },
      { id: "book-clubs", name: "Book Clubs" }
    ]
  },
  {
    category: "GAMES",
    themes: [
      { id: "board-games", name: "Board Games" },
      { id: "card-games", name: "Card Games" },
      { id: "chess", name: "Chess" },
      { id: "video-games", name: "Video Games" }
    ]
  }
];

export default function ThemesAndActivitiesStep() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };
  
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold mb-6">ADD A NEW PROPERTY</h2>
      
      <p className="text-sm text-foreground/90 mb-4">
        Make your hotel stand out from the competition boosting it with group themes to attract your best and perfect guests
      </p>
      <button className="inline-flex items-center px-4 py-2 rounded-lg bg-[#5A1876]/80 hover:bg-[#5A1876] text-white text-sm font-medium transition-colors mb-6">
        More Information
      </button>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          THEMES
        </label>
        <div className="grid grid-cols-1 gap-4">
          {/* Map through all theme categories */}
          {themeCategories.map((category) => (
            <Collapsible key={category.category}>
              <div className="bg-[#5A1876]/30 rounded-lg p-4 border border-fuchsia-800/30">
                <CollapsibleTrigger 
                  className="flex items-center justify-between w-full font-medium mb-2"
                  onClick={() => toggleCategory(category.category)}
                >
                  <h4>{category.category}</h4>
                  <ChevronRight className={`h-4 w-4 transform transition-transform ${openCategory === category.category ? 'rotate-90' : ''}`} />
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  {category.subcategories ? (
                    <div className="space-y-4 mt-2">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.name} className="bg-[#5A1876]/20 rounded-lg p-3 border border-fuchsia-800/20">
                          <h5 className="font-medium mb-2">{subcategory.name}</h5>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {subcategory.themes.map((theme) => (
                              <label key={theme.id} className="flex items-start">
                                <input 
                                  type="checkbox" 
                                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                                />
                                <span className="text-sm">{theme.name}</span>
                              </label>
                            ))}
                            <div className="flex items-center">
                              <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                              <span className="text-sm text-fuchsia-400">Add new theme</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center mt-2">
                        <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                        <span className="text-sm text-fuchsia-400">Add new subcategory</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {category.themes.map((theme) => (
                        <label key={theme.id} className="flex items-start">
                          <input 
                            type="checkbox" 
                            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                          />
                          <span className="text-sm">{theme.name}</span>
                        </label>
                      ))}
                      <div className="flex items-center">
                        <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                        <span className="text-sm text-fuchsia-400">Add new theme</span>
                      </div>
                    </div>
                  )}
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
          
          <div className="flex items-center">
            <PlusCircle className="w-5 h-5 mr-2 text-fuchsia-400" />
            <span className="text-fuchsia-400 font-medium">Add new theme category</span>
          </div>
        </div>
      </div>
    </div>
  );
}
