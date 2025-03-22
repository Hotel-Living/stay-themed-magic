
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FilterSection, FilterState } from "@/components/FilterSection";
import { HotelCard } from "@/components/HotelCard";
import { hotels, Hotel } from "@/utils/data";
import { ArrowRight, Building, Calendar, Compass, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Starfield from "@/components/Starfield";

export default function Index() {
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(hotels);
  
  const handleFilterChange = (filters: FilterState) => {
    let results = [...hotels];
    
    if (filters.country) {
      results = results.filter(hotel => hotel.country === filters.country);
    }
    
    if (filters.month) {
      results = results.filter(hotel => hotel.availableMonths.includes(filters.month!));
    }
    
    if (filters.theme) {
      results = results.filter(hotel => 
        hotel.themes.some(theme => theme.id === filters.theme!.id)
      );
    }
    
    if (filters.priceRange) {
      if (filters.priceRange > 2000) {
        results = results.filter(hotel => hotel.pricePerMonth > 2000);
      } else {
        results = results.filter(hotel => hotel.pricePerMonth <= filters.priceRange);
      }
    }
    
    setFilteredHotels(results);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-500/30 rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-700/20 rounded-full filter blur-[100px]"></div>
          </div>
          
          <div className="container relative z-10 max-w-6xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 backdrop-blur-sm">
              <span className="text-sm font-medium text-fuchsia-300">Discover thematic extended stays</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient glow">Immersive Hotel</span> <br />
              <span>Experiences for</span> <br />
              <span className="text-gradient glow">Extended Stays</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10">
              Book themed hotels for 8, 16, 24, or 32-day stays matching your interests and passions. Transform your trips into life-changing experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link 
                to="/hotels" 
                className="py-3 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300 flex items-center gap-2"
              >
                Browse Hotels <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/signup" 
                className="py-3 px-8 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 hover:bg-fuchsia-500/20 text-foreground font-medium transition-all duration-300"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-10 px-4">
          <div className="container max-w-6xl mx-auto">
            <FilterSection onFilterChange={handleFilterChange} />
          </div>
        </section>
        
        {/* Hotel Listings */}
        <section className="py-10 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              {filteredHotels.length > 0 
                ? `Showing ${filteredHotels.length} available hotels` 
                : "No hotels match your filters"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
            
            {filteredHotels.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-fuchsia-900/20 flex items-center justify-center">
                  <Compass className="w-10 h-10 text-fuchsia-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No matching hotels</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters to find more options.</p>
                <button 
                  onClick={() => handleFilterChange({
                    country: null,
                    month: null,
                    theme: null,
                    priceRange: null
                  })}
                  className="py-2 px-6 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 hover:bg-fuchsia-500/20 text-fuchsia-300 font-medium transition"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 bg-fuchsia-950/20">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Hotel-Living Works</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Our platform connects you with theme-focused hotels for extended stays that match your interests and passions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Compass className="w-6 h-6" />}
                title="Find Your Theme"
                description="Browse hotels by theme, from language immersion to culinary experiences and more."
              />
              <FeatureCard 
                icon={<Calendar className="w-6 h-6" />}
                title="Book Extended Stays"
                description="Choose from 8, 16, 24, or 32-day packages designed for deep immersion."
              />
              <FeatureCard 
                icon={<Users className="w-6 h-6" />}
                title="Connect with Like-minds"
                description="Join a community of travelers with similar interests and passions."
              />
            </div>
          </div>
        </section>
        
        {/* Hotel Partners Section */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 glass-card rounded-2xl p-8">
              <div className="max-w-lg">
                <h2 className="text-3xl font-bold mb-4">Own a Hotel?</h2>
                <p className="text-foreground/80 mb-6">
                  Partner with Hotel-Living.com to list your themed hotel and reach guests seeking extended immersive stays.
                </p>
                <Link
                  to="/hotel-dashboard"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30 hover:bg-fuchsia-500/20 text-fuchsia-300 font-medium transition"
                >
                  <Building className="w-5 h-5" />
                  Join as Hotel Partner
                </Link>
              </div>
              
              <div className="glass-card rounded-xl p-6 max-w-sm">
                <h3 className="font-bold mb-4">Benefits for Hotels</h3>
                <ul className="space-y-3">
                  {[
                    "Access to travelers seeking extended stays",
                    "Showcase your thematic specialties",
                    "Reduce guest turnover with longer bookings",
                    "Free listing and dashboard tools"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-fuchsia-400" />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary py-10 px-4 border-t border-fuchsia-900/20">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gradient">Hotel-Living.com</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Transforming travel through themed extended stays.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Hotels', 'FAQ', 'About Us'].map(link => (
                  <li key={link}>
                    <Link to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-foreground/70 hover:text-fuchsia-300 transition">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3">For Users</h4>
              <ul className="space-y-2">
                {['Sign Up', 'Log In', 'My Bookings', 'My Account'].map(link => (
                  <li key={link}>
                    <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-foreground/70 hover:text-fuchsia-300 transition">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3">For Hotels</h4>
              <ul className="space-y-2">
                {['Partner with Us', 'Hotel Dashboard', 'Resources', 'Support'].map(link => (
                  <li key={link}>
                    <Link to={link === 'Hotel Dashboard' ? '/hotel-dashboard' : `/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-foreground/70 hover:text-fuchsia-300 transition">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-fuchsia-900/20 mt-8 pt-8 text-center text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-card rounded-xl p-6 h-full animate-fade-in">
      <div className="w-12 h-12 rounded-lg bg-fuchsia-500/20 flex items-center justify-center mb-4 text-fuchsia-400">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/80">{description}</p>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
