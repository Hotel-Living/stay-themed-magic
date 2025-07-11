import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function generateNonMultipleOfFive(min: number, max: number): number {
  let value;
  do {
    value = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (value % 5 === 0);
  return value;
}

export default function BubbleCounter() {
  const { t } = useTranslation("home");
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const isHotelPage = location.pathname.includes("/hotels/");
  const count = isHotelPage
    ? generateNonMultipleOfFive(6, 22)
    : generateNonMultipleOfFive(151, 499);

  const messageKey = isHotelPage ? "bubbleCounter.hotel" : "bubbleCounter.home";

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 5000);

    const interval = setInterval(() => {
      setVisible(true);
      const hide = setTimeout(() => setVisible(false), 10000);
      return () => clearTimeout(hide);
    }, 60000);

    const initialHide = setTimeout(() => setVisible(false), 10000);

    return () => {
      clearTimeout(show);
      clearTimeout(initialHide);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-yellow-200 text-yellow-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 text-sm animate-fade-in">
      <span role="img" aria-label="smile">😊</span>
      <span className="font-semibold">{t(messageKey, { count })}</span>
      <button onClick={() => setVisible(false)} className="ml-3 text-lg leading-none font-bold">×</button>
    </div>
  );
}