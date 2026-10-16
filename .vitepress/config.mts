import { defineConfig } from "vitepress";

const repository = "https://github.com/mateusneiva/licht-launcher";

export default defineConfig({
  title: "Licht Launcher",
  description: "A light, open-source launcher for Minecraft: Java Edition on Windows and Linux.",
  lang: "en-US",
  base: "/",
  srcDir: "src",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Privacy", link: "/privacy" },
      { text: "Terms", link: "/terms" },
      { text: "Download", link: `${repository}/releases/latest` },
    ],
    socialLinks: [{ icon: "github", link: repository }],
    outline: [2, 3],
    footer: {
      message: "Unofficial project, not affiliated with Mojang Studios or Microsoft.",
      copyright: "Copyright © 2026 Mateus Neiva. Released under the MIT License.",
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
