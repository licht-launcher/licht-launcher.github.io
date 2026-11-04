---
title: Create your first profile
description: Create your first Minecraft profile in Licht Launcher from scratch or from a modpack file, let it prepare Java and the game, then press Play.
---

# Create your first profile

A profile (an instance) is one Minecraft setup with its own game version, files, settings and saves. Profiles keep vanilla and modded play from interfering with each other.

## Choose how to start

Select **Create instance** to open its menu:

- **From scratch** opens a form where you pick the game version and, optionally, a modloader.
- **Upload a pack file** imports a modpack from a `.mrpack` or `.zip` file on your computer.
- **From a modpack** is not available yet. It is waiting for the Discover page.

## Create a profile from scratch

1. Select **Create instance**, then **From scratch**.
2. **Name your instance.** This is optional. If you leave it blank, the launcher uses the platform and version, such as `Fabric 26.3`, and adds a number (`Fabric 26.3 (1)`) when the name is already taken. You can rename it later from the library.
3. **Choose a platform.** Vanilla is the official game. Fabric, NeoForge, Forge and Quilt add mod support.
4. **Pick the game version.** Type to search the list. Snapshots are hidden until you turn on **Snapshots**. If the list does not load, check your connection and select **Retry**.
5. **Pick the loader version** (only for a modloader). **Stable** and **Latest** are chosen for you. **Other** lets you pick a specific build. A channel is disabled, with an explanation on hover, when the loader has no build of that kind for the game version.
6. Select **Create**.

The new profile opens in your library and the launcher starts preparing its game files. When it is ready, select **Play**. If creation fails, the launcher shows an error message and nothing is added to the library.

::: tip Choosing a platform
Pick **Vanilla** to play the unmodified game. Pick a modloader only when you plan to use mods, and match what the mods or modpack require. See [Modloaders](/docs/reference/game-runtime#modloaders) for how each one is handled.
:::

## Create a profile from a pack file

1. Select **Create instance**, then **Upload a pack file**.
2. Choose a `.mrpack` (Modrinth) or `.zip` (CurseForge) modpack file. Closing the picker without choosing a file does nothing.
3. The launcher creates a profile named after the file, adds a number if that name is taken, and opens it in your library to prepare the game, loader and mods.

Some CurseForge mods cannot be downloaded outside CurseForge. If a pack includes one, the import stops and names the blocked mods. See [Common issues](/docs/troubleshooting/common-issues).

The first launch downloads the game, its libraries and assets from Mojang, and any Java runtime or loader it needs. Later launches reuse what is already downloaded.

## Java is handled for you

Each Minecraft version needs a particular Java major version. The launcher reads that requirement from the game's own version data and downloads a matching Eclipse Temurin runtime. It keeps the runtime in the launcher's data folder, so you do not need to install Java.

Examples from the version data:

| Minecraft | Java |
| --- | --- |
| 1.5.2, 1.7.2, 1.8.9, 1.12.2 | 8 |
| 1.20.1 | 17 |
| 1.21.11 | 21 |
| 26.3 | 25 |

## Versions and compatibility

Game files come from Mojang and are not redistributed by Licht. Older and newer versions have different launch requirements, and compatibility was checked mainly on Windows. If something fails, see [Common issues](/docs/troubleshooting/common-issues).

## Installed content

Each profile keeps its own installed content, such as mods, separate from every other profile. You can view it without leaving the launcher.

What works today:

- **Listing** the content installed in a profile.
- **Enabling and disabling** items.
- **Removing** items.
- **Game settings and logs** for the profile, from the launcher itself.

Installing, updating and resolving dependencies for individual mods from inside the launcher is still in development. It is tracked as item 9.2 on the [roadmap](/docs/contributing/roadmap). Until then, import a modpack to get a complete set of mods into a profile.

::: info Back up your worlds
Profiles hold your worlds and other user files. Back up anything you care about before removing content or deleting a profile.
:::

## Next

- [Modloaders](/docs/reference/game-runtime#modloaders)
