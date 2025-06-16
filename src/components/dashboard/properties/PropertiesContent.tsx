
import React from 'react';
import { PropertyListView } from './views/PropertyListView';
import { useTranslation } from '@/hooks/useTranslation';

export const PropertiesContent = () => {
  const { t, language } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            {language === 'es' ? t('dashboard.myProperties') : 'My Properties'}
          </h2>
          <p className="text-muted-foreground">
            11 {language === 'es' ? t('dashboard.propertiesRegistered') : 'properties registered'}
          </p>
        </div>
        <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg transition-colors">
          {language === 'es' ? t('dashboard.addNewProperty') : 'Add New Property'}
        </button>
      </div>
      
      <PropertyListView />
    </div>
  );
};
