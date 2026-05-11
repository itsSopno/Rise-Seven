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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          fill: '#ADFFC8'
        }}
      >
        <path 
          ref={pathRef} 
          d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 L 0 0" 
        />
      </svg>
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* <h1 className="text-black text-5xl md:text-7xl font-bold italic tracking-tighter opacity-0 animate-fade-in-up">
          RISE AT SEVEN
        </h1> */}
      </div>
    </div>
  );
}
