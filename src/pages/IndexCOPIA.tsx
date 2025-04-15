
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FilterState } from '@/components/filters';
import { useThemes } from '@/hooks/useThemes';
import { useHotels } from '@/hooks/useHotels';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, Check, Clock, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Create a new component for the hero section
const ElegantHero = () => {
  return (
    <div className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#300A38]/80 via-[#460F54]/70 to-[#300A38]/90"></div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/ca361635-7b30-4d8a-8f92-9b2471f6fe29.png')] bg-cover bg-center opacity-20"></div>
      </div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-[#FFF600] via-[#FFC500] to-[#FFF600] bg-clip-text text-transparent animate-text-slow">
              Elevate Your Lifestyle
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/80 mb-8">
            Experience the future of living. Curated hotel stays with like-minded people.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
            <Link to="/hotels" className="bg-white text-[#860493] hover:bg-white/90 px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-all hover:shadow-lg">
              Explore Hotels <ArrowRight size={18} />
            </Link>
            <Link to="/affinity-stays" className="bg-[#D946EF]/20 backdrop-blur-sm text-white border border-[#D946EF]/40 hover:bg-[#D946EF]/30 px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-all">
              Learn About Affinity Stays
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Create a new component for the search section
const ElegantSearch = ({ onFilterChange, availableThemes }: { onFilterChange: (filters: FilterState) => void, availableThemes: string[] }) => {
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
    <div className="relative -mt-16 z-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Find Your Perfect Stay</h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-white/80 text-sm mb-1">Destination</label>
              <div className="relative">
                <input 
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#D946EF]/50"
                />
              </div>
            </div>
            
            <div className="md:w-1/4">
              <label className="block text-white/80 text-sm mb-1">Theme</label>
              <select 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#D946EF]/50"
                defaultValue=""
              >
                <option value="" disabled>Select theme</option>
                {availableThemes.map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>
            
            <div className="md:w-auto self-end">
              <button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-[#D946EF] hover:bg-[#C026D3] text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Search size={18} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Create a features section
const FeaturesSection = () => {
  const features = [
    { 
      icon: <Star className="w-8 h-8 text-[#D946EF]" />, 
      title: "Exceptional Quality", 
      description: "Carefully selected premium hotels that meet our high standards for comfort and amenities." 
    },
    { 
      icon: <Check className="w-8 h-8 text-[#D946EF]" />, 
      title: "Themed Experiences", 
      description: "Choose hotels based on your interests and connect with people who share your passions." 
    },
    { 
      icon: <Clock className="w-8 h-8 text-[#D946EF]" />, 
      title: "Flexible Stays", 
      description: "From weekend getaways to extended living arrangements, tailored to your schedule." 
    },
    { 
      icon: <Heart className="w-8 h-8 text-[#D946EF]" />, 
      title: "Personalized Service", 
      description: "Enjoy personalized attention and services designed to enhance your stay." 
    },
    { 
      icon: <Users className="w-8 h-8 text-[#D946EF]" />, 
      title: "Community Events", 
      description: "Regular social gatherings and activities to foster connections and friendships." 
    }
  ];
  
  return (
    <div className="py-20 px-4 bg-gradient-to-b from-[#460F54]/10 to-transparent">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Hotel-Living?</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover a new way of living that combines the best of hotel luxury with the comfort of a long-term home.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group"
            >
              <div className="bg-[#460F54]/50 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Create a testimonials section
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Hotel-Living completely transformed how I travel for work. I've met amazing people and no longer feel isolated on business trips.",
      author: "Sarah J., Marketing Executive",
      avatar: "/lovable-uploads/72defac9-6468-4f27-97f3-4ef30cecec3a.png"
    },
    {
      quote: "The themed stays are brilliant! I chose a tech-focused hotel and connected with professionals in my industry from around the world.",
      author: "Michael T., Software Developer",
      avatar: "/lovable-uploads/0143058c-8fff-4da1-92a4-c00ad1b52595.png"
    },
    {
      quote: "As a digital nomad, Hotel-Living gives me the perfect balance of comfort, community, and convenience wherever I go.",
      author: "Elena R., Content Creator",
      avatar: "/lovable-uploads/9e9a15b6-7cdd-4711-b6c0-e805cfba3147.png"
    }
  ];
  
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Guests Say</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Hear from people who have experienced the Hotel-Living difference.
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
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col"
            >
              <div className="flex-1">
                <p className="text-white/80 italic mb-6">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <p className="text-white/90 font-medium">{testimonial.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Create a CTA section
const CtaSection = () => {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#7030A0] to-[#9F00FF] rounded-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[url('/lovable-uploads/3265eb79-ce84-4e22-8944-0528b7ea16cd.png')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          <div className="px-8 py-16 md:p-16 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Elevate Your Living Experience?</h2>
              <p className="text-lg text-white/80 mb-8">
                Join thousands of satisfied guests who've discovered a better way to stay.
                No more household chores, just comfort, community, and convenience.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup" className="bg-white text-[#7030A0] hover:bg-white/90 px-8 py-3 rounded-md font-medium transition-all">
                  Create Account
                </Link>
                <Link to="/hotels" className="bg-transparent text-white border border-white hover:bg-white/10 px-8 py-3 rounded-md font-medium transition-all">
                  Browse Hotels
                </Link>
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
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Navbar />
      
      <main className="flex-1 w-full">
        <ElegantHero />
        <ElegantSearch onFilterChange={handleFilterChange} availableThemes={themeNames} />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
}
