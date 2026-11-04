---
title: Code signing policy
description: The current signing status of Licht Launcher releases and who is responsible for them.
---

# Code signing policy

## Current signing status

::: warning SignPath status
The SignPath application has **not** been submitted, and SignPath signing is **not** integrated. No SignPath approval or certificate sponsorship is claimed for current releases.
:::

Releases currently publish Tauri **updater signatures**. They let the updater verify update packages. They are separate from Windows Authenticode signatures, which would identify a publisher, so Windows may not show a verified publisher for the installer.

## Responsibilities

Licht Launcher is a single-maintainer project:

| Role | Responsible person |
| --- | --- |
| Author and committer | [Mateus Neiva (@mateusneiva)](https://github.com/mateusneiva) |
| Reviewer of external contributions | [Mateus Neiva (@mateusneiva)](https://github.com/mateusneiva) |
| Release and code-signing approver | [Mateus Neiva (@mateusneiva)](https://github.com/mateusneiva) |

One person holds all three roles. The project has no independent reviewer at the moment.

## Policy for a future SignPath integration

- Repository and signing account access must use multi-factor authentication.
- External contributions must be reviewed before merging, including changes to CI and build scripts, dependencies and artifacts.
- Each signing request must be approved manually by the approver after checking the source commit, CI results, artifact provenance and product and version metadata. The current release workflow does not implement that approval step yet.
- Signing is limited to Licht Launcher's own artifacts built from this repository. Minecraft files, Java runtimes, modloaders and mods must not be submitted as the project's own binaries.
- Artifact restrictions must enforce the Licht Launcher product name and matching versions. Release and download pages for signed builds must link this policy and state their actual signing status.

If SignPath accepts the project and signing is integrated, artifacts signed through that program will carry this attribution:

> Free code signing provided by [SignPath.io](https://about.signpath.io), certificate by [SignPath Foundation](https://signpath.org).

## Related

- [Releasing](/docs/contributing/releasing#updates): the current updater-signature workflow.
- [How to contribute](/docs/contributing/): how contributions are reviewed.
- [Privacy Policy](/privacy): data handling and automatic network requests.
- The canonical document: [CODE_SIGNING.md](https://github.com/mateusneiva/licht-launcher/blob/main/docs/contributing/CODE_SIGNING.md).
