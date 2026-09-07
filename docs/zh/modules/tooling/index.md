# 可选工具

`@kuvibe/cli` 提供三个面向智能体的命令：

```bash
npx -y @kuvibe/cli detect [root]
npx -y @kuvibe/cli validate [root]
npx -y @kuvibe/cli docs-nav [docs-root]
```

`detect` 报告技术栈事实及其证据；`validate` 检查 KuVibe 项目框架、协议与项目版本是否一致、时间戳、模板 revision 和已实施笔记的命名；`docs-nav` 生成确定性的 Markdown 导航树。所有命令都输出 JSON，且不会修改被检查的仓库。

如果该软件包无法运行，智能体会回退到有明确范围的手动检查。
