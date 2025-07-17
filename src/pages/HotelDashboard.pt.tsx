import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BarChart3, Building, Calendar, CreditCard, MessageCircle, Settings, Star, Users, Calculator, FileText, UserPlus, Hotel, Megaphone, TrendingUp } from "lucide-react";
import { DashboardTab } from "@/types/dashboard";

// Import refactored components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TabContentSelector from "@/components/hotel-dashboard/TabContentSelector";
import { Footer } from "@/components/Footer";
import { EnhancedAvatarAssistant } from "@/components/avatars/EnhancedAvatarAssistant";

export default function HotelDashboardPT() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const { profile } = useAuth();
  
  // Create dashboard tabs configuration with Portuguese labels - NEW ORDER
  const tabs: DashboardTab[] = [
    {
      id: "dashboard",
      label: "Painel de Controle",
      icon: <BarChart3 className="w-5 h-5 text-blue-400" />
    },
    {
      id: "rates-calculator",
      label: "Calcule seu Modelo de Tarifas e Ganhos",
      icon: <Calculator className="w-5 h-5 text-green-400" />
    },
    {
      id: "add-property-2",
      label: "Adicione Hotel",
      icon: <Hotel className="w-5 h-5 text-orange-400" />
    },
    {
      id: "referrals",
      label: "Indique-nos Hotéis e Ganhe Comissões",
      icon: <UserPlus className="w-5 h-5 text-yellow-400" />
    },
    {
      id: "advertising",
      label: "Obtenha Publicidade Gratuita",
      icon: <Megaphone className="w-5 h-5 text-fuchsia-400" />
    },
    {
      id: "packages",
      label: "Pacotes de Disponibilidade",
      icon: <Calendar className="w-5 h-5 text-teal-400" />
    },
    {
      id: "properties",
      label: "Meus Hotéis",
      icon: <Building className="w-5 h-5 text-blue-600" />
    },
    {
      id: "bookings",
      label: "Minhas Reservas",
      icon: <Calendar className="w-5 h-5 text-teal-400" />
    },
    {
      id: "guests",
      label: "Meus Hóspedes",
      icon: <Users className="w-5 h-5 text-violet-400" />
    },
    {
      id: "finances",
      label: "Minhas Finanças",
      icon: <CreditCard className="w-5 h-5 text-green-600" />
    },
    {
      id: "reviews",
      label: "Minhas Avaliações",
      icon: <Star className="w-5 h-5 text-orange-300" />
    },
    {
      id: "analytics",
      label: "Minhas Análises",
      icon: <TrendingUp className="w-5 h-5 text-cyan-300" />
    },
    {
      id: "messages",
      label: "Mensagens do Admin",
      icon: <MessageCircle className="w-5 h-5 text-red-400" />
    },
    {
      id: "settings",
      label: "Configurações",
      icon: <Settings className="w-5 h-5 text-slate-400" />
    },
    {
      id: "terms-conditions",
      label: "Termos e Condições",
      icon: <FileText className="w-5 h-5 text-amber-600" />
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