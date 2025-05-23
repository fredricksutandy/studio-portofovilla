import { defineType, defineField } from 'sanity';

export const about = defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      description: 'Tuliskan judul dari bagian ini. Contoh: "Tentang kami"',
      validation: (rule) => rule.required().error('Judul wajib diisi.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-judul',
      type: 'string',
      description: 'Tambahkan tagline atau kutipan singkat yang menggambarkan villa Anda. Contoh: "Keindahan alam dan villa menawan"',
      validation: (rule) => rule.required().error('Sub-judul wajib diisi.'),
    }),
    defineField({
      name: 'aboutDescription',
      title: 'Deskripsi',
      type: 'text',
      description: 'Tulis deskripsi singkat tentang villa Anda. Fokus pada keunikan, fasilitas, dan suasana yang ditawarkan. [Contoh: "Villa mewah dengan pemandangan laut yang memukau, dilengkapi fasilitas modern dan suasana tenang untuk liburan sempurna."]',
      validation: (rule) => rule.required().min(50).error('Deskripsi wajib diisi dan minimal 50 karakter.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug wajib diisi.'),
    }),
    defineField({
      name: 'aboutImage',
      title: 'Gambar tentang villa ',
      type: 'image',
      description: 'Unggah gambar yang mewakili villa Anda.',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error('Gambar wajib diunggah.'),
    }),
    defineField({
      name: 'secondAboutImage',
      title: 'Gambar kedua tentang villa ',
      type: 'image',
      description: 'Unggah gambar kedua yang mewakili villa Anda.',
      options: {
        hotspot: true,
      },
    }),
  ],
});
