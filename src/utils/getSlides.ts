import type { AstroInstance } from "astro";
import getAstroPages from "./getAstroPages";

type Slide = AstroInstance & {
	[key: string]: unknown;
	title: string;
	description: string;
	authors: string[];
	publishedAt: string;
};

const slideRequiredFields = ["title", "description", "authors", "publishedAt"];

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
		requiredFields: slideRequiredFields,
	});
