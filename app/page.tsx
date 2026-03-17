import { HeroSection } from "@/components/sections/hero-section";
import { ProductsSection } from "@/components/sections/products-section";
import { StorySection } from "@/components/sections/story-section";
import { HealthSection } from "@/components/sections/health-section";
import { FindUsSection } from "@/components/sections/find-us-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <StorySection />
      <HealthSection />
      <FindUsSection />
      <NewsletterSection />
    </>
  );
}
