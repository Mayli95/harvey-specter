import { defineField, defineType } from "sanity";

export const aboutPhilosophyType = defineType({
  name: "aboutPhilosophy",
  title: "Philosophy",
  type: "document",
  fields: [
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
    }),
  ],
  preview: {
    prepare: () => ({ title: "Philosophy" }),
  },
});
