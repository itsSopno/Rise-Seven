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
import TopBanner from "@/components/home/topBanner/topbanner";


export default function Home() {
  return (
    <main className="bg-[#f5f3f0] pt-[1px]">
      <TopBanner></TopBanner>
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
