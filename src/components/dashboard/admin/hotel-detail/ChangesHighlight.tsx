
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FieldChange {
  fieldName: string;
  displayName: string;
  previousValue: any;
  newValue: any;
  fieldType: 'text' | 'number' | 'boolean' | 'array' | 'object';
}

interface ChangesHighlightProps {
  hotelId: string;
  changes: FieldChange[];
  onApproveAll: () => Promise<void>;
  onRejectAll: () => Promise<void>;
  onRefresh: () => void;
}

export const ChangesHighlight = ({ 
  hotelId, 
  changes, 
  onApproveAll, 
  onRejectAll,
  onRefresh
}: ChangesHighlightProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<{[key: string]: boolean}>({});

  if (changes.length === 0) {
    return null;
  }

  const handleApproveField = async (fieldName: string) => {
    try {
      setLoading(prev => ({ ...prev, [fieldName]: true }));
      
      // Extract just the single field from changes
      const fieldChange = changes.find(change => change.fieldName === fieldName);
      if (!fieldChange) return;
      
      console.log("Approving field change:", {
        field: fieldName,
        oldValue: fieldChange.previousValue,
        newValue: fieldChange.newValue
      });
      
      // First update the field with its new value
      const { error: updateError } = await supabase
        .from('hotels')
        .update({ 
          [fieldName]: fieldChange.newValue
        })
        .eq('id', hotelId);

      if (updateError) {
        console.error("Error updating field value:", updateError);
        throw updateError;
      }
      
      // Then in a separate operation, call the edge function to remove the field from pending_changes
      // Using functions.invoke to call the Edge function
      const { error: pendingError } = await supabase.functions.invoke("remove_pending_change_field", {
        body: {
          hotel_id: hotelId,
          field_name: fieldName
        }
      });

      if (pendingError) {
        console.error("Error removing field from pending_changes:", pendingError);
        // Even if this fails, the value was updated correctly
      }
      
      toast({
        title: "Field approved",
        description: `The change to ${fieldChange.displayName} has been approved.`
      });
      
      onRefresh();
    } catch (error: any) {
      console.error("Error approving field:", error);
      toast({
        title: "Error",
        description: "Failed to approve field change: " + (error.message || "Unknown error"),
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleRejectField = async (fieldName: string) => {
    try {
      setLoading(prev => ({ ...prev, [fieldName]: true }));
      
      console.log("Rejecting field change:", { field: fieldName });
      
      // Use the edge function to remove just this field from pending_changes
      const { error } = await supabase.functions.invoke("remove_pending_change_field", {
        body: {
          hotel_id: hotelId,
          field_name: fieldName
        }
      });

      if (error) {
        console.error("Error rejecting field with Edge Function:", error);
        throw error;
      }
      
      toast({
        title: "Change rejected",
        description: "The proposed change has been rejected."
      });
      
      onRefresh();
    } catch (error: any) {
      console.error("Error rejecting field:", error);
      toast({
        title: "Error",
        description: "Failed to reject field change: " + (error.message || "Unknown error"),
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  // Helper function to format field values for display
  const formatValue = (value: any, fieldType: string) => {
    if (value === null || value === undefined) return "Not set";
    
    switch(fieldType) {
      case 'boolean':
        return value ? "Yes" : "No";
      case 'array':
        return Array.isArray(value) ? value.join(", ") : "Empty";
      case 'object':
        return typeof value === 'object' ? JSON.stringify(value) : value;
      default:
        return String(value);
    }
  };

  return (
    <Card className="bg-yellow-50/10 border border-yellow-300/30 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium text-lg flex items-center">
            <Badge variant="outline" className="mr-2 bg-yellow-400/20 text-yellow-300 border-yellow-400">
              Pending
            </Badge>
            Property Changes Requiring Review
          </h3>
          <p className="text-sm text-gray-300">
            The hotel owner has submitted the following changes that require your review.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={onApproveAll}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Approve All
          </Button>
          <Button 
            variant="outline"
            onClick={onRejectAll}
            className="border-red-400 text-red-400 hover:bg-red-50/10"
          >
            Reject All
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {changes.map((change) => (
          <div 
            key={change.fieldName} 
            className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg"
          >
            <div className="flex-1">
              <p className="font-medium">{change.displayName}</p>
              <div className="flex items-center text-sm mt-1">
                <span className="text-gray-400">{formatValue(change.previousValue, change.fieldType)}</span>
                <span className="mx-2 text-gray-500">→</span>
                <span className="text-yellow-200 font-medium">{formatValue(change.newValue, change.fieldType)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleApproveField(change.fieldName)}
                disabled={loading[change.fieldName]}
                className="bg-green-600/20 hover:bg-green-600/40 text-green-300"
              >
                <Check className="w-4 h-4 mr-1" /> Approve
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleRejectField(change.fieldName)}
                disabled={loading[change.fieldName]}
                className="bg-red-600/20 hover:bg-red-600/40 text-red-300"
              >
                <X className="w-4 h-4 mr-1" /> Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
