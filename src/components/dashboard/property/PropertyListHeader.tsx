
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink } from "lucide-react";
import { createJotFormURL } from "@/utils/jotformUtils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface PropertyListHeaderProps {
  onAddProperty: () => void;
}

export const PropertyListHeader = ({ onAddProperty }: PropertyListHeaderProps) => {
  const { toast } = useToast();
  const [isLoadingJotForm, setIsLoadingJotForm] = useState(false);

  const handleJotFormSubmission = async () => {
    try {
      setIsLoadingJotForm(true);
      console.log("🔗 Creating JotForm URL...");
      
      const jotformUrl = await createJotFormURL();
      console.log("✅ JotForm URL created successfully");
      
      // Open in new tab
      window.open(jotformUrl, '_blank');
      
      toast({
        title: "JotForm Opened",
        description: "Complete the form in the new tab. Your submission will be automatically linked to your account.",
      });
    } catch (error) {
      console.error("❌ Error opening JotForm:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to open hotel submission form",
        variant: "destructive"
      });
    } finally {
      setIsLoadingJotForm(false);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">My Properties</h1>
      <div className="flex gap-2">
        <Button 
          onClick={handleJotFormSubmission}
          disabled={isLoadingJotForm}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          {isLoadingJotForm ? "Loading..." : "Submit via JotForm"}
        </Button>
        <Button onClick={onAddProperty} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </div>
    </div>
  );
};
