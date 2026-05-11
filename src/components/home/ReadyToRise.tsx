"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ready-to-rise.css";

gsap.registerPlugin(ScrollTrigger);

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
      // ── Step 1: split into char spans FIRST ──────────────────────
      const text = heading.textContent?.trim() || "";
      heading.innerHTML = text
        .split("")
        .map((ch) =>
          ch === " "
            ? `<span class="r7-char-wrap"><span class="r7-char">&nbsp;</span></span>`
            : `<span class="r7-char-wrap"><span class="r7-char">${ch}</span></span>`
        )
        .join("");

      const chars = heading.querySelectorAll<HTMLElement>(".r7-char");

      // ── Step 2: measure AFTER DOM is updated ─────────────────────
      const headingWidth = heading.scrollWidth;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // ── Step 3: Horizontal scrub — right → left as you scroll ────
      gsap.fromTo(
        heading,
        { x: headingWidth - windowWidth + windowWidth * 0.5 },
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

      // ── Step 4: Per-char reveal — rises UP from below clip ────────
      gsap.set(chars, {
        yPercent: -115,
        rotate: 10,
        transformOrigin: "bottom center",
      });

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