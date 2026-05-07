import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutPageHero, { type AboutHeroData } from "@/components/AboutPageHero";
import FullBioSection, { type FullBioData } from "@/components/FullBioSection";
import AboutValuesSection, { type AboutValuesData } from "@/components/AboutValuesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterSection from "@/components/FooterSection";
import { client } from "@/sanity/client";

export const metadata: Metadata = {
  title: "About — Harvey Specter",
  description: "Creative director, photographer & storyteller based in Chicago.",
};

const cacheOpts =
  process.env.NODE_ENV === "production"
    ? { next: { revalidate: 60 } }
    : { cache: "no-store" as const };

async function getAboutData() {
  const [hero, bio, exp, phil] = await Promise.all([
    client.fetch(
      `*[_id == "aboutHero"][0] {
        "heroPortraitUrl": coalesce(heroPortrait.asset->url, heroPortraitUrl),
        heroTagline,
      }`,
      {}, cacheOpts,
    ),
    client.fetch(
      `*[_id == "aboutBiography"][0] { pullQuote, bioParagraphs, stats }`,
      {}, cacheOpts,
    ),
    client.fetch(
      `*[_id == "aboutExperience"][0] { experience }`,
      {}, cacheOpts,
    ),
    client.fetch(
      `*[_id == "aboutPhilosophy"][0] { values }`,
      {}, cacheOpts,
    ),
  ]);

  return { hero, bio, exp, phil };
}

export default async function AboutPage() {
  const { hero, bio, exp, phil } = await getAboutData();

  const heroData: AboutHeroData = {
    portraitUrl: hero?.heroPortraitUrl ?? null,
    tagline:     hero?.heroTagline     ?? null,
  };

  const bioData: FullBioData = {
    pullQuote:     bio?.pullQuote     ?? null,
    bioParagraphs: bio?.bioParagraphs ?? null,
    stats:         bio?.stats         ?? null,
    experience:    exp?.experience    ?? null,
  };

  const valuesData: AboutValuesData = {
    values: phil?.values ?? null,
  };

  return (
    <main>
      <Navbar />
      <div className="relative z-10">
        <AboutPageHero      data={heroData}   />
        <FullBioSection     data={bioData}    />
        <AboutValuesSection data={valuesData} />
        <TestimonialsSection />
      </div>
      <FooterSection />
    </main>
  );
}
