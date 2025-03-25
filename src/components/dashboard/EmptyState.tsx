
import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  actionLink?: string;
  actionText?: string;
}

const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action,
  actionLink,
  actionText
}: EmptyStateProps) => {
  return (
    <div className="glass-card rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
      <div className="flex justify-center mb-4 text-fuchsia-400 bg-fuchsia-500/10 p-4 rounded-full">
        {icon}
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
      {actionLink && actionText && (
        <Link 
          to={actionLink} 
          className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
