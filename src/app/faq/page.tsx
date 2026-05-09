"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  Compass,
  Filter,
  LayoutGrid,
  LifeBuoy,
  MessageSquareMore,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { faqCategories, faqItems, faqMeta, type FaqCategoryId, type FaqItem } from "@/data/faq";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "Asia/Shanghai",
  }).format(new Date(value));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlightedText(text: string, keyword: string) {
  const normalizedKeyword = normalizeText(keyword);

  if (!normalizedKeyword) {
    return text;
  }

  const matcher = new RegExp(`(${escapeRegExp(keyword.trim())})`, "gi");
  const segments = text.split(matcher);

  return segments.map((segment, index) => {
    if (segment.toLowerCase() === keyword.trim().toLowerCase()) {
      return (
        <mark
          key={`${segment}-${index}`}
          className="rounded bg-[#fff1b8] px-1 text-inherit"
        >
          {segment}
        </mark>
      );
    }

    return <span key={`${segment}-${index}`}>{segment}</span>;
  });
}

const DEFAULT_VISIBLE_COUNT = 6;

const usageScenarios = [
  {
    title: "场景 1：个人保险代理人如何用 LifeBee 提升签单效率？",
    description: "适合需要统一管理客户资料、跟进业务进度和快速查询产品信息的代理人，帮助减少重复沟通与手工整理时间。",
  },
  {
    title: "场景 2：大型经纪公司如何通过 LifeBee 实现团队管理与业绩追踪？",
    description: "适合需要进行团队协作、任务分工、进度跟踪和数据汇总的经纪机构，提升管理透明度与执行效率。",
  },
  {
    title: "场景 3：保险公司如何通过 LifeBee 对接渠道，实现业务自动化？",
    description: "适合需要打通渠道协作、资料流转和标准化处理流程的保险公司，用于提升接入效率与业务处理一致性。",
  },
] as const;

const onboardingSteps = [
  {
    title: "先看热门问题",
    description: "优先查看 Top 10 热门问题，快速判断是否已有与您相似的常见解答。",
    icon: BookOpen,
  },
  {
    title: "再用搜索与筛选",
    description: "可通过关键词搜索和分类筛选，快速缩小范围，定位更贴近当前业务的问题。",
    icon: Search,
  },
  {
    title: "找不到就走人工咨询",
    description: "如未找到所需答案，可通过页面下方人工咨询入口提交问题，由服务团队进一步协助。",
    icon: MessageSquareMore,
  },
] as const;

