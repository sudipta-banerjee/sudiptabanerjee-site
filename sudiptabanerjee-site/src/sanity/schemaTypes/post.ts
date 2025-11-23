import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Research', value: 'Research' },
          { title: 'Finance', value: 'Finance' },
          { title: 'Personal', value: 'Personal' },
          { title: 'Tech', value: 'Tech' },
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Summary (Excerpt)',
      type: 'text',
      rows: 3,
      description: 'This appears on the home page cards.'
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})