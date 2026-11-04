---
title: Sign in
description: Sign in with a Microsoft account or play with an offline profile.
---

# Sign in

Open **Settings** to add an account. You can sign in with Microsoft or use an offline username.

## Microsoft account

Microsoft sign-in opens in your **system browser**. You enter your credentials on Microsoft's own pages, so Licht Launcher never sees or stores your password.

1. Choose to sign in with Microsoft in Settings.
2. Sign in and approve access in the browser window that opens.
3. The browser returns you to the launcher through a temporary local address on your computer (`127.0.0.1`).
4. The launcher then exchanges the authorization with Microsoft, Xbox and Minecraft services to verify your game license and read your profile.

Your session is kept in the operating system's credential store: Windows Credential Manager, or the Secret Service on Linux. Tokens are never written to logs or plain files.

### Removing an account

Remove the account in Settings. This deletes its stored credentials from the credential store and forgets it in the launcher. It does not delete your Microsoft account, and you can manage app permissions from your Microsoft account settings.

## Offline profile

Choose an offline username to play without signing in.

- Offline play does not authenticate you with any online service.
- It does not replace the need for the appropriate game license.
- The same username always produces the same offline player identity.

::: tip
Microsoft sign-in is optional. You can use the launcher with an offline profile and still manage profiles, mods and modpacks.
:::

## Privacy

For what is stored and which services are contacted, see the [Privacy Policy](/privacy).
