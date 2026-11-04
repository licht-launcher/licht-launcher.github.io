---
title: Game runtime
description: Modloaders, the Java runtime, natives and libraries the launcher prepares for each profile.
---

# Game runtime

Besides the game files themselves, a profile needs a Java runtime, libraries, natives and, for mods, a modloader. Licht Launcher prepares all of them for you. Minecraft's own files still come from Mojang.

## Modloaders

A modloader is the layer that lets a game version run mods. Licht Launcher supports **Fabric**, **Quilt**, **Forge** and **NeoForge**. You choose one in the **New Instance** wizard, or a Modrinth modpack picks one for you. Leave the loader unset for a vanilla profile.

Pick the loader your mods were built for. Mods for one loader generally do not run on another.

### What the launcher does

Selecting a loader writes the loader's real version profile into your profile, then prepares everything it needs. Minecraft's own files still come from Mojang.

#### Fabric and Quilt

The launcher asks the Fabric or Quilt metadata service which loader versions exist for your Minecraft version, then fetches the loader profile. The stable channel is used by default. Missing library checksums are resolved before the profile is saved.

#### Forge and NeoForge

These loaders ship an installer. During **Install/Repair**, the launcher:

1. downloads the official installer and verifies its published checksum;
2. installs the vanilla game version the loader builds on, and the Java runtime it needs;
3. downloads the libraries the installer lists, verifying each checksum;
4. runs the installer's client-side steps (processors), without a shell;
5. verifies the generated files and records a completion receipt.

If any step fails or a checksum does not match, the install fails instead of leaving a half-prepared profile.

::: tip Install/Repair
A profile is ready only when its receipt still matches the files on disk. If a loader file is missing or was modified, run **Install/Repair** again and the launcher repairs it. A valid receipt skips the work.
:::

Profiles created by older versions with a provisional Forge or NeoForge placeholder are upgraded to the official profile by Install/Repair, without changing the profile's folder or settings.

### Tested combinations

These were launched offline on Windows with an isolated cache:

| Loader | Minecraft | Build |
| --- | --- | --- |
| Forge | 1.12.2 | 14.23.5.2860 |
| Forge | 1.20.1 | 47.3.0 |
| NeoForge | 1.21.1 | 21.1.80 |

::: warning Coverage
These checks do not cover every Minecraft and loader combination. Linux graphical launch has not been re-checked yet, although the build and tests run on Windows and Ubuntu.
:::

## Java runtime

Licht Launcher downloads and manages its own Java runtime, so you do not need to install Java. The runtime is **Eclipse Temurin**, published by Adoptium. The game files still come from Mojang.

### Which Java version

Each Minecraft version declares the Java major version it needs in its version data, and the launcher follows that.

| Minecraft | Java |
| --- | --- |
| 1.5.2, 1.7.2, 1.8.9, 1.12.2 | 8 |
| 1.20.1 | 17 |
| 1.21.11 | 21 |
| 26.3 | 25 |

When a version does not declare it, the launcher falls back to a rule based on the release id:

- 1.17 uses Java 16.
- 1.18 through 1.20.4 use Java 17.
- 1.20.5 and newer use Java 21.
- Any other id uses Java 8. A snapshot id such as `24w14a` does not match these patterns, so it falls back to Java 8 unless its data declares a version.

### Where it comes from

The launcher asks the Adoptium API for a runtime that matches the Java version, your operating system and your architecture. It prefers a JRE, and uses a JDK when that Java version has no JRE.

- The download's SHA-256 checksum is verified. A mismatch deletes the archive and fails the install.
- The archive is extracted into the launcher's `runtime` folder and then removed.
- Installing the same Java version again reuses the folder. If several match, the JRE wins over the JDK, and the higher version number wins.

Runtime folders are named like `temurin17-jre17.0.20-win_x64`.

### Using another Java

You can point the launcher at a different Java in its settings. The command-line tool has a `--java` option for the same purpose. The launcher can also detect Java installations in the usual places, such as `C:\Program Files\Eclipse Adoptium` on Windows, for the settings screen.

Modloader installation uses a configured Java of the required major version when there is one. Otherwise it uses the downloaded Temurin runtime. See [Modloaders](#modloaders).

## Libraries

Each Minecraft version lists the libraries it needs in its version data, and the launcher downloads them from Mojang the first time you launch the profile. Later launches reuse what is already downloaded.

Modloaders add their own libraries. Fabric and Quilt profiles list them in the loader profile, and missing checksums are resolved before the profile is saved. Forge and NeoForge installers list theirs, and the launcher verifies each checksum while downloading. See [Modloaders](#modloaders).

## Natives

Natives are the platform libraries the game needs, such as the ones for graphics and audio. The launcher selects them for your operating system, for `x86` and `x86_64`. Arm64 is not supported.

Minecraft 26.x lays natives out differently from older versions, and the launcher adjusts the library path to match. See [Compatibility](/docs/reference/compatibility).

## Technical details

The full notes are in the launcher's [loaders documentation](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/LOADERS.md), [runtime documentation](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/RUNTIME.md) and [compatibility documentation](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/COMPATIBILITY.md).
