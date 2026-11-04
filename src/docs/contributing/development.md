---
title: Development setup
description: Install the tools, run the launcher in development, follow the conventions and run the checks before a pull request.
---

# Development setup

The desktop app uses **Tauri v2**, **React**, **TypeScript** and **Rust**. Start with [How to contribute](/docs/contributing/) to see how to propose changes.

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

- `LICHT_CURSEFORGE_API_KEY`: enables CurseForge modpack search and import. See [Modpacks](/docs/getting-started/modpacks#curseforge).
- `LICHT_DATA_DIR`: overrides the profile folder, as described above.

For the details of each area, see the launcher's [runtime](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/RUNTIME.md), [storage](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/STORAGE.md) and [compatibility](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/COMPATIBILITY.md) notes.

## Conventions

- Follow the surrounding style and keep changes focused. Avoid unrelated refactoring and speculative abstractions.
- Write code, comments, commit messages and pull request descriptions in English. Interface copy is English too.
- Keep Minecraft logic in `crates/licht-core`, Tauri commands and events in the thin `src-tauri` layer, and UI logic in `src`. See [Architecture](/docs/contributing/architecture).
- Use strict TypeScript and the existing design-system components and theme tokens.
- Keep the interface keyboard-accessible and compatible with Windows WebView2 and Linux WebKitGTK.
- Generate shared Rust and TypeScript types with the existing `ts-rs` process. Do not duplicate them by hand.
- Keep tokens in the operating system keyring and out of logs.
- Document changes to external requests, local storage or data handling in the [Privacy Policy](https://github.com/mateusneiva/licht-launcher/blob/main/PRIVACY.md).

## Tests

- Reproduce a bug with a failing behavioral test before fixing it.
- Cover new core logic and meaningful UI interactions with automated tests.
- Automated tests must not depend on the network or a real Microsoft account.
- Reuse existing fixtures. Include third-party test material only when its redistribution is permitted, and document its source.
- Do not submit proprietary game binaries, textures, sounds or private account responses.

## Checks before a pull request

Run the checks that apply to your change:

```sh
pnpm lint
pnpm typecheck
pnpm test
cargo fmt --all --check
cargo clippy --workspace --all-targets --locked -- -D warnings
cargo test --workspace --locked
```

For build or packaging changes, also run the release build from [Run the app](#run-the-app).

::: warning Report honestly
Report checks you could not run and any real failures. Do not disable lint rules or weaken tests to get a passing result.
:::

## Continuous integration

CI checks frontend lint, types and tests, Rust formatting, Clippy and tests, and builds Tauri on Windows and Ubuntu. Build and test coverage is separate from manual graphical validation, so mention what you tried by hand in your pull request.
