
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Subcategory {
  key: string;
}

interface Props {
  subcategories: Subcategory[];
  titleKey: string;
}

const HierarchicalActivitiesDisplay: React.FC<Props> = ({ subcategories, titleKey }) => {
  const { t } = useTranslation();

  return (
    <div className="subcategory-section">
      <h3>{t(titleKey)}</h3>
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory.key}>{t(`activities.${subcategory.key}`)}</li>
        ))}
      </ul>
    </div>
  );
};

export default HierarchicalActivitiesDisplay;
