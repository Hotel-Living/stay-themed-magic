
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { mockHotels } from "@/components/simulation/MockFilterData";

interface MockHotelsDemoProps {
  activeFilters: FilterState;
}

export function MockHotelsDemo({ activeFilters }: MockHotelsDemoProps) {
  // SIMPLE PRICE FILTERING ONLY
  const filteredHotels = mockHotels.filter(hotel => {
    // ONLY PRICE FILTER IS ACTIVE
    if (activeFilters.priceRange) {
      console.log(`Filtering hotel "${hotel.name}" (${hotel.pricePerMonth}) with price range: ${activeFilters.priceRange}`);
      
      if (activeFilters.priceRange === 1000) {
        // Up to $1,000
        const matches = hotel.pricePerMonth <= 1000;
        console.log(`Up to $1,000 filter: ${matches}`);
        return matches;
      } else if (activeFilters.priceRange === 1500) {
        // $1,000 to $1,500
        const matches = hotel.pricePerMonth > 1000 && hotel.pricePerMonth <= 1500;
        console.log(`$1,000 to $1,500 filter: ${matches}`);
        return matches;
      } else if (activeFilters.priceRange === 2000) {
        // $1,500 to $2,000
        const matches = hotel.pricePerMonth > 1500 && hotel.pricePerMonth <= 2000;
        console.log(`$1,500 to $2,000 filter: ${matches}`);
        return matches;
      } else if (activeFilters.priceRange === 999999) {
        // More than $2,000
        const matches = hotel.pricePerMonth > 2000;
        console.log(`More than $2,000 filter: ${matches}`);
        return matches;
      }
    }
    
    // If no price filter is active, show all hotels
    return true;
  });

  console.log(`Total hotels after filtering: ${filteredHotels.length}`);
  console.log('Filtered hotels:', filteredHotels.map(h => `${h.name} ($${h.pricePerMonth})`));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">CONTROLLED DEMO - 10 Test Hotels</h2>
        <p className="text-gray-300">
          Total Hotels: 10 | Showing: {filteredHotels.length} hotels
        </p>
        {activeFilters.priceRange && (
          <p className="text-yellow-300 mt-2">
            Active Price Filter: {
              activeFilters.priceRange === 1000 ? "Up to $1,000" :
              activeFilters.priceRange === 1500 ? "$1,000 to $1,500" :
              activeFilters.priceRange === 2000 ? "$1,500 to $2,000" :
              activeFilters.priceRange === 999999 ? "More than $2,000" : "Unknown"
            }
          </p>
        )}
      </div>

      {/* PRICE DISTRIBUTION SUMMARY */}
      <div className="bg-fuchsia-900/30 rounded-lg p-4 border border-fuchsia-500/30">
        <h3 className="text-white font-bold mb-3">Hotel Distribution by Price Bracket:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-green-400 font-bold">Up to $1,000</div>
            <div className="text-white">{mockHotels.filter(h => h.pricePerMonth <= 1000).length} hotels</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-bold">$1,000 - $1,500</div>
            <div className="text-white">{mockHotels.filter(h => h.pricePerMonth > 1000 && h.pricePerMonth <= 1500).length} hotels</div>
          </div>
          <div className="text-center">
            <div className="text-orange-400 font-bold">$1,500 - $2,000</div>
            <div className="text-white">{mockHotels.filter(h => h.pricePerMonth > 1500 && h.pricePerMonth <= 2000).length} hotels</div>
          </div>
          <div className="text-center">
            <div className="text-red-400 font-bold">More than $2,000</div>
            <div className="text-white">{mockHotels.filter(h => h.pricePerMonth > 2000).length} hotels</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="bg-fuchsia-900/20 rounded-lg p-4 border border-fuchsia-500/30">
            <div className="aspect-video bg-gray-700 rounded-lg mb-4 overflow-hidden">
              <img 
                src={hotel.mainImageUrl} 
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">{hotel.name}</h3>
            
            <div className="space-y-2 text-sm text-gray-300">
              <p><span className="text-fuchsia-300">Location:</span> {hotel.city}, {hotel.country}</p>
              <p>
                <span className="text-fuchsia-300">Price:</span> 
                <span className={`ml-2 font-bold ${
                  hotel.pricePerMonth <= 1000 ? 'text-green-400' :
                  hotel.pricePerMonth <= 1500 ? 'text-blue-400' :
                  hotel.pricePerMonth <= 2000 ? 'text-orange-400' : 'text-red-400'
                }`}>
                  ${hotel.pricePerMonth}/month
                </span>
              </p>
              <p><span className="text-fuchsia-300">Category:</span> {hotel.category} stars</p>
              <p><span className="text-fuchsia-300">Type:</span> {hotel.propertyType}</p>
              <p><span className="text-fuchsia-300">Style:</span> {hotel.propertyStyle}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No hotels match the selected price range.</p>
          <p className="text-gray-500 text-sm mt-2">Try selecting a different price bracket.</p>
        </div>
      )}
    </div>
  );
}
