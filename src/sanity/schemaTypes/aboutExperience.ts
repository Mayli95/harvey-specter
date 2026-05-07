import { defineField, defineType } from "sanity";

export const aboutExperienceType = defineType({
  name: "aboutExperience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "experience",
      title: "Experience Entries",
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
    }),
  ],
  preview: {
    prepare: () => ({ title: "Experience" }),
  },
});
