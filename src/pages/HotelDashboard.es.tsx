
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BarChart3, Building, Calendar, CreditCard, MessageCircle, Settings, Star, Users, Calculator, Heart, FileText, Plus } from "lucide-react";
import { DashboardTab } from "@/types/dashboard";

// Import refactored components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TabContentSelector from "@/components/hotel-dashboard/TabContentSelector";
import { Footer } from "@/components/Footer";

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
      id: "add-property",
      label: "Agregar Propiedad",
      icon: <Plus className="w-5 h-5" />
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
        <TabContentSelector activeTab={activeTab} />
      </DashboardLayout>
      <Footer />
    </div>
  );
}
