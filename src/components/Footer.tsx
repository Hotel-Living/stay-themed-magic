
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-[#9C048B] py-6 px-4 border-t border-[#c266af]">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Logo className="mb-6" />
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center sm:items-end gap-6">
              <Link to="/faq" className="text-white hover:text-white/90 text-xs">
                FAQ
              </Link>
              <Link to="/our-values" className="text-white hover:text-white/90 text-xs">
                Our Values
              </Link>
              <Link to="/our-services" className="text-white hover:text-white/90 text-xs">
                Our Services
              </Link>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-6">
              <Link to="/privacy" className="text-white hover:text-white/90 text-xs">
                Privacy & Cookies
              </Link>
              <Link to="/terms" className="text-white hover:text-white/90 text-xs">
                Terms & Conditions
              </Link>
              <Link to="/customer-service" className="text-white hover:text-white/90 text-xs">
                Customer Service
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Link to="/hoteles" className="bg-white text-[#9C048B] hover:bg-white/90 px-3 py-1 text-xs">
              HOTELS
            </Link>
            <Link to="/signup" className="bg-white text-[#9C048B] hover:bg-white/90 px-3 py-1 text-xs">
              REGISTER
            </Link>
            <Link to="/signin" className="bg-white text-[#9C048B] hover:bg-white/90 px-3 py-1 text-xs">
              SIGN IN
            </Link>
          </div>
        </div>
        
        <Separator className="bg-[#c266af]/40 mb-4" />
        
        <div className="text-center text-xs text-white/80">
          <p className="mb-2">&copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.</p>
          <p className="text-2xs max-w-xs mx-auto leading-relaxed">
            This site, as well as its innovative booking system, are
            internationally registered and protected both as Utility
            Models and by Copyright. Any reproduction or copy of
            the system will be legally pursued. Those interested
            in national franchises may contact us.
          </p>
        </div>
      </div>
    </footer>
  );
}
