---
title: Modpacks
description: Browse and import modpacks from Modrinth and CurseForge.
---

# Modpacks

The **New Instance** wizard can search modpacks, list their versions and import them as profiles. Two sources are supported: Modrinth and CurseForge.

## Modrinth

Modrinth works without an account or API key.

- Search shows modpacks sorted by downloads and lists each pack's game and loader versions.
- Import reads the pack's `.mrpack` file, so you can also import an `.mrpack` you downloaded yourself.
- The pack decides the Minecraft version and the loader (Fabric, Quilt, Forge or NeoForge). The launcher prepares it as described in [Modloaders](/docs/modding/modloaders).
- The pack's bundled files (`overrides/`, then `client-overrides/`) are copied into the profile.

### Safety checks

- Pack downloads must use HTTPS on `cdn.modrinth.com`, including redirects.
- Every file needs a SHA1 and SHA512 checksum and is verified when downloaded.
- File paths inside a pack are validated, so a pack cannot write outside its own profile or overwrite launcher-owned files.
- Files marked as unsupported on the client are skipped.

::: warning Download hosts
Files in a `.mrpack` hosted anywhere other than `cdn.modrinth.com` (for example GitHub or CurseForge) are not accepted.
:::

## CurseForge

CurseForge needs additional setup, because the project does not ship a CurseForge API key.

1. Request an API key from CurseForge and review the current Overwolf / CurseForge terms.
2. Set `LICHT_CURSEFORGE_API_KEY` in the environment, or in a local `.env` file, before starting the launcher.

The key is only sent to CurseForge as a request header and is never logged. Without a key, CurseForge results are skipped and Modrinth keeps working.

### Mods that block third-party downloads

Some mod authors disable distribution outside CurseForge. If a pack contains such a mod, the import stops before the profile is created and the error names each blocked mod. The launcher does not try to guess another download address.

### Safety checks

- Downloads are limited to CurseForge's own CDN hosts, checked again on every redirect.
- File hashes are verified when the API provides one.

## Related

- [Managing installed content](/docs/modding/managing-content)
- [Common problems](/docs/troubleshooting/common-problems)
- Technical notes: [Modrinth](https://github.com/mateusneiva/licht-launcher/blob/main/docs/integrations/MODRINTH.md) and [CurseForge](https://github.com/mateusneiva/licht-launcher/blob/main/docs/integrations/CURSEFORGE.md).
