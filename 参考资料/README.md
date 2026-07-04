# Spine 参考资料

本目录沉淀 `sky-spine-mcp` 相关的 Spine 官方文档、教程、论坛讨论和中文社区资料。优先级建议是：官方文档 > 官方博客/论坛 > 官方视频 > 社区教程。

资料核验日期：2026-07-04。

## 官方中文入口

| 资料 | 链接 | 适用场景 | 可靠性 |
| --- | --- | --- | --- |
| Spine 中文文档总入口 | https://zh.esotericsoftware.com/spine-documentation | 查找编辑器、运行时、视频、FAQ、论坛等官方资源 | 官方文档，高 |
| Spine 学院 | https://zh.esotericsoftware.com/spine-academy | 新手学习路径、教程、提示、示例项目 | 官方入口，高 |
| Spine 中文用户指南 | https://zh.esotericsoftware.com/spine-user-guide | 系统学习 Spine 编辑器功能 | 官方文档，高；中文以英文版为准 |
| 快速入门 | https://zh.esotericsoftware.com/spine-getting-started | 安装、试用、激活、基础概念入门 | 官方文档，高 |
| 基本概念 | https://zh.esotericsoftware.com/spine-basic-concepts | 理解 skeleton、bone、slot、attachment 等概念 | 官方文档，高 |
| 官方视频页 | https://zh.esotericsoftware.com/spine-videos | 官方视频、B站/YouTube 视频入口 | 官方入口，高 |

## CLI、导出与纹理打包

这些资料和 `sky-spine-mcp` 最相关，适合后续实现新 tool 时优先参考。

| 资料 | 链接 | 适用场景 | 可靠性 |
| --- | --- | --- | --- |
| 命令行界面 CLI | https://zh.esotericsoftware.com/spine-command-line-interface | Spine CLI 参数、导出、导入、纹理打包、无头运行说明 | 官方文档，高 |
| Export | https://esotericsoftware.com/spine-export | JSON/binary/图片/视频导出，脚本化导出建议 | 官方文档，高 |
| 中文导出 | https://zh.esotericsoftware.com/spine-export | 中文读者查看导出说明 | 官方文档，高；中文以英文版为准 |
| Texture packing | https://esotericsoftware.com/spine-texture-packer | 纹理打包、pack.json、导出时打包和独立打包 | 官方文档，高 |
| 中文纹理打包 | https://zh.esotericsoftware.com/spine-texture-packer | 中文读者查看图集打包说明 | 官方文档，高 |
| New export shell scripts | https://esotericsoftware.com/blog/New-export-shell-scripts | 批量导出 `.spine` 项目、构建脚本示例 | 官方博客，高 |
| Importing skeleton data | https://esotericsoftware.com/blog/Importing-skeleton-data | 从导出数据/atlas 重新导入、解包图集 | 官方博客，高 |

## 数据格式

| 资料 | 链接 | 适用场景 | 可靠性 |
| --- | --- | --- | --- |
| JSON export format | https://esotericsoftware.com/spine-json-format | 解析导出的 JSON，做摘要、索引、调试 | 官方格式文档，高 |
| Binary export format | https://esotericsoftware.com/spine-binary-format | 理解 `.skel`/binary 的体积和加载性能优势 | 官方格式文档，高 |
| Atlas export format | https://esotericsoftware.com/spine-atlas-format | 理解 `.atlas` 文件、page、region | 官方格式文档，高 |

## 运行时与引擎集成

| 资料 | 链接 | 适用场景 | 可靠性 |
| --- | --- | --- | --- |
| Spine Runtimes | https://esotericsoftware.com/spine-runtimes | 官方运行时总览、导出格式说明 | 官方文档，高 |
| Spine Runtimes Guide | https://esotericsoftware.com/spine-runtimes-guide | 运行时架构、加载 skeleton data、动画 API | 官方文档，高 |
| spine-unity | https://zh.esotericsoftware.com/spine-unity | Unity 中播放、控制 Spine 动画 | 官方文档，高 |
| spine-unity 安装 | https://zh.esotericsoftware.com/spine-unity-installation | 安装、升级、UPM、重导出/重导入 | 官方文档，高 |
| spine-unity Assets | https://zh.esotericsoftware.com/spine-unity-assets | Unity 资产导入、`.skel.bytes`、`.atlas.txt`、材质和图集 | 官方文档，高 |
| spine-cpp | https://esotericsoftware.com/spine-cpp | C++ 运行时加载 skeleton/atlas，TextureLoader 职责 | 官方文档，高 |
| spine-phaser | https://esotericsoftware.com/spine-phaser | Phaser 项目加载 binary skeleton 与 atlas | 官方文档，高 |
| Spine Web Player | https://esotericsoftware.com/spine-player | Web 端预览/嵌入 Spine 动画 | 官方文档，高 |
| Galacean Spine 资产导入 | https://galacean.antgroup.com/engine/docs/graphics/2D/spine/editor/ | Galacean 引擎导入 `.skel`、`.atlas`、纹理图 | 引擎官方文档，中高 |

## 官方论坛实践讨论

论坛内容适合作为具体问题的补充参考，不应替代官方文档。

