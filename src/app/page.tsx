"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenText,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  DatabaseZap,
  FileClock,
  Headphones,
  LineChart,
  Menu,
  Network,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

const navItems = [
  { label: "服务能力", href: "#capabilities" },
  { label: "客户场景", href: "#scenarios" },
  { label: "服务工具", href: "#tools" },
  { label: "客户价值", href: "#value" },
  { label: "FAQ", href: "/faq" },
];

const capabilities = [
  {
    title: "系统接入",
    description: "对接保司、渠道和第三方服务系统，把接口、数据和交付说明收拢到同一入口。",
    icon: Network,
    metric: "API / SSO / 文件流",
  },
  {
    title: "渠道运营",
    description: "支持渠道协作、业务跟进和运营数据追踪，让商务、实施、客服共享一套视图。",
    icon: Building2,
    metric: "渠道台账与任务跟进",
  },
  {
    title: "保单服务",
    description: "覆盖保单处理、查询、变更和服务流程数字化，减少重复沟通和人工校对。",
    icon: FileClock,
    metric: "保单生命周期服务",
  },
  {
    title: "数据自动化",
    description: "通过 OCR、RPA、规则引擎等能力提升处理效率，并沉淀可复用的自动化流程。",
    icon: DatabaseZap,
    metric: "OCR / RPA / Rules",
  },
];

const scenarios = [
  {
    title: "保险公司数字化转型",
    pain: "多系统并行、业务流程长、数据回流慢。",
    support: "统一接入服务和数据视图，让业务、交付和运营有同一套语言。",
  },
  {
    title: "经纪渠道运营管理",
    pain: "渠道多、数据分散、业务跟进依赖人工。",
    support: "沉淀渠道数据、预约演示、FAQ 支持和运营指标看板。",
  },
  {
    title: "TPA 服务协同",
    pain: "理赔、健康服务、客户支持之间协作链路复杂。",
    support: "用标准化服务入口承接咨询、问题、更新和交付说明。",
  },
  {
    title: "健康管理服务接入",
    pain: "服务供应商、保单权益和客户触达需要更顺滑的连接。",
    support: "通过接口、术语说明和流程支持，降低跨团队沟通门槛。",
  },
];

const tools = [
  {
    title: "FAQ 自助查询",
    href: "/faq",
    description: "快速查询接入、合作、安全、交付和售后问题。",
    icon: CircleHelp,
    label: "客户赋能",
  },
  {
    title: "ROI 计算器",
    href: "/roi-calculator",
    description: "估算自动化带来的成本节省、效率提升和回本周期。",
    icon: LineChart,
    label: "重点工具",
  },
  {
    title: "产品更新日志",
    href: "/changelog",
    description: "查看平台版本更新、服务变化和交付节奏。",
    icon: Clock3,
    label: "持续服务",
  },
  {
    title: "行业术语词典",
    href: "/glossary",
    description: "理解保险科技和系统集成中的常见概念。",
    icon: BookOpenText,
    label: "知识支持",
  },
];

const valueItems = [
  {
    value: "更短",
    label: "系统接入周期",
    description: "把需求、接口、交付说明集中到统一服务入口。",
  },
  {
    value: "更低",
    label: "人工处理成本",
    description: "通过流程自动化和自助查询减少重复沟通。",
  },
  {
    value: "更高",
    label: "问题自助解决率",
    description: "FAQ、术语词典和更新日志帮助客户先一步找到答案。",
  },
  {
    value: "更清晰",
    label: "服务过程透明度",
    description: "让客户知道当前能力、更新节奏和可用支持入口。",
  },
];

const requestTypes = [
  "产品演示",
  "系统接入咨询",
  "渠道合作",
  "数据安全 / 合规咨询",
  "售后支持",
  "其他",
];

