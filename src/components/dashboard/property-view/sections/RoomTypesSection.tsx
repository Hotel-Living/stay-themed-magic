// RUTA: src/components/dashboard/property-view/sections/RoomTypesSection.tsx

import React from "react";

export default function RoomTypesSection({ hotel }: { hotel: any }) {
  const roomTypes = hotel?.roomTypes || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Tipos de Habitación</h2>
      {roomTypes.length > 0 ? (
        <ul className="list-disc list-inside">
          {roomTypes.map((room: any, idx: number) => (
            <li key={idx}>
              <strong>{room.name}</strong> – {room.description} – Capacidad: {room.capacity}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No se han definido tipos de habitación.</p>
      )}
    </div>
  );
}
