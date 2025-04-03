
import { useState } from "react";
import { Calculator, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function CalculatorContent() {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  
  const handleDownloadExcel = async () => {
    try {
      setIsDownloading(true);
      
      // Get the public URL for the calculator file from Supabase storage
      const { data, error } = await supabase
        .storage
        .from('hotel-calculator')
        .download('hotel-living-calculator.xlsx');
      
      if (error) {
        throw error;
      }
      
      // Create a blob and generate a download link
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'hotel-living-calculator.xlsx';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      toast({
        title: "Download successful",
        description: "The Hotel-Living Calculator has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "There was a problem downloading the calculator. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <div className="glass-card rounded-2xl p-6 bg-[#430254]">
      <h2 className="text-xl font-bold mb-6">Hotel-Living Calculator</h2>
      <p className="text-foreground/80 mb-4">Calculate potential revenue and occupancy for your properties.</p>
      
      <div className="text-center py-12 text-muted-foreground">
        <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="mb-6">Our advanced calculator tool helps you project earnings based on local market data.</p>
        
        <Button 
          onClick={handleDownloadExcel} 
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white flex items-center gap-2 mx-auto"
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download Excel Calculator
            </>
          )}
        </Button>
        
        <p className="text-xs mt-8 text-foreground/60">
          © {new Date().getFullYear()} Hotel-Living Calculator. All rights reserved.
          This calculator is registered and protected by copyright laws.
        </p>
      </div>
    </div>
  );
}
