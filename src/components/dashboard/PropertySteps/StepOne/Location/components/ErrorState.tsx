
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 text-center">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-3" />
      <h3 className="text-lg font-semibold text-red-400 mb-2">Google Maps Error</h3>
      <p className="text-sm text-white/70">{error}</p>
      <p className="mt-3 text-xs text-white/50">
        Please check that your Google Maps API key is correctly configured and has the appropriate domain restrictions.
      </p>
      
      <div className="mt-4 p-3 bg-yellow-900/30 rounded-md border border-yellow-700/50 max-w-md">
        <p className="text-xs text-yellow-300">
          <strong>Tip:</strong> Ensure your API key allows these domains:
        </p>
        <ul className="text-xs text-yellow-200 list-disc pl-5 mt-1">
          <li>localhost</li>
          <li>*.lovable.app</li>
          <li>Any custom domains you're using</li>
        </ul>
      </div>
      
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline" 
          className="mt-4 bg-purple-700/40 hover:bg-purple-700/60 border-purple-500"
        >
          Retry Loading Map
        </Button>
      )}
    </div>
  );
};
