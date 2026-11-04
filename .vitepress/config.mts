import { defineConfig } from "vitepress";

const repository = "https://github.com/mateusneiva/licht-launcher";
const website = "https://licht-launcher.github.io/";

export default defineConfig({
  title: "Licht Launcher",
  description: "A light, open-source launcher for Minecraft: Java Edition on Windows and Linux.",
  lang: "en-US",
  base: "/",
  srcDir: "src",
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", type: "image/vnd.microsoft.icon", href: "/favicon.ico" }],
  ],
  sitemap: {
    hostname: website,
    transformItems: (items) => items.filter((item) => item.url !== "404.html"),
  },
  transformHead({ page, title, description }) {
    if (page === "404.md") {
      return [["meta", { name: "robots", content: "noindex" }]];
    }

    const path = page.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, "");
    const url = new URL(path, website).href;
    const image = new URL("launcher-icon.png", website).href;

    return [
      ["link", { rel: "canonical", href: url }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:site_name", content: "Licht Launcher" }],
      ["meta", { property: "og:locale", content: "en_US" }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:image", content: image }],
      ["meta", { property: "og:image:width", content: "512" }],
      ["meta", { property: "og:image:height", content: "512" }],
      ["meta", { property: "og:image:alt", content: "Licht Launcher flower icon" }],
      ["meta", { name: "twitter:card", content: "summary" }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
      ["meta", { name: "twitter:image", content: image }],
      ["meta", { name: "twitter:image:alt", content: "Licht Launcher flower icon" }],
    ];
  },
  themeConfig: {
    logo: { src: "/launcher-icon.png", alt: "" },
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/docs/", activeMatch: "/docs/" },
      { text: "Privacy", link: "/privacy" },
      { text: "Terms", link: "/terms" },
      { text: "Download", link: `${repository}/releases/latest` },
    ],
    sidebar: {
      "/docs/": [
        { text: "Documentation home", link: "/docs/" },
        {
          text: "Getting Started",
          items: [
            { text: "Overview", link: "/docs/getting-started/" },
            { text: "Install", link: "/docs/getting-started/install" },
            { text: "Sign in", link: "/docs/getting-started/sign-in" },
            { text: "Create your first profile", link: "/docs/getting-started/first-profile" },
            { text: "Updates and uninstall", link: "/docs/getting-started/updates-and-uninstall" },
          ],
        },
        {
          text: "Modding",
          items: [
            { text: "Modloaders", link: "/docs/modding/modloaders" },
            { text: "Modpacks", link: "/docs/modding/modpacks" },
            { text: "Managing installed content", link: "/docs/modding/managing-content" },
          ],
        },
        {
          text: "Troubleshooting",
          items: [
            { text: "Common problems", link: "/docs/troubleshooting/common-problems" },
            { text: "Logs and reporting a problem", link: "/docs/troubleshooting/logs-and-reporting" },
            { text: "Local data and removal", link: "/docs/troubleshooting/local-data" },
            { text: "FAQ", link: "/docs/troubleshooting/faq" },
          ],
        },
        {
          text: "Project",
          items: [{ text: "Contributing", link: "/docs/contributing" }],
        },
        {
          text: "Legal",
          items: [
            { text: "Privacy Policy", link: "/privacy" },
            { text: "Terms of Use", link: "/terms" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: repository }],
    outline: [2, 3],
    footer: {
      message: 'Unofficial project, not affiliated with Mojang Studios or Microsoft.<br><a href="/privacy">Privacy Policy</a>',
      copyright: `Copyright © 2026 Mateus Neiva. Released under the <a href="${repository}/blob/main/LICENSE">MIT License</a>.`,
    },
  },
  markdown: {
    config(md) {
      // Rewrite repository-relative policy links before VitePress resolves them.
      md.core.ruler.after("inline", "policy-links", (state) => {
        const destinations: Record<string, string> = {
          "PRIVACY.md": "/privacy.md",
          "TERMS.md": "/terms.md",
          "README.md": `${repository}/blob/main/README.md`,
          LICENSE: `${repository}/blob/main/LICENSE`,
        };
        for (const block of state.tokens) {
          for (const token of block.children ?? []) {
            if (token.type !== "link_open") continue;
            const href = token.attrGet("href");
            if (!href) continue;
            const [path, fragment] = href.split("#");
            if (Object.hasOwn(destinations, path)) {
              token.attrSet("href", destinations[path] + (fragment ? `#${fragment}` : ""));
            }
          }
        }
      });
    },
  },
});
