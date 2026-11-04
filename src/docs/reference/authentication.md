---
title: Authentication
description: How Microsoft sign-in works in Licht Launcher and where your session is kept.
---

# Authentication

Licht Launcher signs players in with personal Microsoft accounts, then through Xbox Live and Minecraft Services. Offline launch stays available when no Microsoft account is active.

## Design choices

| Topic | Choice |
| --- | --- |
| Sign-in flow | Authorization code with PKCE, in your system browser |
| Account type | Personal Microsoft accounts |
| Redirect | A loopback address on your computer, on a free port the launcher picks |
| Permissions requested | `XboxLive.signin` and `offline_access` |
| Client secret | None. The launcher is a public client |
| Client ID | Built into the launcher |
| Token storage | The operating system credential store. Never logs or files |

The client ID is public by design and is not a secret.

## The flow

1. The launcher listens on `127.0.0.1` on a free port and opens the Microsoft sign-in page in your browser, with a PKCE challenge and a `state` value.
2. You sign in. Microsoft redirects to `http://localhost:<port>/` with an authorization code.
3. The launcher exchanges the code for Microsoft tokens.
4. It authenticates to Xbox Live, then requests an XSTS token for Minecraft Services.
5. It logs in to Minecraft Services and receives a Minecraft access token.
6. It checks your game entitlements and reads your Minecraft profile.
7. The tokens are saved in the credential store, and refreshed later through `offline_access`.

Your Microsoft password never reaches the launcher.

## Session storage

Refresh and access tokens, your Minecraft profile name and UUID, your Xbox identifier and the token expiry are stored in the credential store: Windows Credential Manager, or the Secret Service on Linux. The list of remembered accounts is kept in the launcher's database. Removing an account in Settings deletes its stored credentials.

## Forks and builds

Official builds ship the client ID inside the program, so players need no setup. Developers of a fork or local build can override it with `LICHT_MSA_CLIENT_ID`. A new client ID must be approved by Mojang before Minecraft Services accepts it; until then, sign-in can succeed in the browser and still fail at the last step.

## Technical details

The full notes are in the launcher's [Microsoft authentication documentation](https://github.com/mateusneiva/licht-launcher/blob/main/docs/integrations/MICROSOFT.md).
