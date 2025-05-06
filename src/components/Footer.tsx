import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

export function Footer() {
  const isMobile = useIsMobile();
  
  return <footer className="py-4 px-4 border-t border-[#3300B0]/20 mt-20 relative">
      {/* Background image div with semi-transparency */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/lovable-uploads/84db51bb-a72a-4a8c-afe2-f06cf592fa7d.png')" }}
      ></div>
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div className={isMobile ? "mb-4" : "mb-6"}>
            {/* Removed Hotel Living text here according to requirements */}
          </div>
          
          <div className="flex flex-wrap justify-center gap-y-4 gap-x-10 mb-2 mx-auto text-center w-full">
            <div className={`flex ${isMobile ? "flex-col" : "flex-wrap"} justify-center ${isMobile ? "gap-y-3" : "gap-y-4 gap-x-10"} mb-2 mx-auto text-center w-full`}>
              <Link to="/faq" className={`text-[#860493] hover:text-[#860493]/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                FAQ
              </Link>
              <Link to="/affinity-stays" className={`text-[#860493] hover:text-[#860493]/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                AFFINITY STAYS?
              </Link>
              <Link to="/videos" className={`text-[#860493] hover:text-[#860493]/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                VIDEOS
              </Link>
              <Link to="/promotions" className={`text-[#860493] hover:text-[#860493]/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                PROMOTIONS
              </Link>
              <Link to="/our-services" className={`text-[#860493] hover:text-[#860493]/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                OUR SERVICES
              </Link>
              <Link to="/our-values" className={`text-[#860493] hover:text-[#860493]/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                OUR VALUES
              </Link>
            </div>
            
            <div className={`flex ${isMobile ? "flex-col" : "flex-wrap"} justify-center ${isMobile ? "gap-y-3" : "gap-y-4 gap-x-10"} mb-2 mx-auto text-center w-full`}>
              <Link to="/intellectual-property" className={`text-[#860493] hover:text-[#860493]/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                INTELLECTUAL PROPERTY
              </Link>
              <Link to="/terms" className={`text-[#860493] hover:text-[#860493]/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                TERMS & CONDITIONS
              </Link>
              <Link to="/privacy" className={`text-[#860493] hover:text-[#860493]/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                PRIVACY & COOKIES
              </Link>
              <Link to="/contact" className={`text-[#860493] hover:text-[#860493]/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                CONTACT
              </Link>
              <Link to="/customer-service" className={`text-[#860493] hover:text-[#860493]/90 ${isMobile ? "text-[0.8em]" : "text-[0.691rem]"} font-bold uppercase`}>
                CUSTOMER SERVICE
              </Link>
            </div>
          </div>
          
          <div className={`flex flex-wrap gap-4 justify-center ${isMobile ? "mt-6" : "mb-4"}`}>
            <Link to="/signup" className={`bg-white text-[#860493] hover:bg-white/90 px-3 py-1 ${isMobile ? "text-[0.8rem] scale-[1.04] font-bold" : "text-[0.9rem] font-bold"} rounded-md uppercase`}>
              Register
            </Link>
            <Link to="/login" className={`bg-white text-[#860493] hover:bg-white/90 px-3 py-1 ${isMobile ? "text-[0.8rem] scale-[1.04] font-bold" : "text-[0.9rem] font-bold"} rounded-md uppercase`}>
              Sign In
            </Link>
            <Link to="/hotels" className={`bg-white text-[#860493] hover:bg-white/90 px-3 py-1 ${isMobile ? "text-[0.8rem] scale-[1.04] font-bold" : "text-[0.9rem] font-bold"} rounded-md uppercase`}>
              Hotels
            </Link>
          </div>
        </div>
        
        <Separator className="bg-[#3300B0]/40 my-2" />
        
        <div className={`text-center text-xs text-[#860493] ${isMobile ? "mt-8 mb-6" : ""}`}>
          <p className="mb-2 font-semibold">&copy; {new Date().getFullYear()} Hotel-Living.com. <Link to="/intellectual-property" className="hover:underline">All rights reserved.</Link></p>
        </div>
      </div>
    </footer>;
}
