import { CollectionConfig } from 'payload/types';

export const Spaces: CollectionConfig = {
  slug: 'spaces',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'category', 'price'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'select',
      required: true,
      options: [
        { label: 'Mumbai', value: 'Mumbai' },
        { label: 'Delhi', value: 'Delhi' },
        { label: 'Bangalore', value: 'Bangalore' },
        { label: 'Hyderabad', value: 'Hyderabad' },
        { label: 'Chennai', value: 'Chennai' },
        { label: 'Kolkata', value: 'Kolkata' },
        { label: 'Pune', value: 'Pune' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Rent Roomyo', value: 'Rent Roomyo' },
        { label: 'Roomyo Spaces', value: 'Roomyo Spaces' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'priceNumeric',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'amenities',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        {
          name: 'amenity',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'privileges',
      type: 'array',
      fields: [
        {
          name: 'privilege',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
        },
        {
          name: 'area',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          name: 'pincode',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'roomType',
      type: 'select',
      required: true,
      options: [
        { label: 'Single Room', value: 'Single Room' },
        { label: 'Double Room', value: 'Double Room' },
        { label: 'Triple Room', value: 'Triple Room' },
        { label: '1BHK', value: '1BHK' },
        { label: '2BHK', value: '2BHK' },
        { label: '3BHK', value: '3BHK' },
      ],
    },
    {
      name: 'mapLocation',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: true,
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'host',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          required: true,
          min: 0,
          max: 5,
        },
        {
          name: 'responseTime',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}; 