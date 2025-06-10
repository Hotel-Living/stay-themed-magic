
import React from 'react';
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

interface MapCanvasProps {
  mapRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  mapRef,
  isLoading,
  error,
  onRetry
}) => {
  return (
    <div 
      ref={mapRef} 
      className="w-full h-[300px] rounded-lg border border-fuchsia-800/30 flex items-center justify-center bg-[#7A0486]"
    >
      {isLoading && <LoadingState />}
      {error && <ErrorState error={error} onRetry={onRetry} />}
    </div>
  );
};
