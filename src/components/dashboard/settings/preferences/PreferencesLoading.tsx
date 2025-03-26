
import React from 'react';
import { Loader2 } from 'lucide-react';

export const PreferencesLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <Loader2 className="w-6 h-6 text-primary animate-spin" />
    </div>
  );
};
