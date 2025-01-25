import { defineType, defineField } from 'sanity';

export const announcementBanner = defineType({
  name: 'announcementBanner',
  title: 'Banner pengumuman',
  type: 'document',
  fields: [
    defineField({
      name: 'announcementTitle',
      title: 'Nama event/promo',
      description: 'cantumkan tulisan yang menggambarkan event/promo mu dengan singkat [saran: 10 kata]',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Tanggal event/promo',
      description: 'cantumkan tanggal saat event/promo akan berlangsung',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'announcementTitle',  // Automatically generate from the title
        maxLength: 96,       // Optional: Limit the length of the slug
      },
    }),
  ],
});
