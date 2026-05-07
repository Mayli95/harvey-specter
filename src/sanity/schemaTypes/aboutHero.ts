import { defineField, defineType } from "sanity";

export const aboutHeroType = defineType({
  name: "aboutHero",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "heroPortrait",
      title: "Portrait Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroPortraitUrl",
      title: "Portrait URL (fallback)",
      type: "string",
      description: "Used when no Sanity image is uploaded",
    }),
    defineField({
      name: "heroTagline",
      title: "Tagline",
      type: "text",
      rows: 2,
      description: "Short line shown over the hero portrait",
    }),
  ],
  preview: {
    prepare: () => ({ title: "About" }),
  },
});
