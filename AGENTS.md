# KuVibe Project Router

KuVibe is developed with the workflow it defines.

1. Read `.agents/project.md`, then the relevant files in `.agents/context/`.
2. Retrieve only the module docs, implemented notes, and source files relevant to the request.
3. Follow `.agents/workflow/requirement.md`; inspect before asking questions.
4. Route work by risk and complexity. Create `.agents/notes/active/<slug>/` artifacts for complex work.
5. Follow `.agents/workflow/development.md` and `.agents/workflow/review.md`.
6. Before completion, run the documentation impact gate in `.agents/workflow/documentation.md`.
7. Record durable decisions in one timestamped file under `.agents/notes/implemented/`; remove completed active artifacts.

Keep adapters thin. `kuVibe.md` is the reusable protocol; these files are this repository's established context.
