import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { syncPolicies } from "../scripts/sync-policies.mjs";

async function temporaryDestination(t) {
  const directory = await mkdtemp(join(tmpdir(), "licht-website-policies-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return new URL(`${pathToFileURL(directory).href}/`);
}

const disclaimer = "Unofficial project, not affiliated with Mojang Studios or Microsoft.";
const privacy = `# Privacy Policy\n\n${disclaimer}\n`;
const terms = `# Terms of Use\n\n${disclaimer}\n`;

test("imports the canonical documents from the launcher's main branch", async (t) => {
  const destination = await temporaryDestination(t);
  const requested = [];
  await syncPolicies({
    destination,
    fetchDocument: async (url) => {
      requested.push(url.href);
      return new Response(url.pathname.endsWith("PRIVACY.md") ? privacy : terms);
    },
  });
  assert.deepEqual(requested.sort(), [
    "https://raw.githubusercontent.com/mateusneiva/licht-launcher/main/PRIVACY.md",
    "https://raw.githubusercontent.com/mateusneiva/licht-launcher/main/TERMS.md",
  ]);
  assert.equal(await readFile(new URL("PRIVACY.md", destination), "utf8"), privacy);
  assert.equal(await readFile(new URL("TERMS.md", destination), "utf8"), terms);
});

test("an HTTP failure rejects the import and preserves existing documents", async (t) => {
  const destination = await temporaryDestination(t);
  await writeFile(new URL("PRIVACY.md", destination), "previous privacy");
  await writeFile(new URL("TERMS.md", destination), "previous terms");
  await assert.rejects(syncPolicies({
    destination,
    fetchDocument: async (url) => url.pathname.endsWith("PRIVACY.md")
      ? new Response(privacy)
      : new Response("Unavailable", { status: 503 }),
  }), /Cannot import TERMS.md: HTTP 503/);
  assert.equal(await readFile(new URL("PRIVACY.md", destination), "utf8"), "previous privacy");
  assert.equal(await readFile(new URL("TERMS.md", destination), "utf8"), "previous terms");
});

test("an invalid response is rejected instead of publishing it as a policy", async (t) => {
  const destination = await temporaryDestination(t);
  await assert.rejects(syncPolicies({
    destination,
    fetchDocument: async () => new Response("<html>Service unavailable</html>"),
  }), /unexpected policy content/);
});

test("a network failure is propagated to stop the build", async (t) => {
  const destination = await temporaryDestination(t);
  await assert.rejects(syncPolicies({
    destination,
    fetchDocument: async () => { throw new Error("Network unavailable"); },
  }), /Network unavailable/);
});
