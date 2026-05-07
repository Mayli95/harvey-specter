import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ServicesPageHero,      { type ServicesHeroData }    from "@/components/ServicesPageHero";
import ServicesDetailSection,  { type ServicesDetailData } from "@/components/ServicesDetailSection";
import ServicesCTASection  from "@/components/ServicesCTASection";
import TestimonialsSection  from "@/components/TestimonialsSection";
import FooterSection        from "@/components/FooterSection";
import { client }           from "@/sanity/client";

export const metadata: Metadata = {
  title: "Services — Harvey Specter",
  description: "Brand discovery, web design & dev, marketing, and photography — four disciplines, one studio.",
};

const cacheOpts =
  process.env.NODE_ENV === "production"
    ? { next: { revalidate: 60 } }
    : { cache: "no-store" as const };

async function getServicesPage() {
  const [page, services] = await Promise.all([
    client.fetch(
      `*[_type == "servicesPage"][0] { heroTagline }`,
      {},
      cacheOpts,
    ),
    client.fetch(
      `*[_type == "service"] | order(order asc) {
        "name": title,
        description,
        "imageUrl": coalesce(image.asset->url, imageUrl),
        tags,
      }`,
      {},
      cacheOpts,
    ),
  ]);

  return { page, services };
}

export default async function ServicesPage() {
  const { page, services } = await getServicesPage();

  const heroData: ServicesHeroData = {
    heroTagline: page?.heroTagline ?? null,
  };

  const detailData: ServicesDetailData = {
    services: services?.length ? services : null,
  };

  return (
    <main>
      <Navbar />
      <div className="relative z-10">
        <ServicesPageHero      data={heroData}   />
        <ServicesDetailSection data={detailData} />
        <ServicesCTASection />
        <TestimonialsSection />
      </div>
      <FooterSection />
    </main>
  );
}
