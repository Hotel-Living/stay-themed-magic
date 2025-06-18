
import React from "react";
import { useTranslation } from "react-i18next";
import { SpanishTermsContent } from "./terms/SpanishTermsContent";
import { EnglishTermsContent } from "./terms/EnglishTermsContent";

export function TermsConditionsContent() {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-8 bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 border border-purple-500/20">
        {isSpanish ? <SpanishTermsContent /> : <EnglishTermsContent />}
      </div>
    </div>
  );
}
