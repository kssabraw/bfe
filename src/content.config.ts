import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // description/pubDate are normally supplied by the publisher (AR Tools
    // commits frontmatter with both); defaults keep one undated file from
    // failing the whole build. An undefaulted pubDate sorts as newest-at-build.
    description: z.string().default(''),
    pubDate: z.coerce.date().default(() => new Date()),
    heroImage: z.string().optional(),
    author: z.string().default('Be Found Everywhere'),
  }),
});

export const collections = { blog };
