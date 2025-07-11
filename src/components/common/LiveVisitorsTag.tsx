import { useFakeLiveVisitors } from "@/hooks/useFakeLiveVisitors";
import { useTranslation } from "react-i18next";

export default function LiveVisitorsTag() {
  const visitors = useFakeLiveVisitors();
  const { t } = useTranslation("common");

  return (
    <div className="text-xs text-white bg-yellow-600 px-3 py-1 rounded-full shadow-md fixed top-2 right-2 z-50">
      😊 {t("liveVisitors", { count: visitors })}
    </div>
  );
}