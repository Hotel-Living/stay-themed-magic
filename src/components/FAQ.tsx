
import React from 'react';

export const FAQ = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              What is included in extended stays?
            </h3>
            <p className="text-gray-300">
              All stays include daily housekeeping, Wi-Fi, gym access, and business center use. Meal plans vary by selection.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              How do I book an extended stay?
            </h3>
            <p className="text-gray-300">
              Simply browse our hotels, select your preferred dates and duration, and complete the booking process online.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Can I extend my stay if needed?
            </h3>
            <p className="text-gray-300">
              Subject to availability, extensions can be arranged with 48-hour notice through our customer service team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
