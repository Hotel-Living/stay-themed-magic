
import * as React from "react"
import { cn } from "@/lib/utils"

const Progress = React.memo(React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value, ...props }, ref) => {
  // Ensure value is within bounds
  const safeValue = Math.max(0, Math.min(value || 0, 100));
  
  // Use memoization for style calculation to avoid recalculation on every render
  const progressStyle = React.useMemo(() => ({
    transform: `translateX(-${100 - safeValue}%)`
  }), [safeValue]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={progressStyle}
      />
    </div>
  );
}));

Progress.displayName = "Progress"

export { Progress }
