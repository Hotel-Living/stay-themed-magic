
import React from "react";
import { Form } from "@/components/ui/form";
import { useReferralSubmit } from "./hooks/useReferralSubmit";
import { ReferralPreview } from "./ReferralPreview";
import { ReferralFormFields } from "./form/ReferralFormFields";
import { ReferralSubmitButton } from "./form/ReferralSubmitButton";

const ReferralForm = () => {
  const { form, onSubmit, isSubmitting } = useReferralSubmit();

  return (
    <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
      <h3 className="text-xl font-semibold mb-6">Recommend a Hotel</h3>
      
      {/* Message Preview */}
      <ReferralPreview />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ReferralFormFields form={form} />
          <ReferralSubmitButton isSubmitting={isSubmitting} />
        </form>
      </Form>
    </div>
  );
};

export default ReferralForm;
