import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Package, AlertCircle, RefreshCw } from 'lucide-react';
import { AvailabilityPackagesProps, AvailabilityPackage } from '@/types/availability-package';
import { useRealTimeAvailability } from '@/hooks/useRealTimeAvailability';
import { AvailabilityPackageCard } from './AvailabilityPackageCard';
import { PackageBookingModal } from '@/components/booking/PackageBookingModal';
import { WaitlistModal } from './WaitlistModal';
import { format } from 'date-fns';

export function AvailabilityPackages({ hotelId, selectedMonth, onPackageSelect, hotelName, pricePerMonth }: AvailabilityPackagesProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedMonth || new Date().toISOString().slice(0, 7));
  const [selectedPackage, setSelectedPackage] = useState<AvailabilityPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waitlistPackage, setWaitlistPackage] = useState<AvailabilityPackage | null>(null);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [showTwoMonths, setShowTwoMonths] = useState(false);
  const [nextMonth, setNextMonth] = useState<string>("");
  
  // Effect to set next month when current month changes
  useEffect(() => {
    if (currentMonth) {
      const currentDate = new Date(`${currentMonth}-01`);
      const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      setNextMonth(nextMonthDate.toISOString().slice(0, 7));
    }
  }, [currentMonth]);
  
  const { 
    packages, 
    isLoading, 
    error, 
    lastUpdated, 
    refreshAvailability 
  } = useRealTimeAvailability({ 
    hotelId, 
    selectedMonth: showTwoMonths ? undefined : currentMonth 
  });

  const handleReserve = (packageData: AvailabilityPackage) => {
    setSelectedPackage(packageData);
    setIsModalOpen(true);
    if (onPackageSelect) {
      onPackageSelect(packageData);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };
  
  const handleJoinWaitlist = (packageData: AvailabilityPackage) => {
    setWaitlistPackage(packageData);
    setIsWaitlistModalOpen(true);
  };
  
  const handleWaitlistClose = () => {
    setIsWaitlistModalOpen(false);
    setWaitlistPackage(null);
  };

  const getAvailableMonths = () => {
    const currentDate = new Date();
    const months = [];
    
    // Generate next 12 months
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const monthValue = date.toISOString().slice(0, 7);
      const monthLabel = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      months.push({ value: monthValue, label: monthLabel });
    }
    
    return months;
  };

  if (error) {
    return (
      <Card className="bg-red-950/20 border-red-500/30">
        <div className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-200 mb-2">Error Loading Packages</h3>
          <p className="text-red-300/80">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#6000B3] border-border shadow-2xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Available Stays</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTwoMonths(!showTwoMonths)}
              className="bg-purple-800/50 border-purple-600/50 text-white hover:bg-purple-700/50"
            >
              {showTwoMonths ? "Single Month" : "Two Months"}
            </Button>
            
            <span className="text-sm text-white/70">
              Updated: {format(lastUpdated, 'HH:mm')}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshAvailability}
              disabled={isLoading}
              className="bg-purple-800/50 border-purple-600/50 text-white hover:bg-purple-700/50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            
            <Select value={currentMonth} onValueChange={setCurrentMonth}>
              <SelectTrigger className="w-48 bg-purple-800/50 border-purple-600/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-600">
                {getAvailableMonths().map(month => (
                  <SelectItem 
                    key={month.value} 
                    value={month.value}
                    className="text-white hover:bg-purple-800 focus:bg-purple-800"
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-purple-800/30 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white/80 mb-2">No packages available</h3>
            <p className="text-white/60">
              No availability packages found for {new Date(currentMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
            </p>
            <p className="text-white/60 mt-2">
              Try selecting a different month or check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {packages.map(pkg => (
              <AvailabilityPackageCard
                key={pkg.id}
                package={pkg}
                onReserve={handleReserve}
                onJoinWaitlist={handleJoinWaitlist}
                hotelName={hotelName}
              />
            ))}
            
            <div className="mt-6 p-4 bg-purple-800/30 border border-purple-600/50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-2xl">ℹ️</div>
                <div>
                  <h4 className="font-semibold text-white mb-2">About Our Packages</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• Green packages are available for reservation</li>
                    <li>• Red packages are fully booked</li>
                    <li>• Each package has fixed dates and duration</li>
                    <li>• All packages include the preferred check-in day</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {hotelName && pricePerMonth && (
        <>
          <PackageBookingModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            package={selectedPackage}
            hotelName={hotelName}
            hotelId={hotelId}
            pricePerMonth={pricePerMonth}
          />
          
          <WaitlistModal
            isOpen={isWaitlistModalOpen}
            onClose={handleWaitlistClose}
            package={waitlistPackage}
            hotelName={hotelName}
          />
        </>
      )}
    </Card>
  );
}