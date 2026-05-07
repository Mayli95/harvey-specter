import { defineField, defineType } from "sanity";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
  ],
  fields: [
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "text",
      rows: 2,
      group: "hero",
      description: "Short copy shown beneath the Services & Deliverables heading",
    }),
  ],
});
