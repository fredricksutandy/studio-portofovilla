import { defineType, defineField } from 'sanity';

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery Section',
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
        name: 'galleryButton',
        title: 'Gallery Button Text',
        type: 'string',
      }),
    defineField({
        name: 'galleryUrl',
        title: 'Gallery URL',
        type: 'string',
      }),
    defineField({
      name: 'galleryImage',
      title: 'Gallery Image',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
                name: 'galleryImageTitle',
                title: 'Gallery Title',
                type: 'string',
              }),
              defineField({
                name: 'galleryUrl',
                title: 'Gallery map link',
                type: 'text',
              }),
            defineField({
              name: 'galleryImage',
              title: 'Gallery Image',
              type: 'image',
              options: {
                hotspot: true, // Allows for flexible image cropping in Sanity's UI
              },
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
        source: 'title',  // Automatically generate from the title
        maxLength: 96,    // Optional: Limit the length of the slug
      },
    }),
  ],
});
