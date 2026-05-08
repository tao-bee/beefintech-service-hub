# AI 协作规范

本文件给 Codex、ChatGPT、Claude 等 AI coding agent 使用。进入本仓库后，先阅读本文件，再结合 `README.md` 和 `docs/` 下的项目文档开展工作。

通用文件名建议使用 `AGENTS.md`，放在仓库根目录。不要新建 `Agent.md`、`agent.md` 或其他同义文件，避免后续 AI 和团队成员找错入口。

## 项目定位

BeeFintech Service Hub 是面向保险科技客户的轻量 Web 服务平台，目标是把 BeeFintech 官网从静态品牌展示页升级为可演示、可部署、可持续维护的服务中心。

当前产品定位：

> BeeFintech 保险科技服务中心：集品牌展示、预约演示、FAQ 自助服务、ROI 计算器、产品更新日志和行业术语词典于一体的轻量化 Web 服务平台。

本项目服务于 Vibe Coding 实战成长赛。除了最终页面质量，也要保留需求拆解、AI 协作、Git 提交、测试验证和复盘材料。

## 先读文件

开始任何较大任务前，按顺序阅读：

1. `README.md`：项目目标、交付要求、功能优先级、启动方式。
2. `docs/SPEC.md`：需求范围、用户角色、页面结构、验收标准。
3. `docs/HOMEPAGE_DESIGN.md`：首页信息架构和视觉方向。
4. `docs/GIT_GUIDE.md`：团队分支和提交约定。
5. `docs/SKILLS_GUIDE.md`：AI skill 使用建议。

如果任务只涉及某个文件的小改动，可以只读相关文件，但不要脱离项目定位随意改风格或扩大范围。

## 技术栈

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- lucide-react
- Next.js Route Handlers
- 第一阶段优先使用本地静态数据、JSON 或 TS 常量，不引入数据库
- 文档统一使用 Markdown，放在 `docs/`

不要轻易新增重量级依赖。确需新增依赖时，先说明用途、替代方案和影响，再安装。

## 常用命令

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

完成代码改动后，至少运行：

```bash
npm run lint
```

如果改动页面、路由、构建配置、依赖或 API，继续运行：

```bash
npm run build
```

纯文档改动不强制构建，但要检查 Markdown 标题、链接、命令和路径是否准确。

## 当前目录约定

```text
src/app/page.tsx
```

当前首页主实现，包含品牌展示、核心能力、客户场景、服务工具、客户价值和预约演示表单。该文件目前是 client component，修改时注意表单提交、移动端导航和锚点跳转不要回退。

```text
src/app/api/demo-request/route.ts
```

预约演示 mock API。当前只做 JSON 解析、必填校验、联系方式格式校验和 mock 成功响应。第一阶段不要默认接入真实邮件、短信、CRM 或数据库，除非任务明确要求。

```text
src/app/layout.tsx
src/app/globals.css
```

全局 metadata、HTML 语言、基础样式和品牌色变量。不要把页面级复杂样式堆进 `globals.css`，优先用 Tailwind class 贴近组件。

```text
docs/
```

比赛文档和团队协作材料目录。需求、计划、测试、AI 协作记录、复盘总结都应放在这里。

后续新增功能时，优先使用以下结构：

```text
src/app/faq/
src/app/roi-calculator/
src/app/changelog/
src/app/glossary/
src/components/
src/data/
src/lib/
src/content/
tests/
```

## 功能优先级

P0 必须保持可用：

- 品牌宣传首页
- 预约演示表单
- `POST /api/demo-request`
- 基础响应式浏览
- 明确的成功、失败、加载和空状态反馈

P1 优先补齐：

- FAQ 自助查询
- ROI 计算器
- 产品更新日志
- 行业术语词典

P2 有时间再做：

- 资讯 / 政策解读
- 在线工单
- 需求匹配 / 方案推荐器

P3 暂不主动扩展：

- 后台管理系统
- 用户登录和权限
- 数据库持久化
- 真实 AI 问答模型
- 复杂 CRM / 邮件 / 短信集成

如果用户没有明确要求，不要把第一版做成大型后台系统。

## 前端体验规范

整体风格应保持专业、克制、可信，偏企业服务和业务工具感。不要做成夸张营销页、纯视觉炫技页或大面积空泛口号页。

实现页面时遵守：

- 中文界面优先，文案面向保险公司、经纪渠道、TPA、健康管理机构和内部销售 / 实施同事。
- 使用 Tailwind CSS 和现有设计风格，保持 `rounded-lg`、边框、间距、字体层级一致。
- 使用 `lucide-react` 图标，不手写重复 SVG 图标。
- 页面必须兼顾桌面端和移动端，避免文字溢出、按钮拥挤、卡片错位。
- 卡片和工具入口以信息可扫读为主，不堆装饰。
- 没有真实数据时，用“预计”“可帮助”“示例”等措辞，不写未经验证的绝对指标。
- 表单必须有必填校验、错误反馈、提交中状态和成功反馈。
- 新增导航入口时，同时考虑移动端导航。

