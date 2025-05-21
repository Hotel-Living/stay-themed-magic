
import React from "react";
import { Star } from "lucide-react";
import { TextSection } from "@/components/join-us/TextSection";

// Hotel-living solution section data
const hotelLivingSolutionData = {
  paragraphs: [
    "🧩 A SYSTEM OF INTELLIGENT MODULES",
    "",
    "We are not just another ¨booking¨ platform.",
    "We are a fully integrated, smart-living ecosystem made of powerful modules. Just to start:",
    "",
    "🗓️ Fixed-duration stays (8, 16, 24, 32 nights): predictable, profitable, optimized",
    "🎯 Affinity-based segmentation: guests grouped by shared interests and lifestyles",
    "🤝 Community by design: rich social interaction, shared experiences, human connection",
    "🧼 Full-service living: no cleaning, no cooking, no worries — ever",
    "💸 Dynamic revenue logic: automatic pricing growth as rooms are booked",
    "🔁 Plug & play SaaS: scalable, replicable, deployable worldwide in minutes",
    "Marketing modules: built-in tools for hotels to attract the right guest, every time"
  ]
};

export function HotelLivingSolutionSection() {
  return (
    <TextSection icon={Star} title="THE HOTEL-LIVING SOLUTION" paragraphs={hotelLivingSolutionData.paragraphs} />
  );
}
