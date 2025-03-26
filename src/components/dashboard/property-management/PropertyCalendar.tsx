
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock properties for selection
const mockProperties = [
  { id: "1", name: "Parador de Granada" },
  { id: "2", name: "TechHub Barcelona" },
];

// Mock bookings for calendar display
const mockBookings = [
  { id: "1", propertyId: "1", startDate: new Date(2023, 9, 10), endDate: new Date(2023, 9, 15), guestName: "John Smith" },
  { id: "2", propertyId: "1", startDate: new Date(2023, 9, 20), endDate: new Date(2023, 9, 25), guestName: "Maria Garcia" },
  { id: "3", propertyId: "2", startDate: new Date(2023, 9, 5), endDate: new Date(2023, 9, 12), guestName: "David Johnson" },
];

// Mock blocked dates (maintenance, etc.)
const mockBlockedDates = [
  { id: "1", propertyId: "1", date: new Date(2023, 9, 18), reason: "Maintenance" },
  { id: "2", propertyId: "2", date: new Date(2023, 9, 15), reason: "Renovation" },
];

interface PropertyCalendarProps {
  propertyId: string | null;
}

type DateStatus = 'available' | 'booked' | 'blocked';

export function PropertyCalendar({ propertyId: initialPropertyId }: PropertyCalendarProps) {
  const { toast } = useToast();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(initialPropertyId);
  const [month, setMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateStatus, setDateStatus] = useState<Record<string, DateStatus>>({});
  
  // Update the selected property when the prop changes
  React.useEffect(() => {
    if (initialPropertyId) {
      setSelectedPropertyId(initialPropertyId);
    }
  }, [initialPropertyId]);
  
  // Function to check if a date is booked
  const isDateBooked = (date: Date): boolean => {
    if (!selectedPropertyId) return false;
    
    return mockBookings.some(booking => 
      booking.propertyId === selectedPropertyId &&
      date >= booking.startDate &&
      date <= booking.endDate
    );
  };
  
  // Function to check if a date is blocked
  const isDateBlocked = (date: Date): boolean => {
    if (!selectedPropertyId) return false;
    
    return mockBlockedDates.some(blocked => 
      blocked.propertyId === selectedPropertyId &&
      date.toDateString() === blocked.date.toDateString()
    );
  };
  
  // Function to get the date status
  const getDateStatus = (date: Date): DateStatus => {
    if (isDateBooked(date)) return 'booked';
    if (isDateBlocked(date)) return 'blocked';
    return 'available';
  };
  
  // Function to format date as string key
  const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  // Function to toggle date status
  const toggleDateStatus = (date: Date) => {
    const dateKey = formatDateKey(date);
    const currentStatus = dateStatus[dateKey] || getDateStatus(date);
    
    let newStatus: DateStatus;
    switch (currentStatus) {
      case 'available':
        newStatus = 'blocked';
        break;
      case 'blocked':
        newStatus = 'available';
        break;
      default:
        // Can't change booked dates
        toast({
          title: "Cannot modify booked date",
          description: "This date is already booked by a guest.",
          variant: "destructive",
        });
        return;
    }
    
    setDateStatus({
      ...dateStatus,
      [dateKey]: newStatus,
    });
    
    toast({
      title: "Availability updated",
      description: `Date is now marked as ${newStatus}.`,
    });
  };
  
  // Function to render the calendar day
  const renderDay = (day: Date) => {
    const dateKey = formatDateKey(day);
    const status = dateStatus[dateKey] || getDateStatus(day);
    
    let className = "h-9 w-9 rounded-md p-0 font-normal aria-selected:opacity-100";
    
    switch (status) {
      case 'booked':
        className += " bg-red-100 text-red-700 hover:bg-red-200";
        break;
      case 'blocked':
        className += " bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
        break;
      default:
        className += " bg-green-100 text-green-700 hover:bg-green-200";
    }
    
    return (
      <div className={className}>
        <div className="flex items-center justify-center h-full">
          {day.getDate()}
        </div>
      </div>
    );
  };
  
  // Get the current month's booking statistics
  const getMonthStats = () => {
    if (!selectedPropertyId) return { total: 0, booked: 0, blocked: 0, available: 0 };
    
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    let booked = 0;
    let blocked = 0;
    
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(month.getFullYear(), month.getMonth(), i);
      const dateKey = formatDateKey(currentDate);
      const status = dateStatus[dateKey] || getDateStatus(currentDate);
      
      if (status === 'booked') booked++;
      else if (status === 'blocked') blocked++;
    }
    
    return {
      total: daysInMonth,
      booked,
      blocked,
      available: daysInMonth - booked - blocked
    };
  };
  
  const monthStats = getMonthStats();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Availability Calendar</h3>
          <p className="text-sm text-muted-foreground">
            Manage your property's availability and view bookings
          </p>
        </div>
        
        <Select
          value={selectedPropertyId || ""}
          onValueChange={(value) => setSelectedPropertyId(value)}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select a property" />
          </SelectTrigger>
          <SelectContent>
            {mockProperties.map((property) => (
              <SelectItem key={property.id} value={property.id}>
                {property.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {!selectedPropertyId ? (
        <div className="flex items-center justify-center p-12 border border-dashed rounded-lg">
          <div className="text-center">
            <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-semibold">No property selected</h3>
            <p className="text-muted-foreground">
              Select a property to manage its availability
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                Click on a date to change its availability status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={month}
                onMonthChange={setMonth}
                className="border rounded-md p-3"
                components={{
                  Day: (props) => {
                    const day = props.date;
                    return (
                      <button
                        onClick={() => toggleDateStatus(day)}
                        className="w-full h-full"
                        type="button"
                      >
                        {renderDay(day)}
                      </button>
                    );
                  }
                }}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Blocked</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Booked</span>
                </div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Go to Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={month}
                    onSelect={(date) => {
                      if (date) {
                        setMonth(date);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
          
          {/* Stats and Upcoming bookings */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Days:</span>
                    <span className="font-medium">{monthStats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Available:</span>
                    <span className="font-medium text-green-600">{monthStats.available}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Booked:</span>
                    <span className="font-medium text-red-600">{monthStats.booked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Blocked:</span>
                    <span className="font-medium text-yellow-600">{monthStats.blocked}</span>
                  </div>
                  
                  <div className="h-2 w-full bg-gray-200 rounded-full mt-4">
                    <div
                      className="h-full bg-green-500 rounded-l-full"
                      style={{ width: `${(monthStats.available / monthStats.total) * 100}%`, display: 'inline-block' }}
                    ></div>
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${(monthStats.booked / monthStats.total) * 100}%`, display: 'inline-block' }}
                    ></div>
                    <div
                      className="h-full bg-yellow-500 rounded-r-full"
                      style={{ width: `${(monthStats.blocked / monthStats.total) * 100}%`, display: 'inline-block' }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Upcoming Bookings</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-2">
                  {mockBookings
                    .filter(booking => 
                      booking.propertyId === selectedPropertyId && 
                      booking.startDate >= new Date()
                    )
                    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                    .slice(0, 3)
                    .map(booking => (
                      <div key={booking.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <div className="bg-fuchsia-100 text-fuchsia-800 p-3 rounded-full">
                          <CalendarIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{booking.guestName}</p>
                          <p className="text-xs text-muted-foreground">
                            {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  
                  {mockBookings.filter(booking => 
                    booking.propertyId === selectedPropertyId && 
                    booking.startDate >= new Date()
                  ).length === 0 && (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                      No upcoming bookings
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Bookings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
