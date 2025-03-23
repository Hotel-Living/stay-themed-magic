
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSection, FilterState } from "@/components/FilterSection";
import { Check, Stars, Rocket, Zap, Users, Hotel } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { FloatingElements } from "@/components/FloatingElements";

export default function Index() {
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const isMobile = useIsMobile();
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-sky-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
      <FloatingElements />
      <Navbar />
      
      <main className="flex-1 pt-24 pb-8 flex flex-col justify-center z-10">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="py-4 px-4 overflow-hidden"
        >
          <div className="container max-w-6xl mx-auto text-center relative">
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-300 rounded-full blur-3xl opacity-20"></div>
            
            <motion.h1 
              variants={fadeIn}
              className={`${isMobile ? 'text-3xl' : 'text-5xl md:text-7xl'} font-bold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600`}
            >
              The Future of Living
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} mb-10 max-w-3xl mx-auto font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500`}
            >
              Live in Hotels  -  Boost your Life
            </motion.p>
            
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-10">
              <div className="space-y-2">
                {[
                  { text: "Get rid of household chores", icon: <Hotel className="w-4 h-4 text-white" /> },
                  { text: "Select hotels upon favourite themes", icon: <Stars className="w-4 h-4 text-white" /> }
                ].map((slogan, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    className={`flex items-center gap-3 p-2 pl-1 ml-2 ${isMobile ? 'text-sm justify-start' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      {slogan.icon}
                    </div>
                    <p className={`${isMobile ? 'text-sm' : ''} text-left font-medium text-gray-800`}>{slogan.text}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="space-y-2">
                {[
                  { text: "Boost your social life", icon: <Users className="w-4 h-4 text-white" /> },
                  { text: "Find and enjoy your favorite people", icon: <Rocket className="w-4 h-4 text-white" /> }
                ].map((slogan, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    className={`flex items-center gap-3 p-2 pl-1 ml-2 ${isMobile ? 'text-sm justify-start' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex-shrink-0 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      {slogan.icon}
                    </div>
                    <p className={`${isMobile ? 'text-sm' : ''} text-left font-medium text-gray-800`}>{slogan.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Filter Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="py-0 px-4 mb-16"
        >
          <div className="container max-w-2xl mx-auto">
            <div className="glass-card p-6 rounded-2xl shadow-xl">
              <FilterSection onFilterChange={handleFilterChange} showSearchButton={true} />
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}
