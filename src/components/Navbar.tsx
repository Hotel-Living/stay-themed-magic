
import React from 'react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  return (
    <nav className="py-4 px-4 bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          Hotel-Living
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Hotels
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </a>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Sign In
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};
