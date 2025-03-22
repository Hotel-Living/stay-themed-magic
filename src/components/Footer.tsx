
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[#9E0078] py-8 px-4 border-t border-[#c266af]">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Logo className="mb-6" />
          
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Link to="/hoteles" className="bg-white text-[#9E0078] hover:bg-white/90 px-4 py-2 font-medium">
              HOTELES
            </Link>
            <Link to="/signup" className="bg-white text-[#9E0078] hover:bg-white/90 px-4 py-2 font-medium">
              REGÍSTRESE
            </Link>
            <Link to="/signin" className="bg-white text-[#9E0078] hover:bg-white/90 px-4 py-2 font-medium">
              SIGN IN
            </Link>
          </div>
        </div>
        
        <div className="text-center text-sm text-white/80">
          &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
