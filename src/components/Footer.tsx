
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Separator } from "./ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function Footer() {
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-white/90 backdrop-blur-md py-8 px-4 border-t border-indigo-100 relative z-10">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="py-4 w-full">
            {/* Logo centered */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <Logo />
            </motion.div>
          
            {/* Three rounded links with added spacing below the logo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              {[
                { to: "/hoteles", label: "HOTELS" },
                { to: "/signup", label: "REGISTER" },
                { to: "/signin", label: "SIGN IN" }
              ].map((link, index) => (
                <Link 
                  key={index}
                  to={link.to} 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 px-5 py-2 text-xs rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1"
                >
                  <Zap className="w-3 h-3" />
                  {link.label}
                </Link>
              ))}
            </motion.div>
          
            {/* Six text links with increased spacing between them */}
            {isMobile ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-y-4 mb-8 max-w-full mx-auto"
              >
                <Link to="/faq" className="text-gray-600 hover:text-indigo-600 text-xs font-medium text-center transition-colors duration-300">
                  FAQ
                </Link>
                <Link to="/our-values" className="text-gray-600 hover:text-indigo-600 text-xs font-medium text-center transition-colors duration-300">
                  Our Values
                </Link>
                <Link to="/our-services" className="text-gray-600 hover:text-indigo-600 text-xs font-medium text-center transition-colors duration-300">
                  Our Services
                </Link>
                <Link to="/privacy" className="text-gray-600 hover:text-indigo-600 text-xs font-medium text-center transition-colors duration-300">
                  Privacy & Cookies
                </Link>
                <Link to="/terms" className="text-gray-600 hover:text-indigo-600 text-xs font-medium text-center transition-colors duration-300">
                  Terms & Conditions
                </Link>
                <Link to="/customer-service" className="text-gray-600 hover:text-indigo-600 text-xs font-medium text-center transition-colors duration-300">
                  Customer Service
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center mb-8 max-w-full mx-auto"
              >
                <Link to="/faq" className="text-gray-600 hover:text-indigo-600 text-xs font-medium px-8 transition-colors duration-300">
                  FAQ
                </Link>
                <Link to="/our-values" className="text-gray-600 hover:text-indigo-600 text-xs font-medium px-8 transition-colors duration-300">
                  Our Values
                </Link>
                <Link to="/our-services" className="text-gray-600 hover:text-indigo-600 text-xs font-medium px-8 transition-colors duration-300">
                  Our Services
                </Link>
                <Link to="/privacy" className="text-gray-600 hover:text-indigo-600 text-xs font-medium px-8 transition-colors duration-300">
                  Privacy & Cookies
                </Link>
                <Link to="/terms" className="text-gray-600 hover:text-indigo-600 text-xs font-medium px-8 transition-colors duration-300">
                  Terms & Conditions
                </Link>
                <Link to="/customer-service" className="text-gray-600 hover:text-indigo-600 text-xs font-medium px-8 transition-colors duration-300">
                  Customer Service
                </Link>
              </motion.div>
            )}
          </div>
        </div>
        
        <Separator className="bg-indigo-100 mb-8" />
        
        <div className="text-center text-xs text-gray-500">
          <p className="mb-2">&copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.</p>
          <p className="text-2xs whitespace-normal max-w-3xl mx-auto">
            This site, as well as its innovative booking system, are internationally 
            registered and protected both as Utility Models and by Copyright.
          </p>
          <p className="text-2xs whitespace-normal max-w-3xl mx-auto">
            Any reproduction or copy of the system will be legally pursued. Those 
            interested in national franchises may contact us.
          </p>
        </div>
      </div>
    </footer>
  );
}
