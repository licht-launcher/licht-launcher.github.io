---
title: How to contribute
description: How to propose a change, open a pull request and get it reviewed.
---

# How to contribute

Thank you for your interest in Licht Launcher. The project has one maintainer, Mateus Neiva ([@mateusneiva](https://github.com/mateusneiva)), who handles development, review of contributions and release decisions.

The launcher is open source under the [MIT License](https://github.com/mateusneiva/licht-launcher/blob/main/LICENSE). The canonical guide is [CONTRIBUTING.md](https://github.com/mateusneiva/licht-launcher/blob/main/CONTRIBUTING.md) in the launcher repository; this section explains it in more detail.

## In this section

- [Development setup](/docs/contributing/development): tools, commands, the `licht` CLI, conventions, tests and the checks to run.
- [Architecture](/docs/contributing/architecture): layers, communication and where things live.
- [Releasing](/docs/contributing/releasing): codenames, updates and the signing key.
- [Code signing policy](/docs/contributing/code-signing): current status and responsibilities.
- [Roadmap](/docs/contributing/roadmap): what is done and what is next.

## Proposing a change

1. Read the [roadmap](/docs/contributing/roadmap) and the [architecture](/docs/contributing/architecture) first.
2. Open an [issue](https://github.com/mateusneiva/licht-launcher/issues) describing the bug or the idea. For a bug, include the steps to reproduce, your operating system, the launcher version and the relevant game and loader version. Redact personal information from logs and screenshots.
3. For non-trivial changes, agree on a short plan and scope with the maintainer before you implement it. Work on one item at a time.

Discuss these before writing code:

- new dependencies;
- architecture changes;
- authentication and security decisions;
- APIs shared between Rust and the frontend;
- roadmap items marked for approval.

::: warning Security reports
For a suspected vulnerability or any private report, email [mateus.fneiva@gmail.com](mailto:mateus.fneiva@gmail.com). Do not publish exploitable details, credentials or personal data in an issue.
:::

## Pull requests

- Use a focused branch named `feat/...`, `fix/...` or `chore/...`, and small [Conventional Commits](https://www.conventionalcommits.org/).
- Open the pull request against `main`.
- Describe what changed and why, how to test it (with the commands you ran and their results), and the decisions that need maintainer review.
- Include a **Rust concepts used** section that explains any new Rust concept in plain language, or states that no Rust code changed.

External contributions need maintainer review before merging. Changes to CI, build scripts, dependencies, downloads, authentication and signing get particular attention.

## Licensing

Respect copyright and licenses. Original contributions are submitted under the project's MIT License, and existing third-party notices and licenses must be preserved. A merged pull request does not grant repository write access or signing access.

## Conduct and contact

Be respectful, constructive and specific. For project questions, contact the maintainer through GitHub or [mateus.fneiva@gmail.com](mailto:mateus.fneiva@gmail.com). The user-facing policies are the [Privacy Policy](/privacy) and the [Terms of Use](/terms).
