// RUTA: src/components/hotel-dashboard/MyPropertiesList.tsx

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyPropertiesList() {
  const [hotels, setHotels] = useState<any[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;

    const fetchHotels = async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("id, hotelName, city, country")
        .eq("user_id", user.id);

      if (!error && data) {
        setHotels(data);
      }
    };

    fetchHotels();
  }, [user]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>
      {hotels.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {hotels.map((hotel) => (
            <li
              key={hotel.id}
              className="py-4 cursor-pointer hover:bg-gray-50 px-4 rounded"
              onClick={() => navigate(`/hotel/property/${hotel.id}`)}
            >
              <p className="font-medium">{hotel.hotelName}</p>
              <p className="text-sm text-gray-500">{hotel.city}, {hotel.country}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes propiedades registradas aún.</p>
      )}
    </div>
  );
}
