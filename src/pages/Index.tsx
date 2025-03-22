
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSection, FilterState } from "@/components/FilterSection";
import { Building, Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-500/30 rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-700/20 rounded-full filter blur-[100px]"></div>
          </div>
          
          <div className="container relative z-10 max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 leading-tight">
              <span className="text-gradient glow">Immersive Hotel</span> <br />
              <span>Experiences for</span> <br />
              <span className="text-gradient glow">Extended Stays</span>
            </h1>
            
            <div className="max-w-4xl mx-auto space-y-6 mb-16">
              {[
                "Forget about house chores",
                "Multiply your social life",
                "Choose hotels by your favorite themes",
                "Surround yourself with like-minded people"
              ].map((slogan, index) => (
                <div key={index} className="flex items-center gap-3 text-xl md:text-2xl">
                  <div className="w-8 h-8 rounded-full bg-fuchsia-500/20 flex-shrink-0 flex items-center justify-center">
                    <Check className="w-4 h-4 text-fuchsia-400" />
                  </div>
                  <p className="text-left">{slogan}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-10 px-4">
          <div className="container max-w-6xl mx-auto">
            <FilterSection onFilterChange={handleFilterChange} showSearchButton={true} />
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
      
      <Footer />
    </div>
  );
}
