import { defineField, defineType } from "sanity";

export const aboutBiographyType = defineType({
  name: "aboutBiography",
  title: "Biography",
  type: "document",
  fields: [
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "string",
      description: "Large featured quote at the top of the bio section",
    }),
    defineField({
      name: "bioParagraphs",
      title: "Bio Paragraphs",
      type: "array",
      of: [{ type: "text" }],
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
    }),
  ],
  preview: {
    prepare: () => ({ title: "Biography" }),
  },
});