| 主题 | 链接 | 适用场景 | 可靠性 |
| --- | --- | --- | --- |
| 多 skin 是否分离 atlas | https://esotericsoftware.com/forum/d/9835-separated-atlas-for-each-skin | 多皮肤、多 atlas、单 atlas 取舍 | 官方论坛，Nate 回复，中高 |
| 导出多个纹理文件 | https://esotericsoftware.com/forum/d/16927-export-multiple-texture-files | `-j/--project`、`-p/--pack`、多纹理集 | 官方论坛，中高 |
| 匹配已有 atlas | https://esotericsoftware.com/forum/d/15917-how-to-match-an-existing-atlas | 替换贴图、特效贴图、保持 atlas 对齐 | 官方论坛，中高 |
| Unity 4.2 到 4.3 升级工作流 | https://esotericsoftware.com/forum/d/30229-improve-unity-upgrade-workflow-from-spine-42-to-43 | major/minor 升级后重导出和脚本化流程 | 官方论坛，中高 |
| 不重导出升级 spine 文件 | https://esotericsoftware.com/forum/d/24157-upgrading-spine-files-without-re-exporting | 为什么应保留 `.spine` 源项目并重导出 | 官方论坛，中高 |
| 中文论坛：CLI 查看工程信息 | https://zh.esotericsoftware.com/forum/d/18558-%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7%E6%9F%A5%E7%9C%8Bspine%E5%B7%A5%E7%A8%8B%E4%BF%A1%E6%81%AF | CLI `-i` 信息输出排查 | 官方中文论坛，中 |
| 中文论坛：CLI 版本升级 | https://zh.esotericsoftware.com/forum/d/27274-how-to-use-the-spine-cli-to-perform-a-version-upgrade | 使用 CLI 升级项目版本 | 官方中文论坛，中 |

## 官方/中文视频教程

| 资料 | 链接 | 适用场景 | 可靠性 |
| --- | --- | --- | --- |
| Esoteric Software YouTube | https://www.youtube.com/user/EsotericSoftware | 官方视频合集 | 官方频道，高 |
| Spine Videos | https://en.esotericsoftware.com/spine-videos | 官方视频分类：用户指南、动画教程、Tips、Twitch | 官方页面，高 |
| 官方入门教程中文字幕 | https://www.bilibili.com/video/BV14f4y1D7YZ/ | 官方入门教程中文学习 | B站搬运/授权翻译，中高 |
| Spine 零基础中文教程 | https://www.bilibili.com/video/BV1nAkGYUE59/ | 中文零基础入门 | 社区教程，中 |
| Spine 动画教程：新手小技巧合集 | https://www.bilibili.com/video/BV11Z4y1b7rU/ | 导入 Unity、导出、网格、皮肤、IK、遮罩等技巧 | 社区教程，中 |
| 导出设置和注意事项 | https://www.bilibili.com/video/BV1TT411M7cF/ | 导出设置快速参考 | 社区教程，中；注意版本差异 |
| spine 导入 Unity | https://www.bilibili.com/video/BV1hB4y1W7JC/ | Unity 导入实操入门 | 社区教程，中；注意版本差异 |
| 官方 spine-unity 初学者导出指南 | https://www.bilibili.com/video/BV1TbVv67Epg/ | Spine 4.3 导出到 Unity 6，新手常见错误 | 官方视频，高 |
| 官方 spine-unity 常见导入问题 | https://www.bilibili.com/video/BV1BD4y1Y7By/ | Unity 导入失败、Atlas/材质/版本问题 | 官方视频，高 |

## 中文博客与社区文章

| 资料 | 链接 | 适用场景 | 可靠性 |
| --- | --- | --- | --- |
| CSDN：Unity 如何使用 Spine 动画 | https://blog.csdn.net/qq_30144243/article/details/136151319 | Unity 导入流程参考 | 个人博客，中；需对照官方版本 |
| CSDN：将 Spine 动画导入 Unity | https://blog.csdn.net/CN_MJH/article/details/108974079 | 旧版 Unity/Spine 导入流程 | 个人博客，中低；较旧 |
| 博客园：Spine 纹理打包器 | https://www.cnblogs.com/eastnwood/p/4303851.html | 纹理打包概念、文件夹结构、pack.json | 个人博客，中；较旧 |
| 站酷：1 小时学会 Spine | https://m.zcool.com.cn/article/ZMTQ0MjY5Mg%3D%3D.html | 入门体验、骨骼绑定理解 | 社区文章，中 |
| CGJOY：Spine 2D 骨骼动画教程整理 | https://www.cgjoy.com/thread-101439-1-1.html | 中文教程归档入口 | 社区资料，中；部分内容可能需登录 |

## X / Twitter、贴吧检索结论

- X/Twitter 没有搜到稳定、系统、可长期引用的 Spine 教程入口。官方中文站提到可通过 `#madewithspine` 查看作品展示，但这更适合找案例灵感，不适合作为教程主来源。
- 百度贴吧公开检索结果不稳定，直接访问吧页或帖子时可能返回 403，无法可靠验证帖子标题和内容。因此当前不沉淀具体贴吧教程链接。

## 后续可扩展方向

- 单独整理 `CLI 示例命令.md`，覆盖 export、pack、unpack、import、version update。
- 单独整理 `Unity 导入排错.md`，覆盖版本匹配、`.atlas.txt`、`.skel.bytes`、材质丢失。
- 单独整理 `MCP tool 设计参考.md`，把官方 CLI 参数映射到 MCP tools。
