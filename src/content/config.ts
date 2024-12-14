import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders"; // Not available with legacy API

const presentations = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    authors: z.array(z.string()),
    publishedAt: z.coerce.date(),
  }),
});

export const collections = { presentations };
