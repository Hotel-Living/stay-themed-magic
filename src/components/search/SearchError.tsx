
import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface SearchErrorProps {
  message: string;
  onClearFilters: () => void;
}

export function SearchError({ message, onClearFilters }: SearchErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-3">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">Search Error</h3>
      <p className="mb-4 text-muted-foreground">{message}</p>
      <Button variant="default" onClick={onClearFilters}>
        Clear Filters & Try Again
      </Button>
    </div>
  );
}
