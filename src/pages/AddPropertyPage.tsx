import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AddProperty from "@/components/dashboard/AddProperty";
export default function AddPropertyPage() {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">PROPERTY MANAGEMENT</h1>
          
          <div className="lg:col-span-3">
            <AddProperty />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
}