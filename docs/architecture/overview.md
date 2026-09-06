# Architecture Overview

KuVibe is intentionally split between a portable Markdown protocol and optional deterministic utilities. Agent judgment owns requirement interpretation and engineering choices. Tools own repeatable facts such as manifest detection, harness validation, and docs indexing.

This boundary prevents a tool outage from blocking engineering work and prevents mechanical detectors from disguising recommendations as facts.
