import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";

export default function AddProperty2() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            {t('dashboard.addProperty2Title')}
          </h1>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://form.jotform.com/251846986373069"
              className="w-full h-[900px] rounded-xl border shadow-md"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}