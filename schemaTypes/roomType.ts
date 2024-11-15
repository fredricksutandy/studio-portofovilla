import { defineType, defineField } from 'sanity';

export const room = defineType({
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    {
      name: 'roomName',
      title: 'Room Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'roomName', maxLength: 96 },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
    },
    {
      name: 'bedroomsNumber',
      title: 'Number of Bedrooms',
      type: 'number',
    },
    {
      name: 'guestNumber',
      title: 'Number of Guests',
      type: 'number',
    },
    {
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of facilities specific to this room.',
    },
    {
      name: 'image',
      title: 'Room Image',
      type: 'image',
    },
  ],
});
