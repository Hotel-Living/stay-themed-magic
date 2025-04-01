
import { Calculator, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CalculatorContent() {
  const handleDownloadExcel = () => {
    // Create a link to download the file
    const link = document.createElement('a');
    link.href = '/hotel-living-calculator.xlsx'; // Path to the Excel file
    link.download = 'hotel-living-calculator.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Hotel-Living Calculator</h2>
      <p className="text-foreground/80 mb-4">Calculate potential revenue and occupancy for your properties.</p>
      
      <div className="text-center py-12 text-muted-foreground">
        <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="mb-6">Our advanced calculator tool helps you project earnings based on local market data.</p>
        
        <Button 
          onClick={handleDownloadExcel}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white flex items-center gap-2 mx-auto"
        >
          <Download className="w-4 h-4" />
          Download Excel Calculator
        </Button>
        
        <p className="text-xs mt-8 text-foreground/60">
          © {new Date().getFullYear()} Hotel-Living Calculator. All rights reserved.
          This calculator is registered and protected by copyright laws.
        </p>
      </div>
    </div>
  );
}
