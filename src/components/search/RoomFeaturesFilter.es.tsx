
import React from "react";
import { CheckboxFilter } from "./CheckboxFilter";

interface RoomFeaturesFilterESProps {
  activeRoomFeatures: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomFeaturesFilterES({ activeRoomFeatures, onChange }: RoomFeaturesFilterESProps) {
  const roomFeatureOptions = [
    { value: "Aire Acondicionado", label: "Aire Acondicionado" },
    { value: "Baño Privado", label: "Baño Privado" },
    { value: "Televisor", label: "Televisor" },
    { value: "Caja Fuerte", label: "Caja Fuerte" },
    { value: "Mini Bar", label: "Mini Bar" },
    { value: "Máquina de Café", label: "Máquina de Café" },
    { value: "Hervidor de Agua", label: "Hervidor de Agua" },
    { value: "Secador de Pelo", label: "Secador de Pelo" },
    { value: "Plancha", label: "Plancha" },
    { value: "Escritorio", label: "Escritorio" },
    { value: "Balcón", label: "Balcón" },
    { value: "Vista al Mar", label: "Vista al Mar" },
    { value: "Vista a la Montaña", label: "Vista a la Montaña" },
    { value: "Vista a la Ciudad", label: "Vista a la Ciudad" },
    { value: "Vista al Jardín", label: "Vista al Jardín" },
    { value: "WiFi", label: "WiFi" },
    { value: "Bañera", label: "Bañera" },
    { value: "Ducha", label: "Ducha" },
    { value: "Ducha a Ras de Suelo", label: "Ducha a Ras de Suelo" },
    { value: "Calefacción", label: "Calefacción" },
    { value: "Ventilador", label: "Ventilador" },
    { value: "Nevera", label: "Nevera" },
    { value: "Microondas", label: "Microondas" },
    { value: "Teléfono", label: "Teléfono" },
    { value: "Radio", label: "Radio" },
    { value: "Armario", label: "Armario" },
    { value: "Sofá", label: "Sofá" },
    { value: "Internet de Alta Velocidad", label: "Internet de Alta Velocidad" },
    { value: "Cortinas Opacas", label: "Cortinas Opacas" },
    { value: "Insonorizado", label: "Insonorizado" }
  ];

  return (
    <CheckboxFilter
      title="SERVICIOS"
      options={roomFeatureOptions}
      selectedOptions={activeRoomFeatures}
      onChange={onChange}
    />
  );
}
