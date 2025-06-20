import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqCategory } from "../types";
import { useTranslation } from "@/hooks/useTranslation";
interface FaqTabsListProps {
  faqCategories: FaqCategory[];
}
export function FaqTabsList({
  faqCategories
}: FaqTabsListProps) {
  const {
    t
  } = useTranslation();
  return;
}