export type FaqCategoryId =
  | "all"
  | "integration"
  | "partnership"
  | "security"
  | "delivery"
  | "support";

export type FaqCategory = {
  id: FaqCategoryId;
  label: string;
  description: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: Exclude<FaqCategoryId, "all">;
  audience: string;
  keywords: string[];
};

export const faqCategories: FaqCategory[] = [
  { id: "all", label: "全部问题", description: "覆盖接入、合作、安全、交付与售后常见问题。" },
  { id: "integration", label: "产品接入", description: "面向系统对接、接口准备和接入流程确认。" },
  { id: "partnership", label: "保司合作", description: "面向合作方式、适配对象和业务推进节奏。" },
  { id: "security", label: "数据安全", description: "面向数据边界、权限控制和合规配合说明。" },
  { id: "delivery", label: "实施交付", description: "面向上线准备、培训方式和项目推进协同。" },
  { id: "support", label: "售后支持", description: "面向问题响应、版本更新和持续服务安排。" },
];

export const faqItems: FaqItem[] = [
  {
    id: "integration-api-readiness",
    question: "如果要接入 BeeFintech 服务，通常需要先准备哪些内容？",
    answer:
      "第一阶段通常会先确认业务场景、对接系统、接口方式、字段清单和测试环境安排。若客户已有 API、单点登录或文件流方案，我们会先基于现有能力评估接入路径，再整理出示例性的接入清单。",
    category: "integration",
    audience: "保险公司、经纪渠道、实施同事",
    keywords: ["API", "SSO", "字段", "测试环境", "接入准备"],
  },
  {
    id: "integration-cycle-estimate",
    question: "接入周期一般如何评估？",
    answer:
      "接入周期通常会受接口成熟度、参与方数量、数据准备情况和测试配合效率影响。第一版页面不会给出绝对承诺时长，但可帮助客户先识别关键依赖，缩短前期沟通和评估时间。",
    category: "integration",
    audience: "潜在客户、销售同事",
    keywords: ["周期", "评估", "依赖", "测试", "接口成熟度"],
  },
  {
    id: "partnership-fit-clients",
    question: "BeeFintech 目前更适合哪些合作对象？",
    answer:
      "当前服务定位主要面向保险公司、经纪渠道、TPA 与健康管理机构。若客户场景涉及保单服务、渠道运营、数据自动化或系统协同，通常都可以先从演示和需求梳理开始判断匹配度。",
    category: "partnership",
    audience: "潜在客户、商务同事",
    keywords: ["合作对象", "保险公司", "TPA", "健康管理", "场景匹配"],
  },
  {
    id: "partnership-demo-before-project",
    question: "合作前是否可以先安排演示或方案沟通？",
    answer:
      "可以。首页和 FAQ 页面都保留了预约演示入口，便于客户先用业务语言对齐场景、目标和关键流程，再决定是否进入更细的接入或实施讨论。",
    category: "partnership",
    audience: "潜在客户、商务同事",
    keywords: ["演示", "方案沟通", "预约", "前期评估"],
  },
  {
    id: "security-data-boundary",
    question: "平台如何处理数据安全和权限边界问题？",
    answer:
      "第一阶段以演示和静态服务说明为主，不默认接入真实客户数据。若进入正式项目评估，通常会结合客户的数据分级、访问角色、接口边界和审计要求，共同确认权限设计与合规范围。",
    category: "security",
    audience: "保险公司、合规同事、实施同事",
    keywords: ["数据安全", "权限", "合规", "审计", "数据分级"],
  },
  {
    id: "security-sensitive-data",
    question: "演示阶段是否需要提供真实客户敏感数据？",
    answer:
      "不需要。演示和第一阶段沟通建议优先使用样例数据、脱敏字段或示例流程，避免在早期讨论中暴露真实客户个人信息、合同或敏感业务数据。",
    category: "security",
    audience: "潜在客户、实施同事",
    keywords: ["敏感数据", "脱敏", "样例数据", "个人信息"],
  },
  {
    id: "delivery-team-collaboration",
    question: "项目实施时通常有哪些角色需要参与？",
    answer:
      "常见参与角色包括业务负责人、接口或技术联系人、实施顾问、测试协同人员，以及需要确认数据口径或权限范围的运营 / 合规同事。页面会优先帮助团队提前识别这些协作对象。",
    category: "delivery",
    audience: "实施同事、客户项目负责人",
    keywords: ["实施", "角色", "测试", "业务负责人", "协作"],
  },
  {
    id: "delivery-training-support",
    question: "上线前后是否支持培训和交付说明？",
    answer:
      "支持。BeeFintech Service Hub 的目标之一就是把 FAQ、更新日志、术语词典和演示资料沉淀为可复用的交付辅助内容，帮助销售、实施和客户团队更快理解系统能力。",
    category: "delivery",
    audience: "实施同事、已合作客户",
    keywords: ["培训", "交付说明", "上线", "术语词典", "FAQ"],
  },
  {
    id: "support-response-scope",
    question: "售后支持通常覆盖哪些内容？",
    answer:
      "第一阶段以问题说明、常见排查路径、功能更新说明和沟通入口指引为主。若进入正式服务阶段，可再根据项目范围细化响应机制、升级路径和支持边界。",
    category: "support",
    audience: "已合作客户、客服同事",
    keywords: ["售后", "排查", "支持边界", "升级路径"],
  },
  {
    id: "support-version-updates",
    question: "客户如何了解平台最近的版本变化？",
    answer:
      "服务中心会逐步补齐更新日志页面，用于说明版本号、发布日期和功能变化。这样客户和内部团队都能更清楚地看到平台在持续迭代，而不是一次性交付后缺少透明度。",
    category: "support",
    audience: "已合作客户、销售同事",
    keywords: ["更新日志", "版本", "发布日期", "持续服务"],
  },
];
