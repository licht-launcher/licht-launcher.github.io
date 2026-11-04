---
title: Compatibility
description: "Which Minecraft: Java Edition versions, accounts and systems Licht Launcher supports, how older versions differ, and the known gaps."
---

# Compatibility

This page lists what Licht Launcher runs on and what is known about how different Minecraft versions behave. Game files come from Mojang and are not redistributed.

## Supported systems

| System | Status |
| --- | --- |
| Windows (64-bit) | Supported. Most compatibility checks were made here. |
| Linux (64-bit) | Supported. Graphical launch has not been re-checked in the latest compatibility pass. |
| macOS | Not supported. |

Natives (the platform libraries the game needs) are selected for `x86` and `x86_64`. Arm64 is not supported.

## Minecraft versions

The launcher reads Mojang's version manifest, which includes releases, snapshots, old betas and old alphas. Version ids are treated as opaque strings, such as `1.5.2` or `26.3`.

Launching was checked on Windows with these versions: 26.3, 1.21.11, 1.20.1, 1.12.2, 1.8.9, 1.7.2 and 1.5.2. That is a sample, not a guarantee for every version. Each version's Java requirement is described in [Java runtime](/docs/reference/game-runtime#java-runtime).

## How versions differ

Minecraft changed how it starts several times, and the launcher handles each case.

| Versions | What differs |
| --- | --- |
| Through 1.12.2 | Game arguments come as one string, and there are no manifest JVM arguments. |
| 1.13 and newer | Arguments are lists with rules that depend on your system. |
| Through 1.5.2 | These versions start through the older LaunchWrapper. |
| Through 1.7.2 | Sounds and resources are copied to their legacy names, so old clients find them. |
| 26.x | Natives are laid out differently, and the launcher adjusts the library path. |

### Older versions use a nested folder

For LaunchWrapper versions, the launcher uses a `.minecraft` folder inside the profile as the game folder. Without it, a 1.5.2 client could read some settings from an existing official installation and fail. The official installation is never modified.

## Accounts

An offline profile gets a stable player identity from its username, so the same name always maps to the same identity. Microsoft accounts are described in [Authentication](/docs/reference/authentication).

## Known gaps

- On Linux, graphical launch has not been re-checked.
- In some very old versions, such as 1.5.2, one session argument is still passed unfilled.
- Java 17 and older write the whole game log in one encoding. Mixed output can show garbled characters, for example accents, and unsupported Windows code pages are decoded leniently.
- The version checks above were made on Windows and do not cover every Minecraft and loader combination. See [Modloaders](/docs/reference/game-runtime#modloaders).

## Technical details

The full notes are in the launcher's [compatibility documentation](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/COMPATIBILITY.md).
