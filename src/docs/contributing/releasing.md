---
title: Releasing
description: Release codenames, how updates are published and the updater signing key.
---

# Releasing

Releases are produced by CI from a tag and published on [GitHub Releases](https://github.com/mateusneiva/licht-launcher/releases). Commits follow [Conventional Commits](https://www.conventionalcommits.org/).

## Codenames

Each `0.x` release is named after a flower, in German, in this order:

| Version | Codename | Meaning |
| --- | --- | --- |
| 0.1 | Lilie | lily |
| 0.2 | Iris | iris |
| 0.3 | Rose | rose |
| 0.4 | Immergrün | periwinkle |
| 0.5 | Anemone | anemone |
| 0.6 | Narzisse | daffodil |
| 0.7 | Edelweiß | edelweiss |

From 0.8 on, the list continues and is decided with the project owner.

The codename appears in the GitHub Release title, in the installer file name (for example `Licht-Launcher-0.1.0-Lilie`) and on the About screen next to the version.

## Rules

- Keep the notice "not affiliated with Mojang Studios or Microsoft" in the README and in the release notes.
- Put release notes in each GitHub Release.

## Updates

Licht uses the Tauri v2 updater with GitHub Releases. The workflow publishes signed Windows NSIS and Linux AppImage update artifacts, plus the manifest the updater reads:

```text
https://github.com/licht-launcher/licht-launcher/releases/latest/download/latest.json
```

Updater signatures verify update packages. They are separate from Windows publisher signing, whose status is described in the [code signing policy](/docs/contributing/code-signing).

### Signing key

The public key is committed in `src-tauri/tauri.conf.json`. Two repository secrets are needed before publishing:

- `TAURI_SIGNING_PRIVATE_KEY`: the key generated with `pnpm tauri signer generate`.
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`: empty for the current key, or the password chosen for a protected key.

::: danger Protect the private key
Never commit or log the private key. Installed applications accept updates signed for the public key they shipped with. Rotating the key requires an update signed with the old key that carries the new public key. If the private key is lost, those installs cannot receive further signed updates, and users must reinstall manually.
:::

### How updating works for users

- **Automatic updates** check after the main window opens, and every 30 minutes while no verified package is waiting. Available updates download in the background, and installing always requires **Restart to update**.
- Turning automatic updates off cancels automatic checks and downloads. Manual checks and downloads stay available.
- Downloaded packages are verified with their SHA1 and Minisign signature, using the configured public key.
- **Later** dismisses the ready notification without deleting the package or changing preferences. Closing and reopening the app never installs an update by itself.
- A failed update leaves the installed launcher working and offers a retry.

For the user-facing steps, see [Updates and uninstall](/docs/getting-started/updates-and-uninstall).
