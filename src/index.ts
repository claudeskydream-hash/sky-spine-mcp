#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000;

type CommandResult = {
  command: string;
  exitCode: number | null;
  stdout: string;
  stderr: string;
};

function text(value: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: typeof value === "string" ? value : JSON.stringify(value, null, 2)
      }
    ]
  };
}

function resolveSpineExecutable(spinePath?: string) {
  return spinePath ?? process.env.SPINE_CLI_PATH ?? process.env.SPINE_PATH ?? "Spine";
}

function runCommand(command: string, args: string[], timeoutMs = DEFAULT_TIMEOUT_MS): Promise<CommandResult> {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      windowsHide: true,
      shell: false
    });

    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`Command timed out after ${timeoutMs}ms: ${command} ${args.join(" ")}`));
    }, timeoutMs);

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.on("error", (error: Error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (exitCode: number | null) => {
      clearTimeout(timer);
      resolvePromise({
        command: [command, ...args].join(" "),
        exitCode,
        stdout,
        stderr
      });
    });
  });
}

function assertExists(path: string, label: string) {
  if (!existsSync(path)) {
    throw new Error(`${label} does not exist: ${path}`);
  }
}

function readJsonFile(path: string) {
  return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
}

function summarizeSpineJson(path: string) {
  const data = readJsonFile(path);
  const animations = data.animations && typeof data.animations === "object" ? Object.keys(data.animations) : [];
  const skins = Array.isArray(data.skins)
    ? data.skins.map((skin) => (skin && typeof skin === "object" && "name" in skin ? String(skin.name) : "unknown"))
    : [];
  const bones = Array.isArray(data.bones) ? data.bones : [];
  const slots = Array.isArray(data.slots) ? data.slots : [];
  const skeleton = data.skeleton && typeof data.skeleton === "object" ? data.skeleton : {};

  return {
    file: path,
    skeleton,
    counts: {
      bones: bones.length,
      slots: slots.length,
      skins: skins.length,
      animations: animations.length
    },
    skins,
    animations
  };
}

function summarizeAtlas(path: string) {
  const content = readFileSync(path, "utf8");
  const lines = content.split(/\r?\n/);
  const pages = lines.filter((line: string) => /\.(png|jpg|jpeg|webp)$/i.test(line.trim()));
  const regions = lines.filter((line: string, index: number) => {
    const trimmed = line.trim();
    return Boolean(trimmed) && !trimmed.includes(":") && index > 0 && !/\.(png|jpg|jpeg|webp)$/i.test(trimmed);
  });

  return {
    file: path,
    pages,
    counts: {
      pages: pages.length,
      regions: regions.length
    }
  };
}

function walkFiles(root: string, extensions: string[]) {
  const results: string[] = [];
  const pending = [root];
  const wanted = new Set(extensions.map((extension) => extension.toLowerCase()));

  while (pending.length > 0) {
    const current = pending.pop()!;
    const stat = lstatSync(current);
    if (stat.isDirectory()) {
      for (const entry of readdirSync(current)) {
        pending.push(join(current, entry));
      }
    } else if (wanted.has(extname(current).toLowerCase())) {
      results.push(current);
    }
  }

  return results.sort();
}

const server = new McpServer({
  name: "sky-spine-mcp",
  version: "0.1.0"
});

server.registerTool(
  "spine_cli_info",
  {
    title: "Spine CLI info",
    description: "Run Spine CLI info for a project, folder, JSON, or binary skeleton file.",
    inputSchema: {
      inputPath: z.string().describe("Path to a .spine project, exported data file, or folder."),
      spinePath: z.string().optional().describe("Optional path to Spine.com, Spine.exe, Spine.sh, or Spine executable."),
      timeoutMs: z.number().int().positive().optional()
    }
  },
  async ({ inputPath, spinePath, timeoutMs }) => {
    const resolvedInput = resolve(inputPath);
    assertExists(resolvedInput, "inputPath");
    const result = await runCommand(resolveSpineExecutable(spinePath), ["-i", resolvedInput], timeoutMs);
    return text(result);
  }
);

server.registerTool(
  "spine_export",
  {
    title: "Spine export",
    description: "Export a Spine project or data file with an export settings JSON file or default json/binary mode.",
    inputSchema: {
      inputPath: z.string().optional().describe("Optional project, JSON, binary file, or folder. Overrides export settings."),
      outputPath: z.string().optional().describe("Optional output file or folder. Overrides export settings."),
      exportSettings: z.string().describe("Path to export settings JSON, or one of: json, binary, json+pack, binary+pack."),
      clean: z.boolean().optional().describe("Run animation cleanup before export."),
      updateVersion: z.string().optional().describe("Optional Spine editor version, for example 4.2.xx or latest."),
      spinePath: z.string().optional(),
      timeoutMs: z.number().int().positive().optional()
    }
  },
  async ({ inputPath, outputPath, exportSettings, clean, updateVersion, spinePath, timeoutMs }) => {
    const args: string[] = [];
    if (updateVersion) args.push("-u", updateVersion);
    if (inputPath) {
      const resolvedInput = resolve(inputPath);
      assertExists(resolvedInput, "inputPath");
      args.push("-i", resolvedInput);
    }
    if (clean) args.push("-m");
    if (outputPath) args.push("-o", resolve(outputPath));
    args.push("-e", exportSettings);
    const result = await runCommand(resolveSpineExecutable(spinePath), args, timeoutMs);
    return text(result);
  }
);

