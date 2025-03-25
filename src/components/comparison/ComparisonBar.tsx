
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Scale, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useComparison } from "./ComparisonContext";

export function ComparisonBar() {
  const { comparedHotels, removeFromComparison, clearComparison } = useComparison();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  if (comparedHotels.length === 0) {
    return null;
  }

  const handleCompare = () => {
    const hotelIds = comparedHotels.map(hotel => hotel.id).join(",");
    navigate(`/compare?hotels=${hotelIds}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 transition-all duration-300"
      style={{ height: isCollapsed ? "48px" : "auto" }}
    >
      {/* Collapse toggle */}
      <button 
        className="absolute -top-8 right-4 bg-gray-900/90 p-2 rounded-t-md border border-gray-800 border-b-0"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand comparison bar" : "Collapse comparison bar"}
      >
        {isCollapsed ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
      </button>

      <div className="container mx-auto px-4 py-3">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale className="text-fuchsia-400 w-5 h-5" />
            <h3 className="text-white font-bold">
              Compare Hotels ({comparedHotels.length})
            </h3>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearComparison}
              className="text-sm"
            >
              Clear All
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleCompare}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-sm"
              disabled={comparedHotels.length < 2}
            >
              Compare
            </Button>
          </div>
        </div>

        {/* Hotel list */}
        {!isCollapsed && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            {comparedHotels.map((hotel) => (
              <div 
                key={hotel.id}
                className="bg-gray-800/50 rounded-md p-3 flex justify-between items-center"
              >
                <span className="text-white truncate">{hotel.name}</span>
                <button
                  onClick={() => removeFromComparison(hotel.id)}
                  className="text-gray-400 hover:text-white"
                  aria-label={`Remove ${hotel.name} from comparison`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
