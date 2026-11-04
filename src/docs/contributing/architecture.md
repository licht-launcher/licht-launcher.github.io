---
title: Architecture
description: "How the Licht Launcher Minecraft launcher is built: its layers, how they communicate, the frontend layout, error handling and testing."
---

# Architecture

Licht Launcher is built with Tauri v2, React, TypeScript, Vite and a Rust Cargo workspace.

## Layers

| Location | Responsibility | Boundary |
| --- | --- | --- |
| `crates/licht-core` | Manifests, downloads, Java, game execution, instances, authentication, loaders and modpacks | Standalone Rust library with no Tauri dependency |
| `src-tauri` | Startup, logging configuration, typed commands and events | Delegates domain behavior to the core |
| `src` | Screens, UI state and calls to the Tauri adapter | No Minecraft domain logic |

The workspace holds the `licht-core` library and the `licht-launcher` application. The core also builds the `licht` CLI, and both the app and the CLI call the same core services. Core modules include `meta`, `transfer`, `game`, `instance`, `runtime`, `store`, `auth`, `loaders` and `modpacks`.

## Communication

```text
Frontend -> typed Tauri commands -> licht-core
Frontend <- Tauri events <- adapter handling core progress and status
```

- TanStack Query handles command loading, caching, mutations and errors.
- Progress events are throttled to about 100 ms.
- Shared types are generated with `ts-rs` into `src/lib/generated`, not maintained by hand in TypeScript.

## Frontend layout

- `src/routes`: TanStack Router file-based routes that mount feature screens.
- `src/features`: screens and feature-specific UI behavior.
- `src/components/ui`: shared design-system components that use theme tokens.
- `src/lib`: UI utilities and typed invocation wrappers.

The generated `src/routeTree.gen.ts` is committed, so type checking does not depend on a Vite build. Hash history (`/#/`) avoids requiring the Tauri window to rewrite paths to `index.html`. The UI runs in WebView2 on Windows and WebKitGTK on Linux.

## Errors and logging

- The core exports `CoreError`, derived with `thiserror`, and a `Result<T>` alias. I/O errors keep their source.
- Application startup uses `anyhow` to add context at the boundary. Errors propagate with `?`.
- Logging uses `tracing` and `tracing-subscriber`, with structured text on stderr. `RUST_LOG` selects the filter, and an absent or empty value defaults to INFO.
- Logs must not contain tokens, secrets or personal data.

## Testing

The core is testable on its own with `cargo test -p licht-core`. Integration tests under `crates/licht-core/tests/` mirror the source domains, and fixtures live under `tests/fixtures/`. Tests use saved JSON and temporary databases without network access. Frontend tests use Vitest, Testing Library and jsdom. See [Tests](/docs/contributing/development#tests).

## Related internals

These documents live in the launcher repository:

- [Storage](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/STORAGE.md): profile and content directories, the SQLite service and instance persistence.
- [Runtime](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/RUNTIME.md): Java selection, installation and discovery.
- [Loaders](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/LOADERS.md): loader profiles and Forge and NeoForge processors.
- [Compatibility](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/COMPATIBILITY.md): manifest formats, legacy execution, native libraries, assets, logs and known gaps.
- Integrations: [Microsoft](https://github.com/mateusneiva/licht-launcher/blob/main/docs/integrations/MICROSOFT.md), [Modrinth](https://github.com/mateusneiva/licht-launcher/blob/main/docs/integrations/MODRINTH.md) and [CurseForge](https://github.com/mateusneiva/licht-launcher/blob/main/docs/integrations/CURSEFORGE.md).

## References

- [Mojang version manifest](https://piston-meta.mojang.com/mc/game/version_manifest_v2.json)
- [minecraft.wiki](https://minecraft.wiki/) for JSON formats and authentication
- [Tauri v2 documentation](https://v2.tauri.app)
- Reference implementations: Prism Launcher, HMCL, portablemc and minecraft-launcher-lib.
