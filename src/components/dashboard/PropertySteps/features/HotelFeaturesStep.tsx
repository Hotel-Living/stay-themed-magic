
import React from 'react';
import { useTranslation } from 'react-i18next';

const hotelFeatures = [
  'freeWifi',
  'parking',
  'restaurant',
  'reception24h',
  'businessCenter',
  'spa',
  'fitnessCenter',
  'swimmingPool',
  'airportShuttle',
  'petFriendly'
];

const HotelFeaturesStep: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('hotelFeatures.title')}</h2>
      <ul>
        {hotelFeatures.map((featureKey) => (
          <li key={featureKey}>{t(`hotelFeatures.${featureKey}`)}</li>
        ))}
      </ul>
    </div>
  );
};

export default HotelFeaturesStep;
