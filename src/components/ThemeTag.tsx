
import { cn } from "@/lib/utils";
import { Theme } from "@/utils/data";

interface ThemeTagProps {
  theme: Theme;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeTag({ theme, className, size = 'md' }: ThemeTagProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 font-medium transition-all duration-300 hover:bg-fuchsia-500/20",
        sizeClasses[size],
        className
      )}
    >
      {theme.name}
    </div>
  );
}

export function HotelThemes({ themes, size = 'md', className }: { themes: Theme[], size?: 'sm' | 'md' | 'lg', className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {themes.map(theme => (
        <ThemeTag key={theme.id} theme={theme} size={size} />
      ))}
    </div>
  );
}
