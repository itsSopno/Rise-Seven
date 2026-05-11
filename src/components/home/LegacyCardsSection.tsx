"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { stackCards } from "@/data/home";

export function LegacyCardsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || cards.length !== 3) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Initial positions: Card 0 is active, 1 and 2 are stacked behind
        gsap.set(cards[0], { zIndex: 30, y: 0, scale: 1, autoAlpha: 1 });
        gsap.set(cards[1], { zIndex: 20, y: 120, scale: 0.95, autoAlpha: 1 });
        gsap.set(cards[2], { zIndex: 10, y: 240, scale: 0.9, autoAlpha: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=250%", // Enough distance for 2 transitions
            scrub: true,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });

        // Step 1: Card 1 comes to front, Card 0 moves to top (exit)
        tl.to(cards[0], { y: -window.innerHeight, rotate: -5, autoAlpha: 0, duration: 1 }, 0)
          .to(cards[1], { y: 0, scale: 1, duration: 1 }, 0)
          .to(cards[2], { y: 120, scale: 0.95, duration: 1 }, 0);

        // Step 2: Card 2 comes to front, Card 1 moves to top (exit)
        tl.to(cards[1], { y: -window.innerHeight, rotate: 5, autoAlpha: 0, duration: 1 }, 1.2)
          .to(cards[2], { y: 0, scale: 1, duration: 1 }, 1.2);

        // Final hold so the last card stays visible until unpin
        tl.to({}, { duration: 0.5 });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(cards, { clearProps: "all" });
      });

      return () => { mm.revert(); };
    }, section);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className="r7deck-section">
      <div className="r7deck-sticky">
        <div className="r7deck-label">Legacy In The Making</div>
        <div className="r7deck-stage">
          {stackCards.map((card, index) => (
            <div
              key={card.title}
              ref={(node) => { cardRefs.current[index] = node; }}
              className="r7deck-wrap"
            >
              <article className={`r7deck-card r7deck-card-${card.theme}`}>
                <div className="r7deck-content">
                  <div className="r7deck-image-wrap">
                    <img src={card.image} alt={card.alt} className="r7deck-image" draggable={false} />
                  </div>
                  <div className="r7deck-copy">
                    <h2 className="r7deck-title">{card.title}</h2>
                    <div className="r7deck-text">
                      {card.paragraphs.map((p) => <p key={p}>{p}</p>)}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}