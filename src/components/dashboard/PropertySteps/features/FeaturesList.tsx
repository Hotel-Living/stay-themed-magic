
import React, { useState } from "react";
import { PlusCircle, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeaturesListProps {
  features: string[];
}

export function FeaturesList({ features }: FeaturesListProps) {
  const [showAddNew, setShowAddNew] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!newFeature.trim()) return;
    
    setSubmitting(true);
    
    // Simulate sending to admin for approval
    setTimeout(() => {
      toast({
        title: "Feature suggestion sent",
        description: `Your suggestion "${newFeature}" has been sent to administrators for approval.`,
      });
      
      setNewFeature('');
      setShowAddNew(false);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {features.map((feature) => (
          <label key={feature} className="flex items-start">
            <input 
              type="checkbox" 
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm">{feature}</span>
          </label>
        ))}
      </div>
      
      {!showAddNew ? (
        <div 
          className="flex items-center cursor-pointer text-fuchsia-400 hover:text-fuchsia-300 transition"
          onClick={() => setShowAddNew(true)}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">Add new feature</span>
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Enter feature name"
              className="flex-1 text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2 text-white"
              autoFocus
            />
            <button
              onClick={handleSubmit}
              disabled={!newFeature.trim() || submitting}
              className="p-2 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-fuchsia-900/50 rounded-lg"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <CheckCircle className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={() => {
                setShowAddNew(false);
                setNewFeature('');
              }}
              className="p-2 bg-fuchsia-900/50 hover:bg-fuchsia-900/70 rounded-lg"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-xs text-fuchsia-300">
            Your suggestion will be sent to administrators for approval.
          </p>
        </div>
      )}
    </div>
  );
}
