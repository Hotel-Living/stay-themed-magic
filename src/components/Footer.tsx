
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Separator } from "./ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function Footer() {
  const isMobile = useIsMobile();
  
  return <footer className="py-4 px-4 border-t border-[#3300B0]/20 mt-20" style={{ 
      backgroundColor: "#a98805"
    }}>
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className={isMobile ? "mb-4" : "mb-6"}>
            <div className={isMobile ? "h-[59.67px]" : ""}>
              <Logo />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-y-4 gap-x-10 mb-2 mx-auto text-center w-full">
            <div className={`flex ${isMobile ? "flex-col" : "flex-wrap"} justify-center ${isMobile ? "gap-y-3" : "gap-y-4 gap-x-10"} mb-2 mx-auto text-center w-full`}>
              <Link to="/faq" className={`text-white hover:text-white/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                FAQ
              </Link>
              <Link to="/affinity-stays" className={`text-white hover:text-white/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                AFFINITY STAYS?
              </Link>
              <Link to="/videos" className={`text-white hover:text-white/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                VIDEOS
              </Link>
              <Link to="/promotions" className={`text-white hover:text-white/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                PROMOTIONS
              </Link>
              <Link to="/our-services" className={`text-white hover:text-white/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                OUR SERVICES
              </Link>
              <Link to="/our-values" className={`text-white hover:text-white/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                OUR VALUES
              </Link>
            </div>
            
            <div className={`flex ${isMobile ? "flex-col" : "flex-wrap"} justify-center ${isMobile ? "gap-y-3" : "gap-y-4 gap-x-10"} mb-2 mx-auto text-center w-full`}>
              <Link to="/intellectual-property" className={`text-white hover:text-white/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                INTELLECTUAL PROPERTY
              </Link>
              <Link to="/terms" className={`text-white hover:text-white/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                TERMS & CONDITIONS
              </Link>
              <Link to="/privacy" className={`text-white hover:text-white/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                PRIVACY & COOKIES
              </Link>
              <Link to="/contact" className={`text-white hover:text-white/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                CONTACT
              </Link>
              <Link to="/customer-service" className={`text-white hover:text-white/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                CUSTOMER SERVICE
              </Link>
            </div>
          </div>
          
          <div className={`flex flex-wrap gap-4 justify-center ${isMobile ? "mt-6" : "mb-4"}`}>
            <Link to="/signup" className="text-white hover:text-white/90 bg-[#7A127C] px-6 py-2 font-bold rounded-md uppercase">
              Register
            </Link>
            <Link to="/login" className="text-white hover:text-white/90 bg-[#7A127C] px-6 py-2 font-bold rounded-md uppercase">
              Sign In
            </Link>
            <Link to="/hotels" className="text-white hover:text-white/90 bg-[#7A127C] px-6 py-2 font-bold rounded-md uppercase">
              Hotels
            </Link>
          </div>
        </div>
        
        {/* Fix: Use the cn utility to properly apply className to Separator */}
        <Separator className={cn("bg-[#3300B0]/40 my-2")} />
        
        <div className={`text-center text-xs text-white ${isMobile ? "mt-8 mb-6" : ""}`}>
          <p className="mb-2 font-semibold">&copy; {new Date().getFullYear()} Hotel-Living.com. <Link to="/intellectual-property" className="hover:underline">All rights reserved.</Link></p>
        </div>
      </div>
    </footer>;
}
