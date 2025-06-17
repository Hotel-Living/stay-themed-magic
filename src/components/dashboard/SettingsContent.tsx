
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

// Import refactored components
import { CheckInOutCard } from './settings/CheckInOutCard';
import { AutoPriceCard } from './settings/AutoPriceCard';
import { CurrencyCard } from './settings/CurrencyCard';
import { NotificationsCard } from './settings/NotificationsCard';
import { PoliciesCard } from './settings/PoliciesCard';

export default function SettingsContent() {
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const [currency, setCurrency] = useState('USD');
  const [enableAutoPrice, setEnableAutoPrice] = useState(false);
  const [priceIncreasePercent, setPriceIncreasePercent] = useState('20');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingConfirmations, setBookingConfirmations] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(true);
  const [paymentNotifications, setPaymentNotifications] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      description: "Your settings have been updated successfully."
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{t('dashboard.hotelSettings')}</h2>
        <Button onClick={handleSaveSettings} className="flex items-center gap-2 bg-[#9b87f5] hover:bg-[#7E69AB]">
          <Save className="h-4 w-4" />
          {t('dashboard.saveAllSettings')}
        </Button>
      </div>
      
      <Tabs defaultValue="checkin" className="w-full">
        <TabsList className="mb-6 bg-[#7a0486] border border-white">
          <TabsTrigger value="checkin" className="bg-[#7a0486] text-slate-50">{t('dashboard.checkinOut')}</TabsTrigger>
          <TabsTrigger value="auto-price" className="bg-[#a609b6] text-slate-50">{t('dashboard.autoPriceIncrease')}</TabsTrigger>
          <TabsTrigger value="currency" className="bg-[#aa10ba] text-slate-50">{t('dashboard.currency')}</TabsTrigger>
          <TabsTrigger value="notifications" className="bg-[#ac11bc] text-slate-50">{t('dashboard.notificationPreferences')}</TabsTrigger>
          <TabsTrigger value="policies" className="bg-[#ad13bd] text-slate-50">{t('dashboard.policies')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="checkin">
          <CheckInOutCard />
        </TabsContent>
        
        <TabsContent value="auto-price">
          <AutoPriceCard 
            enableAutoPrice={enableAutoPrice}
            setEnableAutoPrice={setEnableAutoPrice}
            priceIncreasePercent={priceIncreasePercent}
            setPriceIncreasePercent={setPriceIncreasePercent}
          />
        </TabsContent>
        
        <TabsContent value="currency">
          <CurrencyCard 
            currency={currency}
            setCurrency={setCurrency}
          />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsCard 
            emailNotifications={emailNotifications}
            setEmailNotifications={setEmailNotifications}
            bookingConfirmations={bookingConfirmations}
            setBookingConfirmations={setBookingConfirmations}
            reviewAlerts={reviewAlerts}
            setReviewAlerts={setReviewAlerts}
            paymentNotifications={paymentNotifications}
            setPaymentNotifications={setPaymentNotifications}
          />
        </TabsContent>
        
        <TabsContent value="policies">
          <PoliciesCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
