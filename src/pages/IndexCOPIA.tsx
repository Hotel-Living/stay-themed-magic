
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FilterState } from '@/components/filters';
import { useThemes } from '@/hooks/useThemes';
import { useHotels } from '@/hooks/useHotels';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, Sparkles, Clock, Heart, Users, MapPin, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Create a new component for the hero section with a lighter design
const ModernHero = () => {
  return (
    <div className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-b from-[#f1f5f9] to-[#e2e8f0]">
      <div className="container mx-auto relative z-10 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#0f172a]">
            Discover Your Perfect
            <span className="bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#6366f1] bg-clip-text text-transparent block mt-2">
              Hotel Experience
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-[#475569] mb-8">
            Curated stays that match your lifestyle and connect you with like-minded people
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
            <Button asChild className="bg-[#7c3aed] hover:bg-[#6d28d9] px-8 py-6 rounded-full shadow-lg">
              <Link to="/hotels" className="text-lg flex items-center justify-center gap-2">
                Browse Hotels <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10 px-8 py-6 rounded-full shadow-md">
              <Link to="/affinity-stays" className="text-lg flex items-center justify-center gap-2">
                Learn About Affinity Stays
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Abstract shapes for visual interest */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-gradient-to-r from-[#8b5cf6]/20 to-[#6366f1]/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 left-[15%] w-40 h-40 bg-gradient-to-r from-[#ec4899]/20 to-[#8b5cf6]/20 rounded-full filter blur-3xl"></div>
    </div>
  );
};

// Create a new search section with a modern floating design
const ModernSearch = ({ onFilterChange, availableThemes }: { onFilterChange: (filters: FilterState) => void, availableThemes: string[] }) => {
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
          className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-[#0f172a] mb-6 text-center">Find Your Perfect Stay</h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-[#64748b] text-sm mb-1">Destination</label>
              <div className="relative">
                <input 
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                  className="w-full border border-[#e2e8f0] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50"
                />
                <MapPin className="absolute right-3 top-3 text-[#94a3b8]" size={18} />
              </div>
            </div>
            
            <div className="md:w-1/4">
              <label className="block text-[#64748b] text-sm mb-1">Theme</label>
              <div className="relative">
                <select 
                  className="w-full border border-[#e2e8f0] rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50"
                  defaultValue=""
                >
                  <option value="" disabled>Select theme</option>
                  {availableThemes.map(theme => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
                <Building className="absolute right-3 top-3 text-[#94a3b8]" size={18} />
              </div>
            </div>
            
            <div className="md:w-auto self-end">
              <Button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-[#7c3aed] hover:bg-[#6d28d9] px-8 py-3 rounded-lg shadow-md"
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

// Modern feature cards
const FeaturesSection = () => {
  const features = [
    { 
      icon: <Star className="w-8 h-8 text-[#7c3aed]" />, 
      title: "Premium Selection", 
      description: "Handpicked hotels that exceed expectations in quality, comfort, and service." 
    },
    { 
      icon: <Sparkles className="w-8 h-8 text-[#7c3aed]" />, 
      title: "Themed Experiences", 
      description: "Choose your interest and connect with people who share your passion." 
    },
    { 
      icon: <Clock className="w-8 h-8 text-[#7c3aed]" />, 
      title: "Flexible Stays", 
      description: "From weekend getaways to extended living arrangements tailored to your schedule." 
    },
    { 
      icon: <Heart className="w-8 h-8 text-[#7c3aed]" />, 
      title: "Personalized Service", 
      description: "Enjoy attentive service designed to enhance your stay and comfort." 
    },
    { 
      icon: <Users className="w-8 h-8 text-[#7c3aed]" />, 
      title: "Community Events", 
      description: "Regular social gatherings and activities to foster connections and friendships." 
    }
  ];
  
  return (
    <div className="py-20 px-4 bg-[#f8fafc]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0f172a]">Why Choose Hotel-Living?</h2>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
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
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all group"
            >
              <div className="bg-[#f3f4f6] rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#7c3aed]/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#0f172a]">{feature.title}</h3>
              <p className="text-[#64748b]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Modern testimonials with clean design
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
    <div className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0f172a]">What Our Guests Say</h2>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
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
              className="bg-[#f8fafc] rounded-xl p-6 shadow-sm flex flex-col"
            >
              <div className="flex-1">
                <p className="text-[#334155] italic mb-6">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <p className="text-[#0f172a] font-medium">{testimonial.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Modern CTA section
const CtaSection = () => {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] rounded-2xl overflow-hidden relative shadow-xl"
        >
          <div className="absolute inset-0 bg-[url('/lovable-uploads/3265eb79-ce84-4e22-8944-0528b7ea16cd.png')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
          <div className="px-8 py-16 md:p-16 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Elevate Your Living Experience?</h2>
              <p className="text-lg text-white/90 mb-8">
                Join thousands of satisfied guests who've discovered a better way to stay.
                No more household chores, just comfort, community, and convenience.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="bg-white text-[#7c3aed] hover:bg-white/90 px-8 py-3 rounded-lg shadow-lg">
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
        <ModernHero />
        <ModernSearch onFilterChange={handleFilterChange} availableThemes={themeNames} />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
}
