"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ready-to-rise.css";

gsap.registerPlugin(ScrollTrigger);

export function ReadyToRise() {
  const containerRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = track1Ref.current;
    const t2 = track2Ref.current;
    const container = containerRef.current;
    if (!t1 || !t2 || !container) return;

    const ctx = gsap.context(() => {
      // Row 1 moves left
      gsap.to(t1, {
        x: "-20%",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Row 2 moves right
      gsap.fromTo(t2, 
        { x: "-30%" },
        {
          x: "0%",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="r7-ready-section">
      <div className="r7-ready-container">
        <div ref={track1Ref} className="r7-ready-track">
          <span className="r7-ready-text">Ready to Rise?</span>
          <span className="r7-ready-text">Ready to Rise?</span>
          <span className="r7-ready-text">Ready to Rise?</span>
          <span className="r7-ready-text">Ready to Rise?</span>
        </div>
        <div ref={track2Ref} className="r7-ready-track">
          <span className="r7-ready-text">Ready to Rise?</span>
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
