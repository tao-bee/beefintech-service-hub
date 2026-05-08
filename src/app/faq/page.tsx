"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CircleHelp,
  Filter,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { faqCategories, faqItems, type FaqCategoryId } from "@/data/faq";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId>("all");
  const [openItemId, setOpenItemId] = useState<string | null>(faqItems[0]?.id ?? null);

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

  const activeCategoryMeta = faqCategories.find((category) => category.id === activeCategory) ?? faqCategories[0];

  return (
    <main className="min-h-screen bg-[#f3f6fa] text-slate-950">
      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              <ArrowLeft className="size-4" />
              返回首页
            </Link>
            <Link
              href="/#demo"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1d7df2] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f64cf]"
            >
              预约演示
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white/85 px-3 py-2 text-sm font-semibold text-[#1769cf] shadow-sm shadow-blue-950/5">
                <CircleHelp className="size-4" />
                自助查询与交付答疑
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                FAQ 自助查询
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                围绕产品接入、保司合作、数据安全、实施交付和售后支持，提供一套更适合保险科技场景的常见问题说明。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/90 bg-white/80 p-5 shadow-sm shadow-slate-950/5">
                <p className="text-sm text-slate-500">当前分类</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{activeCategoryMeta.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{activeCategoryMeta.description}</p>
              </div>
              <div className="rounded-2xl border border-white/90 bg-slate-950 p-5 text-white shadow-sm shadow-slate-950/10">
                <p className="text-sm text-slate-300">当前结果</p>
                <p className="mt-2 text-3xl font-semibold">{filteredItems.length}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  支持按关键词搜索问题、答案、适用对象和标签。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
        <div className="grid gap-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 lg:grid-cols-[0.95fr_1.05fr] lg:p-6">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 focus-within:border-[#1d7df2] focus-within:bg-white">
            <Search className="size-5 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索接入准备、数据安全、培训支持等问题"
              className="w-full border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </label>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Filter className="size-4" />
              按分类筛选
            </div>
            <div className="flex flex-wrap gap-2">
              {faqCategories.map((category) => {
                const active = category.id === activeCategory;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-[#1d7df2] bg-[#eaf3ff] text-[#1254d8]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
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

      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8 lg:pb-20">
        {filteredItems.length > 0 ? (
          <div className="grid gap-4">
            {filteredItems.map((item) => {
              const isOpen = item.id === openItemId;
              const category = faqCategories.find((entry) => entry.id === item.category);

              return (
                <article
                  key={item.id}
                  className={`overflow-hidden rounded-[24px] border bg-white shadow-sm shadow-slate-950/5 transition ${
                    isOpen ? "border-[#bfd8ff]" : "border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenItemId((current) => (current === item.id ? null : item.id))}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {category?.label}
                        </span>
                        <span className="rounded-full bg-[#edf6ff] px-3 py-1 text-xs font-semibold text-[#1769cf]">
                          适用对象：{item.audience}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold leading-7 text-slate-950 sm:text-xl">
                        {item.question}
                      </h2>
                    </div>
                    <span
                      className={`mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition ${
                        isOpen
                          ? "border-[#bfd8ff] bg-[#eef5ff] text-[#1254d8]"
                          : "border-slate-200 bg-slate-50 text-slate-500"
                      }`}
                    >
                      <ChevronDown className={`size-5 transition ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                  </button>

                  {isOpen ? (
                    <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6">
                      <p className="text-sm leading-7 text-slate-600 sm:text-base">{item.answer}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm shadow-slate-950/5">
            <p className="text-lg font-semibold text-slate-950">未找到匹配问题</p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              可以尝试缩短关键词、切换分类，或者先回到全部问题浏览接入、合作、安全、交付和售后常见说明。
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
              }}
              className="mt-6 inline-flex items-center rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              查看全部问题
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
