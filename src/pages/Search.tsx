
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';
import { HotelSearchAndResults } from '@/components/hotels/HotelSearchAndResults';
import BubbleCounter from '@/components/common/BubbleCounter';

export default function Search() {
  return (
    <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      <BubbleCounter />
      
      <main className="flex-1 pt-4">
        <HotelSearchAndResults />
      </main>
      
      <Footer />
    </div>
  );
}
