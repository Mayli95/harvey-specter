import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Individual project documents
      S.documentTypeListItem("project").title("Project"),

      // Individual service documents
      S.documentTypeListItem("service").title("Service"),

      // About Page — four singleton sections in the list panel
      S.listItem()
        .title("About Page")
        .child(
          S.list()
            .title("About Page")
            .items([
              S.listItem()
                .title("About")
                .id("aboutHero")
                .child(
                  S.document()
                    .documentId("aboutHero")
                    .schemaType("aboutHero")
                    .title("About")
                ),
              S.listItem()
                .title("Biography")
                .id("aboutBiography")
                .child(
                  S.document()
                    .documentId("aboutBiography")
                    .schemaType("aboutBiography")
                    .title("Biography")
                ),
              S.listItem()
                .title("Experience")
                .id("aboutExperience")
                .child(
                  S.document()
                    .documentId("aboutExperience")
                    .schemaType("aboutExperience")
                    .title("Experience")
                ),
              S.listItem()
                .title("Philosophy")
                .id("aboutPhilosophy")
                .child(
                  S.document()
                    .documentId("aboutPhilosophy")
                    .schemaType("aboutPhilosophy")
                    .title("Philosophy")
                ),
            ])
        ),

      // Services Page is intentionally excluded — managed via individual Service documents
    ]);
