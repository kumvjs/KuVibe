# Quick Start

KuVibe requires no installation and no new CLI or workflow commands to learn. All you need is a project directory and a coding agent that can read its files.

## 1. Copy `kuVibe.md`

Download [kuVibe.md](https://raw.githubusercontent.com/kumvjs/KuVibe/main/kuVibe.md) and place it in the root of a new or existing project.

```text
your-project/
└── kuVibe.md
```

## 2. Ask your agent to initialize the project

Open your coding agent in the project and send:

```text
Read @kuVibe.md and initialize this project.
```

The agent first inspects the repository as it exists. For a new project, it establishes the required project context and workflow. For an existing project, it detects and preserves the established stack and conventions. It asks you to choose only when important information that changes the result is missing.

## 3. Describe what you want

After initialization, describe the result normally:

```text
Add dark mode to the settings page and remember the user's choice.
```

The generated `AGENTS.md` routes future work through the project's context, acceptance criteria, verification, and engineering memory. You only need to keep describing requirements.

::: tip How do I know initialization is complete?
The project root should contain `AGENTS.md`, `.agents/project.md`, and `.agents/context/stack.md`. These files preserve the durable context needed for future work.
:::
