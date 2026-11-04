import { readdir } from "node:fs/promises";

const source = new URL("../src/docs/", import.meta.url);

/** Markdown sources under src/docs, as POSIX paths relative to that folder. */
export async function docsSources(): Promise<string[]> {
  const entries = await readdir(source, { recursive: true });
  return entries
    .map((entry) => entry.replaceAll("\\", "/"))
    .filter((entry) => entry.endsWith(".md"))
    .sort();
}

/** Generated HTML file for a docs source, relative to the build output. */
export function docsHtmlFile(sourcePath: string): string {
  return `docs/${sourcePath.replace(/\.md$/, ".html")}`;
}

/** Public clean URL path for a docs source, without the leading slash. */
export function docsUrlPath(sourcePath: string): string {
  return `docs/${sourcePath.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, "")}`;
}
