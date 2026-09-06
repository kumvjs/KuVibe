# Optional Tooling

`@kuvibe/cli` exposes three agent-facing commands:

```bash
npx -y @kuvibe/cli detect [root]
npx -y @kuvibe/cli validate [root]
npx -y @kuvibe/cli docs-nav [docs-root]
```

`detect` reports stack facts and evidence. `validate` checks the KuVibe project harness and implemented-note names. `docs-nav` returns a deterministic Markdown navigation tree. Commands emit JSON and do not modify the inspected repository.

If the package cannot run, agents fall back to bounded manual inspection.
