
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BarChart3, Building, Calendar, CreditCard, MessageCircle, Settings, Star, Users, Calculator, Heart, FileText, Plus } from "lucide-react";
import { DashboardTab } from "@/types/dashboard";

// Import refactored components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TabContentSelector from "@/components/hotel-dashboard/TabContentSelector";
import { Footer } from "@/components/Footer";

export default function HotelDashboardRO() {
  const [activeTab, setActiveTab] = useState<string>("welcome-overview");
  const { profile } = useAuth();
  
  // Create dashboard tabs configuration with Romanian labels
  const tabs: DashboardTab[] = [
    {
      id: "welcome-overview",
      label: "Prezentare Generală de Bun Venit",
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: "dashboard",
      label: "Tablou de Bord",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "rates-calculator",
      label: (
        <>
          Calculează Modelul
          <br />
          Tarife și Profituri
        </>
      ),
      icon: <Calculator className="w-5 h-5" />
    },
    {
      id: "properties",
      label: "Proprietăți",
      icon: <Building className="w-5 h-5" />
    },
    {
      id: "add-property",
      label: "Adăugați Proprietate",
      icon: <Plus className="w-5 h-5" />
    },
    {
      id: "advertising",
      label: "Publicitate",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "bookings",
      label: "Rezervări",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: "guests",
      label: "Oaspeți",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: "messages",
      label: "Mesaje Admin",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: "finances",
      label: "Finanțe",
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: "reviews",
      label: "Recenzii",
      icon: <Star className="w-5 h-5" />
    },
    {
      id: "analytics",
      label: "Analize",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "settings",
      label: "Setări",
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: "terms-conditions",
      label: "Termeni și Condiții",
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
