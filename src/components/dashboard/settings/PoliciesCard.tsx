
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';

export const PoliciesCard = () => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader className="bg-[#ac12bc] border border-white">
        <CardTitle>{t('dashboard.hotelPolicies')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 bg-[#860493] border-x border-b border-white">
        <div>
          <Label htmlFor="cancellation-policy">{t('dashboard.cancellationPolicy')}</Label>
          <Textarea 
            id="cancellation-policy" 
            placeholder="Enter your cancellation policy details..." 
            defaultValue={t('dashboard.cancellationPolicyDefault')} 
            className="min-h-[100px] text-black bg-slate-50 border-[#7A0486]" 
          />
        </div>
        
        <div>
          <Label htmlFor="pet-policy">{t('dashboard.petPolicy')}</Label>
          <Select defaultValue="not-allowed">
            <SelectTrigger className="w-full bg-[#9b87f5] text-white border-white">
              <SelectValue placeholder="Pet policy" />
            </SelectTrigger>
            <SelectContent className="bg-[#9b87f5] text-white border-[#7A0486]">
              <SelectItem value="allowed" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">
                {t('dashboard.petsAllowed')}
              </SelectItem>
              <SelectItem value="not-allowed" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">
                {t('dashboard.noPetsAllowed')}
              </SelectItem>
              <SelectItem value="case-by-case" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">
                {t('dashboard.petsCaseByCase')}
              </SelectItem>
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
              <SelectItem value="smoking" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">
                {t('dashboard.smokingAllowed')}
              </SelectItem>
              <SelectItem value="non-smoking" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">
                {t('dashboard.nonSmoking')}
              </SelectItem>
              <SelectItem value="designated-areas" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">
                {t('dashboard.smokingDesignatedAreas')}
              </SelectItem>
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
              <SelectItem value="allowed" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">
                {t('dashboard.childrenWelcome')}
              </SelectItem>
              <SelectItem value="not-allowed" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">
                {t('dashboard.adultsOnly')}
              </SelectItem>
              <SelectItem value="with-restrictions" className="text-white hover:bg-[#7E69AB] focus:bg-[#7E69AB]">
                {t('dashboard.childrenWithRestrictions')}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
