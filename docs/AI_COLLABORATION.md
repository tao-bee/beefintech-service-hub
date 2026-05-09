# AI 协作记录

## 1. 文档目的

本文用于补充 `feature/faq-page` 分支的 AI 协作过程记录，服务于 Vibe Coding 实战成长赛的过程证据整理和后续团队复盘。

说明：FAQ 页面前序实现阶段没有完整按照 `superpowers` 工作流先生成计划文档，因此本文属于事后补录。补录依据来自当前分支相对 `dev` 的实际改动、已有 `docs/FAQ.md`、`docs/SPEC.md`、`docs/PLAN.md` 以及本次补录时执行的验证命令。

## 2. 本次协作目标

本分支目标是把 BeeFintech Service Hub 从只有首页和预约演示闭环，扩展为具备 FAQ 自助查询能力的轻量服务中心。

核心目标包括：

- 新增独立 FAQ 页面 `/faq`
- 将 FAQ 内容从 JSX 中拆出，沉淀到 `src/data/faq.ts`
- 支持关键词搜索、分类筛选、热门问题、展开收起和空状态
- 在首页增加或修正 FAQ 入口，使用户能从服务工具进入 FAQ 页面
- 同步更新 `docs/FAQ.md`、`docs/SPEC.md` 和 `docs/PLAN.md`
- 补齐本次缺失的 AI 协作、测试和复盘材料

## 3. 使用的工作方式

### 3.1 前序实现阶段

前序实现阶段主要采用“用户提出功能方向，AI 直接实现并同步部分文档”的方式推进。该方式能快速形成可演示页面，但过程记录不够完整。

可以归纳出的 Prompt 类型包括：

```text
请新增 FAQ 自助查询页面，面向保险科技客户，支持搜索、分类筛选和问题展开。
```

```text
请把 FAQ 数据整理成可维护的静态数据结构，不要先接数据库。
```

```text
请更新项目文档，让 SPEC、PLAN 和 FAQ 方案与实际页面保持一致。
```

```text
请优化 FAQ 页面体验，增加热门问题、新手引导、相关推荐和反馈提示。
```

这些 Prompt 的共同特点是目标明确、业务场景清楚，但没有在实现前强制生成 `docs/superpowers/plans/` 下的实施计划。

### 3.2 本次补录阶段

本次补录阶段恢复使用 superpowers 风格流程：

- 先读取项目协作规则和相关 skill 说明
- 检查当前分支、工作区状态和相对 `dev` 的改动范围
- 确认补录范围为完整比赛材料
- 生成 `docs/superpowers/plans/2026-05-09-faq-page-docs-backfill.md`
- 新增 AI 协作记录、测试说明和复盘总结
- 小范围同步 `docs/PLAN.md`
- 执行 `npm run lint` 和 `npm run build` 验证

## 4. AI 输出内容

FAQ 分支当前已经形成以下可追溯产物：

- `src/app/faq/page.tsx`：FAQ 页面主实现
- `src/data/faq.ts`：FAQ 分类、问题条目和页面元信息
- `docs/FAQ.md`：FAQ 功能方案、数据结构、页面结构、交互流程和验收标准
- `docs/SPEC.md`：需求文档中补充 FAQ 场景、页面结构和验收标准
- `docs/PLAN.md`：当前阶段执行规划中记录 FAQ 分支范围、合并准备和材料补齐需求
- `src/app/page.tsx`：首页服务工具和导航中包含 FAQ 入口

本次补录新增：

- `docs/superpowers/plans/2026-05-09-faq-page-docs-backfill.md`
- `docs/AI_COLLABORATION.md`
- `docs/TESTING.md`
- `docs/RETROSPECTIVE.md`

## 5. 人工调整与审查重点

人工审查重点不应只看页面是否能打开，还应关注以下内容：

- FAQ 文案是否符合保险科技服务中心定位
- 是否避免使用未经验证的绝对收益、绝对时长和真实客户数据
- 搜索、筛选、热门问题和空状态是否符合客户自助查询场景
- 首页 FAQ 入口是否清楚，不影响预约演示主流程
- 文档中是否把未实现能力误写成已完成
- 后续合并到 `dev` 时是否会与术语词典分支或首页分支产生导航冲突

## 6. 验证结果记录

本次补录过程中已执行以下命令：

```bash
npm run lint
npm run build
```

命令验证结果记录在 `docs/TESTING.md`。构建输出确认当前分支包含：

- `/`
- `/_not-found`
- `/api/demo-request`
- `/faq`

## 7. 发现的问题

### 7.1 问题：前序实现缺少 superpowers 计划文档

影响：

- 分支虽然有功能和部分方案文档，但缺少标准化执行计划。
- 后续评审难以看到“先计划、再实施、再验证、再复盘”的完整链路。

处理：

- 新增 `docs/superpowers/plans/2026-05-09-faq-page-docs-backfill.md`
- 在本文明确标注本次是事后补录，不伪造为实现前已完成的计划
- 将补录过程和验证结果纳入比赛材料

### 7.2 问题：测试说明与复盘材料缺失

影响：

- 功能可演示，但缺少统一的验收记录。
- 非技术同事不容易判断哪些内容已经命令验证，哪些仍需人工浏览确认。

处理：

- 新增 `docs/TESTING.md` 区分命令验证和手动验收清单
- 新增 `docs/RETROSPECTIVE.md` 记录流程偏差和改进措施

## 8. 后续协作规范

后续新增功能建议按以下顺序进行：

1. 先读 `README.md`、`docs/SPEC.md` 和对应功能文档。
2. 使用 superpowers 生成或更新功能方案和实施计划。
3. 前端页面任务同时使用 `frontend-design`，保证页面体验和响应式质量。
4. 实现代码后同步更新对应文档。
5. 至少运行 `npm run lint`；涉及页面、路由、API、构建配置或依赖时运行 `npm run build`。
6. 在 `docs/TESTING.md` 记录验证命令和手动验收结果。
7. 在 `docs/RETROSPECTIVE.md` 记录本次分支的经验和问题。

## 9. 本次结论

FAQ 分支已经形成可演示的自助查询页面和可维护的静态数据结构。本次补录没有改变功能代码，而是补齐了缺失的过程证据，让 FAQ 分支从“功能完成”进一步变成“可说明、可验证、可复盘、可合并”的阶段成果。
