"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ready-to-rise.css";

gsap.registerPlugin(ScrollTrigger);

export function ReadyToRise() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const container = containerRef.current;
    if (!text || !container) return;

    const ctx = gsap.context(() => {
      gsap.to(text, {
        x: "-25%", // Move left
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="r7-ready-section">
      <div className="r7-ready-container">
        <div ref={textRef} className="r7-ready-text-wrap">
          <span className="r7-ready-text">Ready to Rise?</span>
          <span className="r7-ready-text">Ready to Rise?</span>
          <span className="r7-ready-text">Ready to Rise?</span>
        </div>
      </div>
      
      <div className="r7-ready-footer">
        <a href="/contact" className="r7-ready-btn">
          Let's talk brief <span className="r7-ready-arrow">→</span>
        </a>
      </div>
    </section>
  );
}
