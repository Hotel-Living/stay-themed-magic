
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ThemeInformationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">THEME INFORMATION</h1>
          
          <div className="bg-[#5A1876]/30 rounded-lg p-6 border border-fuchsia-800/30">
            <p className="text-lg mb-6">
              This page will contain detailed information about hotel themes.
            </p>
            <p className="text-base">
              Content to be added later.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
