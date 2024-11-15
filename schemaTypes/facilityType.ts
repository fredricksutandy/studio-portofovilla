import { defineType, defineField } from 'sanity';

export const facility = defineType({
  name: 'facility',
  title: 'Facility Section',
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
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
                name: 'facilityTitle',
                title: 'Facility Title',
                type: 'string',
              }),
            defineField({
              name: 'facilityImage',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true, // Allows for flexible image cropping in Sanity's UI
              },
            }),
          ],
          preview: {
            select: {
              title: 'facilityTitle',
              media: 'facilityImage',
            },
          },
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
