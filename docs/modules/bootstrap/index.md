# Bootstrap

Before bootstrap, the agent compares version state in `kuVibe.md` and `.agents/kuvibe.yaml` and checks legacy markers such as `AGENTS.md`, `.agents/project.md`, and `.agents/context/stack.md`. Bootstrap runs only when both state and legacy markers are absent. Missing state with existing markers selects Legacy Adoption and must not regenerate project knowledge.

Greenfield projects normalize requirements and resolve technology once. Existing projects use lightweight repository evidence—manifests, lockfiles, configs, root structure, and only then selected source—to establish facts without recommending replacement technology.

Optional detection tooling may improve confidence. Its absence never blocks bootstrap.
