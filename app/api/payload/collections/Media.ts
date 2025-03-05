import { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      validate: (value) => {
        try {
          new URL(value);
          return true;
        } catch (e) {
          return 'Please enter a valid URL';
        }
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}; 