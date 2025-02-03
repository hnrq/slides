import type { AstroInstance } from "astro";
import getAstroPages from "./getAstroPages";
import { type } from "arktype";

type Slide = AstroInstance & {
	[key: string]: unknown;
	title: string;
	description: string;
	authors: string[];
	publishedAt: string;
	draft?: boolean;
};

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
		schema: type({
			title: "string",
			description: "string",
			authors: "string[]",
			publishedAt: "string",
		}),
	});
