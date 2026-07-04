# sky-spine-mcp

中文 | [English](#english)

`sky-spine-mcp` 是一个面向 Spine 资源流水线的 MCP Server，用来通过 Spine 官方命令行工具自动执行导出、纹理打包、资源检查和文件摘要等任务。

它适合接入 Codex、Claude Desktop 或其他支持 MCP 的客户端，让 AI 可以在本地项目中调用 Spine CLI，完成常见的批处理工作。

本项目目前专注于文件级自动化：

- 导出 `.spine` 项目或 Spine 数据文件
- 打包纹理图集
- 查看 Spine CLI 信息输出
- 汇总导出的 JSON 与 atlas 文件
- 检查运行时资源目录是否完整

它不是 Spine 编辑器脚本 API，不能直接在 Spine UI 内创建骨骼、权重或关键帧。当前更可靠的自动化边界是通过 Spine CLI 处理项目文件、导出文件和图集资源。

## 环境要求

- Node.js 20 或更高版本
- 已授权的 Spine 安装
- 可执行的 Spine CLI，例如 `Spine`、`Spine.com`、`Spine.exe`、`Spine.sh`，或通过 `SPINE_CLI_PATH` 指定路径

在 Windows 上，Spine 官方推荐使用 `Spine.com`，因为它会等待 Spine 退出，并把输出写到控制台。

## 安装

```powershell
npm install
npm run build
```

## 运行

```powershell
$env:SPINE_CLI_PATH="C:\Program Files\Spine\Spine.com"
npm start
```

## MCP 客户端配置

本地 MCP 配置示例：

```json
{
  "mcpServers": {
    "sky-spine-mcp": {
      "command": "node",
      "args": ["D:/AIWorkSpace/GithubTool/sky-spine-mcp/dist/index.js"],
      "env": {
        "SPINE_CLI_PATH": "C:/Program Files/Spine/Spine.com"
      }
    }
  }
}
```

## 工具

### `spine_cli_info`

运行 Spine CLI 信息命令：

```text
Spine -i <path>
```

### `spine_export`

导出 Spine 项目或数据文件：

```text
Spine -i <project.spine> -o <output> -e <export.json>
```

`exportSettings` 也可以使用 `json`、`binary`、`json+pack` 或 `binary+pack`。

### `spine_pack`

打包图片目录为 Spine 纹理图集：

```text
Spine -i <images> -o <output> -p <pack.json-or-atlas-name>
```

### `spine_summarize_json`

读取导出的 Spine JSON，返回 skeleton 元数据、数量统计、skins 和 animations。

### `spine_summarize_atlas`

读取 `.atlas` 文件，返回图集页和 region 数量。

### `spine_validate_assets`

扫描目录中的 `.json`/`.skel`、`.atlas` 和图片资源，检查运行时资源是否齐全。

## 开发

```powershell
npm run dev
npm run build
```

## 说明

Spine CLI 参数行为可能随编辑器版本变化。如果命令因为启动器不识别新参数而失败，请更新 Spine launcher，或使用 Spine 官方文档中对应版本支持的 CLI 参数。

## 许可证

MIT

## English

MCP server for automating common [Spine](https://esotericsoftware.com/spine-command-line-interface) asset pipeline tasks through the official Spine command line interface.

This project focuses on practical file-level automation:

- export Spine projects or data files
- pack texture atlases
- inspect Spine CLI info output
- summarize exported JSON and atlas files
- validate runtime asset folders

It does not provide an editor scripting API for creating bones, weights, or keyframes inside the Spine UI. Spine currently exposes the reliable automation surface for these workflows through its CLI.

## Requirements

- Node.js 20 or newer
- A licensed Spine installation
- Spine CLI available as `Spine`, `Spine.com`, `Spine.exe`, `Spine.sh`, or configured with `SPINE_CLI_PATH`

On Windows, Spine's documentation recommends the command line executable `Spine.com` because it waits for Spine to exit and writes output to the console.

## Install

```powershell
npm install
npm run build
```

## Run

```powershell
$env:SPINE_CLI_PATH="C:\Program Files\Spine\Spine.com"
npm start
```

## MCP Client Configuration

Example local MCP config:

```json
{
  "mcpServers": {
    "sky-spine-mcp": {
      "command": "node",
      "args": ["D:/AIWorkSpace/GithubTool/sky-spine-mcp/dist/index.js"],
      "env": {
        "SPINE_CLI_PATH": "C:/Program Files/Spine/Spine.com"
      }
    }
  }
}
```

## Tools

### `spine_cli_info`

Runs Spine CLI info:

```text
Spine -i <path>
```

### `spine_export`

Exports a Spine project or data file:

```text
Spine -i <project.spine> -o <output> -e <export.json>
```

`exportSettings` can also be `json`, `binary`, `json+pack`, or `binary+pack`.

### `spine_pack`

Packs a folder of images:

```text
Spine -i <images> -o <output> -p <pack.json-or-atlas-name>
```

### `spine_summarize_json`

Reads exported Spine JSON and returns skeleton metadata, counts, skins, and animations.

### `spine_summarize_atlas`

Reads a `.atlas` file and returns atlas page and region counts.

### `spine_validate_assets`

Scans a folder for `.json`/`.skel`, `.atlas`, and page image files.

## Development

```powershell
npm run dev
npm run build
```

## Notes

Spine CLI parameter behavior can vary by editor version. If a command fails because the launcher rejects a newer parameter, update the Spine launcher or use the CLI option documented by Spine for unknown parameters.

## License

MIT
