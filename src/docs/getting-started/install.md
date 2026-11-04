---
title: Install
description: Download and install Licht Launcher on Windows or Linux.
---

# Install

Download the package for your system from the [latest release page](https://github.com/mateusneiva/licht-launcher/releases/latest). The same page has the release notes.

| Your system | Package |
| --- | --- |
| Windows (64-bit) | `.exe` installer |
| Linux (64-bit) | `.AppImage` |
| Debian, Ubuntu and compatible distributions | `.deb` package |

Portable downloads are also available for Windows and Linux.

## Windows

Run the `.exe` installer and follow the prompts.

::: info Publisher signing
Windows publisher signing is not available yet, so Windows may not show a verified publisher for the installer. Updates inside the launcher are verified with the launcher's own signing key. See the [code signing policy](https://github.com/mateusneiva/licht-launcher/blob/main/docs/contributing/CODE_SIGNING.md) for details.
:::

## Linux

- **AppImage:** make the file executable and run it.
- **`.deb`:** install it with your system's package manager.
- **Portable:** extract the archive and run the executable.

Licht Launcher keeps your Microsoft session in the system credential store, which is the Secret Service on Linux. If you sign in with Microsoft, a desktop keyring needs to be available.

## After installing

Open the launcher, then [sign in](/docs/getting-started/sign-in) and [create a profile](/docs/getting-started/first-profile).
