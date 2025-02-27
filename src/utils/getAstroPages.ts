import type { AstroInstance } from "astro";
import { type } from "arktype";

type Opts<T extends Record<string, unknown>> = {
  files: Record<string, T>;
  schema: type;
};

const astroPageType = type({
  "draft?": "boolean",
});

/**
 * Get all Astro pages from a given path.
 * @param opts - The options for the function.
 * @param opts.files - The files to get the Astro pages from. Use import.meta.glob eager: true.
 * @param opts.requiredFields - The required fields for the Astro pages.
 * @returns The Astro pages in the root of the given path, or looks for index.astro files in subdirectories (single level).
 */
const getAstroPages = <T extends Record<string, unknown> & AstroInstance>({
  files,
  schema,
}: Opts<T>) =>
  Object.values(files).map((module) => {
    const validate = schema.and(astroPageType)(module);
    if (validate instanceof type.errors)
      throw new Error(`Invalid module${module.file}: ${validate.summary}`);

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
