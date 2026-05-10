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
            end: "bottom bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        timeline
          // Transition 1: Card 0 exit, Card 1 enter (Duration 1)
          .to(
            cards[0],
            {
              x: -150,
              y: exitTop.y,
              rotate: -12,
              autoAlpha: 0,
              zIndex: 5,
              ease: "none",
              duration: 1,
            },
            0,
          )
          .to(
            cards[1],
            {
              ...active,
              autoAlpha: 1,
              zIndex: 30,
              ease: "none",
              duration: 1,
            },
            0,
          )
          .to(
            cards[2],
            {
              ...behindOne,
              autoAlpha: 1,
              zIndex: 20,
              ease: "none",
              duration: 1,
            },
            0,
          )
          // Hold Card 1 (Duration 2.5, from t=1 to t=3.5)
          // Transition 2: Card 1 exit, Card 2 enter (Duration 1)
          .to(
            cards[1],
            {
              x: 150,
              y: exitTop.y,
              rotate: 12,
              autoAlpha: 0,
              zIndex: 5,
              ease: "none",
              duration: 1,
            },
            3.5,
          )
          .to(
            cards[2],
            {
              ...active,
              autoAlpha: 1,
              zIndex: 30,
              ease: "none",
              duration: 1,
            },
            3.5,
          )
          // Hold Card 2 (Duration 3, from t=4.5 to t=7.5)
          // Transition 3: Card 2 exit (Duration 1, starts at t=7.5)
          .to(
            cards[2],
            {
              x: -150,
              y: exitTop.y,
              rotate: -12,
              autoAlpha: 0,
              zIndex: 5,
              ease: "none",
              duration: 1,
            },
            7.5,
          )
          // Massive Final Buffer (Hold empty stage until t=11)
          .to({}, { duration: 2.5 }, 8.5);







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