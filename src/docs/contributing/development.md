---
title: Development setup
description: Install the tools, run the launcher in development and use the licht CLI.
---

# Development setup

The desktop app uses **Tauri v2**, **React**, **TypeScript** and **Rust**. Start with the [contributing overview](/docs/contributing/) for how to propose changes.

## Requirements

Use the versions pinned by the repository:

- **Node.js 24**, version 24.15.0 or newer within that major version.
- **pnpm 10.33.0**, as specified in `package.json`.
- **Rust**, in the version selected by `rust-toolchain.toml`, with Cargo, rustfmt and Clippy.
- The [Tauri v2 system prerequisites](https://v2.tauri.app/start/prerequisites/):
  - **Windows:** C++ build tools, the Windows SDK and WebView2.
  - **Linux:** the required development libraries, including WebKitGTK 4.1.

## Run the app

From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm tauri dev
```

`pnpm tauri dev` starts the frontend development server automatically. For a frontend-only server, run `pnpm dev`.

To build the release executable without an installer:

```sh
pnpm tauri build --ci --no-bundle -- --locked
```

::: tip Dependencies
Use pnpm and the committed lockfiles. Discuss new dependencies before adding them. Never commit credentials, API keys, signing keys or account captures, and use your own accounts and authorized test data for manual authentication tests.
:::

## Use an isolated profile

Set `LICHT_DATA_DIR` to an absolute path (without `..`) before starting the launcher to use a different profile folder. It starts with default settings and does not import data from your normal profile, which makes it useful for testing.

```powershell
$env:LICHT_DATA_DIR = 'D:\LichtTestProfile'
& 'C:\path\to\licht.exe'
```

```sh
LICHT_DATA_DIR=/absolute/path/to/test-profile /path/to/licht
```

## The `licht` CLI

The core crate also builds a CLI that lists Mojang's manifest, installs a version, and launches a cached version with an offline name:

```sh
cargo run -p licht-core --features cli --bin licht -- versions
cargo run -p licht-core --features cli --bin licht -- install --version 1.20.1
cargo run -p licht-core --features cli --bin licht -- launch --version 1.20.1 --username Player
```

`install` downloads files and `launch` does not. Options:

- `--game-dir` replaces the instance root.
- `--cache` replaces the data directory.
- `--java` selects another Java executable.

## Environment variables

- `LICHT_CURSEFORGE_API_KEY`: enables CurseForge modpack search and import. See [Modpacks](/docs/modding/modpacks#curseforge).
- `LICHT_DATA_DIR`: overrides the profile folder, as described above.

For the details of each area, see the launcher's [runtime](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/RUNTIME.md), [storage](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/STORAGE.md) and [compatibility](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/COMPATIBILITY.md) notes.

## Next

Read the [code and testing guidelines](/docs/contributing/guidelines) before you submit a pull request.
