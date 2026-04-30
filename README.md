# BeeFintech Service Hub 项目说明

## 项目定位

BeeFintech Service Hub 是一个面向保险科技客户的 Web 服务平台。项目目标是把 BeeFintech 官网从静态品牌展示页升级为可交付、可演示、可持续维护的轻量服务中心。

当前产品定位：

> BeeFintech 保险科技服务中心：集品牌展示、预约演示、FAQ 自助服务、ROI 计算器、产品更新日志和行业术语词典于一体的轻量化 Web 服务平台。

这个 README 已经吸收了比赛通知和前期讨论结论，同事继续使用 AI 协作时，直接把本文件作为项目入口即可。

## 比赛目标

本项目服务于 Vibe Coding 实战成长赛，核心目标包括：

- 提升团队 AI 研发与协同能力，让技术学习落到真实交付中。
- 推动 BeeFintech 官网从静态宣传册升级为动态服务平台。
- 通过需求拆解、Prompt、踩坑记录和复盘，沉淀可复用的 AI 实战经验。
- 形成可展示、可测试、可部署的保险科技 Web 服务作品。

## 核心交付要求

必须完成：

- 品牌宣传：首页需要清楚展示 BeeFintech 的服务能力、业务场景和客户价值。
- 预约演示 API：需要有预约演示表单，并提供后端 API 接口承接提交。
- 至少 1 项增值服务功能：可从内容服务、客户赋能、工具服务中选择。
- GitHub 托管：代码和文档统一提交到 GitHub。
- 多人提交记录：每位成员都需要有独立 Commit 记录，非技术同学也可以提交文档、页面文案、测试记录或内容数据。
- 标准文档：需要提交需求文档、执行规划文档、AI 协作记录、测试说明、复盘总结。

建议完成：

- 不只实现 1 个增值功能，而是组合出一个完整的轻量服务中心。
- 优先选择容易演示、业务价值清晰、开发成本可控的功能。
- 每完成一个阶段，都记录 AI 协作过程和验证结果，方便比赛评分时体现过程能力。

## 关键时间节点

- 4 月 30 日前：完成组队报名、Codex 或 Claude 环境安装、GitHub 和 Obsidian 安装。
- 5 月 10 日前：提交第一批文档，包括 SPEC 需求文档和执行规划文档。
- 5 月 15 日前：完成网站开发、测试说明、AI 协作记录、复盘文档，并提交至少两个 GitHub 分支代码。

## 评分关注点

比赛不是只看最终页面，也看过程质量。开发时要保留过程证据。

- 过程能力：需求拆解、AI 协作方式、Git 规范、问题解决过程。
- 作品质量：功能完整性、API 对接、增值服务实用性、代码质量。
- 分享共创：过程分享、Prompt、踩坑记录、互助解答。

## 已确定技术栈

为了在较短周期内完成可演示、可维护的作品，本项目采用以下技术方案：

- 前端框架：Next.js + React + TypeScript
- 样式方案：Tailwind CSS
- UI 组件：shadcn/ui + lucide-react
- 内容管理：本地 Markdown / MDX 文件
- API 层：Next.js Route Handlers
- 数据存储：优先使用本地 JSON / 静态数据，必要时再接数据库
- 表单 API：预约演示使用 `/api/demo-request`
- 部署方案：优先 Vercel，也可根据需要做静态导出
- 文档目录：统一放在 `docs/`

选择原因：

- Next.js 可以同时完成页面、API、内容展示和表单提交，减少前后端分离成本。
- TypeScript 有利于团队协作和后续维护。
- Tailwind CSS 与 shadcn/ui 适合快速搭建一致、专业的业务界面。
- Markdown / MDX 适合维护资讯、更新日志、复盘和说明类内容。

## 本地开发环境

当前项目已经初始化为 Next.js 工程。

推荐环境：

- Node.js：建议使用 20 或更高版本；当前本地验证版本为 Node.js 24.14.0。
- npm：当前本地验证版本为 npm 11.9.0。
- 操作系统：macOS / Windows / Linux 均可。

主要依赖：

- `next`：Next.js 应用框架
- `react` / `react-dom`：React UI 运行时
- `typescript`：类型检查
- `tailwindcss`：样式系统
- `lucide-react`：图标库
- `eslint` / `eslint-config-next`：代码检查

## AI 协作技能安装

本项目是多人协作项目，建议每位开发者在开始写代码前，先在自己的 Codex 环境中安装以下两个 skill：

- `superpowers`：提供更完整的 AI 协作工作流能力，适合需求拆解、任务规划、验证、复盘和复杂协作场景。
- `frontend-design`：用于前端页面、组件和交互的设计与实现，帮助首页、服务页和工具页保持更高的一致性和完成度。

### 安装 `superpowers`

推荐方式：打开 Codex，直接发送下面这句话，让 Codex 自动获取并执行官方安装说明：

