---
title: Code and testing guidelines
description: Conventions for writing code and tests, and the checks to run before a pull request.
---

# Code and testing guidelines

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

For build or packaging changes, also run the relevant build from [Development setup](/docs/contributing/development).

::: warning Report honestly
Report checks you could not run and any real failures. Do not disable lint rules or weaken tests to get a passing result.
:::

## Continuous integration

CI checks frontend lint, types and tests, Rust formatting, Clippy and tests, and builds Tauri on Windows and Ubuntu. Build and test coverage is separate from manual graphical validation, so mention what you tried by hand in your pull request.
