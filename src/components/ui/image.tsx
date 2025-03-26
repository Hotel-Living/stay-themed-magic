
import { cn } from "@/lib/utils";
import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  loading?: "lazy" | "eager";
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ 
    src, 
    alt = "", 
    className, 
    fill = false, 
    sizes, 
    quality, 
    priority, 
    onLoad, 
    onError,
    loading = "lazy",
    ...props 
  }, ref) => {
    // Create appropriate classNames based on the fill prop
    const imgClasses = cn(
      className,
      fill && "absolute inset-0 h-full w-full object-cover"
    );

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={imgClasses}
        onLoad={onLoad}
        onError={onError}
        loading={priority ? "eager" : loading}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";
