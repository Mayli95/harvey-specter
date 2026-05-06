import HeroSection from "@/components/HeroSection";
import BioSection from "@/components/BioSection";
import AboutSection from "@/components/AboutSection";
import PhotoSection from "@/components/PhotoSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection, { type Project } from "@/components/WorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSection from "@/components/NewsSection";
import FooterSection from "@/components/FooterSection";
import { client } from "@/sanity/client";

async function getProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id,
      title,
      "imageUrl": coalesce(image.asset->url, imageUrl),
      tags,
      isTall
    }`,
    {},
    process.env.NODE_ENV === "production"
      ? { next: { revalidate: 60 } }
      : { cache: "no-store" }
  );
}

export default async function Home() {
  const projects = (await getProjects()) ?? [];

  return (
    <main>
      <HeroSection />
      <BioSection />
      <AboutSection />
      <PhotoSection />
      <ServicesSection />
      <WorkSection projects={projects} />
      <TestimonialsSection />
      <NewsSection />
      <FooterSection />
    </main>
  );
}
