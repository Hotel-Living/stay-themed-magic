import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function BubbleCounter({ count, type }: { count: number; type: "home" | "hotel" }) {
  const { t } = useTranslation("home");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 5000);
    const interval = setInterval(() => setVisible(true), 60000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  const message = type === "home"
    ? t("bubbleCounter.home", { count })
    : t("bubbleCounter.hotel", { count });

  return (
    <div className="fixed bottom-5 left-5 bg-yellow-100 text-yellow-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 animate-fade-in text-sm md:text-base">
      <span>😊</span>
      <span className="font-semibold">{message}</span>
      <button onClick={() => setVisible(false)} className="ml-3 text-xl leading-none">×</button>
    </div>
  );
}