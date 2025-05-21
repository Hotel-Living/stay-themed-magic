
import React from "react";
import { Flame } from "lucide-react";
import { TextSection } from "@/components/join-us/TextSection";

// Market creation section data
const marketCreationData = {
  paragraphs: [
    "🚀 We didn't just start a business — we created an entirely new global market.",
    "🌐 A $131 billion opportunity that exists because of our original and fully registered business model.",
    "🔐 This market wouldn't exist without it — and it belongs 100% to us.",
    "🌍 Our structure is unique, protected, and legally secured, making replication impossible.",
    "💰 With $12 billion in estimated annual profits, this is not just a company — it's a fully-owned, global category we built from the ground up.",
    "✅ We own the model. We own the market."
  ]
};

export function MarketCreationSection() {
  return (
    <TextSection icon={Flame} title="WE CREATED A $131 B MARKET" paragraphs={marketCreationData.paragraphs} />
  );
}
