---
title: Common issues
description: Fixes and explanations for the problems most likely to come up.
---

# Common issues

If your problem is not here, see [Open an issue](/docs/troubleshooting/open-an-issue).

## Installing

### Windows does not show a verified publisher

Windows publisher signing is not available yet, so this is expected for the installer. Download it from the [official releases page](https://github.com/mateusneiva/licht-launcher/releases/latest). Updates inside the launcher are verified with the launcher's signing key. See the [code signing policy](/docs/contributing/code-signing).

## Signing in

### Microsoft sign-in cannot save the session on Linux

The launcher stores the session in the system credential store (the Secret Service). Make sure a keyring service is running in your desktop session, then try again.

### I want to remove a signed-in account

Remove it in **Settings**. This deletes the stored credentials from the credential store and forgets the account in the launcher. It does not delete your Microsoft account.

## Profiles and mods

### A Forge or NeoForge profile will not launch

Run **Install/Repair** on the profile. The loader is only ready while the files recorded during installation still match what is on disk, so a missing or modified file is repaired by running it again. If it keeps failing, [report it](/docs/troubleshooting/open-an-issue) with the game and loader versions.

### A CurseForge modpack import stops with a list of mods

Those mods' authors disabled downloads outside CurseForge, so the launcher refuses to import the pack. The error names each blocked mod. There is no workaround inside the launcher.

### A Modrinth pack is rejected

Packs may only download files from `cdn.modrinth.com`. A pack that points to another host is not accepted.

## Known limitations

- **Linux graphical launch** has not been re-checked in the latest compatibility pass.
- **Garbled accents in game logs** can happen on older Java versions, because Java 17 and older write the whole log in one encoding. Newer Java uses UTF-8.
- **Installing individual mods** from inside the launcher is not available yet. See [Installed content](/docs/getting-started/first-profile#installed-content).
