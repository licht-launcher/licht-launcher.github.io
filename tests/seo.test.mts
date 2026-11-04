import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { docsHtmlFile, docsSources, docsUrlPath } from "./docs-pages.mts";

const dist = new URL("../.vitepress/dist/", import.meta.url);
const website = "https://licht-launcher.github.io/";
const pages = ["index.html", "privacy.html", "terms.html"];

function attribute(tag: string, name: string): string {
  const value = tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
  assert.ok(typeof value === "string", `Missing ${name} in ${tag}`);
  return value;
}

for (const page of pages) {
  test(`${page} publishes page-specific canonical and social metadata`, async () => {
    const html = await readFile(new URL(page, dist), "utf8");
    const head = html.match(/<head>[\s\S]*?<\/head>/)?.[0];
    assert.ok(head);
    const title = head.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title);
    const metas = new Map<string, string>();
    for (const [tag] of head.matchAll(/<meta\b[^>]*>/g)) {
      const key = tag.match(/\b(?:name|property)="([^"]+)"/)?.[1];
      if (key) metas.set(key, attribute(tag, "content"));
    }
    const description = metas.get("description");
    assert.ok(description);
    const canonicalTags = [...head.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
    assert.equal(canonicalTags.length, 1);
    const expectedUrl = new URL(page === "index.html" ? "" : page.replace(/\.html$/, ""), website).href;
    assert.equal(attribute(canonicalTags[0][0], "href"), expectedUrl);
    assert.equal(metas.get("og:url"), expectedUrl);
    assert.equal(metas.get("og:type"), "website");
    assert.equal(metas.get("og:site_name"), "Licht Launcher");
    assert.equal(metas.get("og:locale"), "en_US");
    assert.equal(metas.get("og:title"), title);
    assert.equal(metas.get("og:description"), description);
    assert.equal(metas.get("twitter:title"), title);
    assert.equal(metas.get("twitter:description"), description);
    assert.equal(metas.get("twitter:card"), "summary");
    assert.equal(metas.get("og:image"), `${website}launcher-icon.png`);
    assert.equal(metas.get("twitter:image"), metas.get("og:image"));
    assert.equal(metas.get("og:image:alt"), "Licht Launcher flower icon");
    assert.equal(metas.get("twitter:image:alt"), metas.get("og:image:alt"));

    const image = await readFile(new URL("launcher-icon.png", dist));
    assert.equal(image.readUInt32BE(16).toString(), metas.get("og:image:width"));
    assert.equal(image.readUInt32BE(20).toString(), metas.get("og:image:height"));
    assert.match(head, /<link[^>]*rel="icon"[^>]*href="\/favicon.ico"/);
    assert.match(head, /<link[^>]*rel="icon"[^>]*href="\/icon-192.png"/);
    assert.match(head, /<link[^>]*rel="apple-touch-icon"[^>]*href="\/apple-touch-icon.png"/);
    assert.match(head, /<link[^>]*rel="manifest"[^>]*href="\/site.webmanifest"/);
  });
}

test("every public page has its own meta description", async () => {
  const files = [...pages, ...(await docsSources()).map(docsHtmlFile)];
  const seen = new Map<string, string>();
  for (const file of files) {
    const html = await readFile(new URL(file, dist), "utf8");
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(description, `${file} has no meta description`);
    assert.ok(description.length >= 50 && description.length <= 160, `${file} description length is ${description.length}`);
    assert.equal(seen.get(description), undefined, `${file} repeats the description of ${seen.get(description)}`);
    seen.set(description, file);
  }
});

test("every page declares light and dark theme colors", async () => {
  for (const page of pages) {
    const html = await readFile(new URL(page, dist), "utf8");
    assert.match(html, /<meta name="theme-color" content="#ffffff" media="\(prefers-color-scheme: light\)"/);
    assert.match(html, /<meta name="theme-color" content="#1b1b1f" media="\(prefers-color-scheme: dark\)"/);
  }
});

test("the home page publishes WebSite and SoftwareApplication JSON-LD, other pages do not", async () => {
  const extract = async (page: string) => {
    const html = await readFile(new URL(page, dist), "utf8");
    return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, json]) =>
      JSON.parse(json) as { "@type": string; url: string; operatingSystem?: string }[],
    );
  };
  const home = await extract("index.html");
  assert.equal(home.length, 1);
  assert.deepEqual(home[0].map((item) => item["@type"]), ["WebSite", "SoftwareApplication"]);
  assert.ok(home[0].every((item) => item.url === website));
  assert.equal(home[0][1].operatingSystem, "Windows, Linux");
  assert.deepEqual(await extract("privacy.html"), []);
});

test("the icon set and web manifest are published with matching sizes", async () => {
  for (const [file, size] of [["apple-touch-icon.png", 180], ["icon-192.png", 192]] as const) {
    const image = await readFile(new URL(file, dist));
    assert.equal(image.readUInt32BE(16), size);
    assert.equal(image.readUInt32BE(20), size);
  }
  const manifest = JSON.parse(await readFile(new URL("site.webmanifest", dist), "utf8")) as {
    name: string;
    icons: { src: string }[];
  };
  assert.equal(manifest.name, "Licht Launcher");
  for (const icon of manifest.icons) {
    await readFile(new URL(icon.src.slice(1), dist));
  }
});

test("the favicon is published as a nonempty ICO file", async () => {
  const icon = await readFile(new URL("favicon.ico", dist));
  assert.equal(icon.readUInt16LE(0), 0);
  assert.equal(icon.readUInt16LE(2), 1);
  assert.ok(icon.readUInt16LE(4) > 0);
});

test("the sitemap lists exactly the public page URLs", async () => {
  const sitemap = await readFile(new URL("sitemap.xml", dist), "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url);
  const docs = (await docsSources()).map((source) => `${website}${docsUrlPath(source)}`);
  assert.deepEqual(urls.sort(), [website, `${website}privacy`, `${website}terms`, ...docs].sort());
});

test("robots.txt permits crawling and advertises the sitemap", async () => {
  const robots = await readFile(new URL("robots.txt", dist), "utf8");
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.ok(robots.includes(`Sitemap: ${website}sitemap.xml`));
});

test("the 404 page is excluded from indexing and has no canonical URL", async () => {
  const html = await readFile(new URL("404.html", dist), "utf8");
  const head = html.match(/<head>[\s\S]*?<\/head>/)?.[0];
  assert.ok(head);
  assert.match(head, /<meta name="robots" content="noindex"/);
  assert.doesNotMatch(head, /rel="canonical"/);
});
