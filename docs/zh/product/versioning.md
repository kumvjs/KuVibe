# 版本与安全升级

KuVibe 使用三个互相独立的版本值：

| 版本 | 表示什么 | 何时变化 |
| --- | --- | --- |
| KuVibe Release（SemVer） | 整体协议能力 | 修复、兼容能力或不兼容协议变化 |
| Project Schema（整数） | 项目中 KuVibe Harness 的结构契约 | 必需文件、目录、职责或生命周期变化 |
| Template Revision（整数） | 单个受管模板或区块 | 该模板的内容变化 |

Schema 决定是否迁移，不能用 SemVer 的 major/minor/patch 猜测。当前发布是 KuVibe `0.2.0`、Project Schema `2`，最低支持隐式 Schema `1`。

## 用户如何升级旧项目

仍然只需把项目根目录的 `kuVibe.md` 替换为新版，然后让智能体读取它。智能体先比较新文件中的版本声明与 `.agents/kuvibe.yaml`：

```text
没有状态 + 没有旧 Harness       -> Bootstrap
没有状态 + 存在旧 Harness       -> Legacy Adoption（隐式 Schema 1）
旧 Schema < 当前 Schema         -> Migration
Schema 相同 + Release 较旧       -> Refresh
Schema 与 Release 相同           -> Maintenance
项目版本比当前 kuVibe.md 更新     -> 停止降级
```

旧项目没有 `.agents/kuvibe.yaml` 是正常情况，不能因此重新初始化。只要存在 `AGENTS.md`、`.agents/project.md` 或 `.agents/context/stack.md` 等 KuVibe 痕迹，就进入保守接管流程。

## 为什么删减内容不会直接丢失

升级前先判断所有权：

- KuVibe-owned：确认未修改后，可以刷新受管模板或区块。
- Mixed：保留项目自定义，只做合并。
- Project-owned：项目上下文、业务文档与历史 notes 默认不改写、不删除。

删除顺序固定为“先合并，再废弃，最后才删除”。只有迁移规范明确允许、内容已经迁移、文件确属 KuVibe 管理且没有用户修改时才可删除；无法确认时保留文件并标记 deprecated。

## 连续迁移与失败处理

跨多个 Schema 时逐步执行，例如 `1 -> 2 -> 3`，每一步使用明确的 `migrations/NNN-to-NNN.md` 并单独验证。当前 `kuVibe.md` 同时携带它支持的精简迁移索引，因此“只复制一个文件”的使用方式仍然成立。

任何一步失败都会停止后续迁移。智能体会说明已完成和未完成的步骤，并保持最后一个已验证的 Schema；只有文件变更、验证和 migration note 都完成后，才更新 `.agents/kuvibe.yaml`。
