---
title: Profiles and mods
description: Organize game versions, mod loaders and modpacks with separate profiles.
---

# Profiles and mods

## Profiles

Each profile keeps its own game version and content in a separate folder, so vanilla and modded setups do not interfere with each other.

## Mod loaders

When creating a profile, choose vanilla or one of the supported loaders: Fabric, Quilt, Forge or NeoForge.

## Modpacks

The new profile wizard can browse and import modpacks from Modrinth and CurseForge, including `.mrpack` files.

### CurseForge

CurseForge results need an API key. Set `LICHT_CURSEFORGE_API_KEY` in the environment or in a local `.env` file. The value is never logged. Without the key, Modrinth search and `.mrpack` import still work and CurseForge results are skipped.

Some CurseForge mods disable third-party distribution. If a pack contains such a mod, the import stops before the profile is created and the error names each blocked mod.

## Game settings and logs

Adjust game settings, manage installed content and view game logs without leaving the launcher.
