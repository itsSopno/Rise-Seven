import { RiseHeader } from "@/components/header/RiseHeader";
import { PlatformLogoStrip } from "./PlatformLogoStrip";
import { heroImages } from "@/data/home";

export const dynamic = "force-dynamic";

export function HomeHero() {
  // Pick two different random images on the server
  const bgIndex = Math.floor(Math.random() * heroImages.length);
  let inlineIndex = Math.floor(Math.random() * heroImages.length);

  // Ensure inline image is different if we have enough images
  if (heroImages.length > 1) {
    while (inlineIndex === bgIndex) {
      inlineIndex = Math.floor(Math.random() * heroImages.length);
    }
  }

  const images = {
    bg: heroImages[bgIndex],
    inline: heroImages[inlineIndex],
  };



  return (
    <section className="r7-home-hero">
      <div className="r7-hero-media" aria-hidden="true">
        <img
          src={images.bg}
          alt=""
          className="r7-hero-media-img"
        />

        <div className="r7-hero-media-overlay" />
        <div className="r7-hero-media-blur" />
      </div>

      <RiseHeader />

      <div className="r7-hero-center">
        <div className="r7-awards-block">
          <p className="r7-awards-eyebrow">
            #1 Most Recommended
            <br />
            Content Marketing Agency
          </p>

          <div className="r7-awards-row" aria-hidden="true">
            <span className="r7-awards-laurel">‹</span>

            <span className="r7-award-mini">
              Global
              <br />
              Search
              <br />
              Awards
            </span>

            <span className="r7-award-mark">▾▾▾</span>

            <span className="r7-award-mini">
              UK Social
              <br />
              Media Awards
            </span>

            <span className="r7-awards-laurel">›</span>
          </div>
        </div>

        <h1 className="r7-hero-headline">
          <span className="r7-hero-headline-row">
            <span>We</span>
            <span>Create</span>
          </span>

          <span className="r7-hero-headline-row r7-hero-headline-row-second">
            <span>Category</span>

            <span className="r7-hero-inline-image-wrap" aria-hidden="true">
              <img
                src={images.inline}
                alt=""
                className="r7-hero-inline-image"
              />

            </span>

            <span>Leaders</span>
          </span>
        </h1>

        <p className="r7-hero-subtitle">on every searchable platform</p>
        <PlatformLogoStrip />
      </div>

      <div className="r7-hero-bottom-left">
        Organic media planners creating, distributing &amp; optimising campaigns.
      </div>

      <div className="r7-hero-bottom-right">
        4 Global Offices serving UK, USA (New York) &amp; EU
      </div>
    </section>
  );
}
