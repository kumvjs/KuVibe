# KuVibe

[English](./README.md) | [简体中文](./README.zh.md)

> **Ku is Cool.**
>
> 一个 Markdown 文件，开启你的 Vibe Coding 之旅。一切都为你准备好了。开始吧，我的天才少年！

Ku 表达“酷 / Cool”，Vibe 来自 Vibe Coding。

KuVibe 是一个面向 Vibe Coding、以文件为先的软件工程协议。用户只需描述自己想要的结果，编码智能体便会负责项目上下文、聚焦式澄清、工程分析、验收标准、实施规划、验证、持续维护的文档，以及可长期沉淀的工程记忆。

## 使用 KuVibe

将 [`kuVibe.md`](./kuVibe.md) 复制到项目中，然后告诉你的编码智能体：

```text
阅读 @kuVibe.md 并初始化这个项目。
```

初始化完成后，像平常一样描述需求即可。生成的 `AGENTS.md` 会让后续工作自动遵循既定的项目上下文和工作流。使用 KuVibe 不需要安装任何软件，也不要求了解 CLI。

## 仓库结构

- `kuVibe.md`：可复用的智能体引导规范，也是项目的核心产品
- `.agents/`：KuVibe 自身的项目上下文、工作流和工程记忆
- `templates/`：可复用的输出模板
- `evals/`：智能体行为评估用例
- `packages/cli/`：可选的确定性仓库工具
- `docs/`：VitePress 文档源文件

## 开发

需要 Node.js 24 LTS 和 pnpm。

```bash
pnpm install
pnpm check
pnpm test
pnpm docs:build
```

产品规范详见[中文文档](./docs/zh/index.md)。在不区分文件名大小写的文件系统中，最初的 `KuVibe.md` 需求文档与规定使用的 `kuVibe.md` 产品文件会指向同一个文件；因此，引导过程会将其规范化为可复用协议，并把实现决策记录在 `.agents/notes/implemented/` 中。
