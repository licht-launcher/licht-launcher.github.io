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
  assert.match(html, /<a class="VPButton medium brand" href="https:\/\/github.com\/mateusneiva\/licht-launcher\/releases\/latest"[^>]*>Download on GitHub<\/a>/);
  assert.match(html, /<a class="VPButton medium alt" href="https:\/\/github.com\/mateusneiva\/licht-launcher"[^>]*>View source<\/a>/);
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

test("the GitHub action uses the same icon shape as the navbar", async () => {
  const navbarIcons = decodeURIComponent(await readFile(new URL("vp-icons.css", dist), "utf8"));
  const actionIcon = await readFile(new URL("icons/github.svg", dist), "utf8");
  const navbarPath = navbarIcons.match(/<path[^>]*\bd='([^']+)'/)?.[1];
  const actionPath = actionIcon.match(/<path[^>]*\bd="([^"]+)"/)?.[1];
  assert.ok(navbarPath);
  assert.equal(actionPath, navbarPath);
});

test("the homepage omits the removed project-information section", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");
  assert.doesNotMatch(html, /<h2 id="(?:project-information|before-you-play|downloads-and-code-signing|contact)"/);
});

for (const page of ["index.html", "privacy.html", "terms.html"]) {
  test(`${page} footer provides privacy, license, and the unofficial-project notice`, async () => {
    const html = await readFile(new URL(page, dist), "utf8");
    const footer = html.match(/<footer class="VPFooter"[\s\S]*?<\/footer>/)?.[0];
    assert.ok(footer);
    assert.match(footer, /not affiliated with Mojang Studios or Microsoft/);
    assert.match(footer, /<a href="\/privacy.html">Privacy Policy<\/a>/);
    assert.match(footer, /<a href="https:\/\/github.com\/mateusneiva\/licht-launcher\/blob\/main\/LICENSE">MIT License<\/a>/);
  });
}

test("the production stylesheet includes all six local icon assets", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");
  const stylesheet = html.match(/href="([^"]*\/assets\/style\.[^"]+\.css)"/)?.[1];
  assert.ok(stylesheet);
  const css = await readFile(new URL(stylesheet.slice(1), dist), "utf8");
  for (const name of ["instances", "mods", "platforms", "source", "download", "github"]) {
    assert.ok(css.includes(`/icons/${name}.svg`), `Missing icon in stylesheet: ${name}`);
    const icon = await readFile(new URL(`icons/${name}.svg`, dist), "utf8");
    assert.match(icon, /<svg[^>]*viewBox="0 0 24 24"/);
  }
});
