import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  preview: {
    select: {
      title: "title",
      imageUrl: "imageUrl",
    },
    prepare({ title, imageUrl }: { title?: string; imageUrl?: string }) {
      return {
        title: title ?? "Untitled",
        media: imageUrl
          ? () => (
              <img
                src={imageUrl}
                alt={title ?? ""}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            )
          : undefined,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isTall",
      title: "Tall card (desktop)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL (fallback)",
      type: "string",
      description: "Used when no Sanity image asset is uploaded",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Display order — lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
