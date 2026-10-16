import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const source = "https://raw.githubusercontent.com/mateusneiva/licht-launcher/main/";
const documents = [
  { name: "PRIVACY.md", heading: "# Privacy Policy" },
  { name: "TERMS.md", heading: "# Terms of Use" },
];

export async function syncPolicies({
  fetchDocument = fetch,
  destination = new URL("../policies/", import.meta.url),
} = {}) {
  // Validate every response before replacing any local policy.
  const downloads = await Promise.all(documents.map(async ({ name, heading }) => {
    const response = await fetchDocument(new URL(name, source), {
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) {
      throw new Error(`Cannot import ${name}: HTTP ${response.status}`);
    }
    const content = await response.text();
    if (!content.startsWith(heading) || !content.includes("not affiliated with Mojang Studios or Microsoft")) {
      throw new Error(`Cannot import ${name}: unexpected policy content`);
    }
    return { name, content };
  }));

  await mkdir(destination, { recursive: true });
  await Promise.all(downloads.map(({ name, content }) =>
    writeFile(new URL(name, destination), content, "utf8"),
  ));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await syncPolicies();
}
