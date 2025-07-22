import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AvailabilityPackage {
  entryDate?: Date;
  exitDate?: Date;
  numberOfRooms?: number;
}

interface AvailabilityPackagesSectionProps {
  form: any;
  checkInDay: string;
}

export function AvailabilityPackagesSection({ form, checkInDay }: AvailabilityPackagesSectionProps) {
  const packages = form.watch('availabilityPackages') || [{}];

  const addPackage = () => {
    const currentPackages = form.getValues('availabilityPackages') || [{}];
    if (currentPackages.length < 10) {
      form.setValue('availabilityPackages', [...currentPackages, {}]);
    }
  };

  const removePackage = (index: number) => {
    const currentPackages = form.getValues('availabilityPackages') || [];
    if (currentPackages.length > 1) {
      const newPackages = currentPackages.filter((_: any, i: number) => i !== index);
      form.setValue('availabilityPackages', newPackages);
    }
  };

  const validateDateForDay = (date: Date, requiredDay: string) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[date.getDay()] === requiredDay;
  };

  const isDateInNext12Months = (date: Date) => {
    const today = new Date();
    const twelveMonthsFromNow = new Date(today);
    twelveMonthsFromNow.setFullYear(today.getFullYear() + 1);
    return date >= today && date <= twelveMonthsFromNow;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Availability Packages</h3>
        <p className="text-sm text-muted-foreground">
          Add up to 10 availability packages. Dates must be within 12 months and respect your selected check-in day ({checkInDay}).
        </p>
      </div>

      {packages.map((pkg: AvailabilityPackage, index: number) => (
        <div key={index} className="border border-border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Package {index + 1}</h4>
            {packages.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removePackage(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name={`availabilityPackages.${index}.entryDate`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Entry Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick entry date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date && isDateInNext12Months(date) && validateDateForDay(date, checkInDay)) {
                            field.onChange(date);
                          }
                        }}
                        disabled={(date) => 
                          !isDateInNext12Months(date) || !validateDateForDay(date, checkInDay)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`availabilityPackages.${index}.exitDate`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Exit Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick exit date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date && isDateInNext12Months(date) && validateDateForDay(date, checkInDay)) {
                            field.onChange(date);
                          }
                        }}
                        disabled={(date) => 
                          !isDateInNext12Months(date) || !validateDateForDay(date, checkInDay)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`availabilityPackages.${index}.numberOfRooms`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Rooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Enter number of rooms"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}

      {packages.length < 10 && (
        <Button
          type="button"
          variant="outline"
          onClick={addPackage}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Package
        </Button>
      )}
    </div>
  );
}