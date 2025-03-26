
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accessibility } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/context/LanguageContext';

export function AccessibilityMenu() {
  const { 
    highContrast, 
    toggleHighContrast,
    fontSize,
    setFontSize,
    focusMode,
    toggleFocusMode
  } = useAccessibility();
  const { t } = useLanguage();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white"
          aria-label="Accessibility options"
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Accessibility Options</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="text-base">High Contrast Mode</Label>
              <Switch 
                id="high-contrast" 
                checked={highContrast} 
                onCheckedChange={toggleHighContrast}
                aria-label="Toggle high contrast mode"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Enhances visual contrast for better readability
            </p>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base">Text Size</Label>
            <RadioGroup 
              defaultValue={fontSize} 
              value={fontSize}
              onValueChange={(val) => setFontSize(val as 'normal' | 'large' | 'x-large')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">Large</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="x-large" id="x-large" />
                <Label htmlFor="x-large">Extra Large</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="focus-mode" className="text-base">Focus Mode</Label>
              <Switch 
                id="focus-mode" 
                checked={focusMode} 
                onCheckedChange={toggleFocusMode}
                aria-label="Toggle focus mode"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Reduces animations and visual distractions
            </p>
          </div>
          
          <SheetClose asChild>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              aria-label="Close accessibility menu"
            >
              Close
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
