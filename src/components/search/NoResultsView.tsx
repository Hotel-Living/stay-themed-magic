
import React from "react";

interface NoResultsViewProps {
  isLoading: boolean;
  error: Error | null;
  hasResults: boolean;
}

export const NoResultsView: React.FC<NoResultsViewProps> = ({ isLoading, error, hasResults }) => {
  if (isLoading) {
    return null; // Loading state is handled in the main component
  }

  if (error) {
    return (
      <div className="border border-fuchsia-400 rounded-lg p-8 text-center bg-[#460F54]/50 backdrop-blur-sm">
        <h3 className="text-2xl font-semibold mb-4 text-white">No results. Please, Search Again. Thanks!</h3>
      </div>
    );
  }

  if (!hasResults) {
    return (
      <div className="border border-fuchsia-400 rounded-lg p-8 text-center backdrop-blur-sm bg-[#8b449e]/50">
        <h3 className="font-semibold mb-4 text-white text-lg">No results.
Search Again. Thanks!</h3>
      </div>
    );
  }

  return null;
};
