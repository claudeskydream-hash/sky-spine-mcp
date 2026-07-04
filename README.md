# sky-spine-mcp

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
