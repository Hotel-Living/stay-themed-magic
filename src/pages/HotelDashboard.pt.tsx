
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BarChart3, Building, Calendar, CreditCard, MessageCircle, Settings, Star, Users, Calculator, Heart, FileText, UserPlus } from "lucide-react";
import { DashboardTab } from "@/types/dashboard";

// Import refactored components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TabContentSelector from "@/components/hotel-dashboard/TabContentSelector";
import { Footer } from "@/components/Footer";
import { EnhancedAvatarAssistant } from "@/components/avatars/EnhancedAvatarAssistant";

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
      id: "add-property-2",
      label: "Adicionar Propriedade 2",
      icon: <Building className="w-5 h-5" />
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
      id: "referrals",
      label: "🏨 Indicar Hotéis – Ganhar Comissões",
      icon: <UserPlus className="w-5 h-5" />
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
