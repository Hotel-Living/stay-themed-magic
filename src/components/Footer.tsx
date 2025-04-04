
import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-transparent py-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4 text-white">Hotel Living</h3>
            <p className="text-gray-400 max-w-xs">
              Experience the perfect stay for your long-term accommodation needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            <div>
              <h4 className="font-medium text-white mb-4">About</h4>
              <ul className="space-y-2 md:space-y-1">
                <li className="mb-2">
                  <Link to="/our-values" className="text-gray-400 hover:text-white text-[1.7em] md:text-base">
                    Our Values
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/our-services" className="text-gray-400 hover:text-white text-[1.7em] md:text-base">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/customer-service" className="text-gray-400 hover:text-white text-[1.7em] md:text-base">
                    Customer Service
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Help</h4>
              <ul className="space-y-2 md:space-y-1">
                <li className="mb-2">
                  <Link to="/faq" className="text-gray-400 hover:text-white text-[1.7em] md:text-base">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white text-[1.7em] md:text-base">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Legal</h4>
              <ul className="space-y-2 md:space-y-1">
                <li className="mb-2">
                  <Link to="/terms" className="text-gray-400 hover:text-white text-[1.7em] md:text-base">
                    Terms of Service
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/privacy" className="text-gray-400 hover:text-white text-[1.7em] md:text-base">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/intellectual-property" className="text-gray-400 hover:text-white text-[1.7em] md:text-base">
                    Intellectual Property
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Hotel Living. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="/#" className="hover:text-white">
              Instagram
            </a>
            <a href="/#" className="hover:text-white">
              Twitter
            </a>
            <a href="/#" className="hover:text-white">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
