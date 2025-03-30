import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Separator } from "./ui/separator";
export function Footer() {
  return <footer className="py-4 px-4 border-t border-[#c266af] bg-[#860477]">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Logo className="mb-4" />
          
          <div className="flex flex-wrap justify-center gap-10 mb-4 max-w-full mx-auto">
            <Link to="/faq" className="text-white hover:text-white/90 text-xs font-medium">
              FAQ
            </Link>
            <Link to="/our-values" className="text-white hover:text-white/90 text-xs font-medium">
              Our Values
            </Link>
            <Link to="/our-services" className="text-white hover:text-white/90 text-xs font-medium">
              Our Services
            </Link>
            <Link to="/privacy" className="text-white hover:text-white/90 text-xs font-medium">
              Privacy & Cookies
            </Link>
            <Link to="/terms" className="text-white hover:text-white/90 text-xs font-medium">
              Terms & Conditions
            </Link>
            <Link to="/customer-service" className="text-white hover:text-white/90 text-xs font-medium">
              Customer Service
            </Link>
            <Link to="/intellectual-property" className="text-white hover:text-white/90 text-xs font-medium">
              Intellectual Property
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mb-4">
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
        </div>
        
        <Separator className="bg-[#c266af]/40 mb-2" />
        
        <div className="text-center text-xs text-white/80">
          <p className="mb-2">&copy; {new Date().getFullYear()} Hotel-Living.com. <Link to="/intellectual-property" className="hover:underline">All rights reserved.</Link></p>
        </div>
      </div>
    </footer>;
}