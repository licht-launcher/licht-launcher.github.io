import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { docsHtmlFile, docsSources } from "./docs-pages.mts";

const dist = new URL("../.vitepress/dist/", import.meta.url);
const base = "/";
const pages = ["index.html", "privacy-policy.html", "terms-of-use.html", ...(await docsSources()).map(docsHtmlFile)];

for (const page of pages) {
  test(`${page} publishes working project-relative links and assets`, async () => {
    const html = await readFile(new URL(page, dist), "utf8");
    assert.match(html, /not affiliated with Mojang Studios or Microsoft/);
    assert.ok(html.includes(`href="${base}privacy-policy"`));
    assert.ok(html.includes(`href="${base}terms-of-use"`));
    assert.ok(!html.includes('href="/licht-launcher/'), `${page}: obsolete project base`);

    for (const [, attribute, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
      if (/^(?:[a-z]+:|\/\/)/i.test(value)) continue;
      const pagePath = page.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "");
      const url = new URL(value, `https://example.test${base}${pagePath}`);
      assert.ok(url.pathname.startsWith(base), `${page}: outside project base: ${value}`);
      assert.ok(!url.pathname.endsWith(".html"), `${page}: link exposes .html: ${value}`);
      const relative = url.pathname.slice(base.length);
      const isAsset = /\.[a-z0-9]+$/i.test(relative);
      const targetPath = relative === "" || relative.endsWith("/") ? `${relative}index.html` : isAsset ? relative : `${relative}.html`;
      const target = await readFile(new URL(targetPath, dist));
      if (attribute === "href" && url.hash && targetPath.endsWith(".html")) {
        assert.ok(
          target.toString().includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `${page}: missing anchor: ${value}`,
        );
      }
    }
  });
}

test("published policies include the canonical content and resolve repository links", async () => {
  const privacy = await readFile(new URL("privacy-policy.html", dist), "utf8");
  const terms = await readFile(new URL("terms-of-use.html", dist), "utf8");
  assert.match(privacy, /There is currently no dedicated switch/);
  assert.match(privacy, /href="https:\/\/github.com\/licht-launcher\/licht-launcher\/blob\/main\/README.md#uninstall"/);
  assert.match(terms, /href="https:\/\/github.com\/licht-launcher\/licht-launcher\/blob\/main\/LICENSE"/);
  assert.ok(terms.includes(`href="${base}privacy-policy#retention-and-deletion"`));
  assert.match(terms, /These terms do not replace the MIT License/);
});

test("policy headings are included from the downloaded canonical documents", async () => {
  for (const [source, page] of [["PRIVACY.md", "privacy-policy.html"], ["TERMS.md", "terms-of-use.html"]]) {
    const markdown = await readFile(new URL(`../policies/${source}`, import.meta.url), "utf8");
    const html = await readFile(new URL(page, dist), "utf8");
    for (const [, heading] of markdown.matchAll(/^#{1,3} (.+)$/gm)) {
      assert.ok(html.includes(heading.trim()), `${page}: missing canonical heading: ${heading}`);
    }
  }
});

test("the install page publishes the latest release downloads and its version without JavaScript", async () => {
  const html = await readFile(new URL("docs/getting-started/install.html", dist), "utf8");
  const version = html.match(/Latest version: <strong[^>]*>(\d+\.\d+\.\d+[^<]*)<\/strong>/)?.[1];
  assert.ok(version, "missing release version");
  const downloads = [...html.matchAll(/<a [^>]*?href="(https:\/\/github.com\/[^"]+\/releases\/download\/[^"]+)"[^>]*>Download<\/a>/g)];
  assert.ok(downloads.length >= 1, "missing download links");
  for (const [, url] of downloads) {
    assert.ok(url.includes(`/v${version}/`) && url.includes(`-${version}-`), `download is not for ${version}: ${url}`);
  }
});
