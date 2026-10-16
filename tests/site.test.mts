import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dist = new URL("../.vitepress/dist/", import.meta.url);
const base = "/";
const pages = ["index.html", "privacy.html", "terms.html"];

for (const page of pages) {
  test(`${page} publishes working project-relative links and assets`, async () => {
    const html = await readFile(new URL(page, dist), "utf8");
    assert.match(html, /not affiliated with Mojang Studios or Microsoft/);
    assert.ok(html.includes(`href="${base}privacy.html"`));
    assert.ok(html.includes(`href="${base}terms.html"`));
    assert.ok(!html.includes('href="/licht-launcher/'), `${page}: obsolete project base`);

    for (const [, attribute, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
      if (/^(?:[a-z]+:|\/\/)/i.test(value)) continue;
      const url = new URL(value, `https://example.test${base}${page}`);
      assert.ok(url.pathname.startsWith(base), `${page}: outside project base: ${value}`);
      const relative = url.pathname.slice(base.length) || "index.html";
      const target = await readFile(new URL(relative, dist));
      if (attribute === "href" && url.hash && relative.endsWith(".html")) {
        assert.ok(
          target.toString().includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `${page}: missing anchor: ${value}`,
        );
      }
    }
  });
}

test("published policies include the canonical content and resolve repository links", async () => {
  const privacy = await readFile(new URL("privacy.html", dist), "utf8");
  const terms = await readFile(new URL("terms.html", dist), "utf8");
  assert.match(privacy, /There is currently no dedicated switch/);
  assert.match(privacy, /href="https:\/\/github.com\/mateusneiva\/licht-launcher\/blob\/main\/README.md#uninstall"/);
  assert.match(terms, /href="https:\/\/github.com\/mateusneiva\/licht-launcher\/blob\/main\/LICENSE"/);
  assert.ok(terms.includes(`href="${base}privacy.html#retention-and-deletion"`));
  assert.match(terms, /These terms do not replace the MIT License/);
});

test("policy headings are included from the downloaded canonical documents", async () => {
  for (const [source, page] of [["PRIVACY.md", "privacy.html"], ["TERMS.md", "terms.html"]]) {
    const markdown = await readFile(new URL(`../policies/${source}`, import.meta.url), "utf8");
    const html = await readFile(new URL(page, dist), "utf8");
    for (const [, heading] of markdown.matchAll(/^#{1,3} (.+)$/gm)) {
      assert.ok(html.includes(heading.trim()), `${page}: missing canonical heading: ${heading}`);
    }
  }
});
