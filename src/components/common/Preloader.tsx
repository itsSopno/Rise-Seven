"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !pathRef.current) return;

    const tl = gsap.timeline();

    // The initial path: full screen rectangle
    const initialPath = "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 L 0 0";
    // The curved path: curved bottom
    const targetPath = "M 0 0 L 100 0 L 100 80 Q 50 100 0 80 L 0 0";
    // The final path: everything moved up
    const finalPath = "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 L 0 0";

    tl.to(pathRef.current, {
      attr: { d: targetPath },
      duration: 0.8,
      ease: "power2.in",
      delay: 0.5,
    })
    .to(pathRef.current, {
      attr: { d: finalPath },
      duration: 0.6,
      ease: "power2.out",
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.display = "none";
      }
    }, "-=0.3");

    // Lock scroll while loading
    document.body.classList.add("loading-locked");
    return () => {
      document.body.classList.remove("loading-locked");
    };
  }, []);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
    >
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        className="absolute inset-0 w-full h-full fill-[#b3ffe9]"
      >
        <path 
          ref={pathRef} 
          d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 L 0 0" 
        />
      </svg>
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-black text-4xl font-bold italic tracking-tighter opacity-0 animate-fade-in-up">
          RISE AT SEVEN
        </h1>
      </div>
    </div>
  );
}
