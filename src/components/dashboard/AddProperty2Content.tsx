import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";

export const AddProperty2Content = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          {t('dashboard.addProperty2Title')}
        </h1>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://form.jotform.com/251846986373069"
          className="w-full h-[900px] rounded-xl border shadow-md"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default AddProperty2Content;