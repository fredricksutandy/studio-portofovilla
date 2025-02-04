import { defineType, defineField } from 'sanity';

export const trivia = defineType({
  name: 'trivia',
  title: 'Trivia Section',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'imageAbout',
      title: 'Image About',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // Trivia Section
    defineField({
      name: 'triviaSection',
      title: 'Trivia Section',
      type: 'object',
      fields: [
        defineField({
          name: 'triviaOne',
          title: 'Trivia One',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'triviaTwo',
          title: 'Trivia Two',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'triviaThree',
          title: 'Trivia Three',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
          ],
        }),
      ],
    }),

    // Recommendations Section
    defineField({
      name: 'recommendationSection',
      title: 'Recommendation Section',
      type: 'object',
      fields: [
        defineField({
          name: 'recommendationOne',
          title: 'Recommendation One',
          type: 'object',
          fields: [
            defineField({
              name: 'recommendedBy',
              title: 'Recommended By',
              type: 'string',
            }),
            defineField({
              name: 'recommendation',
              title: 'Recommendation',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        }),
        defineField({
          name: 'recommendationTwo',
          title: 'Recommendation Two',
          type: 'object',
          fields: [
            defineField({
              name: 'recommendedBy',
              title: 'Recommended By',
              type: 'string',
            }),
            defineField({
              name: 'recommendation',
              title: 'Recommendation',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        }),
        defineField({
          name: 'recommendationThree',
          title: 'Recommendation Three',
          type: 'object',
          fields: [
            defineField({
              name: 'recommendedBy',
              title: 'Recommended By',
              type: 'string',
            }),
            defineField({
              name: 'recommendation',
              title: 'Recommendation',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
  ],
});
