"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ready-to-rise.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Matches the real riseatseven.com "Ready to Rise at Seven?" section:
 *  - Single huge heading that scrubs horizontally while scrolling
 *  - Each character also scrubs from yPercent=100, rotate=10 → 0,0
 *    with back.inOut(4) ease and a long stagger (scroll-scrubbed)
 */
export function ReadyToRise() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const trigger = triggerRef.current;
    const heading = headingRef.current;
    if (!wrap || !trigger || !heading) return;

    const ctx = gsap.context(() => {
      const headingWidth = heading.scrollWidth;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // ── Horizontal scrub: start from right, end at left ──────────
      gsap.fromTo(
        heading,
        {
          x: headingWidth - windowWidth + windowWidth * 0.5,
        },
        {
          x: -(headingWidth - windowWidth + 1000),
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top 70%",
            end: `+=${headingWidth - windowWidth + windowHeight * 0.35}`,
            scrub: true,
          },
        }
      );

      // ── Per-character reveal: tumble in from below with rotation ──
      // Split the heading text into individual character spans
      const text = heading.textContent || "";
      heading.innerHTML = text
        .split("")
        .map((ch) =>
          ch === " "
            ? `<span class="r7-char" style="display:inline-block">&nbsp;</span>`
            : `<span class="r7-char" style="display:inline-block">${ch}</span>`
        )
        .join("");

      const chars = heading.querySelectorAll<HTMLElement>(".r7-char");

      gsap.set(chars, { yPercent: 110, rotate: 10, transformOrigin: "bottom center" });

      gsap.to(chars, {
        yPercent: 0,
        rotate: 0,
        ease: "back.inOut(4)",
        stagger: 0.35,
        duration: 2.5,
        scrollTrigger: {
          trigger: trigger,
          start: "top 77%",
          end: `+=${headingWidth - windowWidth + 200}`,
          scrub: true,
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="r7-ready-wrap">
      <div ref={triggerRef} className="r7-ready-trigger">
        <div ref={headingRef} className="r7-ready-heading">
          Ready to Rise at Seven?
        </div>
      </div>
    </div>
  );
}