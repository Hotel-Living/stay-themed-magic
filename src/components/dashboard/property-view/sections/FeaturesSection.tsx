// RUTA: src/components/dashboard/property-view/sections/FeaturesSection.tsx

import React from "react";

export default function FeaturesSection({ hotel }: { hotel: any }) {
  const featuresHotel = hotel?.featuresHotel || {};
  const featuresRoom = hotel?.featuresRoom || {};

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Características del Hotel</h2>
        {Object.keys(featuresHotel).length > 0 ? (
          <ul className="list-disc list-inside">
            {Object.entries(featuresHotel).map(([feature, value]) => (
              value && <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay características del hotel.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Características de la Habitación</h2>
        {Object.keys(featuresRoom).length > 0 ? (
          <ul className="list-disc list-inside">
            {Object.entries(featuresRoom).map(([feature, value]) => (
              value && <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay características de habitación.</p>
        )}
      </div>
    </div>
  );
}
