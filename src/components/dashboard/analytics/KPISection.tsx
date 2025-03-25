
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, Home, DollarSign, Calendar, TrendingUp, Star } from "lucide-react";

interface KPISectionProps {
  timeframe: string;
}

export function KPISection({ timeframe }: KPISectionProps) {
  // Key performance indicators
  const kpis = [
    {
      title: "Total Bookings",
      value: "157",
      change: "+12%",
      icon: Calendar,
      trend: "up" as const,
    },
    {
      title: "Revenue",
      value: "$157,000",
      change: "+23%",
      icon: DollarSign,
      trend: "up" as const,
    },
    {
      title: "Average Occupancy",
      value: "83%",
      change: "+5%",
      icon: Home,
      trend: "up" as const,
    },
    {
      title: "Total Visitors",
      value: "3,120",
      change: "+18%",
      icon: Users,
      trend: "up" as const,
    },
    {
      title: "Average Rating",
      value: "4.7",
      change: "+0.2",
      icon: Star,
      trend: "up" as const,
    },
    {
      title: "Revenue per Room",
      value: "$97",
      change: "+7%",
      icon: TrendingUp,
      trend: "up" as const,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {kpis.map((kpi, index) => (
        <StatCard 
          key={index}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          icon={kpi.icon}
          trend={kpi.trend}
        />
      ))}
    </div>
  );
}
