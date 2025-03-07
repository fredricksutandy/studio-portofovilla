import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Pengaturan Situs",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Unggah logo utama untuk situs Anda.",
      options: { hotspot: true },
      validation: (Rule) =>
        Rule.required().error("Logo tidak boleh kosong."),
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Unggah favicon untuk ikon browser.",
      options: { hotspot: true },
      validation: (Rule) =>
        Rule.required().error("Favicon harus diunggah."),
    }),
    defineField({
      name: "title",
      title: "Nama Bisnis",
      type: "string",
      description: "Masukkan nama bisnis atau merek Anda.",
      validation: (Rule) =>
        Rule.required().error("Nama bisnis harus diisi."),
    }),
    defineField({
      name: "tagline",
      title: "Tagline / Slogan",
      type: "string",
      description: "Slogan pendek yang mencerminkan bisnis Anda.",
      validation: (Rule) =>
        Rule.required().min(5).error("Tagline harus diisi dan minimal 5 karakter."),
    }),
    defineField({
      name: "seo",
      title: "Metadata SEO",
      type: "object",
      description: "Pengaturan SEO untuk halaman utama.",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Judul Meta",
          type: "string",
          description: "Judul SEO untuk halaman utama situs.",
          validation: (Rule) =>
            Rule.required().min(10).error("Judul Meta harus diisi dan minimal 10 karakter."),
        }),
        defineField({
          name: "metaDescription",
          title: "Deskripsi Meta",
          type: "text",
          description: "Deskripsi SEO untuk halaman utama situs.",
          validation: (Rule) =>
            Rule.required().min(30).error("Deskripsi Meta harus diisi dan minimal 30 karakter."),
        }),
        defineField({
          name: "metaImage",
          title: "Gambar SEO",
          type: "image",
          description: "Gambar default untuk SEO (misalnya, gambar Open Graph).",
          options: { hotspot: true },
          validation: (Rule) =>
            Rule.required().error("Gambar SEO tidak boleh kosong."),
        }),
      ],
    }),
  ],
});
