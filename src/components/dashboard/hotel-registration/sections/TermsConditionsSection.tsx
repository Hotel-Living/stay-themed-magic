import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsConditionsSectionProps {
  form: any;
}

export function TermsConditionsSection({ form }: TermsConditionsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Terms and Conditions</h3>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            By registering your property, you agree to our terms and conditions. Please read them carefully:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your property information must be accurate and up-to-date</li>
            <li>You are responsible for maintaining current availability and pricing</li>
            <li>All property photos must be genuine and represent your actual property</li>
            <li>You agree to honor all confirmed bookings made through our platform</li>
            <li>Platform commission fees apply to all successful bookings</li>
            <li>You must comply with all local laws and regulations</li>
          </ul>
        </div>
      </div>

      <FormField
        control={form.control}
        name="termsAccepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-medium">
                I have read and accept the Terms and Conditions *
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}