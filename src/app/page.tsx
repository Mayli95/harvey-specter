import HeroSection from "@/components/HeroSection";
import BioSection from "@/components/BioSection";
import AboutSection from "@/components/AboutSection";
import PhotoSection from "@/components/PhotoSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSection from "@/components/NewsSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BioSection />
      <AboutSection />
      <PhotoSection />
      <ServicesSection />
      <WorkSection />
      <TestimonialsSection />
      <NewsSection />
      <FooterSection />
    </main>
  );
}
