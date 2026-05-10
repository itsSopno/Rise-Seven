"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { stackCards, type StackCard } from "@/data/home";


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
        const active = {
          x: 0,
          y: 0,
          rotate: -2,
          scale: 1,
        };

        const behindOne = {
          x: 10,
          y: 160,
          rotate: 3,
          scale: 0.95,
        };

        const behindTwo = {
          x: 20,
          y: 220,
          rotate: 6,
          scale: 0.92,
        };

        const exitTop = {
          y: -(window.innerHeight + 800),
        };

        gsap.set(cards[0], {
          zIndex: 30,
          ...active,
          autoAlpha: 1,
          transformOrigin: "50% 50%",
        });

        gsap.set(cards[1], {
          zIndex: 20,
          ...behindOne,
          autoAlpha: 1,
          transformOrigin: "50% 50%",
        });

        gsap.set(cards[2], {
          zIndex: 10,
          ...behindTwo,
          autoAlpha: 1,
          transformOrigin: "50% 50%",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=600%", // 600% of viewport height for scrolling
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        timeline
          // Stage 1: Card 0 is active.
          // Scroll 0 -> 1: Card 0 exits, Card 1 becomes active, Card 2 moves up.
          .to(cards[0], { x: -200, y: exitTop.y, rotate: -15, autoAlpha: 0, zIndex: 5, duration: 1 }, 0)
          .to(cards[1], { ...active, autoAlpha: 1, zIndex: 30, duration: 1 }, 0)
          .to(cards[2], { ...behindOne, autoAlpha: 1, zIndex: 20, duration: 1 }, 0)
          
          // Scroll 1 -> 2: Hold Card 1 active.
          .to({}, { duration: 1 }) 

          // Scroll 2 -> 3: Card 1 exits, Card 2 becomes active.
          .to(cards[1], { x: 200, y: exitTop.y, rotate: 15, autoAlpha: 0, zIndex: 5, duration: 1 }, 2)
          .to(cards[2], { ...active, autoAlpha: 1, zIndex: 30, duration: 1 }, 2)

          // Scroll 3 -> 5: Hold Card 2 active for a long time.
          .to({}, { duration: 2 })

          // Scroll 5 -> 6: Card 2 exits.
          .to(cards[2], { x: -200, y: exitTop.y, rotate: -15, autoAlpha: 0, zIndex: 5, duration: 1 }, 5)
          
          // Final buffer
          .to({}, { duration: 0.5 });


        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(cards, { clearProps: "all" });
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="r7deck-section">
      <div className="r7deck-sticky">
        <div className="r7deck-label">Legacy In The Making</div>

        <div className="r7deck-stage">
          {stackCards.map((card, index) => (
            <div
              key={card.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="r7deck-wrap"
            >
              <article className={`r7deck-card r7deck-card-${card.theme}`}>
                <div className="r7deck-content">
                  <div className="r7deck-image-wrap">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="r7deck-image"
                      draggable={false}
                    />
                  </div>

                  <div className="r7deck-copy">
                    <h2 className="r7deck-title">{card.title}</h2>

                    <div className="r7deck-text">
                      {card.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
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