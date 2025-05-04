import { defineField, defineType } from 'sanity';

export const otherActivities = defineType({
  name: "otherActivities",
  title: "Daftar Aktivitas & Atraksi Lainnya",
  type: "document",
  fields: [
    defineField({
      name: "attractions",
      title: "Tempat Rekreasi / Atraksi Terdekat",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Judul/Kategori/Tema",
              type: "string",
              description: "Kategori atau tema dari atraksi, contoh: Alam, Wisata Kuliner, Hiburan.",
              validation: (Rule) => Rule.required().error("Kategori atau tema wajib diisi"),
            }),
            defineField({
              name: "icon",
              title: "Ikon Kategori/Tema",
              type: "image",
              description: "Upload ikon untuk kategori atau tema ini.",
              options: { hotspot: true },
              validation: (Rule) => Rule.required().error("Ikon kategori wajib diunggah"),
            }),
            defineField({
              name: "places",
              title: "Daftar Tempat",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Nama Atraksi/Tempat",
                      type: "string",
                      description: "Nama tempat rekreasi atau atraksi, contoh: Pantai Parangtritis, Alun-Alun Kidul.",
                      validation: (Rule) => Rule.required().error("Nama atraksi atau tempat wajib diisi"),
                    }),
                    defineField({
                      name: "distance",
                      title: "Jarak",
                      type: "string",
                      description: "Jarak dari lokasi utama ke tempat rekreasi dalam kilometer atau meter (cth: 2 km atau 800 m).",
                      validation: (Rule) => Rule.required().min(0).error("Jarak wajib diisi dan harus lebih dari atau sama dengan 0"),
                    }),
                  ],
                  preview: {
                    select: {
                      title: "name",
                      subtitle: "distance",
                    },
                    prepare(selection) {
                      return {
                        title: selection.title,
                        subtitle: `Jarak: ${selection.subtitle}`,
                      };
                    },
                  },
                },
              ],
              description: "Tambahkan daftar tempat rekreasi atau atraksi dalam kategori ini.",
              validation: (Rule) => Rule.required().min(1).error("Minimal harus ada satu tempat rekreasi dalam setiap kategori"),
            }),
          ],
          preview: {
            select: {
              title: "category",
              media: "icon",
            },
          },
        },
      ],
      description: "Tambahkan daftar tempat rekreasi atau atraksi yang ada di sekitar lokasi utama.",
      validation: (Rule) => Rule.required().min(1).error("Minimal harus ada satu kategori rekreasi"),
    }),
  ],
});
