
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-fuchsia-900 py-8 px-4 border-t border-fuchsia-700">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="mb-4" />
            <p className="text-sm text-white/70 mb-4">
              The Art of Living
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Search', 'FAQ'].map(link => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-sm text-white/70 hover:text-white transition">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-white">For Users</h4>
            <ul className="space-y-2">
              {['Sign in', 'Log in', 'My Bookings', 'My Account'].map(link => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-white/70 hover:text-white transition">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-white">For Hotels</h4>
            <ul className="space-y-2">
              {['Partner with Us', 'Hotel Dashboard', 'Resources', 'Support'].map(link => (
                <li key={link}>
                  <Link to={link === 'Hotel Dashboard' ? '/hotel-dashboard' : `/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-white/70 hover:text-white transition">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-fuchsia-700 mt-8 pt-8 text-center text-sm text-white/60">
          &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
