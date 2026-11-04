---
title: Java runtime
description: Which Java version each Minecraft version needs and how the launcher gets it.
---

# Java runtime

Licht Launcher downloads and manages its own Java runtime, so you do not need to install Java. The runtime is **Eclipse Temurin**, published by Adoptium. The game files still come from Mojang.

## Which Java version

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

## Where it comes from

The launcher asks the Adoptium API for a runtime that matches the Java version, your operating system and your architecture. It prefers a JRE, and uses a JDK when that Java version has no JRE.

- The download's SHA-256 checksum is verified. A mismatch deletes the archive and fails the install.
- The archive is extracted into the launcher's `runtime` folder and then removed.
- Installing the same Java version again reuses the folder. If several match, the JRE wins over the JDK, and the higher version number wins.

Runtime folders are named like `temurin17-jre17.0.20-win_x64`.

## Using another Java

You can point the launcher at a different Java in its settings. The command-line tool has a `--java` option for the same purpose. The launcher can also detect Java installations in the usual places, such as `C:\Program Files\Eclipse Adoptium` on Windows, for the settings screen.

Modloader installation uses a configured Java of the required major version when there is one. Otherwise it uses the downloaded Temurin runtime. See [Modloaders](/docs/modding/modloaders).

## Technical details

The full notes are in the launcher's [runtime documentation](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/RUNTIME.md).
