
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';

const AdvertisingContent = () => {
  const { t, language } = useTranslation();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const months = [
    { id: 'january', name: language === 'es' ? t('dashboard.january') : 'January' },
    { id: 'february', name: language === 'es' ? t('dashboard.february') : 'February' },
    { id: 'march', name: language === 'es' ? t('dashboard.march') : 'March' },
    { id: 'april', name: language === 'es' ? t('dashboard.april') : 'April' },
    { id: 'may', name: language === 'es' ? t('dashboard.may') : 'May' },
    { id: 'june', name: language === 'es' ? t('dashboard.june') : 'June' },
    { id: 'july', name: language === 'es' ? t('dashboard.july') : 'July' },
    { id: 'august', name: language === 'es' ? t('dashboard.august') : 'August' },
    { id: 'september', name: language === 'es' ? t('dashboard.september') : 'September' },
    { id: 'october', name: language === 'es' ? t('dashboard.october') : 'October' },
    { id: 'november', name: language === 'es' ? t('dashboard.november') : 'November' },
    { id: 'december', name: language === 'es' ? t('dashboard.december') : 'December' }
  ];

  const toggleMonth = (monthId: string) => {
    setSelectedMonths(prev => 
      prev.includes(monthId) 
        ? prev.filter(id => id !== monthId)
        : [...prev, monthId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Promotion request submitted:', {
      contactName,
      contactEmail,
      selectedMonths,
      agreedToTerms
    });
  };

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-2xl p-8 bg-[#7a0486]">
        <h2 className="text-2xl font-bold mb-6">
          {language === 'es' ? t('dashboard.advertisingPromotion') : 'Advertising Promotion'}
        </h2>
        
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-fuchsia-200">
              {language === 'es' ? t('dashboard.getFreeAdvertising') : 'Get one month of free advertising on Hotel Living'}
            </h3>
            <p className="text-lg">
              {language === 'es' ? t('dashboard.makeHotelVisible') : 'Make your hotel visible — for free.'}
            </p>
            <div className="bg-fuchsia-900/30 rounded-lg p-4">
              <p className="text-lg font-medium">
                {language === 'es' ? t('dashboard.exchangeThreeNights') : 'Exchange 3 nights. Get 30 days of advertising.'}
              </p>
              <p className="text-sm text-fuchsia-300">
                {language === 'es' ? t('dashboard.customersAddValue') : 'Customers add value and movement.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">
              {language === 'es' ? t('dashboard.ourPromotionOffer') : 'Our Promotion Offer'}
            </h4>
            <p className="text-sm leading-relaxed">
              {language === 'es' ? t('dashboard.promotionDescription') : 'In exchange for just three nights of free accommodation at your hotel, at the time of year that suits you best, we offer you a full month of featured advertising on our portal — in the most visible and high-traffic areas.'}
            </p>
            <p className="text-sm leading-relaxed">
              {language === 'es' ? t('dashboard.flexibleTiming') : 'These three nights can be offered in any month of the year and you don\'t need to specify exact dates. Simply choose two or three months of availability.'}
            </p>
            <p className="text-sm leading-relaxed">
              {language === 'es' ? t('dashboard.additionalBenefits') : 'These promotional guests will not only give visibility and activity to your hotel, but also potential additional income (restaurant, services, reviews) and valuable movement and exposure — much more attractive than having empty rooms.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h4 className="text-lg font-semibold">
              {language === 'es' ? t('dashboard.participatePromotion') : 'Participate in this Promotion'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">
                  {language === 'es' ? t('dashboard.contactName') : 'Contact Name'}
                </Label>
                <Input
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="bg-white/10 border-fuchsia-300"
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">
                  {language === 'es' ? t('dashboard.contactEmail') : 'Contact Email'}
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="bg-white/10 border-fuchsia-300"
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">
                {language === 'es' ? t('dashboard.availableMonths') : 'Available Months for Free Nights'}
              </Label>
              <p className="text-sm text-fuchsia-300 mb-4">
                {language === 'es' ? t('dashboard.selectMonths') : 'Select at least 2 months when you can offer the free nights.'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {months.map((month) => (
                  <div key={month.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={month.id}
                      checked={selectedMonths.includes(month.id)}
                      onCheckedChange={() => toggleMonth(month.id)}
                    />
                    <Label htmlFor={month.id} className="text-sm">
                      {month.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={setAgreedToTerms}
              />
              <Label htmlFor="terms" className="text-sm">
                {language === 'es' ? t('dashboard.agreeOffer') : 'I agree and understand to offer 3 free nights in exchange for 1 month of advertising.'}
              </Label>
            </div>

            <Button 
              type="submit" 
              disabled={!agreedToTerms || selectedMonths.length < 2}
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700"
            >
              {language === 'es' ? t('dashboard.submitPromotionRequest') : 'Submit Promotion Request'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingContent;
