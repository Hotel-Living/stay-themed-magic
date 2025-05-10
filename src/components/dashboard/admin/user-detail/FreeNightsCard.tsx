
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FreeNightsCardProps {
  freeNightsCount: number;
  rewards?: any[];
  isAdmin?: boolean;
  isGranting?: boolean;
  onGrant?: (quantity: number) => Promise<void>;
  onRemove?: (rewardId: string) => Promise<void>;
}

export const FreeNightsCard: React.FC<FreeNightsCardProps> = ({ 
  freeNightsCount, 
  rewards = [], 
  isAdmin = false,
  isGranting = false,
  onGrant,
  onRemove
}) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleGrantClick = async () => {
    if (!onGrant) return;
    
    try {
      await onGrant(quantity);
      setQuantity(1); // Reset quantity after granting
    } catch (error) {
      console.error("Error in grant handler:", error);
    }
  };

  const handleRemoveClick = async (rewardId: string) => {
    if (!onRemove) return;
    
    try {
      await onRemove(rewardId);
    } catch (error) {
      console.error("Error in remove handler:", error);
    }
  };
  
  // If there are no free nights and we're not an admin, don't show anything
  if (freeNightsCount === 0 && !isAdmin) return null;
  
  return (
    <div className="mt-4 p-4 bg-indigo-50 rounded-md border border-indigo-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-indigo-800">Free nights redeemed:</span>
        <span className="text-lg font-bold text-indigo-700">{freeNightsCount}</span>
      </div>
      
      {isAdmin && (
        <div className="mt-3 border-t border-indigo-200 pt-3">
          <div className="text-sm font-medium text-indigo-700 mb-2">Admin Controls</div>
          
          <div className="flex flex-col gap-2">
            {/* Grant controls */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded-md overflow-hidden">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1 || isGranting}
                  className="h-8 px-2 rounded-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-3 py-1">{quantity}</span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => handleQuantityChange(1)}
                  disabled={isGranting}
                  className="h-8 px-2 rounded-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                size="sm"
                onClick={handleGrantClick}
                disabled={isGranting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isGranting ? "Processing..." : `Grant ${quantity} Free Night${quantity !== 1 ? 's' : ''}`}
              </Button>
            </div>
            
            {/* Rewards list with remove option */}
            {rewards.length > 0 && (
              <div className="mt-2">
                <div className="text-xs text-indigo-600 font-medium mb-1">Reward History</div>
                <ul className="space-y-1 max-h-48 overflow-auto text-xs">
                  {rewards.map((reward) => (
                    <li key={reward.id} className="flex justify-between items-center p-1 bg-white rounded">
                      <div>
                        <span className="font-medium">{reward.quantity || 1} night{(reward.quantity || 1) !== 1 ? 's' : ''}</span>
                        <span className="text-slate-500"> via {reward.source}</span>
                        <span className="text-slate-400 ml-1">
                          ({new Date(reward.created_at).toLocaleDateString()})
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveClick(reward.id)}
                        disabled={isGranting}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
