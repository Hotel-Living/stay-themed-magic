
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ThemesInformation() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Hotel Living Themes</h1>
          
          <div className="glass-card rounded-2xl p-6 my-8 bg-[#430453]">
            <h2 className="text-2xl font-bold mb-4">What are Hotel Living Themes?</h2>
            
            <p className="mb-4">
              This page will contain detailed information about the various themes 
              available on Hotel Living. More content will be added soon.
            </p>
            
            <div className="p-4 border border-fuchsia-500/30 rounded-lg bg-fuchsia-900/20 mt-8">
              <h3 className="font-medium mb-2">Coming Soon</h3>
              <p className="text-sm text-foreground/80">
                Detailed information about each theme category and how they enhance the 
                guest experience will be available here.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