function getHotTag(index: number) {
  if (index % 3 === 0) return "高频关注";
  if (index % 3 === 1) return "推荐查看";
  return "常见咨询";
}

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId>("all");
  const [openItemId, setOpenItemId] = useState<string | null>(faqItems[0]?.id ?? null);
  const [feedback, setFeedback] = useState("");
  const [showAllItems, setShowAllItems] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [currentDateLabel, setCurrentDateLabel] = useState(formatDate(faqMeta.lastUpdated));

  const categoryCount = faqCategories.filter((category) => category.id !== "all").length;

  useEffect(() => {
    const updateDateLabel = () => {
      setCurrentDateLabel(formatDate(new Date()));
    };

    updateDateLabel();

    const intervalId = window.setInterval(updateDateLabel, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const filteredItems = useMemo(() => {
    const keyword = normalizeText(query);

    return faqItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      const searchTarget = [item.question, item.answer, item.audience, ...item.keywords]
        .join(" ")
        .toLowerCase();

      return searchTarget.includes(keyword);
    });
  }, [activeCategory, query]);

  const hotItems = faqItems.slice(0, Math.min(10, faqItems.length));
  const visibleItems = showAllItems ? filteredItems : filteredItems.slice(0, DEFAULT_VISIBLE_COUNT);
  const hasMoreItems = filteredItems.length > DEFAULT_VISIBLE_COUNT;
  const footerNotes = [
    {
      title: "底部辅助说明",
      description: "建议优先查看 FAQ、分类筛选和热门问题，再进入人工咨询，以减少重复沟通并提升定位效率。",
    },
    {
      title: "内容更新说明",
      description: `当前 FAQ 内容更新时间按页面访问当天动态显示，当前展示日期为 ${currentDateLabel}。`,
    },
    {
      title: "使用建议",
      description: "如果您的问题涉及跨系统联调、数据安全评估或复杂业务规则，建议准备业务背景后再提交咨询。",
    },
  ] as const;

  function handleHotClick(item: FaqItem) {
    setActiveCategory(item.category);
    setOpenItemId(item.id);
    setShowAllItems(true);
  }

  function getRelatedItems(item: FaqItem) {
    return faqItems.filter((entry) => entry.category === item.category && entry.id !== item.id).slice(0, 2);
  }

  function handleFeedbackSubmit() {
    if (!feedback.trim()) {
      setFeedbackStatus("error");
      setFeedbackMessage("请先填写您希望补充的问题或建议内容。");
      return;
    }

    setFeedbackStatus("submitting");
    setFeedbackMessage("");

    window.setTimeout(() => {
      setFeedbackStatus("success");
      setFeedbackMessage("反馈已提交，我们会将该问题纳入后续 FAQ 内容整理与更新。");
      setFeedback("");
    }, 700);
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eff4fc_50%,#eef3fb_100%)] text-slate-950">
      {consultModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
          <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#365ee7]">
              <LifeBuoy className="size-4" />
              人工咨询确认
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#071a46]">即将前往人工咨询入口</h3>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              我们会带您前往首页的预约演示区域，您可以在那里填写人工咨询需求。建议优先选择“系统接入咨询”或“售后支持”，并补充业务背景、问题现象和影响范围。
            </p>
            <div className="mt-5 rounded-[22px] border border-slate-200 bg-[#f7f9fe] px-4 py-4 text-sm leading-8 text-slate-600">
              适合提交人工咨询的情况：跨系统联调、复杂异常、数据安全评估、上线问题排查、渠道协作配置等。
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setConsultModalOpen(false)}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#071a46] transition hover:border-slate-300 hover:bg-slate-50"
              >
                暂不前往
              </button>
              <Link
                href="/#demo"
                onClick={() => setConsultModalOpen(false)}
                className="inline-flex items-center rounded-full bg-[#365ee7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-[#254bd5]"
              >
                前往人工咨询
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <section className="border-b border-slate-200/80 bg-[radial-gradient(circle_at_top_left,rgba(66,110,245,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,249,255,0.94))]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 lg:px-8 lg:py-14">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-950/5 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <ArrowLeft className="size-4" />
              返回首页
            </Link>
            <Link
              href="/#demo"
              className="inline-flex items-center gap-2 rounded-full bg-[#2f5cff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-[#204cde]"
            >
              预约演示
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-[#365ee7] shadow-sm shadow-slate-950/5">
                <Sparkles className="size-4" />
                BeeFintech FAQ Center
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#071a46] sm:text-5xl">
                FAQ 自助查询
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                为提升沟通效率，我们将客户在接入、使用和服务过程中常见的问题进行了统一整理。您可通过分类浏览或关键词搜索，快速获取标准解答与支持信息。
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm shadow-slate-950/5">
                <CalendarDays className="size-4 text-[#365ee7]" />
                内容更新时间：{currentDateLabel}
              </div>
            </div>

            <div className="rounded-[30px] bg-[#171f39] p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/4 p-4">
                  <p className="text-sm text-slate-300">FAQ 条目</p>
                  <p className="mt-3 text-4xl font-semibold">{faqItems.length}</p>
                  <p className="mt-3 text-sm text-slate-400">当前已整理内容</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/4 p-4">
                  <p className="text-sm text-slate-300">分类数量</p>
                  <p className="mt-3 text-4xl font-semibold">{categoryCount}</p>
                  <p className="mt-3 text-sm text-slate-400">覆盖接入到售后全流程</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/4 p-4">
                  <p className="text-sm text-slate-300">使用方式</p>
                  <p className="mt-3 text-2xl font-semibold">搜索 + 筛选</p>
                  <p className="mt-3 text-sm text-slate-400">便于快速定位问题</p>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-base font-semibold text-white">
                  <Target className="size-5 text-cyan-300" />
                  适合沉淀的内容类型
                </div>
                <p className="mt-4 text-sm leading-8 text-slate-300">
                  接入资料清单、常见报错说明、字段口径解释、合规问答、版本更新说明、上线准备事项及售后支持指引。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-5 lg:px-8 lg:py-10">
        <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-7 shadow-[0_16px_40px_rgba(41,72,152,0.08)]">
          <div className="flex items-center gap-2 text-base font-semibold text-[#365ee7]">
            <Compass className="size-4" />
            使用场景 / 案例说明
          </div>
          <h2 className="mt-4 text-[1.75rem] font-semibold tracking-tight text-[#071a46] sm:text-[1.9rem]">判断 LifeBee 是否适合您的业务</h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {usageScenarios.map((scenario) => (
              <article
                key={scenario.title}
                className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#fbfdff_0%,#f3f7ff_100%)] p-6 shadow-sm shadow-slate-950/5"
              >
                <h3 className="text-base font-semibold leading-8 text-[#071a46] sm:text-[1.18rem]">{scenario.title}</h3>
                <p className="mt-4 text-sm leading-8 text-slate-600">{scenario.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">... 更多适用场景可根据具体业务进一步说明</p>
        </section>

        <section className="mt-8 rounded-[32px] border border-slate-200 bg-white px-6 py-7 shadow-[0_16px_40px_rgba(41,72,152,0.08)]">
          <div className="flex items-center gap-2 text-base font-semibold text-[#365ee7]">
            <BookOpen className="size-4" />
            新手引导 / 快速上手
          </div>
          <h2 className="mt-4 text-[1.75rem] font-semibold tracking-tight text-[#071a46] sm:text-[1.9rem]">首次使用建议先这样查看 FAQ</h2>
          <div className="mt-7 grid gap-4">
            {onboardingSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#fbfdff_0%,#f4f7fd_100%)] px-6 py-5"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#365ee7]">
                    <step.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#071a46] sm:text-[1.12rem]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-8 text-slate-600">{step.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-slate-200 bg-white px-6 py-7 shadow-[0_16px_40px_rgba(41,72,152,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-base font-semibold text-[#365ee7]">
                <Sparkles className="size-4" />
                热门问题（Top {hotItems.length}）
              </div>
              <h2 className="mt-4 text-[1.75rem] font-semibold tracking-tight text-[#071a46] sm:text-[1.9rem]">优先查看客户最常关注的问题</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-500">
              点击任意热门问题后，页面会自动筛选并在下方定位对应答案，便于快速查阅。
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {hotItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleHotClick(item)}
                className="rounded-[20px] border border-slate-200 bg-[linear-gradient(180deg,#fbfdff_0%,#f3f7ff_100%)] px-4 py-4 text-left shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-[#bfd3ff]"
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#365ee7] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#071a46] sm:text-[1.12rem]">
                      {renderHighlightedText(item.question, query)}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-slate-500">{getHotTag(index)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-slate-200 bg-white px-6 py-7 shadow-[0_16px_40px_rgba(41,72,152,0.08)]">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <p className="text-sm font-semibold text-[#071a46]">搜索问题</p>
              <label className="mt-4 flex items-center gap-3 rounded-[22px] border border-slate-200 bg-[#f7f9fe] px-5 py-4 focus-within:border-[#365ee7] focus-within:bg-white">
                <Search className="size-5 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="例如：LifeBee、接入周期、合规、上线、售后"
                  className="w-full border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
                />
              </label>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#071a46]">
                <Filter className="size-4 text-[#365ee7]" />
                分类筛选
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {faqCategories.map((category) => {
                  const active = category.id === activeCategory;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className={`inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                        active
                          ? "border-[#365ee7] bg-[#365ee7] text-white shadow-lg shadow-blue-700/18"
                          : "border-slate-200 bg-[#f3f6fc] text-slate-700 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#365ee7] shadow-sm shadow-slate-950/5">
                <CircleHelp className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#071a46]">查询结果</p>
                <p className="mt-1 text-sm text-slate-500">共找到 {filteredItems.length} 条匹配内容</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 lg:gap-8">
              <p className="max-w-2xl text-sm leading-7 text-slate-500">
                本页用于帮助客户快速获取标准说明与常见问题答案，减少重复沟通，提高问题定位效率。
              </p>
              <button
                type="button"
                onClick={() => setShowAllItems((current) => !current)}
                className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#071a46] shadow-sm shadow-slate-950/5 transition hover:border-slate-300"
              >
                {showAllItems ? `收起问题（${filteredItems.length}）` : `展开更多问题（${filteredItems.length}）`}
              </button>
            </div>
          </div>

          <div className="mt-7 grid gap-5">
            {filteredItems.length > 0 ? (
              visibleItems.map((item) => {
                const isOpen = item.id === openItemId;
                const category = faqCategories.find((entry) => entry.id === item.category);
                const relatedItems = getRelatedItems(item);

                return (
                  <article
                    key={item.id}
                    className={`rounded-[28px] border bg-white px-5 py-5 shadow-[0_14px_34px_rgba(41,72,152,0.08)] transition ${
                      isOpen ? "border-[#bfd3ff]" : "border-slate-200"
                    }`}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#edf3ff] px-3 py-1.5 text-sm font-semibold text-[#365ee7]">
                            {category?.label}
                          </span>
                          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
                            适用对象：{item.audience}
                          </span>
                        </div>
                        <h3 className="mt-4 text-[1.15rem] font-semibold tracking-tight text-[#071a46] sm:text-[1.28rem]">
                          {renderHighlightedText(item.question, query)}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setOpenItemId((current) => (current === item.id ? null : item.id))}
                        className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-[#f8faff] px-4 py-2 text-sm font-semibold text-[#365ee7] transition hover:border-[#bfd3ff]"
                      >
                        {isOpen ? "点击收起" : "点击展开"}
                        <ChevronDown className={`size-4 transition ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>

                    {isOpen ? (
                      <div className="mt-6 border-t border-slate-100 pt-6">
                        <p className="text-sm leading-8 text-slate-600 sm:text-base">
                          {renderHighlightedText(item.answer, query)}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.keywords.map((keyword) => (
                            <span
                              key={keyword}
                              className="rounded-full bg-[#f3f6fd] px-3 py-1.5 text-xs font-semibold text-[#365ee7]"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>

                        {relatedItems.length > 0 ? (
                          <div className="mt-6 rounded-[22px] border border-slate-200 bg-[#f8fbff] px-5 py-4">
                            <p className="text-sm font-semibold text-[#071a46]">相关推荐问题</p>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              {relatedItems.map((relatedItem) => (
                                <button
                                  key={relatedItem.id}
                                  type="button"
                                  onClick={() => setOpenItemId(relatedItem.id)}
                                  className="rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 shadow-sm shadow-slate-950/5 transition hover:border-[#bfd3ff] hover:text-[#365ee7]"
                                >
                                  {renderHighlightedText(relatedItem.question, query)}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        <div className="mt-6 flex items-center justify-between rounded-[22px] border border-slate-200 bg-[#f8fbff] px-5 py-4">
                          <p className="text-sm text-slate-600">这条答案是否解决了您的问题？</p>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#071a46] shadow-sm shadow-slate-950/5 transition hover:bg-slate-50"
                            >
                              是
                            </button>
                            <button
                              type="button"
                              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#071a46] shadow-sm shadow-slate-950/5 transition hover:bg-slate-50"
                            >
                              否
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })
            ) : (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm shadow-slate-950/5">
                <p className="text-xl font-semibold text-[#071a46]">未找到匹配问题</p>
                <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-slate-600">
                  可以尝试缩短关键词、切换分类，或者先回到全部问题浏览接入、合作、安全、交付和售后常见说明。
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("all");
                    setOpenItemId(faqItems[0]?.id ?? null);
                  }}
                  className="mt-6 inline-flex items-center rounded-full bg-[#365ee7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-[#254bd5]"
                >
                  查看全部问题
                </button>
              </div>
            )}
          </div>

          {!showAllItems && hasMoreItems ? (
            <p className="mt-5 text-center text-sm text-slate-500">
              当前仅展示前 {DEFAULT_VISIBLE_COUNT} 条问题，点击“展开更多问题”后可查看剩余内容。
            </p>
          ) : null}
        </section>

        <section className="mt-8">
          <article className="rounded-[32px] border border-slate-200 bg-white px-6 py-7 shadow-[0_16px_40px_rgba(41,72,152,0.08)]">
            <div className="flex items-center gap-2 text-base font-semibold text-[#365ee7]">
              <MessageSquareMore className="size-4" />
              问题反馈与内容补充
            </div>
            <h2 className="mt-4 text-[1.75rem] font-semibold tracking-tight text-[#071a46] sm:text-[1.9rem]">欢迎提交新的问题与补充建议</h2>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              你有其他未解决的问题？欢迎提交反馈，我们会定期更新 FAQ 内容，持续完善标准说明与支持信息。
            </p>
            <textarea
              value={feedback}
              onChange={(event) => {
                setFeedback(event.target.value);
                if (feedbackStatus !== "idle") {
                  setFeedbackStatus("idle");
                  setFeedbackMessage("");
                }
              }}
              placeholder="请输入您希望补充的问题或建议内容"
              className="mt-6 min-h-[120px] w-full rounded-[24px] border border-slate-200 bg-[#f7f9fe] px-5 py-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#365ee7] focus:bg-white sm:text-base"
            />
            {feedbackMessage ? (
              <div
                className={`mt-4 rounded-[20px] border px-4 py-3 text-sm ${
                  feedbackStatus === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : feedbackStatus === "error"
                      ? "border-rose-200 bg-rose-50 text-rose-600"
                      : "border-slate-200 bg-slate-50 text-slate-500"
                }`}
              >
                {feedbackMessage}
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleFeedbackSubmit}
                disabled={feedbackStatus === "submitting"}
                className="inline-flex items-center rounded-full bg-[#365ee7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-[#254bd5]"
              >
                {feedbackStatus === "submitting" ? "提交中..." : "提交问题反馈"}
              </button>
              <p className="text-sm text-slate-500">当前输入字数：{feedback.length}</p>
            </div>
            <div className="mt-6 rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#fbfdff_0%,#f5f9ff_100%)] px-5 py-5">
              <p className="text-sm font-semibold text-[#071a46]">补充说明</p>
              <p className="mt-3 text-sm leading-8 text-slate-600">
                建议在反馈中尽量说明问题场景、当前操作步骤、期望结果和影响范围，便于后续整理 FAQ 内容并提高支持定位效率。
              </p>
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[34px] bg-[#171f39] px-6 py-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.24)]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex items-center gap-2 text-base font-semibold text-cyan-300">
                <LifeBuoy className="size-4" />
                疑难问题 / 人工咨询入口
              </div>
              <h2 className="mt-4 text-[1.85rem] font-semibold tracking-tight sm:text-[2rem]">
                未找到对应答案时，可由服务团队进一步协助
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">
                对于跨系统联调、数据安全评估、上线异常排查、渠道协作配置等复杂问题，建议提交人工咨询需求，由相关同事结合具体业务场景进一步确认。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setConsultModalOpen(true)}
                  className="inline-flex items-center rounded-full bg-[#365ee7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-[#254bd5]"
                >
                  提交人工咨询
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/5"
                >
                  返回服务首页
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-white/10 bg-white/5 px-5 py-5">
                <div className="flex items-center gap-2 text-base font-semibold text-white">
                  <LayoutGrid className="size-5 text-cyan-300" />
                  适合人工处理的问题
                </div>
                <p className="mt-3 text-sm leading-8 text-slate-300">
                  定制化需求、复杂异常、跨团队协作事项及需要结合业务背景判断的问题。
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 px-5 py-5">
                <div className="flex items-center gap-2 text-base font-semibold text-white">
                  <Target className="size-5 text-emerald-300" />
                  提交前建议准备
                </div>
                <p className="mt-3 text-sm leading-8 text-slate-300">
                  问题描述、业务背景、影响范围、相关截图或字段信息，有助于更快定位。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {footerNotes.map((note) => (
            <article
              key={note.title}
              className="rounded-[30px] bg-[#171f39] px-6 py-6 text-white shadow-[0_20px_48px_rgba(15,23,42,0.18)]"
            >
              <h3 className="text-[1.35rem] font-semibold tracking-tight sm:text-2xl">{note.title}</h3>
              <p className="mt-4 text-sm leading-8 text-slate-300">{note.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
