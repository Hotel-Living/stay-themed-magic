// RUTA: src/components/dashboard/property-view/sections/ThemesActivities.tsx

import React from "react";

export default function ThemesActivities({ hotel }: { hotel: any }) {
  const themes = hotel?.hotel_themes || [];
  const activities = hotel?.hotel_activities || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Temáticas (Affinities)</h2>
      {themes.length > 0 ? (
        <ul className="list-disc list-inside">
          {themes.map((theme: any, idx: number) => (
            <li key={idx}>{theme.themes?.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay temáticas asignadas.</p>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">Actividades</h2>
      {activities.length > 0 ? (
        <ul className="list-disc list-inside">
          {activities.map((activity: any, idx: number) => (
            <li key={idx}>{activity.activities?.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay actividades asignadas.</p>
      )}
    </div>
  );
}
