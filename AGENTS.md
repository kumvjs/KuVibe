# KuVibe Project Router

KuVibe is developed with the workflow it defines.

<!-- kuvibe:managed:start template=agents-router revision=1 -->

1. Read `.agents/project.md`, then the relevant files in `.agents/context/`.
2. Read `.agents/kuvibe.yaml` and compare it with `kuVibe.md` before normal work; safely adopt, refresh, or migrate when needed.
3. Retrieve only the module docs, implemented notes, and source files relevant to the request.
4. Follow `.agents/workflow/requirement.md`; inspect before asking questions.
5. Route work by risk and complexity. Create `.agents/notes/active/<slug>/` artifacts for complex work.
6. Follow `.agents/workflow/development.md` and `.agents/workflow/review.md`.
7. Before completion, run the documentation impact gate in `.agents/workflow/documentation.md`.
8. Record durable decisions in one timestamped file under `.agents/notes/implemented/`; remove completed active artifacts.

<!-- kuvibe:managed:end -->

Keep adapters thin. `kuVibe.md` is the reusable protocol; these files are this repository's established context.
