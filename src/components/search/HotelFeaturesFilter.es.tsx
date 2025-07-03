
import React from "react";
import { CheckboxFilter } from "./CheckboxFilter";

interface HotelFeaturesFilterESProps {
  activeHotelFeatures: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function HotelFeaturesFilterES({ activeHotelFeatures, onChange }: HotelFeaturesFilterESProps) {
  const hotelFeatureOptions = [
    { value: "WiFi Gratis", label: "WiFi Gratis" },
    { value: "Estacionamiento", label: "Estacionamiento" },
    { value: "Restaurante", label: "Restaurante" },
    { value: "Piscina", label: "Piscina" },
    { value: "Spa", label: "Spa" },
    { value: "Gimnasio", label: "Gimnasio" },
    { value: "Recepción 24/7", label: "Recepción 24/7" },
    { value: "Servicio de Habitaciones", label: "Servicio de Habitaciones" },
    { value: "Bar", label: "Bar" },
    { value: "Salón", label: "Salón" },
    { value: "Centro de Negocios", label: "Centro de Negocios" },
    { value: "Salas de Conferencias", label: "Salas de Conferencias" },
    { value: "Servicio de Lavandería", label: "Servicio de Lavandería" },
    { value: "Conserjería", label: "Conserjería" },
    { value: "Traslado al Aeropuerto", label: "Traslado al Aeropuerto" },
    { value: "Acepta Mascotas", label: "Acepta Mascotas" },
    { value: "Acceso a la Playa", label: "Acceso a la Playa" },
    { value: "Vista a la Montaña", label: "Vista a la Montaña" },
    { value: "Jardín", label: "Jardín" },
    { value: "Terraza", label: "Terraza" }
  ];

  return (
    <CheckboxFilter
      title="SERVICIOS HOTEL"
      options={hotelFeatureOptions}
      selectedOptions={activeHotelFeatures}
      onChange={onChange}
    />
  );
}
