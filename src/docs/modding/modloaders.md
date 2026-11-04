---
title: Modloaders
description: Use Fabric, Quilt, Forge or NeoForge with a Licht Launcher profile.
---

# Modloaders

A modloader is the layer that lets a game version run mods. Licht Launcher supports **Fabric**, **Quilt**, **Forge** and **NeoForge**. You choose one in the **New Instance** wizard, or a Modrinth modpack picks one for you. Leave the loader unset for a vanilla profile.

Pick the loader your mods were built for. Mods for one loader generally do not run on another.

## What the launcher does

Selecting a loader writes the loader's real version profile into your profile, then prepares everything it needs. Minecraft's own files still come from Mojang.

### Fabric and Quilt

The launcher asks the Fabric or Quilt metadata service which loader versions exist for your Minecraft version, then fetches the loader profile. The stable channel is used by default. Missing library checksums are resolved before the profile is saved.

### Forge and NeoForge

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

## Tested combinations

These were launched offline on Windows with an isolated cache:

| Loader | Minecraft | Build |
| --- | --- | --- |
| Forge | 1.12.2 | 14.23.5.2860 |
| Forge | 1.20.1 | 47.3.0 |
| NeoForge | 1.21.1 | 21.1.80 |

::: warning Coverage
These checks do not cover every Minecraft and loader combination. Linux graphical launch has not been re-checked yet, although the build and tests run on Windows and Ubuntu.
:::

## Technical details

The full pipeline, cache layout and verification notes are in the launcher's [loaders documentation](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/LOADERS.md).
