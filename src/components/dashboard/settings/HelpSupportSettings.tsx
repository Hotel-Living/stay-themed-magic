
import React from 'react';
import { Button } from '@/components/ui/button';

export const HelpSupportSettings = () => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Help & Support</h3>
      
      <div className="space-y-6">
        <div className="p-4 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/40">
          <h4 className="text-sm font-medium mb-2">Contact Support</h4>
          <p className="text-sm text-muted-foreground mb-4">Our support team is here to help. We usually respond within 24 hours.</p>
          <Button className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg transition-colors">
            Contact Support
          </Button>
        </div>

        <div className="p-4 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/40">
          <h4 className="text-sm font-medium mb-2">Frequently Asked Questions</h4>
          <p className="text-sm text-muted-foreground mb-4">Find answers to common questions about our services.</p>
          <Button className="px-4 py-2 bg-fuchsia-600/80 hover:bg-fuchsia-700 text-white rounded-lg transition-colors">
            View FAQs
          </Button>
        </div>

        <div className="p-4 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/40">
          <h4 className="text-sm font-medium mb-2">Documentation</h4>
          <p className="text-sm text-muted-foreground mb-4">Browse our detailed documentation to learn more about our platform.</p>
          <Button className="px-4 py-2 bg-fuchsia-600/80 hover:bg-fuchsia-700 text-white rounded-lg transition-colors">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportSettings;
