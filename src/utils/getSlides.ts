import type { AstroInstance } from "astro";
import getAstroPages from "./getAstroPages";
import { type } from "arktype";

const schema = type({
  title: "string",
  description: "string",
  authors: "string[]",
  publishedAt: "string",
});

type Slide = AstroInstance & typeof schema.infer & { [key: string]: unknown };

/**
/**
 * Get all slides from the slides directory.
 * @returns The slides.
 */
export const getSlides = () =>
  getAstroPages<Slide>({
    files: import.meta.glob<true, string, Slide>(
      ["@slides/**/index.astro", "@slides/*.astro"],
      { eager: true },
    ),
    schema,
  });
