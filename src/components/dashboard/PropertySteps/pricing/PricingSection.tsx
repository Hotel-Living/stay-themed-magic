
import React from 'react';
import { useTranslation } from 'react-i18next';

const PricingSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('pricing.title')}</h2>
      <p>{t('pricing.enableDynamicPricing')}</p>
      <p>{t('pricing.defineRoomTypesBeforeRates')}</p>
      
      {/* Aquí irían los formularios de precios como ya estaban */}
    </div>
  );
};

export default PricingSection;
