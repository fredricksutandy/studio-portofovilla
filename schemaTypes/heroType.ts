import { defineType, defineField } from 'sanity';

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
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
      name: 'video',
      title: 'Video',
      type: 'file', // Use the 'file' type for video
      options: {
        accept: 'video/*', // Restrict file types to videos
      },
    }),
  ],
});
