
import React from 'react';
import { useTranslation } from 'react-i18next';

const roomFeatures = [
  'privateBathroom',
  'hairdryer',
  'miniBar',
  'airConditioning',
  'tv',
  'safe',
  'cityView',
  'balcony',
  'coffeeMachine',
  'desk'
];

const RoomFeaturesStep: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('roomFeatures.title')}</h2>
      <ul>
        {roomFeatures.map((featureKey) => (
          <li key={featureKey}>{t(`roomFeatures.${featureKey}`)}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomFeaturesStep;
