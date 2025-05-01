// RUTA: src/components/hotel-dashboard/EditMyPropertyButton.tsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function EditMyPropertyButton({ hotelId }: { hotelId: string }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/add-property?edit=${hotelId}`)}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mt-4"
    >
      Editar esta propiedad
    </button>
  );
}
