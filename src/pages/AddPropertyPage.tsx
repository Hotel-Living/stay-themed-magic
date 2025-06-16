
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AddProperty from "@/components/dashboard/AddProperty";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getDashboardTabs } from "@/components/hotel-dashboard/TabConfiguration";
import { useTranslation } from "@/hooks/useTranslation";

export default function AddPropertyPage() {
  const { t } = useTranslation();
  // Get dashboard tabs configuration
  const tabs = getDashboardTabs();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <DashboardLayout 
          activeTab="properties" 
          tabs={tabs}
          setActiveTab={() => {}}
        >
          <div className="container max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('dashboard.propertyManagement')}</h1>
            
            <div className="lg:col-span-3">
              <AddProperty />
            </div>
          </div>
        </DashboardLayout>
      </main>
      
      <Footer />
    </div>
  );
}
