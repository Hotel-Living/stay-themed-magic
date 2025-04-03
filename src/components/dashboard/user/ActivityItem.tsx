
import React from "react";
import { Calendar, Building, CreditCard, Activity, CheckCircle, BookOpen, Clock } from "lucide-react";

interface ActivityItemProps {
  iconName: string;
  title: string;
  description: string;
  time: string;
}

export default function ActivityItem({
  iconName,
  title,
  description,
  time
}: ActivityItemProps) {
  // Render the correct icon based on the iconName
  const renderIcon = () => {
    switch (iconName) {
      case "Calendar":
        return <Calendar className="w-5 h-5 text-blue-400" />;
      case "Building":
        return <Building className="w-5 h-5 text-fuchsia-400" />;
      case "CreditCard":
        return <CreditCard className="w-5 h-5 text-green-400" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-yellow-400" />;
      case "CheckCircle":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-indigo-400" />;
      case "Clock":
        return <Clock className="w-5 h-5 text-orange-400" />;
      default:
        return <Building className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="p-4 flex items-start gap-3 bg-[#5c0869]">
      <div className="w-8 h-8 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
        {renderIcon()}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-foreground/70">{description}</p>
      </div>
      <div className="text-xs text-muted-foreground">{time}</div>
    </div>
  );
}
