import { defineType, defineField } from 'sanity';

export const activities = defineType({
  name: 'activities',
  title: 'Activities Section',
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
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
                name: 'activitiesTitle',
                title: 'Activities Title',
                type: 'string',
              }),
              defineField({
                name: 'activitiesRange',
                title: 'Activities Range',
                type: 'string',
              }),
              defineField({
                name: 'activitiesDescription',
                title: 'Activities description',
                type: 'text',
              }),
              defineField({
                name: 'activitiesURL',
                title: 'Activities map link',
                type: 'text',
              }),
            defineField({
              name: 'activitiesImage',
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
