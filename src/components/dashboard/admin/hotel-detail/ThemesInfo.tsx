
import React from "react";
import { Tag } from "lucide-react";

interface ThemesInfoProps {
  themes: any[];
}

export function ThemesInfo({ themes }: ThemesInfoProps) {
  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <Tag className="w-5 h-5 text-purple-400" />
        Themes
      </h3>
      {themes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themes.map((theme) => (
            <div key={theme.theme_id} className="p-3 border border-purple-700/30 rounded-lg bg-purple-900/20">
              <p className="font-medium text-purple-300">{theme.themes?.name || "Unknown Theme"}</p>
              {theme.themes?.description && (
                <p className="text-sm text-gray-400 mt-1">{theme.themes.description}</p>
              )}
              {theme.themes?.category && (
                <p className="text-xs text-fuchsia-400 mt-2">Category: {theme.themes.category}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No themes associated with this hotel.</p>
      )}
    </div>
  );
}
