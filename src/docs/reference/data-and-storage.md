---
title: Data and storage
description: What Licht Launcher keeps on your computer, where it lives and how to move it.
---

# Data and storage

Licht Launcher keeps its data on your computer. This page explains how that data is organized.

## What is stored

| Data | Where |
| --- | --- |
| Microsoft session | The operating system credential store (Windows Credential Manager or the Linux Secret Service) |
| Remembered accounts | A local SQLite database, `licht.db` |
| Settings | `settings.json` in the profile folder, not encrypted by the launcher |
| Profiles | The database holds each profile's settings, last-played information, download jobs and recovery state. Game files live in the instances folder |
| Game files and Java | The data folder |
| Caches | Content metadata and icons |

Tokens stay in the credential store and never go in the database, settings files or logs.

## The profile folder

The launcher's own files live in the profile folder, normally under your system's data directory in a folder named `Licht Launcher`. It contains `settings.json`, `licht.db` (and its SQLite journal files), and a small checkpoint file used when content is moved.

Set the `LICHT_DATA_DIR` environment variable to an absolute path, without `..`, to use a different profile folder. It starts with default settings and does not import anything from your normal profile, which is useful for an isolated test.

## Application directory

By default, the content folders sit inside the profile folder:

```text
<profile>/
  settings.json
  licht.db
  data/       game files and managed Java runtimes
  instances/  profile files, mods, saves and other content
  cache/      content caches
```

Choose a different location in **Settings > Downloads > Application directory**. Content then lives under `<chosen>/Licht Launcher/`, with `data`, `instances` and the content caches. Settings, the database and some operational files stay in the profile folder. Changing where the launcher itself is installed changes neither location.

### Moving content

- The new location is saved immediately, but the running launcher keeps using the old folders.
- The move happens on the **next start**, before anything else runs. The launcher copies the content, verifies the copy with SHA1, updates the stored paths and then removes the verified source files.
- Clearing the setting moves content back to the default location.
- If a different file already exists at the destination, the move stops with an error instead of overwriting it. Fix the conflict and start again.
- If the launcher is interrupted, a checkpoint lets the move continue the next time.

## Technical details

The full notes are in the launcher's [storage documentation](https://github.com/mateusneiva/licht-launcher/blob/main/docs/internals/STORAGE.md).
