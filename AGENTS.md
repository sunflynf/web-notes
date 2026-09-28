# Repository Guidelines

**All repository guidelines live in [`CLAUDE.md`](./CLAUDE.md). Read it before making changes.** It covers commands, project structure, components, CI, content gotchas, testing, and commit/PR conventions.

Do not add guidelines here; update `CLAUDE.md` instead so there is a single source of truth.

Quick reference:

- Package manager: Yarn (`yarn.lock` must stay committed).
- Validate every change with `yarn typecheck` and `yarn build`.
- Do not edit generated output in `build/` or `.docusaurus/`.
