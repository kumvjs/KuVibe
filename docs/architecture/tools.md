# Tools Architecture

The tools package is an ESM TypeScript command-line program with no runtime dependencies. A thin CLI validates arguments and delegates to command modules.

Detection scans recognized root metadata and workspace manifests. Detector functions emit normalized evidence with confidence and supporting paths. Validation reports structured issues. Documentation navigation reads Markdown titles and builds a stable tree. All operations are read-only and bounded.
