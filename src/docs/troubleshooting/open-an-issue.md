---
title: Open an issue
description: "How to report a Licht Launcher bug: where to find the logs, how to share them without leaking personal data, and how to send a private report."
---

# Open an issue

## Report a problem

[Open an issue](https://github.com/mateusneiva/licht-launcher/issues) on GitHub. Issues are public, so keep personal data out of them. Include:

- your launcher version and operating system;
- the Minecraft version, and the loader and its version if you use one;
- what you expected and what happened;
- the steps to reproduce it;
- the relevant part of the log, redacted.

## Where logs are

- **Game output:** the game's console output is shown inside the launcher.
- **Game and mod files:** Minecraft and mods can also write their own log and crash files in the profile's folder.
- **Launcher diagnostics:** these are written to standard error. Start the launcher from a terminal to see them.

Licht Launcher does not upload logs or crash reports automatically.

## Before you share anything

::: warning Remove private information
Logs can contain your player name, local file paths, server addresses and text printed by third-party code. Review and redact logs and screenshots before sharing them. Never send passwords or tokens.
:::

## Private reports

For security reports, privacy questions or other private enquiries, email [mateus.fneiva@gmail.com](mailto:mateus.fneiva@gmail.com) instead of posting details publicly. Do not put exploitable details, credentials or personal data in a public issue.
