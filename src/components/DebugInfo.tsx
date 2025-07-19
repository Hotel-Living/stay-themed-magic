
import React from 'react';
import { useLocation } from 'react-router-dom';

export const DebugInfo = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded text-sm font-mono z-50">
      <div>Route: {location.pathname}</div>
      <div>App Status: ✅ Running</div>
      <div>Time: {new Date().toLocaleTimeString()}</div>
    </div>
  );
};
