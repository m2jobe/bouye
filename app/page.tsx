import { HeroSection } from "@/components/sections/hero-section";
import { ProductsSection } from "@/components/sections/products-section";
import { DiscoverSection } from "@/components/sections/discover-section";
import { StorySection } from "@/components/sections/story-section";
import { HealthSection } from "@/components/sections/health-section";
import { FindUsSection } from "@/components/sections/find-us-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <DiscoverSection />
      <StorySection />
      <HealthSection />
      <FindUsSection />
      <NewsletterSection />
    </>
  );
}
