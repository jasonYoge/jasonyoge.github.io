import { defineCollection, z } from 'astro:content'
import { notionLoader } from 'notion-astro-loader'
import rehypeExpressiveCode from 'rehype-expressive-code'
import { glob } from 'astro/loaders'
import {
  notionPageSchema,
  propertySchema,
  transformedPropertySchema,
} from "notion-astro-loader/schemas";
import siteConfig from './site.config';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  themes: siteConfig.themes.include,
    useDarkModeMediaQuery: false,
    defaultProps: {
      showLineNumbers: false,
      wrap: false,
    },
    plugins: [
      pluginLineNumbers()
    ],
};


const postsCollection = defineCollection({
  loader: notionLoader({
    auth: import.meta.env.VITE_NOTION_TOKEN,
    database_id: import.meta.env.VITE_NOTION_DB_ID,
    filter: {
      property: "published",
      checkbox: { equals: true },
    },
    rehypePlugins: [
      [rehypeExpressiveCode, rehypeExpressiveCodeOptions],
    ]
  }),
  schema: notionPageSchema({
    properties: z.object({
      title: transformedPropertySchema.title,
      date: propertySchema.created_time.optional(),
      tags: transformedPropertySchema.multi_select,
      description: transformedPropertySchema.rich_text.optional(),
      author: propertySchema.people.optional(),
      coverImage: propertySchema.files.optional(),
      published: transformedPropertySchema.checkbox.optional(),
    }),
  }),
});

const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      avatarImage: z
        .object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
        .optional(),
      githubCalendar: z.string().optional(), // GitHub username for calendar
    }),
})

const addendumCollection = defineCollection({
  loader: glob({ pattern: ['addendum.md', 'addendum.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      avatarImage: z
        .object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
        .optional(),
    }),
})

export const collections = {
  posts: postsCollection,
  home: homeCollection,
  addendum: addendumCollection,
}