```text
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md
```

如果需要手动安装，macOS / Linux 可参考：

```bash
git clone https://github.com/obra/superpowers.git ~/.codex/superpowers
mkdir -p ~/.agents/skills
ln -s ~/.codex/superpowers/skills ~/.agents/skills/superpowers
```

Windows PowerShell 可参考：

```powershell
git clone https://github.com/obra/superpowers.git "$env:USERPROFILE\.codex\superpowers"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\superpowers" "$env:USERPROFILE\.codex\superpowers\skills"
```

### 安装 `frontend-design`

打开 Codex，使用内置的 `$skill-installer` 安装：

```text
$skill-installer install https://github.com/214140846/skills/tree/main/skills/.experimental/frontend-design
```

如果使用命令行安装，也可以参考：

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo 214140846/skills \
  --path skills/.experimental/frontend-design
```

安装完成后，需要重启 Codex，确保新 skill 被加载。

### 验证安装

重启 Codex 后，可以让 Codex 执行：

```text
请列出当前可用的 skills，并确认 superpowers 和 frontend-design 是否已经加载。
```

如果团队成员本机已经存在对应目录，可以跳过重复安装：

```bash
ls ~/.agents/skills/superpowers
ls ~/.codex/skills/frontend-design
```

## 如何启动项目

首次拉取项目后，先安装依赖：

```bash
npm install
```

启动本地开发服务器：

```bash
npm run dev
```

默认访问地址：

```text
http://localhost:3000
```

如 3000 端口被占用，Next.js 会提示使用其他端口，按终端输出的地址访问即可。

## 常用命令

```bash
# 启动开发环境
npm run dev

# 运行代码检查
npm run lint

# 生产构建验证
npm run build

# 启动生产构建后的服务
npm run start
```

当前已验证：

- `npm run lint` 通过
- `npm run build` 通过
- 首页本地访问 `http://localhost:3000` 返回正常

说明：

- 当前 `npm install` 后可能提示 2 个 moderate 级别 audit 项。暂未执行 `npm audit fix --force`，因为强制修复可能引入破坏性依赖升级。后续如要处理，需要单独评估。
- 预约演示 API 当前为 mock 接口，路径为 `/api/demo-request`，用于支撑前端表单流程。

## 产品信息架构

建议第一版网站包含以下入口：

- 首页：品牌展示、核心能力、服务场景、客户价值、预约演示入口。
- 预约演示：客户提交联系方式和业务需求。
- FAQ 自助查询：按业务分类查询常见问题。
- ROI 计算器：估算保险科技方案带来的效率和成本收益。
- 产品更新日志：展示平台持续迭代记录。
- 行业术语词典：解释保险科技和系统集成中的常见概念。

## 功能优先级

### P0：必须完成

1. 品牌宣传首页
   - 公司介绍
   - 核心能力
   - 服务场景
   - 客户价值
   - 预约演示入口

2. 预约演示表单 + API
   - 表单字段：姓名、公司、职位、联系方式、需求类型、补充说明
   - API 路径：`/api/demo-request`
   - 第一阶段可以使用 mock 返回或本地 JSON 记录
   - 验收标准：表单校验可用，提交后能收到明确成功或失败反馈

### P1：优先实现的增值服务

1. FAQ 自助查询
   - 分类：产品接入、保司合作、数据安全、实施交付、售后支持
   - 支持关键词搜索、分类筛选、折叠展开
   - 价值：最符合客户赋能类要求，易于现场演示

2. 保险科技 ROI 计算器
   - 输入：月保单量、人力成本、当前处理时长、预计自动化比例
   - 输出：预计节省成本、效率提升、回本周期
   - 价值：体现工具服务能力，演示说服力强

3. 产品更新日志
   - 展示版本号、发布日期、更新类型、更新内容
   - 价值：体现平台持续服务能力，开发成本低

4. 行业术语词典
   - 示例术语：核保、理赔直付、渠道管理、保单中台、OCR、RPA、API 网关
   - 支持搜索和分类
   - 价值：对非技术客户友好，也符合工具服务类方向

### P2：有时间再做

1. 保险科技资讯 / 政策解读专栏
   - 用 Markdown / MDX 管理内容
   - 分类：行业趋势、监管政策、产品实践、数字化案例

2. 在线工单提交
   - 客户提交问题类型、优先级、问题描述和联系方式
   - 第一阶段使用 mock API，不做复杂状态流转

3. 需求匹配 / 方案推荐器
   - 用户选择身份和业务痛点
   - 系统推荐对应服务模块

### P3：最后考虑

1. 后台管理页
   - 管理 FAQ、更新日志、资讯文章
   - 开发成本较高，不建议第一阶段投入

2. AI 问答助手
   - 可基于 FAQ 数据做检索式问答
   - 展示效果好，但容易扩大范围，建议后置

