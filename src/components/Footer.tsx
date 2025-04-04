
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Separator } from "./ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

export function Footer() {
  const isMobile = useIsMobile();
  
  return <footer className="py-4 px-4 bg-[#860493] border-t border-[#ad66a8] mt-20">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className={isMobile ? "mb-4" : "mb-6"}>
            {/* Updated logo size to match header on mobile */}
            <div className={isMobile ? "h-[51px]" : ""}>
              <Logo />
            </div>
          </div>
          
          <div className={`flex ${isMobile ? "flex-col" : "flex-wrap"} justify-center ${isMobile ? "gap-y-3" : "gap-y-4 gap-x-10"} mb-2 max-w-full mx-auto`}>
            <Link to="/faq" className={`text-white hover:text-white/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              FAQ
            </Link>
            <Link to="/our-values" className={`text-white hover:text-white/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Our Values
            </Link>
            <Link to="/our-services" className={`text-white hover:text-white/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Our Services
            </Link>
            <Link to="/privacy" className={`text-white hover:text-white/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Privacy & Cookies
            </Link>
            <Link to="/terms" className={`text-white hover:text-white/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Terms & Conditions
            </Link>
            <Link to="/customer-service" className={`text-white hover:text-white/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Customer Service
            </Link>
            <Link to="/intellectual-property" className={`text-white hover:text-white/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Intellectual Property
            </Link>
          </div>
          
          <div className={`flex flex-wrap gap-4 justify-center ${isMobile ? "mt-6" : "mb-4"}`}>
            {/* Changed scale from 2 (200%) to 1 (100%) for mobile */}
            <Link to="/hotels" className={`bg-white text-[#860493] hover:bg-white/90 px-3 py-1 ${isMobile ? "text-xs scale-[1]" : "text-xs"} rounded-md uppercase`}>
              Hotels
            </Link>
            <Link to="/signup" className={`bg-white text-[#860493] hover:bg-white/90 px-3 py-1 ${isMobile ? "text-xs scale-[1]" : "text-xs"} rounded-md uppercase`}>
              Register
            </Link>
            <Link to="/login" className={`bg-white text-[#860493] hover:bg-white/90 px-3 py-1 ${isMobile ? "text-xs scale-[1]" : "text-xs"} rounded-md uppercase`}>
              Sign In
            </Link>
          </div>
        </div>
        
        <Separator className="bg-white/40 mb-2" />
        
        <div className={`text-center text-xs text-white/80 ${isMobile ? "mt-8 mb-6" : ""}`}>
          <p className="mb-2 font-semibold">&copy; {new Date().getFullYear()} Hotel-Living.com. <Link to="/intellectual-property" className="hover:underline">All rights reserved.</Link></p>
        </div>
      </div>
    </footer>;
}