server.registerTool(
  "spine_pack",
  {
    title: "Spine texture pack",
    description: "Pack image folders into a Spine texture atlas using default settings or a pack settings JSON file.",
    inputSchema: {
      inputPath: z.string().describe("Folder of images to pack."),
      outputPath: z.string().describe("Folder where atlas and page images are written."),
      pack: z.string().describe("Texture atlas name, or path to a pack settings JSON file."),
      name: z.string().optional().describe("Atlas name when pack is a settings JSON file."),
      projectPaths: z.array(z.string()).optional().describe("Optional .spine project paths used for mesh-aware whitespace stripping."),
      updateVersion: z.string().optional(),
      spinePath: z.string().optional(),
      timeoutMs: z.number().int().positive().optional()
    }
  },
  async ({ inputPath, outputPath, pack, name, projectPaths, updateVersion, spinePath, timeoutMs }) => {
    const resolvedInput = resolve(inputPath);
    assertExists(resolvedInput, "inputPath");

    const args: string[] = [];
    if (updateVersion) args.push("-u", updateVersion);
    args.push("-i", resolvedInput, "-o", resolve(outputPath));
    for (const projectPath of projectPaths ?? []) {
      const resolvedProject = resolve(projectPath);
      assertExists(resolvedProject, "projectPath");
      args.push("-j", resolvedProject);
    }
    if (name) args.push("-n", name);
    args.push("-p", pack);

    const result = await runCommand(resolveSpineExecutable(spinePath), args, timeoutMs);
    return text(result);
  }
);

server.registerTool(
  "spine_summarize_json",
  {
    title: "Summarize Spine JSON",
    description: "Read exported Spine JSON and return skeleton metadata, counts, skins, and animations.",
    inputSchema: {
      jsonPath: z.string().describe("Path to exported Spine JSON.")
    }
  },
  async ({ jsonPath }) => {
    const resolvedPath = resolve(jsonPath);
    assertExists(resolvedPath, "jsonPath");
    return text(summarizeSpineJson(resolvedPath));
  }
);

server.registerTool(
  "spine_summarize_atlas",
  {
    title: "Summarize Spine atlas",
    description: "Read a Spine .atlas file and return page and region counts.",
    inputSchema: {
      atlasPath: z.string().describe("Path to a .atlas file.")
    }
  },
  async ({ atlasPath }) => {
    const resolvedPath = resolve(atlasPath);
    assertExists(resolvedPath, "atlasPath");
    return text(summarizeAtlas(resolvedPath));
  }
);

server.registerTool(
  "spine_validate_assets",
  {
    title: "Validate Spine assets",
    description: "Check whether a folder contains expected Spine runtime assets.",
    inputSchema: {
      folderPath: z.string().describe("Folder to scan."),
      requireAtlas: z.boolean().optional().default(true),
      requireImages: z.boolean().optional().default(true)
    }
  },
  async ({ folderPath, requireAtlas, requireImages }) => {
    const resolvedFolder = resolve(folderPath);
    assertExists(resolvedFolder, "folderPath");
    const dataFiles = walkFiles(resolvedFolder, [".json", ".skel"]);
    const atlasFiles = walkFiles(resolvedFolder, [".atlas", ".txt"]).filter((file) => file.endsWith(".atlas") || file.endsWith(".atlas.txt"));
    const imageFiles = walkFiles(resolvedFolder, [".png", ".jpg", ".jpeg", ".webp"]);
    const problems: string[] = [];

    if (dataFiles.length === 0) problems.push("No .json or .skel skeleton data files found.");
    if (requireAtlas && atlasFiles.length === 0) problems.push("No .atlas or .atlas.txt files found.");
    if (requireImages && imageFiles.length === 0) problems.push("No page image files found.");

    return text({
      folder: resolvedFolder,
      ok: problems.length === 0,
      files: {
        data: dataFiles.map((file) => basename(file)),
        atlas: atlasFiles.map((file) => basename(file)),
        images: imageFiles.map((file) => basename(file))
      },
      counts: {
        data: dataFiles.length,
        atlas: atlasFiles.length,
        images: imageFiles.length
      },
      problems
    });
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
