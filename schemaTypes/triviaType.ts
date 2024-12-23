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
      name: 'triviaOneNumber',
      title: 'Trivia-one-number',
      type: 'string',
    }),
    defineField({
      name: 'triviaOne',
      title: 'Trivia-one',
      type: 'string',
    }),
    defineField({
      name: 'triviaOneDescription',
      title: 'Trivia-one-description',
      type: 'string',
    }),
  
    defineField({
      name: 'triviaTwoNumber',
      title: 'Trivia-two-number',
      type: 'string',
    }),
    defineField({
      name: 'triviaTwo',
      title: 'Trivia-two',
      type: 'string',
    }),
    defineField({
      name: 'triviaTwoDescription',
      title: 'Trivia-two-description',
      type: 'string',
    }),
    
    defineField({
      name: 'triviaThreeNumber',
      title: 'Trivia-three-number',
      type: 'string',
    }),
    defineField({
      name: 'triviaThree',
      title: 'Trivia-three',
      type: 'string',
    }),
    defineField({
      name: 'triviaThreeDescription',
      title: 'Trivia-three-description',
      type: 'string',
    }),

    defineField({
      name: 'triviaFourNumber',
      title: 'Trivia-four-number',
      type: 'string',
    }),
    defineField({
      name: 'triviaFour',
      title: 'Trivia-four',
      type: 'string',
    }),
    defineField({
      name: 'triviaFourDescription',
      title: 'Trivia-four-description',
      type: 'string',
    }),

    defineField({
      name: 'reccomByOne',
      title: 'Reccomendation-by-one',
      type: 'string',
    }),
    defineField({
      name: 'reccomOne',
      title: 'Reccomendation-one',
      type: 'string',
    }),
    defineField({
      name: 'reccomOneUrl',
      title: 'Reccomendation-one-link',
      type: 'url',
    }),
    defineField({
      name: 'reccomByTwo',
      title: 'Reccomendation-by-two',
      type: 'string',
    }),
    defineField({
      name: 'reccomTwo',
      title: 'Reccomendation-two',
      type: 'string',
    }),
    defineField({
      name: 'reccomTwoUrl',
      title: 'Reccomendation-two-link',
      type: 'url',
    }),
    defineField({
      name: 'reccomByThree',
      title: 'Reccomendation-by-three',
      type: 'string',
    }),
    defineField({
      name: 'reccomThree',
      title: 'Reccomendation-three',
      type: 'string',
    }),
    defineField({
      name: 'reccomThreeUrl',
      title: 'Reccomendation-three-link',
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
  ],
});
