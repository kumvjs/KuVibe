<!--
kuvibe:
  template: review-workflow
  revision: 1
  ownership: kuvibe
-->

# Review Workflow

Review for correctness, regression risk, security, compatibility, maintainability, tests, and docs. Prioritize findings by user impact. Confirm:

- behavior matches acceptance criteria;
- filesystem scans are bounded and read-only;
- public JSON and CLI behavior remain intentional;
- tests cover success, absence, and malformed-input paths;
- no user-facing workflow burden was introduced.
