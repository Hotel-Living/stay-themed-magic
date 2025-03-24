
import React from 'react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const ActionCard = ({ title, description, icon, onClick }: ActionCardProps) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-start gap-3 p-4 rounded-lg glass-card-hover hover:bg-fuchsia-500/10 text-left transition-all duration-200"
    >
      <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
        <div className="text-fuchsia-300">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-foreground/70">{description}</p>
      </div>
    </button>
  );
};

export default ActionCard;
