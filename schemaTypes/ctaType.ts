import { defineType, defineField } from 'sanity';

export const CTA = defineType({
  name: 'CTA',
  title: 'CTA Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-title',
      type: 'string',
    }),
    defineField({
        name: 'buttonName',
        title: 'Button Name',
        type: 'string',
      }),
      defineField({
        name: 'buttonLink',
        title: 'Button Link',
        type: 'url',
      }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',  // Automatically generate from the title
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
