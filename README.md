<h1 align="center">Licht Launcher · Website</h1>

<p align="center">
  The public home of Licht Launcher.<br>
  Built with VitePress and published on GitHub Pages.
</p>

<p align="center">
  <a href="https://github.com/licht-launcher/licht-launcher.github.io/actions/workflows/pages.yml"><img src="https://github.com/licht-launcher/licht-launcher.github.io/actions/workflows/pages.yml/badge.svg?branch=main" alt="Website build and deployment"></a>
  <a href="https://vitepress.dev/"><img src="https://img.shields.io/badge/VitePress-1.6.4-646cff" alt="VitePress 1.6.4"></a>
</p>

<p align="center">
  <a href="https://licht-launcher.github.io/">Visit the website</a> ·
  <a href="https://licht-launcher.github.io/privacy.html">Privacy Policy</a> ·
  <a href="https://licht-launcher.github.io/terms.html">Terms of Use</a> ·
  <a href="https://github.com/mateusneiva/licht-launcher">Launcher repository</a>
</p>

---

## About

This repository contains the English website for **Licht Launcher**, a free,
open-source launcher for Minecraft: Java Edition on Windows and Linux. It hosts
the project overview and public policy pages, with links to downloads and support.

The site uses VitePress's default theme, TypeScript, and an independent package and lockfile.
Its base path is `/`, serving the organization's root GitHub Pages address.

**Unofficial project, not affiliated with Mojang Studios or Microsoft.**

## Getting started

### Requirements

- **Node.js 24**, version 24.15.0 or newer within that major version.
- **pnpm 10.33.0**, as specified in `package.json`.
- Internet access to import the canonical policies before development or build.

### Run locally

```sh
pnpm install --frozen-lockfile
pnpm dev
```

### Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Refresh the policies and start the development server. |
| `pnpm policies:sync` | Download the latest canonical policy documents. |
| `pnpm build` | Refresh the policies and generate the production site. |
| `pnpm typecheck` | Check configuration, scripts, and tests with TypeScript strict mode. |
| `pnpm test` | Run import and generated-site checks after a build. |
| `pnpm preview` | Preview the production build locally. |

To validate a change and preview the result:

```sh
pnpm typecheck
pnpm build
pnpm test
pnpm preview
```

## Project structure

```text
.
├── .github/workflows/pages.yml  # Build, test, and deploy
├── .vitepress/config.mts        # Site configuration and policy-link mapping
├── scripts/sync-policies.mts    # Canonical policy importer
├── src/
│   ├── index.md                 # Homepage
│   ├── privacy.md               # Privacy Policy inclusion
│   └── terms.md                 # Terms of Use inclusion
├── tests/                      # Import and generated-site checks
├── package.json
├── tsconfig.json               # Strict, no-emit type checking
└── pnpm-lock.yaml
```

Downloaded documents live in the ignored `policies/` directory. Build output
is generated in `.vitepress/dist/`.

The importer and tests use `.mts` files and run directly with Node.js 24's native
TypeScript support. `pnpm typecheck` checks types separately; scripts do not need
a compilation step or an additional TypeScript runner.

## Policy source of truth

Privacy and Terms are maintained in the **launcher repository**:

| Document | Canonical source | Published page |
| --- | --- | --- |
| Privacy Policy | [PRIVACY.md](https://github.com/mateusneiva/licht-launcher/blob/main/PRIVACY.md) | [Privacy](https://licht-launcher.github.io/privacy.html) |
| Terms of Use | [TERMS.md](https://github.com/mateusneiva/licht-launcher/blob/main/TERMS.md) | [Terms](https://licht-launcher.github.io/terms.html) |

Development and production builds download both documents from the launcher's
`main` branch. The pages in `src/` include them directly; edit the canonical
documents instead of maintaining copies here. Failed downloads or invalid
documents stop the build.

Repository-relative links are mapped to the published policy pages or GitHub
by `.vitepress/config.mts`. Tests verify imports, generated pages, links,
anchors, and local assets. The tests themselves do not make network requests.

## Publishing

The [Website workflow](https://github.com/licht-launcher/licht-launcher.github.io/actions/workflows/pages.yml)
builds and tests pull requests. Changes merged into `main` deploy automatically
to **[licht-launcher.github.io](https://licht-launcher.github.io/)**.

GitHub Pages uses **GitHub Actions** as its source, and the `github-pages`
environment must allow deployment from `main`.

After a policy change in the launcher repository, manually run the **Website**
workflow on `main` to publish the latest documents. Changes in that separate
repository do not trigger this workflow automatically.
