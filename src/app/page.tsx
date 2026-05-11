import {
  HomeHero,
  LogoMarquee,
  DemandDiscoverySection,
  FeaturedWorkSection,
  ServicesSection,
  LegacyMarqueeSection,
  LegacyCardsSection,
  WhatsNew,
  ReadyToRise,
} from "@/components/home";



export default function Home() {
  return (
    <main className="bg-[#f5f3f0] pt-[1px]">
  
      <HomeHero />
      <LogoMarquee />
      <DemandDiscoverySection />
      <FeaturedWorkSection />
      <ServicesSection />
      <LegacyMarqueeSection />
      <LegacyCardsSection />
      <WhatsNew />
      <ReadyToRise />
    </main>
  );
}
