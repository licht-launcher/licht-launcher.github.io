---
title: Contributing
description: Development setup and workflow for contributing to Licht Launcher.
---

# Contributing

Licht Launcher is maintained by Mateus Neiva. Read the [contribution guide](https://github.com/mateusneiva/licht-launcher/blob/main/CONTRIBUTING.md), the [roadmap](https://github.com/mateusneiva/licht-launcher/blob/main/docs/ROADMAP.md) and the [architecture](https://github.com/mateusneiva/licht-launcher/blob/main/docs/contributing/ARCHITECTURE.md) before starting, and open an issue to discuss non-trivial changes first.

## Development setup

The desktop app uses Tauri v2, React, TypeScript and Rust. You need:

- Node.js 24 (24.15.0 or newer) and pnpm 10.33.0;
- the Rust toolchain selected by `rust-toolchain.toml`;
- the [Tauri v2 system prerequisites](https://v2.tauri.app/start/prerequisites/).

```sh
pnpm install --frozen-lockfile
pnpm tauri dev
```

## Checks before a pull request

```sh
pnpm lint
pnpm typecheck
pnpm test
cargo fmt --all --check
cargo clippy --workspace --all-targets --locked -- -D warnings
cargo test --workspace --locked
```

See the full [development guide](https://github.com/mateusneiva/licht-launcher/blob/main/docs/contributing/DEVELOPMENT.md) for the CLI, testing rules and conventions.

## Pull requests

Use a focused branch (`feat/...`, `fix/...`, `chore/...`) and small [Conventional Commits](https://www.conventionalcommits.org/). Describe what changed, why and how you tested it.
