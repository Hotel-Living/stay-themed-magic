
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { MockHotelsDemo } from "@/components/simulation/MockHotelsDemo";
import { SecondFilterSidebar } from "@/components/search/SecondFilterSidebar";
import { FilterState } from "@/components/filters/FilterTypes";
import { createDefaultFilters } from "@/utils/filterUtils";

export default function SimulationDemo() {
  const [activeFilters, setActiveFilters] = React.useState<FilterState>(createDefaultFilters());

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleArrayFilterChange = (key: keyof FilterState, value: string, isSelected: boolean) => {
    const currentArray = activeFilters[key] as string[] || [];
    const newArray = isSelected 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    setActiveFilters(prev => ({
      ...prev,
      [key]: newArray
    }));
  };

  const onResetAllFilters = () => {
    setActiveFilters(createDefaultFilters());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <SecondFilterSidebar 
                activeFilters={activeFilters}
                handleFilterChange={handleFilterChange}
                handleArrayFilterChange={handleArrayFilterChange}
                onResetAllFilters={onResetAllFilters}
              />
            </div>
            
            {/* Hotels Demo */}
            <div className="lg:col-span-4">
              <MockHotelsDemo activeFilters={activeFilters} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
