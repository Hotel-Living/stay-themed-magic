
import React from 'react';
import { NewAddPropertyForm } from './new-add-property/NewAddPropertyForm';

export function NewAddPropertyContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Add Property</h2>
      </div>
      
      <NewAddPropertyForm />
    </div>
  );
}
