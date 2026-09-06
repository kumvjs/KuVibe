# Bootstrap

Bootstrap detection looks for `AGENTS.md`, `.agents/project.md`, and `.agents/context/stack.md`. Missing context triggers bootstrap; established context triggers maintenance.

Greenfield projects normalize requirements and resolve technology once. Existing projects use lightweight repository evidence—manifests, lockfiles, configs, root structure, and only then selected source—to establish facts without recommending replacement technology.

Optional detection tooling may improve confidence. Its absence never blocks bootstrap.
