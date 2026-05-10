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
  const repeated = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  return (
    <section className="r7-marquee-section">
      <div className="r7-marquee-grid">
        <div className="r7-marquee-label-wrap">
          <p className="r7-marquee-label">The agency behind...</p>
        </div>

        <div className="r7-marquee-window">
          <div className="r7-marquee-track">
            {repeated.map((logo, index) => (
              <LogoItem key={`${logo.name}-${index}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}