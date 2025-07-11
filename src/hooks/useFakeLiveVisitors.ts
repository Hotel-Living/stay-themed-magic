import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useFakeLiveVisitors() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    let min = 150;
    let max = 260;

    if (location.pathname.startsWith("/hotels/")) {
      min = 8;
      max = 32;
    }

    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    setCount(value);
  }, [location.pathname]);

  return count;
}