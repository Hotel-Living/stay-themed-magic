
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BarChart3, Building, Calendar, CreditCard, MessageCircle, Settings, Star, Users, Calculator, Heart, FileText, UserPlus } from "lucide-react";
import { DashboardTab } from "@/types/dashboard";

// Import refactored components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TabContentSelector from "@/components/hotel-dashboard/TabContentSelector";
import { Footer } from "@/components/Footer";
import { EnhancedAvatarAssistant } from "@/components/avatars/EnhancedAvatarAssistant";

export default function HotelDashboardES() {
  const [activeTab, setActiveTab] = useState<string>("welcome-overview");
  const { profile } = useAuth();
  
  // Create dashboard tabs configuration with Spanish labels
  const tabs: DashboardTab[] = [
    {
      id: "welcome-overview",
      label: "Resumen de Bienvenida",
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: "dashboard",
      label: "Panel de Control",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "rates-calculator",
      label: (
        <>
          Calcular Modelo
          <br />
          Tarifas y Ganancias
        </>
      ),
      icon: <Calculator className="w-5 h-5" />
    },
    {
      id: "properties",
      label: "Propiedades",
      icon: <Building className="w-5 h-5" />
    },
    {
      id: "add-property-2",
      label: "Agregar Propiedad 2",
      icon: <Building className="w-5 h-5" />
    },
    {
      id: "advertising",
      label: "Publicidad",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "bookings",
      label: "Reservas",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: "guests",
      label: "Huéspedes",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: "messages",
      label: "Mensajes de Admin",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: "finances",
      label: "Finanzas",
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: "reviews",
      label: "Reseñas",
      icon: <Star className="w-5 h-5" />
    },
    {
      id: "analytics",
      label: "Analíticas",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "referrals",
      label: "🏨 Referir Hoteles – Ganar Comisiones",
      icon: <UserPlus className="w-5 h-5" />
    },
    {
      id: "settings",
      label: "Configuración",
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: "terms-conditions",
      label: "Términos y Condiciones",
      icon: <FileText className="w-5 h-5" />
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardLayout 
        activeTab={activeTab}
        tabs={tabs}
        setActiveTab={setActiveTab}
      >
        <TabContentSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      </DashboardLayout>
      <Footer />
      
      {/* Persistent Martin avatar for hotel dashboard */}
      <EnhancedAvatarAssistant
        avatarId="martin"
        gif="https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/8_Y_yo_soy_Martin_tengo_un_hotel.gif.gif"
        position="bottom-right"
        showMessage={false}
      />
    </div>
  );
}
