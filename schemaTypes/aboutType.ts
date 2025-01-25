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
      description: 'Untuk judul section ini tolong tuliskan jargon/tagline yang menggambarkan tentang villa mu. [Contoh: "Liburan Mewah di Surga Tropis"]',
      validation: (rule) => rule.required().error('Judul wajib diisi.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-judul',
      type: 'string',
      description: 'Tuliskan jargon, tagline, atau quotes yang bisa memberikan gambaran villamu. [Contoh: "Keindahan alam dan villa menawan"]'
    }),
    defineField({
      name: 'aboutDescription',
      title: 'Deskripsi',
      type: 'string',
      description: 'Tuliskan deskripsi singkat yang memberikan gambaran tentang villa kamu. Fokus pada daya tarik utama, suasana, atau pengalaman yang ditawarkan. [Contoh: "Villa mewah dengan pemandangan laut yang memukau, dilengkapi fasilitas modern dan suasana yang tenang untuk liburan sempurna."]'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'tagTitle',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'imageLeft',
      title: 'Image-left',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageRight',
      title: 'Image-right',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
