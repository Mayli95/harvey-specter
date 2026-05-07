import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "about",       title: "About" },
    { name: "biography",   title: "Biography" },
    { name: "experience",  title: "Experience" },
    { name: "philosophy",  title: "Philosophy" },
  ],
  fields: [
    // ── About (hero) ──────────────────────────────────────────────────
    defineField({
      name: "heroPortrait",
      title: "Portrait Image",
      type: "image",
      options: { hotspot: true },
      group: "about",
    }),
    defineField({
      name: "heroPortraitUrl",
      title: "Portrait URL (fallback)",
      type: "string",
      description: "Used when no Sanity image is uploaded",
      group: "about",
    }),
    defineField({
      name: "heroTagline",
      title: "Tagline",
      type: "text",
      rows: 2,
      description: "Short line shown over the hero portrait",
      group: "about",
    }),

    // ── Biography ─────────────────────────────────────────────────────
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "string",
      description: "Large featured quote at the top of the bio section",
      group: "biography",
    }),
    defineField({
      name: "bioParagraphs",
      title: "Bio Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      group: "biography",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      group: "biography",
    }),

    // ── Experience ────────────────────────────────────────────────────
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year",  title: "Year range", type: "string" }),
            defineField({ name: "role",  title: "Role",       type: "string" }),
            defineField({ name: "place", title: "Place",      type: "string" }),
          ],
          preview: { select: { title: "role", subtitle: "year" } },
        },
      ],
      group: "experience",
    }),

    // ── Philosophy (core values) ──────────────────────────────────────
    defineField({
      name: "values",
      title: "Core Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name",        title: "Name",        type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "name" } },
        },
      ],
      group: "philosophy",
    }),
  ],
});
