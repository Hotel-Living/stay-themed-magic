import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Clock } from 'lucide-react';
import { AvailabilityPackage } from '@/types/availability-package';
import { format, parseISO } from 'date-fns';

interface AvailabilityPackageCardProps {
  package: AvailabilityPackage;
  onReserve: (packageData: AvailabilityPackage) => void;
}

export function AvailabilityPackageCard({ package: pkg, onReserve }: AvailabilityPackageCardProps) {
  const isAvailable = pkg.available_rooms > 0;
  const isSoldOut = pkg.available_rooms === 0;

  const formatDateRange = (startDate: string, endDate: string) => {
    try {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      const startFormatted = format(start, 'MMM d');
      const endFormatted = format(end, 'MMM d');
      return `${startFormatted} – ${endFormatted}`;
    } catch (error) {
      console.error('Error formatting dates:', error);
      return `${startDate} – ${endDate}`;
    }
  };

  const getStatusIcon = () => {
    return isAvailable ? '🟢' : '🔴';
  };

  const getStatusText = () => {
    if (isSoldOut) return 'SOLD OUT';
    if (pkg.available_rooms === 1) return '1 room available';
    return `${pkg.available_rooms} rooms available`;
  };

  return (
    <Card className={`border-2 transition-all duration-200 ${
      isAvailable 
        ? 'border-green-500/30 bg-green-950/20 hover:border-green-400/50 hover:bg-green-950/30' 
        : 'border-red-500/30 bg-red-950/20'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getStatusIcon()}</span>
            <div>
              <h3 className="font-semibold text-white text-lg">
                {formatDateRange(pkg.start_date, pkg.end_date)}
              </h3>
              <div className="flex items-center gap-4 text-sm text-white/70 mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{pkg.duration_days} days</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{getStatusText()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <Badge 
              variant={isAvailable ? "default" : "destructive"}
              className={`mb-2 ${
                isAvailable 
                  ? 'bg-green-700/80 text-green-100 hover:bg-green-600/80' 
                  : 'bg-red-700/80 text-red-100'
              }`}
            >
              {isAvailable ? 'Available' : 'Sold Out'}
            </Badge>
            
            {isAvailable && (
              <Button
                onClick={() => onReserve(pkg)}
                className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500/50 w-full"
                size="sm"
              >
                Reserve
              </Button>
            )}
          </div>
        </div>
        
        {isSoldOut && (
          <div className="mt-3 p-2 bg-red-900/30 border border-red-700/50 rounded text-center">
            <span className="text-red-200 text-sm font-medium">This package is fully booked</span>
          </div>
        )}
      </div>
    </Card>
  );
}