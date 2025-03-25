
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

export const BillingSettings = () => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Billing Information</h3>
      <div className="text-center py-12">
        <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h4 className="text-lg font-medium mb-2">No billing information</h4>
        <p className="text-muted-foreground mb-6">You don't have any payment methods set up yet.</p>
        <Button className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg transition-colors">
          Add Payment Method
        </Button>
      </div>
    </div>
  );
};

export default BillingSettings;
