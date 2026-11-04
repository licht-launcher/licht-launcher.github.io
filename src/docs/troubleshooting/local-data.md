---
title: Local data and removal
description: What Licht Launcher stores on your computer and how to remove it.
---

# Local data and removal

Licht Launcher keeps its data on your computer. Nothing here is a cloud backup, and the maintainer cannot erase it remotely.

## What is stored

| Data | Where |
| --- | --- |
| Microsoft session | The operating system credential store (Windows Credential Manager or the Linux Secret Service) |
| Remembered accounts | A local SQLite database |
| Settings | Local settings files, not encrypted by the launcher |
| Profiles and downloads | Game files, Java runtimes, installed content and caches in the launcher and profile folders |
| Interface preferences | The WebView's local storage |

The launcher profile folder normally lives in your system's data directory under `Licht Launcher`. Setting the `LICHT_DATA_DIR` environment variable to an absolute path before starting the launcher makes it use that folder instead, starting with default settings. This is useful for an isolated test run.

## Remove your data

1. Remove saved accounts in **Settings**.
2. Back up worlds and any files you want to keep.
3. Close the launcher.
4. Use the application-directory location shown in **Settings > Downloads** to find the launcher data, and check any separate profile folders or custom locations you chose. See [Data and storage](/docs/reference/data-and-storage).
5. Delete only the data you intend to remove.

Uninstalling the launcher on its own can leave these files, WebView storage and credential store entries behind. Remaining credentials can be removed through the operating system's credential manager, under the service name `app.licht.launcher`.

For the full policy, including requests about data held by third parties, see [Privacy Policy: retention and deletion](/privacy#retention-and-deletion).