## 第一版建议交付组合

第一版建议完成：

- 品牌宣传首页
- 预约演示表单 + API
- FAQ 自助查询
- ROI 计算器
- 产品更新日志
- 行业术语词典

这套组合覆盖：

- 基础强制项：品牌宣传、预约演示 API
- 客户赋能类：FAQ 自助查询
- 工具服务类：ROI 计算器、行业术语词典
- 服务持续性：产品更新日志

## 当前目录结构

当前项目已经落地的关键目录如下：

```text
.
├── README.md
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── docs/
│   ├── SPEC.md
│   └── HOMEPAGE_DESIGN.md
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── demo-request/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
└── public/
```

后续建议继续补充：

```text
docs/
├── PLAN.md
├── AI_COLLABORATION.md
├── TESTING.md
└── RETROSPECTIVE.md

src/
├── app/
│   ├── faq/
│   ├── roi-calculator/
│   ├── changelog/
│   └── glossary/
├── components/
├── content/
├── data/
└── lib/

tests/
```

## 推荐 AI 协作流程

同事使用 AI 继续推进时，建议先让 AI 阅读本 README，然后按阶段提问。

### 阶段 1：理解项目

推荐提示词：

```text
请先阅读 README.md，理解比赛目标、交付要求、技术栈和功能优先级。先不要写代码，先总结你理解到的项目目标、交付清单、风险点和建议推进顺序。
```

目标产出：

- 项目目标总结
- 交付清单
- 技术风险
- 时间风险
- 下一步建议

### 阶段 2：生成需求文档

推荐提示词：

```text
基于 README.md，帮我生成 SPEC 需求文档。要求包含项目背景、用户角色、核心场景、功能清单、页面结构、接口需求、非功能需求和验收标准。
```

目标产出：

- `docs/SPEC.md`

### 阶段 3：生成执行规划

推荐提示词：

```text
基于 README.md 和 SPEC 文档，帮我生成执行规划文档。要求按 P0、P1、P2 拆分任务，列出每个任务的负责人角色、输入、输出、验收方式和预计顺序。
```

目标产出：

- `docs/PLAN.md`

### 阶段 4：初始化项目

推荐提示词：

```text
请使用 Next.js + TypeScript + Tailwind CSS 初始化项目，并按 README.md 中的功能优先级设计目录结构。先搭建页面框架和数据结构，不要一次性做复杂后台。
```

目标产出：

- Next.js 项目结构
- 基础路由
- `src/data/` 静态数据
- `src/components/` 公共组件
- `src/app/api/demo-request/route.ts`

### 阶段 5：逐项实现功能

推荐顺序：

1. 首页品牌展示
2. 预约演示表单和 API
3. FAQ 自助查询
4. ROI 计算器
5. 更新日志
6. 行业术语词典

推荐提示词：

```text
请先实现 P0 功能：品牌宣传首页和预约演示表单 API。完成后运行构建或测试，说明改动文件和验证结果。
```

后续每完成一个功能，都让 AI 输出：

- 改动文件
- 实现内容
- 验证方式
- 发现的问题
- 下一步建议

### 阶段 6：补齐比赛文档

推荐提示词：

```text
请根据当前代码和开发过程，生成测试说明、AI 协作记录和复盘总结。要求内容真实，能反映需求拆解、Prompt、踩坑记录、验证结果和改进建议。
```

目标产出：

- `docs/TESTING.md`
- `docs/AI_COLLABORATION.md`
- `docs/RETROSPECTIVE.md`

## 文档清单

后续建议维护以下文件：

- `README.md`：项目说明和协作入口
- `docs/SPEC.md`：需求文档
- `docs/GIT_GUIDE.md`：非技术同事 Git 协作说明
- `docs/PLAN.md`：执行规划文档
- `docs/AI_COLLABORATION.md`：AI 协作记录
- `docs/TESTING.md`：测试说明
- `docs/RETROSPECTIVE.md`：复盘总结

## Git 协作建议

比赛要求每位成员都需要有独立 Commit 记录。建议：

- 主分支：`main`
- 开发分支：`dev`
- 成员分支：`feature/member-name-task`
- 每位成员至少提交一次与自己任务相关的 Commit
- 非技术成员可以提交需求文档、测试记录、复盘内容、页面文案或数据内容

示例分支：

- `feature/homepage`
- `feature/demo-api`
- `feature/faq`
- `feature/roi-calculator`
- `feature/docs`

## 当前状态

- 已将比赛要求和前期讨论整理进 README
- 已确定技术栈：Next.js + TypeScript + Tailwind CSS + shadcn/ui
- 已确定第一版功能组合：品牌宣传、预约演示 API、FAQ、ROI 计算器、更新日志、行业术语词典
- 下一步建议：生成 `docs/SPEC.md` 和 `docs/PLAN.md`，然后初始化 Next.js 项目
