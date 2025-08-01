import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelDetailContentEnhanced } from "@/components/hotel-detail/HotelDetailContentEnhanced";
import BubbleCounter from "@/components/common/BubbleCounter";

// Demo hotel data for "1 de agosto Demo" with Spanish highlight texts
const demoAgostoHotel = {
  id: "demo-agosto-001",
  name: "1 de agosto Demo",
  city: "Ciudad Demo",
  country: "País",
  address: "Calle Ficticia 123, Ciudad Demo, País",
  main_image_url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&h=400&fit=crop",
  description: "Un hotel rural de estilo tradicional ubicado en un entorno natural privilegiado, perfecto para descansar y conectar con la naturaleza.",
  ideal_guests: "Ideal para personas que buscan tranquilidad, actividades al aire libre y una experiencia auténtica en contacto con la naturaleza.",
  atmosphere: "Ambiente rural y acogedor, con un enfoque en la sostenibilidad y la conexión con el entorno natural local.",
  perfect_location: "Ubicación perfecta para senderismo, montañismo y avistamiento de aves, con acceso a playas cercanas y rutas de montaña.",
  price_per_month: 950,
  category: 4,
  average_rating: 4.6,
  available_months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  hotel_images: [
    { 
      id: "img-1", 
      hotel_id: "demo-agosto-001",
      image_url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&h=400&fit=crop", 
      is_main: true,
      created_at: "2024-01-01"
    },
    { 
      id: "img-2", 
      hotel_id: "demo-agosto-001",
      image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", 
      is_main: false,
      created_at: "2024-01-01"
    },
    { 
      id: "img-3", 
      hotel_id: "demo-agosto-001",
      image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", 
      is_main: false,
      created_at: "2024-01-01"
    }
  ],
  hotel_themes: [
    { 
      theme_id: "nature",
      themes: { id: "nature", name: "Naturaleza", level: 1 }
    },
    { 
      theme_id: "rural",
      themes: { id: "rural", name: "Rural", level: 1 }
    }
  ],
  hotelFeatures: [
    "Servicio de Lavandería",
    "Pensión Completa", 
    "Actividades de Senderismo",
    "Guías de Montañismo",
    "Excursiones a la Playa",
    "Tours de Avistamiento de Aves",
    "Cenas Temáticas",
    "Área de Juegos"
  ],
  roomFeatures: [
    "WiFi Gratuito",
    "Calefacción",
    "Vistas a la Montaña",
    "Baño Privado",
    "Ropa de Cama de Calidad",
    "Escritorio",
    "Armario Amplio",
    "Terraza Privada"
  ],
  banking_info: {
    bank_name: "Banco Demo",
    iban_account: "ES12 3456 7890 1234 5678 9012",
    swift_bic: "DEMOESXX",
    bank_country: "España",
    account_holder: "Hotel 1 de Agosto Demo S.L."
  },
  laundry_service: {
    available: true,
    same_day_service: true,
    dry_cleaning: false,
    pricing: "Incluido en tarifa"
  },
  additional_amenities: [
    "Biblioteca",
    "Sala de Juegos", 
    "Terraza Panorámica",
    "Jardín Orgánico"
  ],
  special_features: [
    "Estilo Rural Auténtico",
    "Estancias Flexibles (8, 15, 22 y 2 días)",
    "Pensión Completa Incluida",
    "Afinidades: Ajedrez y Juegos de Mesa"
  ],
  accessibility_features: [
    "Acceso para Sillas de Ruedas",
    "Ascensor",
    "Baños Adaptados"
  ],
  check_in_instructions: "Check-in disponible de 9:00 AM a 9:00 PM. Recepción disponible para asistencia con equipaje.",
  local_recommendations: "Parque Natural (5 min), Playa Local (25 min en coche), Rutas de Senderismo (inicio en el hotel), Mirador de Aves (15 min caminando)",
  house_rules: [
    "No fumar en habitaciones",
    "Horario de silencio: 10 PM - 7 AM",
    "Máximo 2 huéspedes por habitación",
    "Registro requerido en recepción"
  ],
  cancellation_policy: "Cancelación gratuita hasta 48 horas antes del check-in. Reembolso completo para cancelaciones dentro del período de política.",
  // Spanish highlight texts for validation
  custom_highlights: [
    "¡Este hotel es de estilo rural!",
    "¡Ofrece estancias de 8, 15, 22 y 2 días!",
    "¡Con Pensión Completa incluida!",
    "¡Con servicio de lavandería incluido!",
    "¡Precio mensual de 950 USD!",
    "¡Afinidades: ajedrez y juegos de mesa!",
    "¡Actividades: senderismo, montañismo, playa, avistamiento de aves y cenas temáticas!"
  ]
};

export default function DemoAgostoHotel() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BubbleCounter />
      
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-center py-3">
        <div className="container mx-auto px-4">
          <span className="font-semibold">✨ Demo: 1 de agosto</span>
          <span className="mx-2">•</span>
          <span>Validación de Alineación de 7 Cajas de Destacados</span>
        </div>
      </div>
      
      <main className="flex-1">
        <HotelDetailContentEnhanced hotel={demoAgostoHotel} isLoading={false} />
      </main>
      
      <Footer />
    </div>
  );
}