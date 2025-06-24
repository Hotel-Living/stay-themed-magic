
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Newsletter = () => {
  return (
    <section className="py-16 px-4 bg-white/10 backdrop-blur-sm">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to get the latest updates on new hotels, special offers, and extended stay tips.
        </p>
        <div className="max-w-md mx-auto flex gap-4">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
          />
          <Button className="bg-purple-600 hover:bg-purple-700">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};
