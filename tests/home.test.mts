import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dist = new URL("../.vitepress/dist/", import.meta.url);

test("the homepage renders four feature cards with decorative icons", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");
  const cards = [...html.matchAll(/<article class="box"[^>]*>([\s\S]*?)<\/article>/g)];
  assert.equal(cards.length, 4);
  const titles = ["Your instances, organized", "Modded or vanilla", "Windows and Linux", "Free and open source"];
  for (const [index, [, card]] of cards.entries()) {
    assert.ok(card.includes(titles[index]));
    assert.match(card, /class="home-feature-icon home-icon-[^"]+" aria-hidden="true"/);
  }
});

test("primary actions retain their accessible labels and destinations", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");
  assert.match(html, /<a class="VPButton medium brand" href="https:\/\/github.com\/licht-launcher\/licht-launcher\/releases\/latest"[^>]*>Download on GitHub<\/a>/);
  assert.match(html, /<a class="VPButton medium alt" href="\/docs\/"[^>]*>Documentation<\/a>/);
  assert.doesNotMatch(html, />View source</);
});

test("the navbar links to the GitHub repository through an icon", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");
  const social = html.match(/<div class="VPSocialLinks[\s\S]*?<\/div>/)?.[0];
  assert.ok(social);
  assert.match(social, /href="https:\/\/github.com\/licht-launcher\/licht-launcher"/);
  assert.match(social, /aria-label="github"/);
});

test("the navbar displays the existing logo alongside the site name", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");
  const navbar = html.match(/<div class="VPNavBarTitle"[\s\S]*?<\/a>/)?.[0];
  assert.ok(navbar);
  assert.match(navbar, /<img[^>]*src="\/launcher-icon.png"/);
  assert.ok(navbar.includes("Licht Launcher"));
});

test("the homepage hero displays the launcher logo with descriptive alternative text", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");
  const image = [...html.matchAll(/<img\b[^>]*>/g)].find(([tag]) => tag.includes("image-src"))?.[0];
  assert.ok(image);
  assert.match(image, /src="\/launcher-icon.png"/);
  assert.match(image, /alt="Licht Launcher flower logo"/);
});

test("the homepage omits the removed project-information section", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");
  assert.doesNotMatch(html, /<h2 id="(?:project-information|before-you-play|downloads-and-code-signing|contact)"/);
});

for (const page of ["index.html", "privacy-policy.html", "terms-of-use.html"]) {
  test(`${page} footer provides privacy, license, and the unofficial-project notice`, async () => {
    const html = await readFile(new URL(page, dist), "utf8");
    const footer = html.match(/<footer class="VPFooter"[\s\S]*?<\/footer>/)?.[0];
    assert.ok(footer);
    assert.match(footer, /not affiliated with Mojang Studios or Microsoft/);
    assert.match(footer, /<a href="\/privacy-policy">Privacy Policy<\/a>/);
    assert.match(footer, /<a href="\/terms-of-use">Terms of Use<\/a>/);
    assert.match(footer, /<a href="https:\/\/github.com\/licht-launcher\/licht-launcher\/blob\/main\/LICENSE">MIT License<\/a>/);
  });
}

const kofiLink = /<a [^>]*href="https:\/\/ko-fi.com\/mateusneiva"[^>]*>[\s\S]*?<img [^>]*src="\/kofi-button.png"[^>]*alt="Buy me a coffee on Ko-fi"[^>]*>/;

for (const page of ["index.html", "privacy-policy.html", "terms-of-use.html"]) {
  test(`${page} navbar links to Ko-fi and the footer does not`, async () => {
    const html = await readFile(new URL(page, dist), "utf8");
    const navbar = html.match(/<nav [^>]*class="VPNavBarMenu[\s\S]*?<\/nav>/)?.[0];
    const footer = html.match(/<footer class="VPFooter"[\s\S]*?<\/footer>/)?.[0];
    assert.ok(navbar);
    assert.ok(footer);
    assert.match(navbar, kofiLink);
    assert.doesNotMatch(footer, /ko-fi/i);
  });
}

test("the docs sidebar does not include the Ko-fi button", async () => {
  const html = await readFile(new URL("docs/getting-started/install.html", dist), "utf8");
  const sidebar = html.match(/<aside class="VPSidebar"[\s\S]*?<\/aside>/)?.[0];
  assert.ok(sidebar);
  assert.doesNotMatch(sidebar, /ko-fi/i);
});

test("the Ko-fi button is published as a PNG image", async () => {
  const image = await readFile(new URL("kofi-button.png", dist));
  assert.equal(image.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
});

test("the production stylesheet includes all seven local icon assets", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");
  const stylesheet = html.match(/href="([^"]*\/assets\/style\.[^"]+\.css)"/)?.[1];
  assert.ok(stylesheet);
  const css = await readFile(new URL(stylesheet.slice(1), dist), "utf8");
  for (const name of ["instances", "mods", "platforms", "source", "download", "github", "docs"]) {
    assert.ok(css.includes(`/icons/${name}.svg`), `Missing icon in stylesheet: ${name}`);
    const icon = await readFile(new URL(`icons/${name}.svg`, dist), "utf8");
    assert.match(icon, /<svg[^>]*viewBox="0 0 24 24"/);
  }
});
