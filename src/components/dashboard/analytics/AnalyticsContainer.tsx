
import { useState } from "react";
import { TimeframeSelector } from "./TimeframeSelector";
import { KPISection } from "./KPISection";
import { RevenueChart } from "./RevenueChart";
import { BookingsChart } from "./BookingsChart";
import { VisitorsChart } from "./VisitorsChart";
import { OccupancyChart } from "./OccupancyChart";
import { ReviewsDistributionChart } from "./ReviewsDistributionChart";
import { BookingSourcesChart } from "./BookingSourcesChart";
import { 
  bookingData, 
  revenueData, 
  visitorData, 
  occupancyRateData, 
  reviewDistributionData, 
  bookingSourceData,
  filterDataByTimeframe 
} from "./mockData";

export function AnalyticsContainer() {
  const [timeframe, setTimeframe] = useState("month");

  // Get filtered data for each chart
  const filteredBookingData = filterDataByTimeframe(bookingData, timeframe);
  const filteredRevenueData = filterDataByTimeframe(revenueData, timeframe);
  const filteredVisitorData = filterDataByTimeframe(visitorData, timeframe);
  const filteredOccupancyData = filterDataByTimeframe(occupancyRateData, timeframe);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <TimeframeSelector 
          timeframe={timeframe} 
          onTimeframeChange={setTimeframe} 
        />
      </div>

      {/* KPI Cards */}
      <KPISection timeframe={timeframe} />

      {/* Charts Section */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <RevenueChart data={filteredRevenueData} />
        <BookingsChart data={filteredBookingData} />
        <VisitorsChart data={filteredVisitorData} />
        <OccupancyChart data={filteredOccupancyData} />
        <ReviewsDistributionChart data={reviewDistributionData} />
        <BookingSourcesChart data={bookingSourceData} />
      </div>
    </div>
  );
}
