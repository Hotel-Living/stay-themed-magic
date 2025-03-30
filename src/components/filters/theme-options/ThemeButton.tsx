
import React from "react";
import { Theme } from "@/utils/themes";

interface ThemeButtonProps {
  theme: Theme;
  isActive: boolean;
  onClick: () => void;
}

export const ThemeButton: React.FC<ThemeButtonProps> = ({
  theme,
  isActive,
  onClick
}) => {
  return (
    <button
      key={theme.id}
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
        isActive
          ? "bg-fuchsia-500/20 text-white"
          : "hover:bg-fuchsia-900/40"
      }`}
    >
      {theme.name}
    </button>
  );
};
