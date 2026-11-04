---
title: Network requests
description: Which services Licht Launcher contacts, and what each one receives.
---

# Network requests

Licht Launcher contacts only the providers needed for the feature you use. Those providers can receive your IP address, request headers, the resources you ask for and the feature-specific data below. Redirects, repositories and CDNs behind them may receive download requests too.

| Feature | Who is contacted | What they receive |
| --- | --- | --- |
| Microsoft sign-in | Microsoft, Xbox Live and Minecraft Services | Authorization codes, tokens and sign-in requests. Tokens are refreshed when needed for launch |
| Game versions and installation | Mojang | Requests for the version list, version data, libraries, assets and game files |
| Java installation | Eclipse Adoptium and its download hosts, including GitHub | The Java version, operating system and architecture, plus requests for the runtime files |
| Modloader installation | Fabric, Quilt, Forge, NeoForge and the repositories their metadata points to | Version, installer and library requests for the chosen loader |
| Modpack search and import | Modrinth or CurseForge and their CDNs | Search terms, filters, identifiers and download requests. A configured CurseForge key is sent to CurseForge's API |
| Identifying installed content | Modrinth and, with an API key, CurseForge | File hashes or fingerprints, and search terms from file names. These can reveal which mods or packs you have installed |
| Content images | Image hosts named in provider data | Requests when the interface loads project or modpack icons |
| Launcher updates | GitHub Releases and its download hosts | Update-manifest and installer requests |

Hashing and inspecting a file happen locally. A metadata lookup does not upload the file itself.

## Things to know

- **Automatic update checks** are on by default and can be turned off in **Settings > Updater**. See [Updates and uninstall](/docs/getting-started/updates-and-uninstall).
- **Content lookups** can run automatically when you select a profile, including a prefetch at startup, and when content is shown or refreshed. Results are cached. There is currently no setting to turn these lookups off.
- **Offline profile** and **disabled update checks** do not stop every request.
- Launching Minecraft or a mod can cause extra network activity outside the launcher's control.
- There is no product analytics and no automatic upload of logs or crash reports.

## Provider policies

Licht Launcher does not control how these providers store data or what analytics they run. Read the policy of each:

- [Microsoft Privacy Statement](https://privacy.microsoft.com/en-us/privacystatement)
- [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [Modrinth Privacy Policy](https://modrinth.com/legal/privacy)
- [Overwolf Platform Privacy Policy](https://legal.overwolf.com/docs/overwolf/platform/platform-privacy-policy) for CurseForge
- [Eclipse Foundation Privacy Policy](https://www.eclipse.org/legal/privacy.php) for Adoptium and Temurin
- Modloader services: [Fabric](https://fabricmc.net/), [Quilt](https://quiltmc.org/en/), [Forge](https://files.minecraftforge.net/static/privacy.html) and [NeoForge](https://neoforged.net/)

The official statement is the [Privacy Policy](/privacy).
