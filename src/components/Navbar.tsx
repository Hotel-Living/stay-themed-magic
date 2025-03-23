
import { Link } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { motion } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="container px-4 sm:px-6 py-3 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-6"
        >
          <Logo />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-6"
        >
          {[
            { to: "/signup", label: "REGISTER" },
            { to: "/login", label: "LOGIN" },
            { to: "/faq", label: "FAQ" },
            { to: "/hoteles", label: "HOTELS" }
          ].map((item, index) => (
            <Link 
              key={index}
              to={item.to} 
              className="relative overflow-hidden group"
            >
              <span className="text-gray-700 font-semibold hover:text-indigo-600 transition-colors duration-300 text-sm">
                {item.label}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          ))}
        </motion.div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-gray-700" />
          ) : (
            <Menu className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 top-16 bg-white z-40 flex flex-col p-6 gap-3 transition-all duration-300 ease-in-out transform md:hidden",
        isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <nav className="flex flex-col space-y-6 items-center pt-10">
          {[
            { to: "/signup", label: "REGISTER" },
            { to: "/login", label: "LOGIN" },
            { to: "/faq", label: "FAQ" },
            { to: "/hoteles", label: "HOTELS" }
          ].map((item, index) => (
            <Link 
              key={index}
              to={item.to} 
              onClick={() => setIsMenuOpen(false)} 
              className="text-gray-800 font-semibold text-lg hover:text-indigo-600 transition-colors flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-indigo-500" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
