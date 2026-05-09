# 测试说明

## 1. 文档目的

本文记录 BeeFintech Service Hub 当前阶段的命令验证和手动验收清单，重点覆盖 `feature/faq-page` 分支的 FAQ 自助查询能力、首页入口和预约演示闭环。

说明：本文中“已验证”仅表示本次补录过程中实际执行过命令并确认输出；“待人工复核”表示需要合并前由团队在浏览器中再次操作确认。

## 2. 测试环境

| 项目 | 内容 |
| --- | --- |
| 当前分支 | `feature/faq-page` |
| 验证日期 | 2026-05-09 |
| Node.js | 以本机项目环境为准 |
| 包管理器 | npm |
| 框架 | Next.js 16.2.4 |
| 验证范围 | 首页、FAQ 页面、预约演示 API、构建输出 |

## 3. 命令验证记录

### 3.1 ESLint 检查

命令：

```bash
npm run lint
```

结果：通过。

输出摘要：

```text
> beefintech-service-hub-next@0.1.0 lint
> eslint
```

说明：命令退出码为 0，未输出 lint 错误。

### 3.2 生产构建检查

命令：

```bash
npm run build
```

结果：通过。

输出摘要：

```text
▲ Next.js 16.2.4 (Turbopack)
✓ Compiled successfully
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/demo-request
└ ○ /faq
```

说明：

- `/` 已纳入静态构建。
- `/faq` 已纳入静态构建。
- `/api/demo-request` 作为动态 Route Handler 存在。
- 构建未发现 TypeScript 或页面编译错误。

## 4. FAQ 页面验收清单

路由：`/faq`

当前分支应满足：

- 页面可访问，并展示 FAQ 自助查询标题和说明。
- 页面展示 FAQ 条目数、分类数和内容更新时间。
- 用户可通过关键词搜索 FAQ。
- 用户可按“产品接入、保司合作、数据安全、实施交付、售后支持”等分类筛选。
- 用户可展开和收起单个问题答案。
- 热门问题可帮助用户快速定位对应问题。
- 展开答案后可看到适用对象、关键词标签和相关推荐问题。
- 搜索无结果时显示清晰空状态，并提供回到全部问题的操作。
- 反馈表单为空时应阻止提交并提示用户补充问题。
- 反馈提交后应显示成功提示。
- 人工咨询入口应有明确引导，不应让用户误以为已经接入真实工单系统。
- 桌面端和移动端不应出现明显文字溢出、按钮拥挤或卡片错位。

状态：命令构建已验证 `/faq` 存在；合并前仍建议进行浏览器手动复核。

## 5. 首页入口验收清单

路由：`/`

当前分支应满足：

- 首页仍能展示品牌定位、核心能力、客户场景、服务工具、客户价值和预约演示表单。
- 顶部导航或服务工具区域包含 FAQ 入口。
- FAQ 入口指向 `/faq`。
- 首页原有预约演示表单不因 FAQ 入口修改而回退。
- 移动端导航中 FAQ 入口仍可访问。

状态：命令构建已验证 `/` 存在；合并前仍建议进行浏览器手动复核。

## 6. 预约演示 API 验收清单

接口：`POST /api/demo-request`

当前阶段接口约定：

- 请求字段包括 `name`、`company`、`title`、`contact`、`requestType`、`message`。
- 必填字段为空时返回错误。
- 联系方式格式明显错误时返回错误。
- 合法请求返回包含 `ok` 和 `message` 的 JSON。
- 第一阶段仅做 mock 响应，不接入真实邮件、短信、CRM 或数据库。

建议使用以下命令做接口复核：

```bash
curl -i -X POST http://localhost:3000/api/demo-request \
  -H "Content-Type: application/json" \
  -d '{"name":"张三","company":"示例保险经纪有限公司","title":"业务负责人","contact":"zhangsan@example.com","requestType":"产品演示","message":"希望了解 FAQ 和预约演示流程。"}'
```

状态：构建已验证 `/api/demo-request` 存在；本次补录未启动浏览器或本地服务进行接口手动请求。

## 7. 文档验收清单

本次补录新增或更新的文档应满足：

- `docs/superpowers/plans/2026-05-09-faq-page-docs-backfill.md` 说明本次是事后补录。
- `docs/AI_COLLABORATION.md` 记录目标、Prompt 类型、AI 输出、人工调整、流程偏差和补救动作。
- `docs/TESTING.md` 区分命令验证和待人工复核项目。
- `docs/RETROSPECTIVE.md` 记录阶段复盘、风险和改进建议。
- `docs/PLAN.md` 不再把以上三份材料描述为完全缺失。

## 8. 已知风险与后续复核

- 本次补录为文档任务，没有修改页面和接口代码。
- 浏览器手动检查、移动端截图和接口 curl 复核仍建议在合并到 `dev` 前完成。
- 行业术语词典属于其他功能分支，本文只记录当前分支能确认的 FAQ 相关结果。
- 若后续合并时修改导航、服务工具入口或页面结构，需要同步更新 `docs/SPEC.md`、`docs/PLAN.md` 和本文。

## 9. 当前结论

截至 2026-05-09，本分支在命令层面通过了 `npm run lint` 和 `npm run build`。构建输出确认首页、FAQ 页面和预约演示 API 均纳入当前 Next.js 应用。合并前建议补充一次浏览器手动验收，以确认交互和移动端表现。
