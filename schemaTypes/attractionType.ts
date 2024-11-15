import { defineType, defineField } from 'sanity';

export const attraction = defineType({
  name: 'attraction',
  title: 'Attraction Section',
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
      name: 'attractions',
      title: 'Attractions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
                name: 'attractionTitle',
                title: 'Attraction Title',
                type: 'string',
              }),
              defineField({
                name: 'attractionRange',
                title: 'Attraction Range',
                type: 'string',
              }),
              defineField({
                name: 'attractionDescription',
                title: 'Attraction description',
                type: 'text',
              }),
              defineField({
                name: 'attractionURL',
                title: 'Attraction map link',
                type: 'text',
              }),
            defineField({
              name: 'attractionImage',
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
