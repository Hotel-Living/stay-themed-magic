
import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="glass-card rounded-xl p-8 text-center">
      <div className="flex justify-center mb-4 text-fuchsia-400">
        {icon}
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
