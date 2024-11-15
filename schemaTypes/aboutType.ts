import { defineType, defineField } from 'sanity';

export const about = defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'tagTitle',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitleone',
      title: 'Sub-title-one',
      type: 'string',
    }),
    defineField({
      name: 'subtitletwo',
      title: 'Sub-title-two',
      type: 'string',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'about-description',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'tagTitle',  // Automatically generate from the title
        maxLength: 96,    // Optional: Limit the length of the slug
      },
    }),
    defineField({
      name: 'imageLeft',
      title: 'Image-left',
      type: 'image', // Sanity's image type
      options: {
        hotspot: true, // Enables image cropping and focus area
      },
    }),
    defineField({
      name: 'imageRight',
      title: 'Image-right',
      type: 'image', // Sanity's image type
      options: {
        hotspot: true, // Enables image cropping and focus area
      },
    }),
  ],
});
