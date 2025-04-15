import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FilterState } from '@/components/filters';
import { useThemes } from '@/hooks/useThemes';
import { useHotels } from '@/hooks/useHotels';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Users, Zap, Heart, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Dynamic Background Component
const DynamicBackground = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [
    "/lovable-uploads/c7742345-9823-4422-bafa-83b8d1fee4bd.png",
    "/lovable-uploads/3265eb79-ce84-4e22-8944-0528b7ea16cd.png",
    "/lovable-uploads/23962811-66f0-4fdf-ba22-b1aab72cc267.png",
    "/lovable-uploads/e6fccee7-fe77-4595-9f44-3fadf9a43325.png",
    "/lovable-uploads/a6661243-e289-44fa-a726-a8e3fb743d43.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {backgrounds.map((bg, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentBg ? 0.8 : 0 }}
          transition={{ duration: 1.5 }}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
    </div>
  );
};

// Bold, Daring Hero Section
const BoldHero = () => {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="container mx-auto relative z-10 max-w-6xl"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-sm uppercase tracking-wider drop-shadow-lg">
              Experience Revolution
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            <span className="block mb-2">Live Beyond</span>
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 bg-clip-text text-transparent">
              Ordinary
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 mb-12 leading-relaxed">
            Discover extraordinary accommodations that transform your travel experience into a 
            remarkable journey of discovery and connection.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
            <Button asChild className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 px-8 py-7 text-lg rounded-xl shadow-lg group transition-all duration-300">
              <Link to="/hotels" className="flex items-center justify-center gap-2 font-semibold">
                Explore Collection
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-2 border-purple-500 text-white hover:bg-purple-500/20 px-8 py-7 text-lg rounded-xl">
              <Link to="/affinity-stays" className="flex items-center justify-center gap-2 font-semibold">
                Discover Affinity Stays
                <Globe size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-[5%] w-96 h-96 bg-gradient-to-r from-purple-600/30 to-pink-600/20 rounded-full filter blur-[120px]" />
      <div className="absolute bottom-1/4 left-[10%] w-72 h-72 bg-gradient-to-r from-blue-600/20 to-cyan-600/10 rounded-full filter blur-[100px]" />
    </section>
  );
};

// Bold, Enticing Search Section
const BoldSearch = ({ onFilterChange, availableThemes }: { onFilterChange: (filters: FilterState) => void, availableThemes: string[] }) => {
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
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-[0_10px_50px_rgba(138,58,217,0.2)] p-8 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Find Your Extraordinary Escape</h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-300 text-sm mb-2 font-medium">Destination</label>
              <div className="relative">
                <input 
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where would you like to stay?"
                  className="w-full bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <MapPin className="absolute right-3 top-4 text-purple-400" size={20} />
              </div>
            </div>
            
            <div className="md:w-1/4">
              <label className="block text-gray-300 text-sm mb-2 font-medium">Theme</label>
              <div className="relative">
                <select 
                  className="w-full bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-gray-900 text-white">Select theme</option>
                  {availableThemes.map(theme => (
                    <option key={theme} value={theme} className="bg-gray-900 text-white">{theme}</option>
                  ))}
                </select>
                <Sparkles className="absolute right-3 top-4 text-purple-400" size={20} />
              </div>
            </div>
            
            <div className="md:w-auto self-end">
              <Button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-4 rounded-xl shadow-lg"
              >
                <Search size={20} className="mr-2" />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Bold Feature Cards
const BoldFeatures = () => {
  const features = [
    { 
      icon: <Star className="w-10 h-10 text-yellow-400" />, 
      title: "Curated Excellence", 
      description: "Hand-selected properties that exceed expectations, offering unparalleled quality, comfort, and ambiance." 
    },
    { 
      icon: <Users className="w-10 h-10 text-purple-400" />, 
      title: "Vibrant Communities", 
      description: "Connect with like-minded individuals who share your passions and elevate your experience through meaningful connections." 
    },
    { 
      icon: <Zap className="w-10 h-10 text-pink-400" />, 
      title: "Transformative Experiences", 
      description: "Immersive stays that go beyond accommodation to create memorable moments and life-changing encounters." 
    }
  ];
  
  return (
    <div className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            A <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Revolutionary</span> Approach
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the difference of our meticulously crafted hotel-living concept, where every detail is designed to elevate your journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden hover:shadow-[0_10px_40px_rgba(138,58,217,0.3)] transition-all duration-500">
                <CardContent className="p-8">
                  <div className="mb-6 p-4 inline-flex rounded-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 group-hover:from-purple-800/60 group-hover:to-pink-800/60 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Bold Testimonials
const BoldTestimonials = () => {
  const testimonials = [
    {
      quote: "The concept of living in hotels has transformed my professional life. I've made connections that led to business opportunities I never would have discovered otherwise.",
      author: "Sarah J., Marketing Executive",
      avatar: "/lovable-uploads/72defac9-6468-4f27-97f3-4ef30cecec3a.png"
    },
    {
      quote: "I've discovered an incredible network through the themed stays. In just three months, I've collaborated with people who've taken my creative work to new heights.",
      author: "Michael T., Software Developer",
      avatar: "/lovable-uploads/0143058c-8fff-4da1-92a4-c00ad1b52595.png"
    },
    {
      quote: "The perfect balance of privacy and community. I can focus on my work while enjoying meaningful connections with like-minded professionals and creators.",
      author: "Elena R., Content Creator",
      avatar: "/lovable-uploads/9e9a15b6-7cdd-4711-b6c0-e805cfba3147.png"
    }
  ];
  
  return (
    <div className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Transformative <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Experiences</span>
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights from those who have embraced our revolutionary approach to hotel-living.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-black/30 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden hover:shadow-[0_10px_40px_rgba(138,58,217,0.3)] transition-all duration-500">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex-1 mb-8">
                    <svg className="w-10 h-10 text-purple-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                    <p className="text-gray-300 italic leading-relaxed text-lg">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                    />
                    <p className="text-white font-medium">{testimonial.author}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Bold CTA Section
const BoldCta = () => {
  return (
    <div className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-900/70 to-pink-900/70 backdrop-blur-xl border border-purple-500/40 rounded-2xl overflow-hidden relative shadow-[0_20px_80px_rgba(138,58,217,0.3)]"
        >
          <div className="absolute inset-0 bg-[url('/lovable-uploads/3265eb79-ce84-4e22-8944-0528b7ea16cd.png')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
          <div className="px-8 py-16 md:p-16 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Transform Your <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Living Experience</span>
                </h2>
                <p className="text-xl text-gray-200 mb-10 leading-relaxed">
                  Join our community of forward-thinking individuals who have discovered a revolutionary approach to accommodation.
                  Experience connection, convenience, and comfort in a setting designed for today's dynamic lifestyle.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-6 text-lg rounded-xl shadow-lg group transition-all duration-300">
                    <Link to="/signup" className="flex items-center gap-2 font-semibold">
                      Start Your Journey
                      <Heart size={20} className="group-hover:scale-110 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
                    <Link to="/hotels" className="font-semibold">Explore Properties</Link>
                  </Button>
                </div>
              </motion.div>
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
    <div className="flex flex-col min-h-screen w-full">
      <DynamicBackground />
      <Navbar />
      
      <main className="flex-1 w-full">
        <BoldHero />
        <BoldSearch onFilterChange={handleFilterChange} availableThemes={themeNames} />
        <BoldFeatures />
        <BoldTestimonials />
        <BoldCta />
      </main>
      
      <Footer />
    </div>
  );
}
