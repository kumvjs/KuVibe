# Architecture Overview

KuVibe is intentionally split between a portable Markdown protocol and optional deterministic utilities. Agent judgment owns requirement interpretation and engineering choices. Tools own repeatable facts such as manifest detection, harness validation, and docs indexing.

This boundary prevents a tool outage from blocking engineering work and prevents mechanical detectors from disguising recommendations as facts.

In a project, `.agents/kuvibe.yaml` records the installed protocol and schema while `kuVibe.md` declares the current versions and supported migrations. Migration behavior belongs to the file protocol; optional utilities only read and validate state and never rewrite the user's project.
