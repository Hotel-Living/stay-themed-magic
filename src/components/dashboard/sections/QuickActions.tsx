
import React from 'react';
import { PlusCircle, FileText, HelpCircle } from "lucide-react";
import ActionCard from "../ActionCard";

interface QuickActionsProps {
  handlePropertyTabClick: () => void;
}

export function QuickActions({ handlePropertyTabClick }: QuickActionsProps) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ActionCard 
          title="Add Property" 
          description="List a new hotel property" 
          icon={<PlusCircle className="w-5 h-5" />}
          onClick={handlePropertyTabClick}
        />
        <ActionCard 
          title="Reports" 
          description="View monthly performance reports" 
          icon={<FileText className="w-5 h-5" />}
        />
        <ActionCard 
          title="Support" 
          description="Contact our partner support team" 
          icon={<HelpCircle className="w-5 h-5" />}
        />
      </div>
    </div>
  );
}

export default QuickActions;
