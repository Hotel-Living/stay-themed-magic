export interface AvailabilityPackage {
  id: string;
  hotel_id: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  total_rooms: number;
  available_rooms: number;
  created_at: string;
  updated_at: string;
}

export interface AvailabilityPackageWithStatus extends AvailabilityPackage {
  isAvailable: boolean;
  isSoldOut: boolean;
}

export interface AvailabilityPackagesProps {
  hotelId: string;
  selectedMonth?: string;
  onPackageSelect?: (packageData: AvailabilityPackage) => void;
  hotelName?: string;
  pricePerMonth?: number;
}