const consoleStats = [
  { label: "今日预约", value: "12", icon: Send, tone: "text-[#1d7df2]", bar: "w-[72%]" },
  { label: "FAQ 命中率", value: "86%", icon: Search, tone: "text-emerald-600", bar: "w-[86%]" },
  { label: "节省工时", value: "48h", icon: BarChart3, tone: "text-amber-600", bar: "w-[64%]" },
  { label: "最近版本", value: "v1.4", icon: BadgeCheck, tone: "text-cyan-700", bar: "w-[52%]" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Home() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const statusTone = useMemo(() => {
    if (status === "success") return "border-emerald-200 bg-emerald-50 text-emerald-800";
    if (status === "error") return "border-rose-200 bg-rose-50 text-rose-800";
    return "border-slate-200 bg-slate-50 text-slate-700";
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      title: String(formData.get("title") ?? "").trim(),
      contact: String(formData.get("contact") ?? "").trim(),
      requestType: String(formData.get("requestType") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "提交失败，请稍后重试。");
      }

      setStatus("success");
      setMessage(result.message);
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "提交失败，请稍后重试。");
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f3f6fa] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="BeeFintech Service Hub 首页">
            <Image
              src="/brand/beefintech-logo.png"
              width={750}
              height={229}
              alt="BeeFintech"
              priority
              className="h-10 w-auto sm:h-11"
            />
            <span className="hidden h-8 w-px bg-slate-200 sm:block" />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:block">
              Service Hub
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-[#1d7df2]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#demo"
              className="hidden h-10 items-center justify-center rounded-lg bg-[#1d7df2] px-4 text-sm font-semibold text-white shadow-sm shadow-blue-950/10 transition hover:bg-[#0f64cf] focus:outline-none focus:ring-2 focus:ring-[#1d7df2] focus:ring-offset-2 sm:inline-flex"
            >
              预约演示
            </a>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1d7df2] focus:ring-offset-2 lg:hidden"
              aria-label={mobileNavOpen ? "关闭导航菜单" : "打开导航菜单"}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobileNavOpen ? (
          <nav className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#demo"
                className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-[#1d7df2] px-4 text-sm font-semibold text-white"
                onClick={() => setMobileNavOpen(false)}
              >
                预约演示
              </a>
            </div>
          </nav>
        ) : null}
      </header>

      <section className="relative border-b border-slate-200 bg-[#f8fbff]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#dce7f6_1px,transparent_1px),linear-gradient(to_bottom,#dce7f6_1px,transparent_1px)] bg-[size:52px_52px] opacity-60" />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_18%_18%,rgba(29,125,242,0.16),transparent_34%),radial-gradient(circle_at_78%_8%,rgba(15,158,179,0.16),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.9),rgba(248,251,255,0.58))]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-12 lg:grid-cols-[0.98fr_1.02fr] lg:px-8 lg:pb-16 lg:pt-17">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-lg border border-blue-100 bg-white/80 px-3 py-2 text-sm font-semibold text-[#1769cf] shadow-sm shadow-blue-950/5">
              <Sparkles className="size-4" />
              从官网升级为可运营的保险科技服务中心
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              BeeFintech 保险科技服务中心
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-700">
              连接保险业务、渠道运营与数字化交付的一站式服务平台。
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              面向保险公司、经纪渠道、TPA 与健康管理机构，提供系统接入、渠道管理、保单服务、数据自动化和持续支持能力。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1d7df2] px-5 text-sm font-semibold text-white shadow-lg shadow-blue-700/18 transition hover:-translate-y-0.5 hover:bg-[#0f64cf] focus:outline-none focus:ring-2 focus:ring-[#1d7df2] focus:ring-offset-2"
              >
                预约演示
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#tools"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white/90 px-5 text-sm font-semibold text-slate-900 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#1d7df2] focus:ring-offset-2"
              >
                查看服务工具
                <ChevronRight className="size-4" />
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 text-sm">
              {["系统接入", "渠道运营", "数据自动化"].map((item) => (
                <div key={item} className="rounded-lg border border-white bg-white/70 px-3 py-3 shadow-sm shadow-slate-950/5">
                  <p className="text-xs text-slate-500">核心服务</p>
                  <p className="mt-1 font-semibold text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px]">
            <div className="absolute -right-6 top-6 hidden h-28 w-28 rotate-12 rounded-lg border border-blue-200/80 bg-white/70 shadow-xl shadow-blue-950/10 lg:block" />
            <div className="absolute -bottom-4 -left-4 hidden h-24 w-24 rounded-lg border border-cyan-200/80 bg-cyan-50/80 shadow-xl shadow-cyan-950/10 lg:block" />
            <div className="relative rounded-lg border border-slate-200 bg-white/92 p-4 shadow-2xl shadow-slate-950/12 backdrop-blur">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50">
                    <Image
                      src="/brand/beefintech-logo.png"
                      width={750}
                      height={229}
                      alt=""
                      className="h-6 w-auto"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Service Console
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-slate-950">保险科技服务视图</h2>
                  </div>
                </div>
                <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Live
                </span>
              </div>

              <div className="grid gap-3 py-4 sm:grid-cols-2">
                {consoleStats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-lg border border-slate-200 bg-[#f8fafc] p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">{item.label}</p>
                        <Icon className={`size-4 ${item.tone}`} />
                      </div>
                      <p className="mt-3 text-2xl font-semibold text-slate-950">{item.value}</p>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200">
                        <div className={`h-full rounded-full bg-[#1d7df2] ${item.bar}`} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">接入进度</p>
                  <div className="mt-4 space-y-4">
                    {[
                      ["需求确认", "100%"],
                      ["接口联调", "72%"],
                      ["上线验收", "38%"],
                    ].map(([label, width]) => (
                      <div key={label}>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{label}</span>
                          <span>{width}</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#1d7df2] to-[#0f9eb3]" style={{ width }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white">
                  <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-500">
                    <span>服务队列</span>
                    <span>状态</span>
                  </div>
                  {[
                    ["保司接口接入评估", "处理中"],
                    ["渠道运营 FAQ 更新", "已发布"],
                    ["数据安全说明补充", "待确认"],
                  ].map(([name, state]) => (
                    <div key={name} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-slate-100 px-4 py-3 last:border-b-0">
                      <span className="text-sm text-slate-700">{name}</span>
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                        {state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="border-b border-slate-200 bg-[#f3f6fa] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-[#1769cf]">核心能力</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
                围绕保险数字化交付的核心能力
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-600 lg:justify-self-end">
              从接入、协同、保单服务到自动化处理，BeeFintech 把客户旅程里最容易断裂的节点做成可复用服务。
            </p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/[0.06]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-[#1d7df2]">
                      <Icon className="size-5" />
                    </div>
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                      {item.metric}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="scenarios" className="border-b border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-semibold text-[#1769cf]">客户场景</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
                适配不同保险科技服务场景
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                用同一个服务入口连接业务咨询、系统接入、客户支持和持续更新，减少跨团队协作里的信息损耗。
              </p>
              <div className="mt-8 rounded-lg border border-slate-200 bg-[#f8fafc] p-5">
                <p className="text-sm font-semibold text-slate-900">服务路径</p>
                <div className="mt-4 grid gap-3 text-sm text-slate-600">
                  {["咨询", "评估", "联调", "上线", "持续运营"].map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-lg bg-white text-xs font-semibold text-[#1769cf] shadow-sm">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {scenarios.map((item) => (
                <article key={item.title} className="rounded-lg border border-slate-200 bg-[#f8fafc] p-5 transition hover:border-blue-200 hover:bg-white">
                  <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    <span className="font-semibold text-slate-800">痛点：</span>
                    {item.pain}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    <span className="font-semibold text-slate-800">支持方式：</span>
                    {item.support}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="border-b border-slate-200 bg-[#eaf2fb] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#1769cf]">服务工具</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
                客户自助服务工具
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                让客户在预约前、接入中和上线后，都能找到可用的信息和行动入口。
              </p>
            </div>
            <a
              href="#demo"
              className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              需要定制支持
              <ArrowRight className="size-4" />
            </a>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-4">
            {tools.map((item) => {
              const Icon = item.icon;
              const featured = item.title === "ROI 计算器";
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className={`group rounded-lg border p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-950/8 ${
                    featured
                      ? "border-[#1d7df2] bg-[#1d7df2] text-white lg:col-span-2"
                      : "border-slate-200 bg-white text-slate-950"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex size-11 items-center justify-center rounded-lg ${
                        featured ? "bg-white/14 text-white" : "bg-blue-50 text-[#1d7df2]"
                      }`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${
                        featured ? "bg-white/14 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className={`mt-3 text-sm leading-6 ${featured ? "text-blue-50" : "text-slate-600"}`}>
                    {item.description}
                  </p>
                  <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${featured ? "text-white" : "text-[#1769cf]"}`}>
                    进入工具
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="value" className="border-b border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="text-sm font-semibold text-[#1769cf]">客户价值</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
                让保险科技服务更快落地、更易运营
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {valueItems.map((item) => (
                <article key={item.label} className="rounded-lg border border-slate-200 bg-[#f8fafc] p-5">
                  <p className="text-3xl font-semibold text-[#1d7df2]">{item.value}</p>
                  <h3 className="mt-3 text-base font-semibold text-slate-950">{item.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="relative bg-[#101824] py-16 text-white lg:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <Image
              src="/brand/beefintech-logo.png"
              width={750}
              height={229}
              alt="BeeFintech"
              className="h-12 w-auto rounded-sm bg-white px-2 py-1"
            />
            <p className="mt-8 text-sm font-semibold text-cyan-300">预约演示</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">把业务场景交给我们拆解</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              提交后，我们会根据你的业务场景安排产品演示或接入咨询。第一版接口使用 mock 响应，后续可对接邮件、企业微信或 CRM。
            </p>

            <div className="mt-8 grid gap-3 text-sm text-slate-200">
              {[
                { icon: CheckCircle2, text: "支持产品演示、系统接入、渠道合作等需求类型" },
                { icon: ShieldCheck, text: "表单只做基础收集，不提交真实客户隐私到公开仓库" },
                { icon: Headphones, text: "适合销售、实施和客户支持共同使用" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-start gap-3">
                    <Icon className="mt-0.5 size-5 text-cyan-300" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-white/12 bg-white p-5 text-slate-950 shadow-2xl shadow-black/20 sm:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                姓名
                <input
                  name="name"
                  required
                  className="h-11 rounded-lg border border-slate-300 px-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#1d7df2] focus:ring-2 focus:ring-blue-100"
                  placeholder="请输入姓名"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                公司
                <input
                  name="company"
                  required
                  className="h-11 rounded-lg border border-slate-300 px-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#1d7df2] focus:ring-2 focus:ring-blue-100"
                  placeholder="请输入公司名称"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                职位
                <input
                  name="title"
                  className="h-11 rounded-lg border border-slate-300 px-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#1d7df2] focus:ring-2 focus:ring-blue-100"
                  placeholder="如：业务负责人"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                联系方式
                <input
                  name="contact"
                  required
                  className="h-11 rounded-lg border border-slate-300 px-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#1d7df2] focus:ring-2 focus:ring-blue-100"
                  placeholder="手机号或邮箱"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                需求类型
                <select
                  name="requestType"
                  required
                  defaultValue=""
                  className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-950 outline-none transition focus:border-[#1d7df2] focus:ring-2 focus:ring-blue-100"
                >
                  <option value="" disabled>
                    请选择需求类型
                  </option>
                  {requestTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                补充说明
                <textarea
                  name="message"
                  rows={4}
                  maxLength={500}
                  className="rounded-lg border border-slate-300 px-3 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#1d7df2] focus:ring-2 focus:ring-blue-100"
                  placeholder="可以简单描述业务场景、当前痛点或希望了解的模块。"
                />
              </label>
            </div>

            {message ? (
              <div className={`mt-4 rounded-lg border px-3 py-2 text-sm ${statusTone}`} role="status">
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1d7df2] px-5 text-sm font-semibold text-white transition hover:bg-[#0f64cf] focus:outline-none focus:ring-2 focus:ring-[#1d7df2] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {status === "submitting" ? "提交中..." : "提交预约"}
              <Send className="size-4" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
