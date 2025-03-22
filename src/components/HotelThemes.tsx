
import { Theme } from "@/utils/data";
import { cn } from "@/lib/utils";

interface HotelThemesDisplayProps {
  themes: Theme[];
  className?: string;
}

export function HotelThemesDisplay({ themes, className }: HotelThemesDisplayProps) {
  // Group themes by category
  const groupedThemes = themes.reduce((acc, theme) => {
    if (!acc[theme.category]) {
      acc[theme.category] = [];
    }
    acc[theme.category].push(theme);
    return acc;
  }, {} as Record<string, Theme[]>);

  return (
    <div className={cn("w-full fuchsia-card p-5 shadow-[0_0_25px_rgba(217,70,239,0.15)]", className)}>
      <h3 className="text-sm uppercase tracking-wide text-fuchsia-300 font-medium mb-4 flex items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mr-2 animate-pulse"></span>
        Hotel Themes
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(groupedThemes).map(([category, categoryThemes]) => (
          <div key={category} className="space-y-2">
            <h4 className="text-fuchsia-400 font-medium border-b border-fuchsia-500/20 pb-1">{category}</h4>
            <ul className="space-y-1.5">
              {categoryThemes.map(theme => (
                <li key={theme.id} className="text-sm text-foreground/90 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 group-hover:w-2 group-hover:h-2 transition-all duration-300"></span>
                  <span className="group-hover:text-fuchsia-300 transition-colors duration-300">{theme.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
