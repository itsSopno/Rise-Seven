import { ReportBanner } from "@/components/header";
import {
  HomeHero,
  LogoMarquee,
  DemandDiscoverySection,
  FeaturedWorkSection,
  ServicesSection,
  LegacyMarqueeSection,
  LegacyCardsSection,
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
      <ServicesSection />
    </main>
  );
}
