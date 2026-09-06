# 测试

运行：

```bash
pnpm check
pnpm test
pnpm docs:build
```

类型检查覆盖公开契约。Node.js 内置测试运行器会在相互隔离的临时仓库中验证命令。VitePress 构建会发现配置错误和 Markdown 渲染问题。行为评估则为协议提供声明式覆盖。
