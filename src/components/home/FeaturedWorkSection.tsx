"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { featuredProjects, type FeaturedProject } from "@/data/home";


function getTitleStep() {
  if (typeof window === "undefined") return 58;
  if (window.innerWidth >= 1920) return 72;
  if (window.innerWidth >= 1280) return 62;
  return 56;
}

function ArrowIcon() {
  return (
    <span className="r7-fw-arrow" aria-hidden="true">
      ↗
    </span>
  );
}

function ExploreWorkButton() {
  return (
    <a href="/work/" className="r7-fw-explore-button">
      <span className="r7-fw-explore-window">
        <span className="r7-fw-explore-line r7-fw-explore-current">
          <span>Explore Our Work</span>
          <ArrowIcon />
        </span>

        <span className="r7-fw-explore-line r7-fw-explore-next">
          <span>Explore Our Work</span>
          <ArrowIcon />
        </span>
      </span>
    </a>
  );
}

function WorkCard({
  project,
  index,
  isPreviewed,
  onActive,
  setCursor,
  setPreviewIndex,
}: {
  project: FeaturedProject;
  index: number;
  isPreviewed: boolean;
  onActive: (index: number) => void;
  setCursor: (visible: boolean, label?: string) => void;
  setPreviewIndex: (index: number | null) => void;
}) {
  const [mask, setMask] = useState({ x: 50, y: 50 });

  function updateMask(event: React.MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    setMask({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <a
      href={project.href}
      className={`r7-fw-card ${isPreviewed ? "is-previewed" : ""}`}
      style={
        {
          "--mask-x": `${mask.x}%`,
          "--mask-y": `${mask.y}%`,
          "--card-color": project.color,
        } as CSSProperties
      }
      onMouseEnter={(event) => {
        updateMask(event);
        onActive(index);
        setPreviewIndex(index);
        setCursor(true, project.category);
      }}
      onMouseMove={updateMask}
      onMouseLeave={() => {
        setPreviewIndex(null);
        setCursor(false);
      }}
    >
      <div className="r7-fw-card-image-shell">
        <img
          src={project.image}
          alt={project.title}
          className="r7-fw-card-image"
          draggable={false}
        />
      </div>

      <div className="r7-fw-card-mask-layer">
        <h3 className="r7-fw-card-mask-title">{project.hoverTitle}</h3>

        <div className="r7-fw-card-mask-bottom">
          <span>{project.category}</span>
          <span className="r7-fw-card-mask-icon">
            <ArrowIcon />
          </span>
        </div>
      </div>

      <div className="r7-fw-card-label-wrap">
        <span className="r7-fw-card-label">
          <span className="r7-fw-card-label-dot" />
          {project.category}
          <ArrowIcon />
        </span>
      </div>
    </a>
  );
}

export function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);
  const cardWrapRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [titleStep, setTitleStep] = useState(72);
  const [cursor, setCursorState] = useState({
    visible: false,
    x: 0,
    y: 0,
    label: "View",
  });

  const titleOffset = activeIndex * -titleStep - titleStep / 2;

  function setCursor(visible: boolean, label = "View") {
    setCursorState((value) => ({
      ...value,
      visible,
      label,
    }));
  }

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    setCursorState((value) => ({
      ...value,
      x: event.clientX,
      y: event.clientY,
    }));
  }

  function scrollToProject(index: number) {
    const sectionEl = sectionRef.current;
    const stickyEl = stickyRef.current;
    const imagesEl = imagesRef.current;
    const cardEl = cardWrapRefs.current[index];

    if (!sectionEl || !stickyEl || !imagesEl || !cardEl) return;

    const maxScroll = Math.max(
      1,
      sectionEl.offsetHeight - stickyEl.offsetHeight,
    );

    const maxTranslate = Math.max(
      1,
      imagesEl.scrollHeight - stickyEl.offsetHeight,
    );

    const progress = Math.min(1, Math.max(0, cardEl.offsetTop / maxTranslate));

    window.scrollTo({
      top: sectionEl.offsetTop + maxScroll * progress,
      behavior: "smooth",
    });

    setActiveIndex(index);
  }

  useEffect(() => {
    const updateTitleStep = () => {
      setTitleStep(getTitleStep());
    };

    updateTitleStep();

    window.addEventListener("resize", updateTitleStep);

    return () => {
      window.removeEventListener("resize", updateTitleStep);
    };
  }, []);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const stickyEl = stickyRef.current;
    const imageColumnEl = imagesRef.current;

    if (!sectionEl || !stickyEl || !imageColumnEl) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      let distance = 0;

      const calculateDistance = () => {
        distance = Math.max(
          0,
          imageColumnEl.scrollHeight - stickyEl.offsetHeight + 56,
        );

        sectionEl.style.height = `${stickyEl.offsetHeight + distance}px`;
      };

      calculateDistance();

      const trigger = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.65,
        invalidateOnRefresh: true,
        onRefresh: calculateDistance,
        onUpdate: (self) => {
          gsap.set(imageColumnEl, {
            y: -distance * self.progress,
            force3D: true,
          });

          const nextIndex = Math.min(
            featuredProjects.length - 1,
            Math.max(
              0,
              Math.round(self.progress * (featuredProjects.length - 1)),
            ),
          );

          setActiveIndex(nextIndex);
        },
      });

      const handleResize = () => {
        calculateDistance();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        trigger.kill();
        sectionEl.style.height = "";
        gsap.set(imageColumnEl, { clearProps: "transform" });
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
  <>
    <section
      ref={sectionRef}
      className="r7-fw-section"
      onMouseMove={handleMouseMove}
    >
      <div
        className={`r7-fw-cursor ${cursor.visible ? "is-visible" : ""}`}
        style={
          {
            "--cursor-x": `${cursor.x}px`,
            "--cursor-y": `${cursor.y}px`,
          } as CSSProperties
        }
      >
        <span>{cursor.label}</span>
        <ArrowIcon />
      </div>

      <div ref={stickyRef} className="r7-fw-sticky">
        <div className="r7-fw-panel">
          <aside className="r7-fw-left">
            <div className="r7-fw-left-inner">
              <h2 className="r7-fw-eyebrow">Featured Work</h2>

              <div className="r7-fw-title-window">
                <div
                  className="r7-fw-title-list"
                  style={
                    {
                      "--r7-title-offset": `${titleOffset}px`,
                    } as CSSProperties
                  }
                >
                  {featuredProjects.map((project, index) => (
                    <button
                      key={project.title}
                      type="button"
                      onMouseEnter={() => {
                        setActiveIndex(index);
                        setPreviewIndex(index);
                        scrollToProject(index);
                      }}
                      onMouseLeave={() => {
                        setPreviewIndex(null);
                      }}
                      onFocus={() => {
                        setActiveIndex(index);
                        setPreviewIndex(index);
                        scrollToProject(index);
                      }}
                      onBlur={() => {
                        setPreviewIndex(null);
                      }}
                      className={`r7-fw-title-item ${
                        activeIndex === index ? "is-active" : "is-muted"
                      }`}
                    >
                      <span className="r7-fw-title-text">{project.title}</span>
                      <span className="r7-fw-title-meta">{project.meta}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div ref={imagesRef} className="r7-fw-images">
            <div className="r7-fw-mobile-title">
              <h2>Featured Work</h2>
            </div>

            {featuredProjects.map((project, index) => (
              <div
                key={project.title}
                ref={(node) => {
                  cardWrapRefs.current[index] = node;
                }}
              >
                <WorkCard
                  project={project}
                  index={index}
                  isPreviewed={previewIndex === index}
                  onActive={setActiveIndex}
                  setCursor={setCursor}
                  setPreviewIndex={setPreviewIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <div className="r7-fw-explore-wrap">
      <ExploreWorkButton />
    </div>
  </>
);
}
