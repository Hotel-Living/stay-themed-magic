
import React from "react";

interface HotelDescriptionProps {
  description: string | null;
  idealGuests?: string | null;
  atmosphere?: string | null;
  perfectLocation?: string | null;
}

export function HotelDescriptionSection({
  description,
  idealGuests,
  atmosphere,
  perfectLocation
}: HotelDescriptionProps) {
  if (!description && !idealGuests && !atmosphere && !perfectLocation) return null;

  return (
    <div className="mb-8 space-y-6">
      {description && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white text-left">THE HOTEL AT A GLANCE...</h2>
          <p className="text-white">
            {description}
          </p>
        </div>
      )}
      
      {/* Guest Profile & Atmosphere Section */}
      {(idealGuests || atmosphere || perfectLocation) && (
        <div className="border-t border-white/20 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-white text-left">GUEST PROFILE & ATMOSPHERE</h2>
          
          {idealGuests && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-white text-left">IDEAL FOR GUESTS WHO ENJOY</h3>
              <p className="text-white">
                {idealGuests}
              </p>
            </div>
          )}
          
          {atmosphere && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-white text-left">THE ATMOSPHERE IS</h3>
              <p className="text-white">
                {atmosphere}
              </p>
            </div>
          )}
          
          {perfectLocation && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-white text-left">OUR LOCATION IS PERFECT FOR</h3>
              <p className="text-white">
                {perfectLocation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
