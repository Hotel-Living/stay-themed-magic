
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';
import { FilterSection } from '@/components/filters/FilterSection';
import { HotelResultsGrid } from '@/components/hotels/HotelResultsGrid';
import { SpanishVideoTestimonials } from '@/components/testimonials/SpanishVideoTestimonials';
import BubbleCounter from '@/components/common/BubbleCounter';
import { useHotelSearchLogic } from '@/components/hotels/hooks/useHotelSearchLogic';

export default function Search() {
  const { hotels, loading, error, filters, onFiltersChange } = useHotelSearchLogic();
  return (
    <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      <BubbleCounter />
      <SpanishVideoTestimonials />
      
      <main className="flex-1 pt-4">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Stay</h1>
            <p className="text-xl text-gray-300">Discover luxury hotels worldwide with our advanced search</p>
          </div>
          
          {/* Filter Section */}
          <FilterSection onFilterChange={onFiltersChange} />
          
          {/* Results Grid */}
          <HotelResultsGrid hotels={hotels} loading={loading} error={error} filters={filters} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
