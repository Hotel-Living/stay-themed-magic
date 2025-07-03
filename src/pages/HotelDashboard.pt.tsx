
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BarChart3, Building, Calendar, CreditCard, MessageCircle, Settings, Star, Users, Calculator, Heart, FileText, Plus } from "lucide-react";
import { DashboardTab } from "@/types/dashboard";

// Import refactored components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TabContentSelector from "@/components/hotel-dashboard/TabContentSelector";
import { Footer } from "@/components/Footer";

export default function HotelDashboardPT() {
  const [activeTab, setActiveTab] = useState<string>("welcome-overview");
  const { profile } = useAuth();
  
  // Create dashboard tabs configuration with Portuguese labels
  const tabs: DashboardTab[] = [
    {
      id: "welcome-overview",
      label: "Visão Geral de Boas-vindas",
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: "dashboard",
      label: "Painel de Controle",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "rates-calculator",
      label: (
        <>
          Calcular Modelo
          <br />
          Tarifas e Lucros
        </>
      ),
      icon: <Calculator className="w-5 h-5" />
    },
    {
      id: "properties",
      label: "Propriedades",
      icon: <Building className="w-5 h-5" />
    },
    {
      id: "add-property",
      label: "Adicionar Propriedade",
      icon: <Plus className="w-5 h-5" />
    },
    {
      id: "advertising",
      label: "Publicidade",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "bookings",
      label: "Reservas",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: "guests",
      label: "Hóspedes",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: "messages",
      label: "Mensagens do Admin",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: "finances",
      label: "Finanças",
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: "reviews",
      label: "Avaliações",
      icon: <Star className="w-5 h-5" />
    },
    {
      id: "analytics",
      label: "Análises",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "settings",
      label: "Configurações",
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: "terms-conditions",
      label: "Termos e Condições",
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
