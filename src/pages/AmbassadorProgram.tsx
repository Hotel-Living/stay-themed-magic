import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";

export default function AmbassadorProgram() {
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Ambassador Program</h1>
          <div className="prose prose-lg mx-auto">
            <p>Join our Ambassador Program and become part of our global community.</p>
            <p>Details about the program will be available soon.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}