---
title: Create your first profile
description: Create a profile, let the launcher prepare the game and press Play.
---

# Create your first profile

A profile (an instance) is one Minecraft setup with its own game version, files, settings and saves. Profiles keep vanilla and modded play from interfering with each other.

## Steps

1. Open the **New Instance** wizard.
2. Choose how to start:
   - a **vanilla** game version, or
   - a game version with a **modloader** (Fabric, Quilt, Forge or NeoForge), or
   - a **modpack** from Modrinth or CurseForge. See [Modpacks](/docs/getting-started/modpacks).
3. Create the profile and let the launcher prepare the game files.
4. Select **Play**.

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

Game files come from Mojang and are not redistributed by Licht. Older and newer versions have different launch requirements, and compatibility was checked mainly on Windows. If something fails, see [Common problems](/docs/troubleshooting/common-problems).

## Installed content

Each profile keeps its own installed content, such as mods, separate from every other profile. You can view it without leaving the launcher.

What works today:

- **Listing** the content installed in a profile.
- **Enabling and disabling** items.
- **Removing** items.
- **Game settings and logs** for the profile, from the launcher itself.

Installing, updating and resolving dependencies for individual mods from inside the launcher is still in development. It is tracked as item 9.2 on the [roadmap](/docs/contributing/roadmap). Until then, [modpacks](/docs/getting-started/modpacks) are the way to get a complete set of mods into a profile.

::: info Back up your worlds
Profiles hold your worlds and other user files. Back up anything you care about before removing content or deleting a profile.
:::

## Next

- [Modpacks](/docs/getting-started/modpacks)
- [Modloaders](/docs/reference/game-runtime#modloaders)
- [Updates and uninstall](/docs/getting-started/updates-and-uninstall)
