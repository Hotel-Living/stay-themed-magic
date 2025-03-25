import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelCard } from "@/components/HotelCard";
import { Hotel, hotels, themeCategories } from "@/utils/data";
import { Compass, ChevronRight, PlusCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export default function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const initialFilters = {
    country: searchParams.get("country") as any || null,
    month: searchParams.get("month") as any || null,
    theme: null,
    priceRange: searchParams.get("price") ? Number(searchParams.get("price")) : null,
    propertyType: null,
    propertyStyle: null,
    roomTypes: [],
    hotelFeatures: [],
    roomFeatures: [],
    meals: [],
    lengthOfStay: null,
    activities: [],
    location: null,
    category: null
  };
  
  // Handle theme separately since it needs to be looked up by ID
  const themeId = searchParams.get("theme");
  if (themeId) {
    const allThemes = themeCategories.flatMap(category => category.themes);
    const foundTheme = allThemes.find(theme => theme.id === themeId);
    if (foundTheme) {
      initialFilters.theme = foundTheme;
    }
  }
  
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };
  
  const handleFilterChange = (filterType: string, value: any) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };
  
  const handleArrayFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    const currentValues = [...(activeFilters[filterType] || [])];
    
    if (isChecked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      const index = currentValues.indexOf(value);
      if (index !== -1) {
        currentValues.splice(index, 1);
      }
    }
    
    const newFilters = { ...activeFilters, [filterType]: currentValues };
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };
  
  const applyFilters = (filters: any) => {
    let results = [...hotels];
    
    if (filters.country) {
      // Convert country to lowercase for case-insensitive comparison
      const countryLower = filters.country.toLowerCase();
      results = results.filter(hotel => 
        hotel.country.toLowerCase() === countryLower
      );
    }
    
    if (filters.month) {
      // Convert month to proper case for comparison with hotel data
      const monthProperCase = filters.month.charAt(0).toUpperCase() + filters.month.slice(1).toLowerCase();
      results = results.filter(hotel => hotel.availableMonths.includes(monthProperCase));
    }
    
    if (filters.theme) {
      results = results.filter(hotel => 
        hotel.themes.some(theme => theme.id === filters.theme.id)
      );
    }
    
    if (filters.priceRange) {
      if (filters.priceRange > 2000) {
        results = results.filter(hotel => hotel.pricePerMonth > 2000);
      } else {
        results = results.filter(hotel => hotel.pricePerMonth <= filters.priceRange);
      }
    }
    
    // Additional filters can be applied here as they get implemented
    
    setFilteredHotels(results);
  };
  
  // Apply filters on initial load
  useEffect(() => {
    applyFilters(initialFilters);
  }, [location.search]);
  
  // Define property types, styles, room types, and features for filtering
  const propertyTypes = ["Hotel", "Resort", "Boutique Hotel", "Villa", "Apartment", "Guesthouse"];
  const propertyStyles = ["Modern", "Classic", "Rustic", "Minimalist", "Luxury", "Eco-friendly"];
  const roomTypes = ["Single", "Double", "Suite", "Studio", "Penthouse", "Family Room"];
  const hotelFeatures = ["Free WiFi", "Parking", "Restaurant", "Pool", "Spa", "Gym", "24/7 Reception", "Room Service"];
  const roomFeatures = ["Air Conditioning", "TV", "Mini Bar", "Balcony", "Sea View", "Mountain View", "Kitchen", "Workspace"];
  const mealOptions = ["Breakfast Included", "Half Board", "Full Board", "All Inclusive", "Self Catering"];
  const lengthOfStayOptions = ["1-3 months", "3-6 months", "6-12 months", "12+ months"];
  const activityOptions = {
    "On Premises": ["Dancing", "Concerts", "Courses", "Games", "Theater", "Spa"],
    "At Nearby Locations": ["Beach", "Hiking", "Concerts", "Shopping", "Museums", "Sports"]
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-white">Search Results</h1>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="sticky top-20">
                {/* Additional filter sections */}
                <div className="glass-card rounded-xl p-4 space-y-3">
                  {/* Price filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>PRICE PER MONTH</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-2">
                        {[
                          { value: 1000, label: "Up to 1.000 $" },
                          { value: 1500, label: "1.000 $ to 1.500 $" },
                          { value: 2000, label: "1.500 $ to 2.000 $" },
                          { value: 3000, label: "More than 2.000 $" }
                        ].map(option => (
                          <label key={option.value} className="flex items-start">
                            <input 
                              type="radio" 
                              name="priceRange"
                              checked={activeFilters.priceRange === option.value}
                              onChange={() => handleFilterChange("priceRange", option.value)}
                              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                            />
                            <span className="text-sm">{option.label}</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Length of stay filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>LENGTH OF STAY</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-2">
                        {lengthOfStayOptions.map(option => (
                          <label key={option} className="flex items-start">
                            <input 
                              type="radio" 
                              name="lengthOfStay"
                              checked={activeFilters.lengthOfStay === option}
                              onChange={() => handleFilterChange("lengthOfStay", option)}
                              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Month filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>MONTH</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2">
                        <div className="grid grid-cols-2 gap-2">
                          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                            <label key={month} className="flex items-start">
                              <input 
                                type="radio" 
                                name="month"
                                checked={activeFilters.month === month.toLowerCase()}
                                onChange={() => handleFilterChange("month", month.toLowerCase())}
                                className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                              />
                              <span className="text-sm">{month}</span>
                            </label>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Theme filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>THEME</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2">
                        {themeCategories.map((category) => (
                          <Collapsible key={category.category}>
                            <div className="bg-fuchsia-950/30 rounded-lg p-2 mb-2 border border-fuchsia-800/30">
                              <CollapsibleTrigger 
                                className="flex items-center justify-between w-full font-medium text-sm"
                                onClick={() => toggleCategory(category.category)}
                              >
                                <h4>{category.category}</h4>
                                <ChevronRight className={`h-4 w-4 transform transition-transform ${openCategory === category.category ? 'rotate-90' : ''}`} />
                              </CollapsibleTrigger>
                              
                              <CollapsibleContent>
                                <div className="grid grid-cols-1 gap-1 mt-2 pl-2">
                                  {category.themes.map((theme) => (
                                    <label key={theme.id} className="flex items-start">
                                      <input 
                                        type="radio" 
                                        name="theme"
                                        checked={activeFilters.theme?.id === theme.id}
                                        onChange={() => handleFilterChange("theme", theme)}
                                        className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                                      />
                                      <span className="text-sm">{theme.name}</span>
                                    </label>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </div>
                          </Collapsible>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Category filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>CATEGORY</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-2">
                        {["Luxury", "Boutique", "Business", "Family", "Budget", "Resort"].map(category => (
                          <label key={category} className="flex items-start">
                            <input 
                              type="radio" 
                              name="category"
                              checked={activeFilters.category === category}
                              onChange={() => handleFilterChange("category", category)}
                              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                            />
                            <span className="text-sm">{category}</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Country filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>COUNTRY</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-2">
                        {[
                          { value: "spain", label: "Spain 🇪🇸" },
                          { value: "france", label: "France 🇫🇷" },
                          { value: "italy", label: "Italy 🇮🇹" },
                          { value: "usa", label: "USA 🇺🇸" },
                          { value: "egypt", label: "Egypt 🇪🇬" },
                          { value: "turkey", label: "Turkey 🇹🇷" }
                        ].map(country => (
                          <label key={country.value} className="flex items-start">
                            <input 
                              type="radio" 
                              name="country"
                              checked={activeFilters.country === country.value}
                              onChange={() => handleFilterChange("country", country.value)}
                              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                            />
                            <span className="text-sm">{country.label}</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Location filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>LOCATION</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-2">
                        {["City Center", "Beach", "Mountain", "Countryside", "Resort Area", "Historic District"].map(location => (
                          <label key={location} className="flex items-start">
                            <input 
                              type="radio" 
                              name="location"
                              checked={activeFilters.location === location}
                              onChange={() => handleFilterChange("location", location)}
                              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                            />
                            <span className="text-sm">{location}</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Meals filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>MEALS</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-2">
                        {mealOptions.map(option => (
                          <label key={option} className="flex items-start">
                            <input 
                              type="checkbox" 
                              checked={activeFilters.meals?.includes(option)}
                              onChange={(e) => handleArrayFilterChange("meals", option, e.target.checked)}
                              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Property Type filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>TYPE OF PROPERTY</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-2">
                        {propertyTypes.map(type => (
                          <label key={type} className="flex items-start">
                            <input 
                              type="radio" 
                              name="propertyType"
                              checked={activeFilters.propertyType === type}
                              onChange={() => handleFilterChange("propertyType", type)}
                              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                            />
                            <span className="text-sm">{type}</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Property Style filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>STYLE OF PROPERTY</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-2">
                        {propertyStyles.map(style => (
                          <label key={style} className="flex items-start">
                            <input 
                              type="radio" 
                              name="propertyStyle"
                              checked={activeFilters.propertyStyle === style}
                              onChange={() => handleFilterChange("propertyStyle", style)}
                              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                            />
                            <span className="text-sm">{style}</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Room Types filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>ROOM TYPES</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-2">
                        {roomTypes.map(type => (
                          <label key={type} className="flex items-start">
                            <input 
                              type="checkbox" 
                              checked={activeFilters.roomTypes?.includes(type)}
                              onChange={(e) => handleArrayFilterChange("roomTypes", type, e.target.checked)}
                              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                            />
                            <span className="text-sm">{type}</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Hotel Features filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>HOTEL FEATURES</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-2">
                        {hotelFeatures.map(feature => (
                          <label key={feature} className="flex items-start">
                            <input 
                              type="checkbox" 
                              checked={activeFilters.hotelFeatures?.includes(feature)}
                              onChange={(e) => handleArrayFilterChange("hotelFeatures", feature, e.target.checked)}
                              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                            />
                            <span className="text-sm">{feature}</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  
                  {/* Room Features filter */}
                  <Collapsible>
                    <div className="bg-[#5A1876]/50 rounded-lg p-3">
                      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
                        <span>ROOM FEATURES</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-2">
                        {roomFeatures.map(feature => (
                          <label key={feature} className="flex items-start">
                            <input 
                              type="checkbox" 
                              checked={activeFilters.roomFeatures?.includes(feature)}
                              onChange={(e) => handleArrayFilterChange("roomFeatures", feature, e.target.checked)}
                              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                            />
                            <span className="text-sm">{feature}</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                </div>
              </div>
            </div>
            
            {/* Results */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h2 className="text-lg font-bold mb-6 text-white">
                {filteredHotels.length > 0 
                  ? `Found ${filteredHotels.length} hotels` 
                  : "No hotels match your filters"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHotels.map(hotel => (
                  <HotelCard 
                    key={hotel.id}
                    id={hotel.id}
                    name={hotel.name}
                    city={hotel.city}
                    country={hotel.country}
                    stars={hotel.stars}
                    pricePerMonth={hotel.pricePerMonth}
                    themes={hotel.themes.map(theme => theme.name)}
                    image={hotel.images[0]}
                  />
                ))}
              </div>
              
              {filteredHotels.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-fuchsia-900/20 flex items-center justify-center">
                    <Compass className="w-10 h-10 text-fuchsia-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">No matching hotels</h3>
                  <p className="text-white/70 mb-6">Try adjusting your filters to find more options.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
