
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[#9E0078] py-6 px-4 border-t border-[#c266af]">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Logo className="mb-6 animate-floating" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center md:items-end gap-3">
              <Link to="/faq" className="text-white hover:text-white/90 text-sm">
                FAQ
              </Link>
              <Link to="/our-values" className="text-white hover:text-white/90 text-sm">
                Our Values
              </Link>
              <Link to="/our-services" className="text-white hover:text-white/90 text-sm">
                Our Services
              </Link>
            </div>
            <div className="flex flex-col items-center md:items-start gap-3">
              <Link to="/privacy" className="text-white hover:text-white/90 text-sm">
                Privacy & Cookies
              </Link>
              <Link to="/terms" className="text-white hover:text-white/90 text-sm">
                Terms & Conditions
              </Link>
              <Link to="/customer-service" className="text-white hover:text-white/90 text-sm">
                Customer Service
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Link to="/hoteles" className="bg-white text-[#9E0078] hover:bg-white/90 px-3 py-1 text-sm">
              HOTELS
            </Link>
            <Link to="/signup" className="bg-white text-[#9E0078] hover:bg-white/90 px-3 py-1 text-sm">
              REGISTER
            </Link>
            <Link to="/signin" className="bg-white text-[#9E0078] hover:bg-white/90 px-3 py-1 text-sm">
              SIGN IN
            </Link>
          </div>
        </div>
        
        <div className="text-center text-xs text-white/80 max-w-4xl mx-auto">
          <p className="mb-2">&copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.</p>
          <p className="text-xs">
            This site, as well as its innovative booking system, are internationally registered and protected 
            both as utility models and by copyright. Any reproduction will be legally pursued. 
            Those interested in national franchises can contact us.
          </p>
        </div>
      </div>
    </footer>
  );
}
