
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Separator } from "./ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

export function Footer() {
  const isMobile = useIsMobile();
  
  return <footer className="py-4 px-4 bg-[#AACAFE] border-t border-[#3300B0]/20 mt-20">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className={isMobile ? "mb-4" : "mb-6"}>
            <div className={isMobile ? "h-[51px]" : ""}>
              <Logo />
            </div>
          </div>
          
          <div className={`flex ${isMobile ? "flex-col" : "flex-wrap"} justify-center ${isMobile ? "gap-y-3" : "gap-y-4 gap-x-10"} mb-2 mx-auto text-center w-full`}>
            <Link to="/faq" className={`text-[#3300B0] hover:text-[#3300B0]/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              FAQ
            </Link>
            <Link to="/contact" className={`text-[#3300B0] hover:text-[#3300B0]/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Contact
            </Link>
            <Link to="/our-values" className={`text-[#3300B0] hover:text-[#3300B0]/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Our Values
            </Link>
            <Link to="/our-services" className={`text-[#3300B0] hover:text-[#3300B0]/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Our Services
            </Link>
            <Link to="/videos" className={`text-[#3300B0] hover:text-[#3300B0]/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Videos
            </Link>
            <Link to="/promotions" className={`text-[#3300B0] hover:text-[#3300B0]/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Promotions
            </Link>
            <Link to="/privacy" className={`text-[#3300B0] hover:text-[#3300B0]/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Privacy & Cookies
            </Link>
            <Link to="/terms" className={`text-[#3300B0] hover:text-[#3300B0]/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Terms & Conditions
            </Link>
            <Link to="/customer-service" className={`text-[#3300B0] hover:text-[#3300B0]/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Customer Service
            </Link>
            <Link to="/intellectual-property" className={`text-[#3300B0] hover:text-[#3300B0]/90 ${isMobile ? "text-base" : "text-xs"} font-medium`}>
              Intellectual Property
            </Link>
          </div>
          
          <div className={`flex flex-wrap gap-4 justify-center ${isMobile ? "mt-6" : "mb-4"}`}>
            <Link to="/affinity-stays" className={`bg-white text-[#3300B0] hover:bg-white/90 px-3 py-1 ${isMobile ? "text-xs scale-[1.3] font-bold" : "text-xs"} rounded-md uppercase`}>
              Affinity Stays?
            </Link>
            <Link to="/signup" className={`bg-white text-[#3300B0] hover:bg-white/90 px-3 py-1 ${isMobile ? "text-xs scale-[1.3] font-bold" : "text-xs"} rounded-md uppercase`}>
              Register
            </Link>
            <Link to="/login" className={`bg-white text-[#3300B0] hover:bg-white/90 px-3 py-1 ${isMobile ? "text-xs scale-[1.3] font-bold" : "text-xs"} rounded-md uppercase`}>
              Sign In
            </Link>
            <Link to="/hotels" className={`bg-white text-[#3300B0] hover:bg-white/90 px-3 py-1 ${isMobile ? "text-xs scale-[1.3] font-bold" : "text-xs"} rounded-md uppercase`}>
              Hotels
            </Link>
          </div>
        </div>
        
        <Separator className="bg-[#3300B0]/40 my-2" />
        
        <div className={`text-center text-xs text-[#3300B0] ${isMobile ? "mt-8 mb-6" : ""}`}>
          <p className="mb-2 font-semibold">&copy; {new Date().getFullYear()} Hotel-Living.com. <Link to="/intellectual-property" className="hover:underline">All rights reserved.</Link></p>
        </div>
      </div>
    </footer>;
}
