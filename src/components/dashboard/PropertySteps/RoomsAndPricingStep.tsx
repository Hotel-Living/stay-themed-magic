
import React, { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, PlusCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function RoomsAndPricingStep() {
  const stayLengths = ["8 days", "16 days", "24 days", "32 days"];
  const mealPlans = ["Breakfast only", "Half board", "Full board", "All inclusive", "No Meals Included"];
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedUnit, setSelectedUnit] = useState("sq. ft.");
  const [selectedMealPlan, setSelectedMealPlan] = useState("");
  const [selectedWeekday, setSelectedWeekday] = useState("Monday"); // Set Monday as default
  const [newRoomType, setNewRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState<string[]>(["Single Room"]);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Fields validation
  const [stayLengthsValid, setStayLengthsValid] = useState(false);
  const [mealPlanValid, setMealPlanValid] = useState(false);
  const [weekdayValid, setWeekdayValid] = useState(true); // Already has a default, so valid

  const handleMealPlanChange = (plan: string) => {
    setSelectedMealPlan(plan);
    setMealPlanValid(true);
  };
  
  const handleAddRoomType = () => {
    if (newRoomType.trim()) {
      setRoomTypes([...roomTypes, newRoomType.trim()]);
      setNewRoomType("");
      setDialogOpen(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90 uppercase">
              LENGTH OF STAY
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="col-span-2">
                <label className="block text-sm mb-1 uppercase">AVAILABLE STAY LENGTHS</label>
                <div className="grid grid-cols-2 gap-2">
                  {stayLengths.map((length) => (
                    <label key={length} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setStayLengthsValid(true);
                          }
                        }}
                      />
                      <span className="text-sm">{length}</span>
                    </label>
                  ))}
                </div>
                {!stayLengthsValid && (
                  <p className="text-red-400 text-xs mt-1">Please select at least one stay length</p>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90 uppercase">
              MEALS
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div>
                <Select onValueChange={handleMealPlanChange}>
                  <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
                    <SelectValue placeholder="Select a meal plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealPlans.map((plan) => (
                      <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!mealPlanValid && (
                  <p className="text-red-400 text-xs mt-1">Please select a meal plan</p>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90 uppercase">
              PREFERRED WEEKDAY FOR ALL CHECK-INS / OUTS
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {weekdays.map(day => (
                <label key={day} className="flex flex-col items-center">
                  <input 
                    type="radio" 
                    name="preferred-weekday"
                    className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mb-1"
                    checked={selectedWeekday === day}
                    onChange={() => setSelectedWeekday(day)}
                  />
                  <span className="text-xs text-center">{day}</span>
                </label>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90 uppercase">
              CHECK-IN/OUT POLICY
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm mb-1 uppercase">CHECK-IN TIME</label>
                <input 
                  type="time" 
                  className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                  defaultValue="14:00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 uppercase">CHECK-OUT TIME</label>
                <input 
                  type="time" 
                  className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                  defaultValue="11:00"
                  required
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90 uppercase">
              ROOM TYPES
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            {roomTypes.map((roomType, index) => (
              <div key={index} className="bg-fuchsia-900/20 p-4 rounded-lg mb-3">
                <h4 className="font-medium mb-2 uppercase">{roomType}</h4>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="text-xs mb-1 block uppercase">MAXIMUM OCCUPANCY</label>
                    <input type="number" min="1" className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" placeholder="1" required />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block uppercase">ROOM SIZE ({selectedUnit})</label>
                    <input type="number" min="1" className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" placeholder="Size" required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="text-xs mb-1 block uppercase">DESCRIPTION</label>
                  <textarea className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" rows={2} placeholder="Describe this room type" required></textarea>
                </div>
                <div>
                  <label className="text-xs mb-1 block uppercase">UPLOAD IMAGES</label>
                  <div className="border-2 border-dashed border-fuchsia-500/30 rounded-lg p-4 text-center">
                    <p className="text-sm text-foreground/60">Drag & drop or click to upload</p>
                  </div>
                </div>
              </div>
            ))}
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button className="w-full py-2 text-sm bg-fuchsia-900/30 hover:bg-fuchsia-900/50 border border-fuchsia-500/30 rounded-lg uppercase flex items-center justify-center">
                  <PlusCircle className="mr-2 h-4 w-4" /> ADD ROOM TYPE
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#430453] text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl">Add New Room Type</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Room Type</label>
                    <input 
                      className="col-span-3 bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2"
                      value={newRoomType}
                      onChange={(e) => setNewRoomType(e.target.value)}
                      placeholder="e.g. Double Room, Suite, etc."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleAddRoomType} 
                    disabled={!newRoomType.trim()}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700"
                  >
                    Add Room Type
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