## 数据和内容规范

第一阶段内容优先放在 TS 常量、JSON 或 Markdown / MDX 中。数据结构要清晰，方便后续替换为 API 或数据库。

FAQ、术语、更新日志、ROI 参数等内容应避免散落在 JSX 深处。功能变复杂后，应迁移到：

```text
src/data/
src/content/
```

不要提交真实客户个人信息、真实联系方式、合同、报价或敏感业务数据。演示数据必须明显是样例数据。

## API 规范

当前 API 使用 Next.js Route Handlers。

新增 API 时：

- 放在 `src/app/api/<name>/route.ts`
- 明确请求方法
- 校验输入
- 返回统一 JSON
- 错误响应使用合适 HTTP 状态码
- 不在日志或响应中暴露敏感信息

预约演示接口当前约定：

```text
POST /api/demo-request
```

请求字段：

- `name`
- `company`
- `title`
- `contact`
- `requestType`
- `message`

返回字段至少包含：

- `ok`
- `message`

## Git 协作规范

开始修改前先检查：

```bash
git status --short
```

多人协作默认流程：

1. 基于最新 `dev` 创建 `feature/xxx` 分支。
2. 一个功能、页面或文档任务对应一个分支。
3. 提交前查看 `git status` 和 `git diff --stat`。
4. 只提交本次任务相关文件。
5. 不要覆盖、回退或删除他人未提交改动。

提交信息建议：

```text
feat: add faq page
fix: validate demo request contact
docs: update testing notes
chore: organize project docs
```

不要执行 `git reset --hard`、`git checkout -- <file>` 等会丢弃改动的命令，除非用户明确要求并确认影响。

## AI 工作方式

接手任务时，先明确：

- 用户要解决什么问题
- 涉及哪些文件和页面
- 是否需要修改代码、文档或两者
- 验收方式是什么
- 是否会影响 P0 功能

修改代码前，先简短说明将改哪些文件和原因。完成后说明：

- 改了哪些文件
- 实现了什么
- 运行了哪些验证命令
- 是否还有遗留风险

如果是前端页面、组件、交互或视觉优化任务，优先使用 `frontend-design` skill。  
如果是需求拆解、计划、复盘、AI 协作记录、测试说明或复杂协作任务，优先使用 `superpowers` skill。

## 新功能文档驱动流程

做新功能时，必须先使用 `superpowers` skill 生成或补充对应方案文档，再根据方案文档实施代码和页面。

新功能方案文档至少写清楚：

- 功能目标和用户场景
- 页面结构或接口结构
- 数据结构和状态设计
- 交互流程和异常状态
- 实施步骤和文件范围
- 验收标准和验证命令

建议按功能建立或补充文档，例如：

```text
docs/FAQ.md
docs/ROI_CALCULATOR.md
docs/CHANGELOG_FEATURE.md
docs/GLOSSARY.md
```

如果功能较小，也可以补充到 `docs/PLAN.md` 或 `docs/SPEC.md` 的对应章节，但必须能让后续 AI 和团队成员找到设计依据。

修改已有功能时，必须同步更新对应文档。代码、页面行为、字段、路由、接口、数据结构、验收标准发生变化时，文档也要一起改，避免实现和说明不一致。

## 文档和比赛材料

比赛需要过程证据。实现功能时，优先同步或补充以下材料：

```text
docs/PLAN.md
docs/AI_COLLABORATION.md
docs/TESTING.md
docs/RETROSPECTIVE.md
```

如这些文件不存在，可以在用户要求或任务需要时创建。文档应写清楚目标、过程、Prompt、AI 输出、人工调整、验证结果和踩坑记录。

## 禁止事项

- 不要无需求地重构全站或替换技术栈。
- 不要引入数据库、登录系统、后台管理、真实 AI 服务等大范围能力，除非用户明确要求。
- 不要提交真实客户数据或敏感业务信息。
- 不要为了消除 npm audit 提示直接运行强制升级命令。
- 不要把首页改成泛泛的 SaaS 营销模板。
- 不要破坏 `/api/demo-request` 和首页预约演示闭环。

## 交付前检查

代码任务完成前检查：

- `npm run lint` 是否通过
- 涉及构建风险时 `npm run build` 是否通过
- 首页和新增页面在移动端是否可用
- 表单和 API 是否仍有成功 / 失败反馈
- 文案是否符合保险科技服务中心定位
- 是否更新了必要文档

文档任务完成前检查：

- Markdown 层级是否清楚
- 路径、命令、路由是否准确
- 是否方便非技术同事照着使用
- 是否保留比赛所需过程证据
