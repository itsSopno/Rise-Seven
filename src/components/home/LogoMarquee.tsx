"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type MarqueeLogo = {
  name: string;
  src: string;
};

const logos: MarqueeLogo[] = [
  {
    name: "PlayStation",
    src: "https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Client/Black/01J76SW385WN4X1CBJWJV7QSAP.png?w=600&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847605&s=c5319beb4b8cbb4b4189503ba62abee7",
  },
  {
    name: "AXA",
    src: "https://rise-atseven.transforms.svdcdn.com/production/images/SN.webp?w=600&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5338&fp-y=0.5169&dm=1777373493&s=94f8efbf206ee393e9efb44ef6828658",
  },
  {
    name: "Emirates",
    src: "https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Client/Black/Untitled-design.png?w=600&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1752040111&s=0392eafd23d787e83e25c5b0535bbc77",
  },
  {
    name: "Red Bull",
    src: "https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Client/Black/red-bull-logo-black.png?w=600&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1754645714&s=bd5a1c6f9193f3f0ec0bbbe3caca8ef4",
  },
];

const REPEAT_COUNT = 6;

function LogoItem({ logo }: { logo: MarqueeLogo }) {
  return (
    <div className="r7-marquee-slide">
      <div className="r7-marquee-logo-box">
        <img
          src={logo.src}
          alt={logo.name}
          className="r7-marquee-logo"
          draggable={false}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}

export function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapWidthRef = useRef(0);
  const xRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const lastPointerXRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      if (!track) return;
      wrapWidthRef.current = track.scrollWidth / REPEAT_COUNT;
    }

    function wrapPosition() {
      const wrapWidth = wrapWidthRef.current;
      if (!wrapWidth) return;

      if (xRef.current <= -wrapWidth) {
        xRef.current += wrapWidth;
      }

      if (xRef.current > 0) {
        xRef.current -= wrapWidth;
      }
    }

    function render() {
      if (!track) return;
      wrapPosition();
      gsap.set(track, {
        x: xRef.current,
        force3D: true,
      });
    }

    function tick(_time: number, deltaTime: number) {
      if (!track || pausedRef.current || draggingRef.current) return;

      const pxPerSecond = 48;
      xRef.current -= (pxPerSecond * deltaTime) / 1000;
      render();
    }

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
    };
  }, []);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    pausedRef.current = true;
    lastPointerXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!draggingRef.current || !track) return;

    const delta = event.clientX - lastPointerXRef.current;
    lastPointerXRef.current = event.clientX;

    xRef.current += delta;

    const wrapWidth = wrapWidthRef.current;

    if (wrapWidth) {
      if (xRef.current <= -wrapWidth) xRef.current += wrapWidth;
      if (xRef.current > 0) xRef.current -= wrapWidth;
    }

    gsap.set(track, {
      x: xRef.current,
      force3D: true,
    });
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    pausedRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <section className="r7-marquee-section">
      <div className="r7-marquee-grid">
        <div className="r7-marquee-label-wrap">
          <p className="r7-marquee-label">The agency behind...</p>
        </div>

        <div
          className="r7-marquee-window"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            if (!draggingRef.current) pausedRef.current = false;
          }}
        >
          <div ref={trackRef} className="r7-marquee-track">
            {Array.from({ length: REPEAT_COUNT }).map((_, groupIndex) =>
              logos.map((logo, logoIndex) => (
                <LogoItem
                  key={`${groupIndex}-${logo.name}-${logoIndex}`}
                  logo={logo}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}