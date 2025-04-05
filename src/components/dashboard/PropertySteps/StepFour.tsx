
import React, { useState, useEffect } from "react";
import ThemesAndActivitiesStep from "./ThemesAndActivitiesStep";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, CheckCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepFourProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepFour({
  onValidationChange = () => {}
}: StepFourProps) {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [newTheme, setNewTheme] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if all required fields are completed
  const checkValidation = () => {
    if (selectedThemes.length === 0) {
      setError("Please select at least one theme for your property");
      onValidationChange(false);
      return false;
    }
    setError("");
    onValidationChange(true);
    return true;
  };

  // Simulate theme selection (would connect to ThemesAndActivitiesStep in production)
  const handleThemeSelection = (theme: string) => {
    if (!selectedThemes.includes(theme)) {
      // Add theme and sort alphabetically
      const updatedThemes = [...selectedThemes, theme].sort();
      setSelectedThemes(updatedThemes);
    }

    // Check validation after change
    setTimeout(checkValidation, 100);
  };

  // Handle adding a new theme
  const handleAddTheme = () => {
    if (newTheme.trim()) {
      handleThemeSelection(newTheme.trim());
      setNewTheme("");
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    // Validate on mount and when fields change
    checkValidation();
  }, [selectedThemes]);

  return (
    <div className="space-y-6">
      <ThemesAndActivitiesStep />
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-white bg-[#c102d3]">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add new theme category
              </Button>
            </DialogTrigger>
            <DialogContent className="text-black">
              <DialogHeader>
                {/* Removed DialogTitle as requested */}
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="theme-name" className="text-black">Theme Name</Label>
                  <Input id="theme-name" value={newTheme} onChange={e => setNewTheme(e.target.value)} placeholder="Enter theme name" className="text-black" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <DialogClose asChild>
                  <Button variant="outline" className="text-black">Cancel</Button>
                </DialogClose>
                <Button type="button" onClick={handleAddTheme} disabled={!newTheme.trim()} className="text-white">
                  Add Theme
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {selectedThemes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedThemes.map(theme => (
              <div key={theme} className="px-3 py-1 rounded-full bg-fuchsia-100 text-fuchsia-800 flex items-center gap-1">
                <span>{theme}</span>
                <button 
                  onClick={() => setSelectedThemes(selectedThemes.filter(t => t !== theme))} 
                  className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-fuchsia-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-700 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
        
        {selectedThemes.length > 0 && !error && (
          <div className="p-3 rounded-md bg-green-50 text-green-700 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>{selectedThemes.length} theme(s) selected successfully</span>
          </div>
        )}
      </div>
    </div>
  );
}
