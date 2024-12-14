import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders"; // Not available with legacy API

const slides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/slides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    authors: z.array(z.string()),
    publishedAt: z.coerce.date(),
  }),
});

export const collections = { slides };
