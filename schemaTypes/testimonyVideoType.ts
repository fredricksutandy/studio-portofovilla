import { defineType, defineField } from 'sanity';

export const testimonyVideo = defineType({
  name: 'testimonyVideo',
  title: 'Testimony Video Section',
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
      name: 'testimonies',
      title: 'Testimonies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'testimonyHighlight',
              title: 'Testimony Highlight',
              type: 'string',
            }),
            defineField({
              name: 'testimonyRating',
              title: 'Testimony Rating',
              type: 'number',
            }),
            defineField({
              name: 'testimony',
              title: 'Testimony',
              type: 'text',
            }),
            defineField({
              name: 'testimonyName',
              title: 'Testimony Name',
              type: 'string',
            }),
            defineField({
              name: 'testimonyFrom',
              title: 'Testimony From',
              type: 'string',
            }),
            defineField({
              name: 'testimonyImage',
              title: 'Testimony Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Video Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'videoTitle',
              title: 'Video Title',
              type: 'string',
            }),
            defineField({
              name: 'iframeLink',
              title: 'Iframe Link',
              type: 'url', // Using `url` type to ensure proper validation
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title', // Automatically generate from the title
        maxLength: 96,   // Optional: Limit the length of the slug
      },
    }),
  ],
});
