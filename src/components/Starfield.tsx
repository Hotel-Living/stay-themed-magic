
import { useEffect, useRef, useState } from 'react';

export function Starfield() {
  const bgRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={bgRef} className="background-slideshow fixed inset-0 -z-10">
      {/* Background images removed */}
      <div className="overlay absolute inset-0 bg-black/14 backdrop-blur-[2.1px]" />
    </div>
  );
}
