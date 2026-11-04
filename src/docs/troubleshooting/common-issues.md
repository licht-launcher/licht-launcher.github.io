---
title: Common issues
description: "Fix common Licht Launcher problems: Microsoft sign-in on Linux, Forge and NeoForge launch errors, modpack import failures and game start issues."
---

# Common issues

If your problem is not here, see [Open an issue](/docs/troubleshooting/open-an-issue).

## Installing

### Windows does not show a verified publisher

**Cause:** Windows publisher signing is not available yet, so the installer shows an unknown publisher. This is expected.

::: tip What to do
1. Download the installer only from the [official releases page](https://github.com/mateusneiva/licht-launcher/releases/latest).
2. If Windows warns about the file, select **More info**, then **Run anyway**.
3. Later updates inside the launcher are verified with the launcher's signing key, so you do not need to repeat this check for them.
:::

See the [code signing policy](/docs/contributing/code-signing) for details.

## Signing in

### Microsoft sign-in cannot save the session on Linux

**Cause:** the launcher stores the session in the system credential store (the Secret Service), and none is running in your desktop session.

::: tip What to do
1. Install and start a keyring service that provides the Secret Service, such as GNOME Keyring or KWallet.
2. Log out and back in so the service is available in your desktop session.
3. Open the launcher and sign in again.
:::

### I want to remove a signed-in account

::: tip What to do
open **Settings** and remove the account there. This deletes the stored credentials from the credential store and forgets the account in the launcher. It does not delete your Microsoft account.
:::

## Profiles and mods

### A Forge or NeoForge profile will not launch

**Cause:** the loader is only ready while the files recorded during installation still match what is on disk. A missing or modified file makes it fail.

::: tip What to do
1. Run **Install/Repair** on the profile.
2. Select **Play** again.
3. If it still fails, [open an issue](/docs/troubleshooting/open-an-issue) with the game version and the loader version.
:::

### A CurseForge modpack import stops with a list of mods

**Cause:** the authors of those mods disabled downloads outside CurseForge, so the launcher cannot fetch them and refuses to import the pack. The error names each blocked mod.

::: tip What to do
1. Look for another version of the pack that does not include the blocked mods.
2. Look for the same pack on Modrinth and import its `.mrpack` file instead.
3. Ask the pack author whether the mods can be replaced or distributed in another way.
:::

There is no setting in the launcher to bypass this restriction.

### A Modrinth pack (.mrpack) fails to import

**Cause:** the launcher only accepts `.mrpack` files whose mods are hosted on Modrinth's own servers (`cdn.modrinth.com`). It refuses a pack that downloads files from anywhere else, such as GitHub, GitLab or the CurseForge CDN, as a safety measure. It also refuses files that have no checksum or that fail it, which can happen when a download is corrupted or the file was altered.

::: tip What to do
1. Download the pack again from its Modrinth page, using the latest version, in case the file is damaged or outdated.
2. Make sure you picked the `.mrpack` file and not a different pack format. CurseForge packs use `.zip`.
3. If the pack still fails, ask its author to publish a version where every mod comes from Modrinth. There is no setting in the launcher to allow other hosts.
4. If you believe the pack is valid, [open an issue](/docs/troubleshooting/open-an-issue) with the pack name and version.
:::

### I cannot install a single mod from the launcher

**Cause:** installing individual mods from inside the launcher is not available yet.

::: tip What to do
import a modpack that already contains the mods you want, as described in [Create your first profile](/docs/getting-started/first-profile#create-a-profile-from-a-pack-file). You can list, enable, disable and remove the content of a profile, as described in [Installed content](/docs/getting-started/first-profile#installed-content).
:::

## In-game

### Accents look garbled in the game log

**Cause:** Java 17 and older write the whole log in one encoding, so accented characters can appear broken. Newer Java uses UTF-8.

::: tip What to do
nothing is wrong with the game or your files. The text is only displayed incorrectly in the log. Game versions that use a newer Java do not have this.
:::

### The game does not start on Linux

**Cause:** launching with the graphical interface on Linux has not been re-checked in the latest compatibility pass, so some setups may fail.

::: tip What to do
1. Run **Install/Repair** on the profile and try again.
2. If it still fails, [open an issue](/docs/troubleshooting/open-an-issue) with your distribution, desktop session, game version and the launcher log.
:::
