
import { Check, ChevronsUpDown, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SortOption = {
  value: string;
  label: string;
  description?: string;
}

const sortOptions: SortOption[] = [
  { value: "newest", label: "Newest first", description: "Show most recent reviews at the top" },
  { value: "oldest", label: "Oldest first", description: "Show earliest reviews at the top" },
  { value: "highest", label: "Highest rating", description: "Show best ratings first" },
  { value: "lowest", label: "Lowest rating", description: "Show critical reviews first" },
];

interface ReviewSorterProps {
  onSortChange: (value: string) => void;
  initialValue?: string;
}

export function ReviewSorter({ onSortChange, initialValue = "newest" }: ReviewSorterProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  return (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex items-center">
              <SortAsc className="h-4 w-4 text-fuchsia-400" />
              <span className="text-sm text-muted-foreground mr-2 ml-1">Sort:</span>
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" align="start" className="text-xs">
            Sort reviews by different criteria
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select sort option"
            className="w-full md:w-[200px] justify-between text-sm bg-background/80 backdrop-blur-sm border-fuchsia-900/30 hover:bg-fuchsia-900/10 transition-all"
            size="sm"
          >
            {value ? sortOptions.find((option) => option.value === value)?.label : "Sort by"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-full md:w-[300px] p-0 bg-background/95 backdrop-blur-md border-fuchsia-900/30 shadow-md" 
          align="end"
          side="bottom"
          sideOffset={5}
        >
          <Command>
            <CommandInput placeholder="Search sort options..." />
            <CommandEmpty>No sort option found.</CommandEmpty>
            <CommandGroup>
              {sortOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    onSortChange(currentValue);
                    setOpen(false);
                  }}
                  className="flex flex-col items-start py-2 aria-selected:bg-fuchsia-900/20"
                >
                  <div className="flex w-full items-center">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 flex-shrink-0 text-fuchsia-400",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="font-medium">{option.label}</span>
                  </div>
                  {option.description && (
                    <span className="ml-6 text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
