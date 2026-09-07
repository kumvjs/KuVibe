# 参与贡献

首先阅读 `AGENTS.md` 和已经建立的项目上下文。使用 pnpm、严格 TypeScript、有边界的文件系统访问、机器可读输出和最少依赖。当智能体行为发生变化时，同步更新协议文档和行为评估。

公开工具的行为必须保持确定性和只读。为新的检测规则添加以证据为依据的测试。

## 发布检查

每次发布分别判断协议 SemVer、Project Schema 和受影响的 Template Revision：结构契约不变时不要升级 Schema；结构变化时 Schema 只加 1，并新增连续的 `migrations/NNN-to-NNN.md`。同时更新 `CHANGELOG.md`、`kuVibe.md` metadata、模板、精简迁移索引、旧 Schema 升级 eval 和项目内容保留用例。发布前验证当前 Schema Refresh、跨 Schema Migration、定制内容不被覆盖，以及失败时状态不提前更新。
