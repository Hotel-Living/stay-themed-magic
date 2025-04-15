
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FilterState } from '@/components/filters';
import { useThemes } from '@/hooks/useThemes';
import { useHotels } from '@/hooks/useHotels';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Users, CalendarDays, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Elegant hero section with sophisticated design
const ElegantHero = () => {
  return (
    <div className="relative py-20 md:py-32 px-4 overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
      <div className="container mx-auto relative z-10 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#212529]">
            Experience Refined
            <span className="block mt-2 text-[#6c5ce7]">Hotel Living</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-[#495057] mb-8 font-light">
            Discover curated accommodations that blend luxury with community, designed for discerning travelers
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
            <Button asChild className="bg-[#6c5ce7] hover:bg-[#5649d1] px-8 py-6 rounded-lg shadow-md">
              <Link to="/hotels" className="text-lg flex items-center justify-center gap-2 font-medium">
                Browse Collection <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-[#6c5ce7] text-[#6c5ce7] hover:bg-[#6c5ce7]/10 px-8 py-6 rounded-lg">
              <Link to="/affinity-stays" className="text-lg flex items-center justify-center gap-2 font-medium">
                Explore Affinity Stays
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-gradient-to-r from-[#a29bfe]/10 to-[#6c5ce7]/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 left-[15%] w-40 h-40 bg-gradient-to-r from-[#dfe6e9]/20 to-[#b2bec3]/20 rounded-full filter blur-3xl"></div>
    </div>
  );
};

// Refined search section with elegant styling
const RefinedSearch = ({ onFilterChange, availableThemes }: { onFilterChange: (filters: FilterState) => void, availableThemes: string[] }) => {
  const [destination, setDestination] = useState('');
  
  const handleSearch = () => {
    const newFilters: FilterState = {
      country: destination || null,
      month: null,
      theme: null,
      priceRange: { min: 0, max: 1000 },
      searchTerm: null,
      minPrice: 0,
      maxPrice: 1000,
      stars: [],
      location: null,
      propertyType: null
    };
    
    onFilterChange(newFilters);
  };
  
  return (
    <div className="relative -mt-12 z-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100"
        >
          <h2 className="text-2xl font-serif font-semibold text-[#212529] mb-6 text-center">Find Your Ideal Accommodation</h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-[#6c757d] text-sm mb-2 font-medium">Destination</label>
              <div className="relative">
                <input 
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where would you like to stay?"
                  className="w-full border border-[#dee2e6] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6c5ce7]/50 focus:border-[#6c5ce7]"
                />
                <MapPin className="absolute right-3 top-3 text-[#adb5bd]" size={18} />
              </div>
            </div>
            
            <div className="md:w-1/4">
              <label className="block text-[#6c757d] text-sm mb-2 font-medium">Theme</label>
              <div className="relative">
                <select 
                  className="w-full border border-[#dee2e6] rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-1 focus:ring-[#6c5ce7]/50 focus:border-[#6c5ce7]"
                  defaultValue=""
                >
                  <option value="" disabled>Select theme</option>
                  {availableThemes.map(theme => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
                <CalendarDays className="absolute right-3 top-3 text-[#adb5bd]" size={18} />
              </div>
            </div>
            
            <div className="md:w-auto self-end">
              <Button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-[#6c5ce7] hover:bg-[#5649d1] px-8 py-3 rounded-lg shadow-sm"
              >
                <Search size={18} />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Sophisticated feature cards with elegant styling
const SophisticatedFeatures = () => {
  const features = [
    { 
      icon: <Star className="w-8 h-8 text-[#6c5ce7]" />, 
      title: "Curated Selection", 
      description: "Hand-selected properties that meet our exacting standards for quality, comfort, and ambiance." 
    },
    { 
      icon: <Users className="w-8 h-8 text-[#6c5ce7]" />, 
      title: "Tailored Communities", 
      description: "Connect with like-minded individuals who share your interests and passions." 
    },
    { 
      icon: <Heart className="w-8 h-8 text-[#6c5ce7]" />, 
      title: "Personalized Experience", 
      description: "Attentive service and customized stays that anticipate and fulfill your preferences." 
    }
  ];
  
  return (
    <div className="py-24 px-4 bg-[#f8f9fa]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#212529]">A Superior Living Experience</h2>
          <p className="text-lg text-[#495057] max-w-2xl mx-auto font-light">
            Discover the difference of our meticulously curated hotel-living concept, where every detail is designed to enhance your experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all group border border-gray-100"
            >
              <div className="bg-[#f3f4f6] rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#6c5ce7]/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-[#212529]">{feature.title}</h3>
              <p className="text-[#6c757d] font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Elegant testimonials with refined design
const ElegantTestimonials = () => {
  const testimonials = [
    {
      quote: "The experience of hotel-living has completely transformed my approach to travel. The attention to detail and sense of community is unparalleled.",
      author: "Sarah J., Marketing Executive",
      avatar: "/lovable-uploads/72defac9-6468-4f27-97f3-4ef30cecec3a.png"
    },
    {
      quote: "I've discovered a remarkable network of professionals in my field through the themed stays. It's been invaluable for both my career and personal growth.",
      author: "Michael T., Software Developer",
      avatar: "/lovable-uploads/0143058c-8fff-4da1-92a4-c00ad1b52595.png"
    },
    {
      quote: "The perfect balance of privacy and community, allowing me to focus on my creative pursuits while enjoying meaningful connections with fellow guests.",
      author: "Elena R., Content Creator",
      avatar: "/lovable-uploads/9e9a15b6-7cdd-4711-b6c0-e805cfba3147.png"
    }
  ];
  
  return (
    <div className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#212529]">Guest Reflections</h2>
          <p className="text-lg text-[#495057] max-w-2xl mx-auto font-light">
            Insights from those who have experienced our distinctive approach to hotel-living.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#f8f9fa] rounded-xl p-8 shadow-sm flex flex-col border border-gray-100"
            >
              <div className="flex-1">
                <p className="text-[#495057] font-light italic mb-6">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <p className="text-[#212529] font-medium">{testimonial.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sophisticated CTA section
const SophisticatedCta = () => {
  return (
    <div className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-xl overflow-hidden relative shadow-lg"
        >
          <div className="absolute inset-0 bg-[url('/lovable-uploads/3265eb79-ce84-4e22-8944-0528b7ea16cd.png')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          <div className="px-8 py-16 md:p-16 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">Elevate Your Living Experience</h2>
              <p className="text-lg text-white/90 mb-8 font-light">
                Join our community of discerning guests who have discovered a more refined approach to accommodation.
                Experience comfort, connection, and convenience in a setting designed for sophistication.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="bg-white text-[#6c5ce7] hover:bg-white/90 px-8 py-3 rounded-lg shadow-md">
                  <Link to="/signup">Create Account</Link>
                </Button>
                <Button asChild variant="outline" className="bg-transparent text-white border border-white hover:bg-white/10 px-8 py-3 rounded-lg">
                  <Link to="/hotels">Browse Hotels</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function IndexCOPIA() {
  const { data: themes } = useThemes();
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: { min: 0, max: 1000 },
    searchTerm: null,
    minPrice: 0,
    maxPrice: 1000,
    stars: [],
    location: null,
    propertyType: null
  });

  // Initialize useHotels hook to prepare for filtering
  const { updateFilters } = useHotels({ initialFilters: filters });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  // Extract theme names for the filter dropdown
  const themeNames = themes ? themes.map(theme => theme.name) : [];

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />
      
      <main className="flex-1 w-full">
        <ElegantHero />
        <RefinedSearch onFilterChange={handleFilterChange} availableThemes={themeNames} />
        <SophisticatedFeatures />
        <ElegantTestimonials />
        <SophisticatedCta />
      </main>
      
      <Footer />
    </div>
  );
}
