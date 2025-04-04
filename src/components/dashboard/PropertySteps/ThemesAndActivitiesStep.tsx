import React, { useState } from "react";
import { PlusCircle, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Defining new theme categories with updated structure
export const themeCategories = [{
  category: "FOODS & DRINKS",
  subcategories: [{
    name: "Culinary",
    submenus: [{
      name: "World Cuisines",
      options: [{
        id: "spain",
        name: "Spain",
        suboptions: ["Spanish", "Castilian", "Andalusian", "Basque", "Galician", "Catalonian"]
      }, {
        id: "france",
        name: "France",
        suboptions: ["French"]
      }, {
        id: "italy",
        name: "Italian",
        suboptions: ["Toscana"]
      }, {
        id: "add-other",
        name: "Add other",
        isAddOption: true
      }]
    }, {
      name: "Cuisine Learning",
      options: [{
        id: "meat",
        name: "Meat"
      }, {
        id: "fish",
        name: "Fish"
      }, {
        id: "seafood",
        name: "Seafood"
      }, {
        id: "add-other",
        name: "Add other",
        isAddOption: true
      }]
    }]
  }, {
    name: "Drinks",
    themes: [{
      id: "wine",
      name: "Wine"
    }, {
      id: "beer",
      name: "Beer"
    }, {
      id: "cocktails",
      name: "Cocktails"
    }, {
      id: "spirits",
      name: "Spirits"
    }, {
      id: "add-other",
      name: "Add other",
      isAddOption: true
    }]
  }]
}, {
  category: "SPORTS",
  themes: [{
    id: "golf",
    name: "Golf"
  }, {
    id: "tennis",
    name: "Tennis"
  }, {
    id: "swimming",
    name: "Swimming"
  }, {
    id: "diving",
    name: "Diving"
  }, {
    id: "yoga",
    name: "Yoga"
  }, {
    id: "fitness",
    name: "Fitness"
  }, {
    id: "add-other",
    name: "Add other",
    isAddOption: true
  }]
}, {
  category: "ART",
  themes: [{
    id: "painting",
    name: "Painting"
  }, {
    id: "sculpture",
    name: "Sculpture"
  }, {
    id: "photography",
    name: "Photography"
  }, {
    id: "architecture",
    name: "Architecture"
  }, {
    id: "design",
    name: "Design"
  }, {
    id: "add-other",
    name: "Add other",
    isAddOption: true
  }]
}, {
  category: "CULTURE",
  themes: [{
    id: "history",
    name: "History"
  }, {
    id: "museums",
    name: "Museums"
  }, {
    id: "local-traditions",
    name: "Local Traditions"
  }, {
    id: "festivals",
    name: "Festivals"
  }, {
    id: "add-other",
    name: "Add other",
    isAddOption: true
  }]
}, {
  category: "MUSIC",
  themes: [{
    id: "rock",
    name: "Rock"
  }, {
    id: "opera",
    name: "Opera"
  }, {
    id: "symphonic",
    name: "Symphonic"
  }, {
    id: "classical",
    name: "Classical"
  }, {
    id: "pop",
    name: "Pop"
  }, {
    id: "add-other",
    name: "Add other",
    isAddOption: true
  }]
}, {
  category: "LANGUAGES",
  subcategories: [{
    name: "Practice",
    themes: [{
      id: "english-practice",
      name: "English"
    }, {
      id: "spanish-practice",
      name: "Spanish"
    }, {
      id: "french-practice",
      name: "French"
    }, {
      id: "german-practice",
      name: "German"
    }, {
      id: "chinese-practice",
      name: "Chinese"
    }, {
      id: "japanese-practice",
      name: "Japanese"
    }, {
      id: "add-other-practice",
      name: "Add other",
      isAddOption: true
    }]
  }, {
    name: "Learning",
    themes: [{
      id: "english-learning",
      name: "English"
    }, {
      id: "spanish-learning",
      name: "Spanish"
    }, {
      id: "french-learning",
      name: "French"
    }, {
      id: "german-learning",
      name: "German"
    }, {
      id: "chinese-learning",
      name: "Chinese"
    }, {
      id: "japanese-learning",
      name: "Japanese"
    }, {
      id: "add-other-learning",
      name: "Add other",
      isAddOption: true
    }]
  }]
}, {
  category: "DANCE",
  themes: [{
    id: "ballroom",
    name: "Ballroom"
  }, {
    id: "latin",
    name: "Latin"
  }, {
    id: "contemporary",
    name: "Contemporary"
  }, {
    id: "traditional",
    name: "Traditional"
  }, {
    id: "add-other",
    name: "Add other",
    isAddOption: true
  }]
}, {
  category: "TECHNOLOGY",
  themes: [{
    id: "digital",
    name: "Digital"
  }, {
    id: "innovation",
    name: "Innovation"
  }, {
    id: "smart-home",
    name: "Smart Home"
  }, {
    id: "add-other",
    name: "Add other",
    isAddOption: true
  }]
}, {
  category: "SCIENCES",
  themes: [{
    id: "astronomy",
    name: "Astronomy"
  }, {
    id: "biology",
    name: "Biology"
  }, {
    id: "physics",
    name: "Physics"
  }, {
    id: "chemistry",
    name: "Chemistry"
  }, {
    id: "add-other",
    name: "Add other",
    isAddOption: true
  }]
}, {
  category: "LITERATURE",
  themes: [{
    id: "poetry",
    name: "Poetry"
  }, {
    id: "novels",
    name: "Novels"
  }, {
    id: "short-stories",
    name: "Short Stories"
  }, {
    id: "book-clubs",
    name: "Book Clubs"
  }, {
    id: "add-other",
    name: "Add other",
    isAddOption: true
  }]
}, {
  category: "GAMES",
  themes: [{
    id: "board-games",
    name: "Board Games"
  }, {
    id: "card-games",
    name: "Card Games"
  }, {
    id: "chess",
    name: "Chess"
  }, {
    id: "video-games",
    name: "Video Games"
  }, {
    id: "add-other",
    name: "Add other",
    isAddOption: true
  }]
}];
export default function ThemesAndActivitiesStep() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };
  const toggleSubmenu = (submenu: string) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };
  return <div className="space-y-4">
      <label className="block text-3xl font-bold text-foreground/90 mb-2 uppercase">
        THEMES
      </label>
      
      <p className="text-sm text-foreground/90 mb-4">
        Make your hotel stand out from the competition boosting it with group themes to attract your best and perfect guests
      </p>
      <button className="inline-flex items-center px-4 py-2 rounded-lg bg-[#5A1876]/80 hover:bg-[#5A1876] text-white text-sm font-medium transition-colors mb-4">
        More Information
      </button>
      
      <div>
        <div className="grid grid-cols-1 gap-1">
          {/* Map through all theme categories */}
          {themeCategories.map(category => <Collapsible key={category.category} className="mb-0.5">
              <div className="bg-[#5A1876]/30 rounded-lg p-2 border border-fuchsia-800/30">
                <CollapsibleTrigger onClick={() => toggleCategory(category.category)} className="flex items-center justify-between w-full font-medium h-8 my-0 bg-[#7c047f] rounded-none">
                  <h4 className="uppercase text-white">{category.category}</h4>
                  <ChevronRight className={`h-4 w-4 transform transition-transform ${openCategory === category.category ? 'rotate-90' : ''}`} />
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  {category.subcategories ? <div className="space-y-0.5 mt-1">
                      {category.subcategories.map(subcategory => <div key={subcategory.name} className="bg-[#5A1876]/20 rounded-lg p-1.5 border border-fuchsia-800/20">
                          <h5 className="font-medium mb-1 uppercase">{subcategory.name}</h5>
                          
                          {subcategory.submenus ? <div className="space-y-0.5">
                              {subcategory.submenus.map(submenu => <Collapsible key={submenu.name} className="mb-0.5">
                                  <div className="bg-[#5A1876]/15 rounded-lg p-1.5 border border-fuchsia-800/15">
                                    <CollapsibleTrigger className="flex items-center justify-between w-full text-sm h-6" onClick={() => toggleSubmenu(submenu.name)}>
                                      <span className="uppercase">{submenu.name}</span>
                                      <ChevronRight className={`h-3 w-3 transform transition-transform ${openSubmenu === submenu.name ? 'rotate-90' : ''}`} />
                                    </CollapsibleTrigger>
                                    
                                    <CollapsibleContent>
                                      <div className="mt-1 space-y-0.5">
                                        {submenu.options.map(option => <div key={option.id} className={`bg-[#5A1876]/10 rounded-lg p-1.5 border border-fuchsia-800/10 ${option.isAddOption ? 'flex items-center' : ''}`}>
                                            {option.isAddOption ? <>
                                                <PlusCircle className="w-3 h-3 mr-1 text-fuchsia-400" />
                                                <span className="text-xs text-fuchsia-400">{option.name}</span>
                                              </> : <>
                                                <label className="flex items-start mb-1">
                                                  <input type="checkbox" className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" />
                                                  <span className="text-sm">{option.name}</span>
                                                </label>
                                                
                                                {option.suboptions && <div className="pl-6 grid grid-cols-2 gap-1">
                                                    {option.suboptions.map(suboption => <label key={suboption} className="flex items-start">
                                                        <input type="checkbox" className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-3 w-3 mr-1 mt-0.5" />
                                                        <span className="text-xs">{suboption}</span>
                                                      </label>)}
                                                    <div className="flex items-center">
                                                      <PlusCircle className="w-3 h-3 mr-1 text-fuchsia-400" />
                                                      <span className="text-xs text-fuchsia-400">Add other</span>
                                                    </div>
                                                  </div>}
                                              </>}
                                          </div>)}
                                        {!submenu.options.some(opt => opt.isAddOption) && <div className="flex items-center">
                                            <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
                                            <span className="text-xs text-fuchsia-400">Add new option</span>
                                          </div>}
                                      </div>
                                    </CollapsibleContent>
                                  </div>
                                </Collapsible>)}
                            </div> : <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                              {subcategory.themes.map(theme => theme.isAddOption ? <div key={theme.id} className="flex items-center">
                                    <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
                                    <span className="text-xs text-slate-50">{theme.name}</span>
                                  </div> : <label key={theme.id} className="flex items-start">
                                    <input type="checkbox" className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" />
                                    <span className="text-sm">{theme.name}</span>
                                  </label>)}
                              {!subcategory.themes.some(theme => theme.isAddOption) && <div className="flex items-center">
                                  <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
                                  <span className="text-xs text-fuchsia-400">Add new theme</span>
                                </div>}
                            </div>}
                        </div>)}
                      <div className="flex items-center mt-1">
                        <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
                        <span className="text-xs text-slate-50">Add new subcategory</span>
                      </div>
                    </div> : <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-1">
                      {category.themes.map(theme => theme.isAddOption ? <div key={theme.id} className="flex items-center">
                            <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
                            <span className="text-xs text-fuchsia-400">{theme.name}</span>
                          </div> : <label key={theme.id} className="flex items-start">
                            <input type="checkbox" className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" />
                            <span className="text-sm">{theme.name}</span>
                          </label>)}
                      {!category.themes.some(theme => theme.isAddOption) && <div className="flex items-center">
                          <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
                          <span className="text-xs text-fuchsia-400">Add new theme</span>
                        </div>}
                    </div>}
                </CollapsibleContent>
              </div>
            </Collapsible>)}
          
          
        </div>
      </div>
    </div>;
}