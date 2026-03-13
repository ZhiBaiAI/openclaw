import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  docs: defineCollection({
    loader: glob({
      pattern: '**/*.md',
      base: './src/content/docs/docs',
      generateId: ({ entry }) => {
        const normalized = entry.replace(/\\/g, '/').replace(/\.md$/, '').replace(/\/index$/, '');
        return normalized === 'index' ? 'index' : normalized;
      }
    }),
    schema: z.object({
      title: z.string(),
      description: z.string().optional()
    })
  })
};
