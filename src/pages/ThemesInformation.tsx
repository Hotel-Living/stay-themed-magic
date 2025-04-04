
import React from 'react';
import { Navbar } from "@/components/Navbar";

export default function ThemesInformation() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container max-w-4xl mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Hotel Themes Information</h1>
        
        <div className="glass-card rounded-2xl p-8 bg-[#5c0869]/80">
          <p className="text-lg mb-6">
            This page will contain detailed information about hotel themes.
            The content will be uploaded soon.
          </p>
          
          <div className="p-4 bg-fuchsia-900/30 rounded-lg border border-fuchsia-500/20">
            <h3 className="font-medium mb-2">Coming Soon</h3>
            <p>The administrator will upload content for this page shortly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
