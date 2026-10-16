# Licht Launcher website

Public website for [Licht Launcher](https://github.com/mateusneiva/licht-launcher).

Public address after deployment: <https://licht-launcher.github.io/>.

## Development

Requires Node.js 24 (24.15.0 or newer) and pnpm 10.33.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

To verify and preview the production site:

```sh
pnpm build
pnpm test
pnpm preview
```

The site uses VitePress's default theme. Its package and lockfile are independent
of the desktop frontend. The base path is `/` because this repository hosts the
organization's root GitHub Pages site.

## Policies

The launcher repository is the single source for Privacy and Terms:

- [Privacy Policy source](https://github.com/mateusneiva/licht-launcher/blob/main/PRIVACY.md)
- [Terms of Use source](https://github.com/mateusneiva/licht-launcher/blob/main/TERMS.md)

`pnpm build` and `pnpm dev` first download both documents from that repository's
`main` branch into the ignored `policies/` directory. This requires network
access. A failed download or invalid document stops the command before the
site is built. `pnpm policies:sync` also refreshes the local documents explicitly.
The Markdown pages include those documents directly; do not maintain copies here.

Repository-relative links are mapped to the published policy pages or GitHub
by `.vitepress/config.mjs`. Tests check the generated pages, links, anchors,
and local assets, and exercise policy-import failures using mocked responses.
Tests do not make network requests; build the site before running them.

## Deployment

The Pages workflow builds pull requests and deploys only from `main`. Set
**Settings > Pages > Build and deployment > Source** to **GitHub Actions**.
The `github-pages` environment must allow deployment from `main`.

After a policy change in the launcher repository, run the **Website** workflow
manually on `main` to publish the latest documents. Policy changes do not trigger
this separate repository automatically. Other changes merged here rebuild the
site and refresh the policies as part of the same deployment.

Licht Launcher is an unofficial project, not affiliated with Mojang Studios or
Microsoft.
