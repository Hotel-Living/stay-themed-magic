
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimeframeSelectorProps {
  timeframe: string;
  onTimeframeChange: (value: string) => void;
}

export function TimeframeSelector({ timeframe, onTimeframeChange }: TimeframeSelectorProps) {
  return (
    <Tabs value={timeframe} onValueChange={onTimeframeChange} className="w-auto">
      <TabsList>
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="quarter">Quarter</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
