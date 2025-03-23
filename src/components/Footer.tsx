
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-[#860477] py-4 px-4 border-t border-[#c266af]">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="py-4">
            {/* Logo centered */}
            <div className="flex justify-center mb-8">
              <Logo />
            </div>
          
            {/* Three rounded links with added spacing below the logo */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link to="/hoteles" className="bg-white text-[#860477] hover:bg-white/90 px-3 py-1 text-xs rounded-md">
                HOTELS
              </Link>
              <Link to="/signup" className="bg-white text-[#860477] hover:bg-white/90 px-3 py-1 text-xs rounded-md">
                REGISTER
              </Link>
              <Link to="/signin" className="bg-white text-[#860477] hover:bg-white/90 px-3 py-1 text-xs rounded-md">
                SIGN IN
              </Link>
            </div>
          
            {/* Six text links with increased spacing between them */}
            <div className="flex flex-wrap justify-center mb-8 max-w-full mx-auto">
              <Link to="/faq" className="text-white hover:text-white/90 text-xs font-medium px-4">
                FAQ
              </Link>
              <Link to="/our-values" className="text-white hover:text-white/90 text-xs font-medium px-4">
                Our Values
              </Link>
              <Link to="/our-services" className="text-white hover:text-white/90 text-xs font-medium px-4">
                Our Services
              </Link>
              <Link to="/privacy" className="text-white hover:text-white/90 text-xs font-medium px-4">
                Privacy & Cookies
              </Link>
              <Link to="/terms" className="text-white hover:text-white/90 text-xs font-medium px-4">
                Terms & Conditions
              </Link>
              <Link to="/customer-service" className="text-white hover:text-white/90 text-xs font-medium px-4">
                Customer Service
              </Link>
            </div>
          </div>
        </div>
        
        <Separator className="bg-[#c266af]/40 mb-8" />
        
        <div className="text-center text-xs text-white/80">
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
