import type { AstroInstance } from "astro";

type Opts<T extends Record<string, unknown>> = {
	files: Record<string, T>;
	requiredFields?: string[];
};

/**
 * Get all Astro pages from a given path.
 * @param opts - The options for the function.
 * @param opts.files - The files to get the Astro pages from. Use import.meta.glob eager: true.
 * @param opts.requiredFields - The required fields for the Astro pages.
 * @returns The Astro pages in the root of the given path, or looks for index.astro files in subdirectories (single level).
 */
const getAstroPages = <T extends Record<string, unknown> & AstroInstance>({
	files,
	requiredFields = [],
}: Opts<T>) =>
	Object.values(files).map((module) => {
		if (!requiredFields.every((field) => module[field as keyof T])) {
			throw new Error(
				`Missing required fields for ${module.file}: ${requiredFields
					.filter((field) => !module[field as keyof T])
					.join(", ")}`,
			);
		}

		return {
			id: (
				module.file
					.split("/")
					.at(module.file.includes("index.astro") ? -2 : -1) ?? ""
			).replace(".astro", ""),
			...module,
		};
	});

export default getAstroPages;
