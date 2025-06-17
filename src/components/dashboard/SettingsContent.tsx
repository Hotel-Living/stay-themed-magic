
import React, { useState } from 'react';
import { Settings, Save, Clock, CreditCard, Shield, Bell, Globe, HelpCircle, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import CheckInOutSection from './PropertySteps/rooms/CheckInOutSection';
import MealPlanSection from './PropertySteps/rooms/MealPlanSection';
import { useTranslation } from '@/hooks/useTranslation';

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
  
  return <div className="space-y-8">
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
          <Card>
            <CardHeader className="bg-[#7a0486] border border-white">
              <CardTitle>{t('dashboard.checkinOutPolicy')}</CardTitle>
              
            </CardHeader>
            <CardContent className="bg-[#860493] border-x border-b border-white">
              <CheckInOutSection />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="auto-price">
          <Card>
            <CardHeader className="bg-[#7a0486] border border-white">
              <CardTitle>{t('dashboard.progressivePriceIncrease')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-[#860493] border-x border-b border-white">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-price-increase">{t('dashboard.enableAutoPriceIncrease')}</Label>
                <Switch id="auto-price-increase" checked={enableAutoPrice} onCheckedChange={setEnableAutoPrice} />
              </div>
              
              {enableAutoPrice && <div className="space-y-6">
                  <div>
                    <Label className="block text-base mb-2">{t('dashboard.percentTotalIncrease')}</Label>
                    <div className="flex items-center">
                      <Input type="number" value={priceIncreasePercent} onChange={e => setPriceIncreasePercent(e.target.value)} min="1" max="100" className="bg-[#A67CAB] text-black w-36 mr-2 h-12 border-white" />
                      <span className="text-2xl">%</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    
                    
                  </div>
                </div>}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="currency">
          <Card>
            <CardHeader className="bg-[#7a0486] border border-white">
              <CardTitle>{t('dashboard.currencySettings')}</CardTitle>
              <CardDescription>{t('dashboard.currencySettingsDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="bg-[#860493] border-x border-b border-white">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currency" className="block text-base mb-2">{t('dashboard.preferredCurrency')}</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-full bg-[#9b87f5] text-white h-12 border-white">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#9b87f5] text-white border-[#7A0486]">
                      {["USD", "EUR", "GBP", "JPY", "CNY", "AUD", "CAD"].map(currency => <SelectItem key={currency} value={currency} className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">{currency}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader className="bg-[#7a0486] border border-white">
              <CardTitle>{t('dashboard.notificationPreferences')}</CardTitle>
              <CardDescription>{t('dashboard.notificationPreferencesDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 bg-[#860493] border-x border-b border-white">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">{t('dashboard.emailNotifications')}</Label>
                  
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              
              <div className="space-y-4 pt-4 border-t border-white">
                <h4 className="font-medium">{t('dashboard.notificationTypes')}</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">{t('dashboard.newBookingConfirmations')}</Label>
                    
                  </div>
                  <Switch checked={bookingConfirmations} onCheckedChange={setBookingConfirmations} disabled={!emailNotifications} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">{t('dashboard.reviewAlerts')}</Label>
                    
                  </div>
                  <Switch checked={reviewAlerts} onCheckedChange={setReviewAlerts} disabled={!emailNotifications} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">{t('dashboard.paymentNotifications')}</Label>
                    
                  </div>
                  <Switch checked={paymentNotifications} onCheckedChange={setPaymentNotifications} disabled={!emailNotifications} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="policies">
          <Card>
            <CardHeader className="bg-[#ac12bc] border border-white">
              <CardTitle>{t('dashboard.hotelPolicies')}</CardTitle>
              
            </CardHeader>
            <CardContent className="space-y-6 bg-[#860493] border-x border-b border-white">
              <div>
                <Label htmlFor="cancellation-policy">{t('dashboard.cancellationPolicy')}</Label>
                <Textarea id="cancellation-policy" placeholder="Enter your cancellation policy details..." defaultValue={t('dashboard.cancellationPolicyDefault')} className="min-h-[100px] text-black bg-slate-50 border-[#7A0486]" />
              </div>
              
              <div>
                <Label htmlFor="pet-policy">{t('dashboard.petPolicy')}</Label>
                <Select defaultValue="not-allowed">
                  <SelectTrigger className="w-full bg-[#9b87f5] text-white border-white">
                    <SelectValue placeholder="Pet policy" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#9b87f5] text-white border-[#7A0486]">
                    <SelectItem value="allowed" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">{t('dashboard.petsAllowed')}</SelectItem>
                    <SelectItem value="not-allowed" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">{t('dashboard.noPetsAllowed')}</SelectItem>
                    <SelectItem value="case-by-case" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">{t('dashboard.petsCaseByCase')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="smoking-policy">{t('dashboard.smokingPolicy')}</Label>
                <Select defaultValue="non-smoking">
                  <SelectTrigger className="w-full bg-[#9b87f5] text-white border-white">
                    <SelectValue placeholder="Smoking policy" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#9b87f5] text-white border-[#7A0486]">
                    <SelectItem value="smoking" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">{t('dashboard.smokingAllowed')}</SelectItem>
                    <SelectItem value="non-smoking" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">{t('dashboard.nonSmoking')}</SelectItem>
                    <SelectItem value="designated-areas" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">{t('dashboard.smokingDesignatedAreas')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="children-policy">{t('dashboard.childrenPolicy')}</Label>
                <Select defaultValue="allowed">
                  <SelectTrigger className="w-full bg-[#9b87f5] text-white border-white">
                    <SelectValue placeholder="Children policy" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#9b87f5] text-white border-[#7A0486]">
                    <SelectItem value="allowed" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">{t('dashboard.childrenWelcome')}</SelectItem>
                    <SelectItem value="not-allowed" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">{t('dashboard.adultsOnly')}</SelectItem>
                    <SelectItem value="with-restrictions" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">{t('dashboard.childrenWithRestrictions')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}
